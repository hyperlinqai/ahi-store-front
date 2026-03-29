"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { useCartStore } from "../../store/cartStore";
import { useAuthStore } from "../../store/authStore";
import ProtectedRoute from "../../components/Layout/ProtectedRoute";
import api from "@/lib/axios";
import { indianStates } from "@/lib/indianStates";
import { countriesList } from "@/lib/countries";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    MapPin,
    Plus,
    Check,
    ShoppingBag,
    Tag,
    Loader2,
    X,
    ChevronDown,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────

interface Address {
    id: string;
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    isDefault: boolean;
}

declare global {
    interface Window {
        Razorpay: any;
    }
}

// ── Address form schema ────────────────────────────────

const addressSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone is required").max(15),
    addressLine1: z.string().min(3, "Address is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(3, "Valid ZIP/Pincode is required").max(15, "ZIP is too long"),
    isDefault: z.boolean().optional(),
});

type AddressValues = z.infer<typeof addressSchema>;

// ── Component ──────────────────────────────────────────

export default function CheckoutPage() {
    const router = useRouter();
    const { items, getCartTotal, clearCart } = useCartStore();
    const { user } = useAuthStore();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [placing, setPlacing] = useState(false);
    const [error, setError] = useState("");

    const subtotal = getCartTotal();
    const total = Math.max(subtotal - discount, 0);
    const itemCount = items.reduce((s, i) => s + i.quantity, 0);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors: formErrors, isSubmitting: formSubmitting },
    } = useForm<AddressValues>({ 
        resolver: zodResolver(addressSchema),
        defaultValues: { country: "India" }
    });

    const selectedCountry = watch("country") || "India";

    const fetchAddresses = useCallback(() => {
        api.get("/addresses")
            .then((res) => {
                const list: Address[] = res.data.data || [];
                setAddresses(list);
                const defaultAddr = list.find((a) => a.isDefault);
                if (defaultAddr) setSelectedAddressId(defaultAddr.id);
                else if (list.length > 0) setSelectedAddressId(list[0].id);
                // Auto-show form if no addresses
                if (list.length === 0) setShowAddressForm(true);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        fetchAddresses();
    }, [fetchAddresses]);

    // Redirect if cart is empty
    useEffect(() => {
        if (!loading && items.length === 0) {
            router.push("/cart");
        }
    }, [loading, items.length, router]);

    // ── Address form ───────────────────────────────────

    async function onAddressSubmit(values: AddressValues) {
        try {
            const res = await api.post("/addresses", values);
            reset();
            setShowAddressForm(false);
            fetchAddresses();
            // Auto-select the newly added address
            if (res.data.data?.id) {
                setSelectedAddressId(res.data.data.id);
            }
        } catch {
            setError("Failed to add address.");
        }
    }

    // ── Coupon ─────────────────────────────────────────

    async function applyCoupon() {
        setCouponError("");
        if (!couponCode.trim()) return;
        try {
            const res = await api.post("/coupons/validate", {
                code: couponCode,
                subtotal,
            });
            const data = res.data.data;
            setDiscount(data.discount || 0);
            setCouponApplied(true);
        } catch (err: any) {
            setCouponError(err?.response?.data?.message || "Invalid coupon code.");
            setDiscount(0);
            setCouponApplied(false);
        }
    }

    function removeCoupon() {
        setCouponCode("");
        setDiscount(0);
        setCouponApplied(false);
        setCouponError("");
    }

    // ── Place Order & Pay ──────────────────────────────

    async function handlePlaceOrder() {
        if (!selectedAddressId) {
            setError("Please add and select a delivery address.");
            return;
        }
        setError("");
        setPlacing(true);

        try {
            // 1. Sync cart to backend
            await api.post("/cart/merge", {
                items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
            });

            // 2. Place order
            const orderRes = await api.post("/orders", { addressId: selectedAddressId });
            const order = orderRes.data.data;

            // 3. Create Razorpay order
            const payRes = await api.post("/payments/create-order", { orderId: order.id });
            const { razorpayOrder } = payRes.data.data;

            // 4. Open Razorpay checkout
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                name: "Ahi Jewellery",
                description: `Order #${order.orderNumber}`,
                order_id: razorpayOrder.id,
                handler: async function (response: any) {
                    try {
                        await api.post("/payments/verify", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                        });
                        clearCart();
                        router.push(`/order-confirmation?status=success&orderNumber=${order.orderNumber}`);
                    } catch {
                        router.push(`/order-confirmation?status=failed&orderNumber=${order.orderNumber}`);
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                },
                theme: { color: "#f97316" },
                modal: {
                    ondismiss: function () {
                        setPlacing(false);
                    },
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on("payment.failed", function () {
                router.push(`/order-confirmation?status=failed&orderNumber=${order.orderNumber}`);
            });
            rzp.open();
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to place order. Please try again.");
            setPlacing(false);
        }
    }

    // ── Render helpers ─────────────────────────────────

    const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

    const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors";

    if (loading) {
        return (
            <ProtectedRoute>
                <div className="flex items-center justify-center py-32">
                    <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
                </div>
            </ProtectedRoute>
        );
    }

    return (
        <ProtectedRoute>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                        Checkout
                    </h2>
                </div>

                {error && (
                    <div className="mb-6 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        {error}
                    </div>
                )}

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* ─── Left Column ─── */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* ── 1. Delivery Address ── */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">1</span>
                                    <h3 className="text-base font-semibold text-gray-900">Delivery Address</h3>
                                </div>
                                {addresses.length > 0 && (
                                    <button
                                        onClick={() => setShowAddressForm(!showAddressForm)}
                                        className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> Add New
                                    </button>
                                )}
                            </div>

                            {/* Address form — shown if no addresses or user clicks Add New */}
                            {showAddressForm && (
                                <div className="px-4 py-6 sm:px-6 border-b border-gray-100">
                                    <form onSubmit={handleSubmit(onAddressSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                                <input {...register("fullName")} className={inputClass} placeholder="John Doe" />
                                                {formErrors.fullName && <p className="text-xs text-red-500 mt-1">{formErrors.fullName.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                                <input {...register("phone")} type="tel" className={inputClass} placeholder="+91 98765 43210" />
                                                {formErrors.phone && <p className="text-xs text-red-500 mt-1">{formErrors.phone.message}</p>}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1</label>
                                            <input {...register("addressLine1")} className={inputClass} placeholder="House no, Street, Area" />
                                            {formErrors.addressLine1 && <p className="text-xs text-red-500 mt-1">{formErrors.addressLine1.message}</p>}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2 <span className="text-gray-400 font-normal">(optional)</span></label>
                                            <input {...register("addressLine2")} className={inputClass} placeholder="Landmark, Apartment" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                                            <select {...register("country")} className={`${inputClass} bg-white cursor-pointer`}>
                                                {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            {formErrors.country && <p className="text-xs text-red-500 mt-1">{formErrors.country.message}</p>}
                                        </div>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">State/Province</label>
                                                {selectedCountry === "India" ? (
                                                    <select {...register("state")} className={`${inputClass} bg-white`}>
                                                        <option value="">Select state</option>
                                                        {indianStates.map((s) => (
                                                            <option key={s} value={s}>{s}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <input {...register("state")} placeholder="State" className={inputClass} />
                                                )}
                                                {formErrors.state && <p className="text-xs text-red-500 mt-1">{formErrors.state.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                                <input {...register("city")} className={inputClass} placeholder="Enter city" />
                                                {formErrors.city && <p className="text-xs text-red-500 mt-1">{formErrors.city.message}</p>}
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP/Pincode</label>
                                                <input {...register("pincode")} className={inputClass} placeholder="Code" />
                                                {formErrors.pincode && <p className="text-xs text-red-500 mt-1">{formErrors.pincode.message}</p>}
                                            </div>
                                        </div>
                                        <div className="flex gap-3 pt-1">
                                            <button
                                                type="submit"
                                                disabled={formSubmitting}
                                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60"
                                            >
                                                {formSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                                Save & Use This Address
                                            </button>
                                            {addresses.length > 0 && (
                                                <button type="button" onClick={() => { setShowAddressForm(false); reset(); }} className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                                    Cancel
                                                </button>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            )}

                            {/* Address list */}
                            {addresses.length > 0 && !showAddressForm && (
                                <ul className="divide-y divide-gray-100">
                                    {addresses.map((addr) => (
                                        <li
                                            key={addr.id}
                                            onClick={() => setSelectedAddressId(addr.id)}
                                            className={`px-4 py-4 sm:px-6 cursor-pointer transition-colors ${
                                                selectedAddressId === addr.id
                                                    ? "bg-orange-50"
                                                    : "hover:bg-gray-50"
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                                                    selectedAddressId === addr.id
                                                        ? "border-orange-500 bg-orange-500"
                                                        : "border-gray-300"
                                                }`}>
                                                    {selectedAddressId === addr.id && <Check className="w-3 h-3 text-white" />}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <p className="text-sm font-semibold text-gray-900">{addr.fullName}</p>
                                                        {addr.isDefault && (
                                                            <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600 ring-1 ring-inset ring-orange-500/20">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-0.5 font-medium">
                                                        {addr.country || "India"}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-0.5">
                                                        {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}, {addr.city}, {addr.state} - {addr.pincode}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-0.5">{addr.phone}</p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {addresses.length === 0 && !showAddressForm && (
                                <div className="px-4 py-12 text-center">
                                    <MapPin className="mx-auto h-10 w-10 text-gray-300" strokeWidth={1} />
                                    <p className="mt-3 text-sm text-gray-500">No saved addresses.</p>
                                    <button
                                        onClick={() => setShowAddressForm(true)}
                                        className="mt-3 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                                    >
                                        Add an address to continue
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* ── 2. Coupon Code ── */}
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-gray-500" />
                                    <h3 className="text-sm font-semibold text-gray-900">Coupon Code</h3>
                                </div>
                            </div>
                            <div className="px-4 py-4 sm:px-6">
                                {couponApplied ? (
                                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <Check className="w-4 h-4 text-emerald-600" />
                                            <span className="text-sm font-medium text-emerald-700">
                                                {couponCode.toUpperCase()} — &#8377;{discount.toLocaleString("en-IN")} off
                                            </span>
                                        </div>
                                        <button onClick={removeCoupon} className="text-gray-400 hover:text-red-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex gap-2">
                                            <input
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                                placeholder="Enter coupon code"
                                                className={`flex-1 ${inputClass}`}
                                            />
                                            <button
                                                onClick={applyCoupon}
                                                className="px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                                            >
                                                Apply
                                            </button>
                                        </div>
                                        {couponError && <p className="text-xs text-red-500 mt-2">{couponError}</p>}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ─── Right Column — Order Summary ─── */}
                    <div className="lg:col-span-5 mt-8 lg:mt-0">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
                                <div className="flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-xs font-bold">2</span>
                                    <h3 className="text-base font-semibold text-gray-900">Order Summary</h3>
                                </div>
                            </div>

                            {/* Cart items */}
                            <ul className="divide-y divide-gray-100 max-h-[320px] overflow-y-auto">
                                {items.map((item) => (
                                    <li key={item.id} className="flex gap-3 px-4 py-3 sm:px-6">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                            {item.image ? (
                                                <Image src={item.image} alt={item.name} width={48} height={48} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <ShoppingBag className="w-4 h-4 text-gray-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-900 flex-shrink-0">
                                            &#8377;{(item.price * item.quantity).toLocaleString("en-IN")}
                                        </p>
                                    </li>
                                ))}
                            </ul>

                            {/* Totals */}
                            <div className="px-4 py-5 sm:px-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Subtotal ({itemCount} items)</span>
                                    <span className="font-medium text-gray-900">&#8377;{subtotal.toLocaleString("en-IN")}</span>
                                </div>
                                {discount > 0 && (
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-emerald-600">Coupon Discount</span>
                                        <span className="font-medium text-emerald-600">-&#8377;{discount.toLocaleString("en-IN")}</span>
                                    </div>
                                )}
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-medium text-emerald-600">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                                    <span className="text-base font-semibold text-gray-900">Total</span>
                                    <span className="text-lg font-bold text-gray-900">&#8377;{total.toLocaleString("en-IN")}</span>
                                </div>
                            </div>

                            {/* Deliver to summary */}
                            {selectedAddress && !showAddressForm && (
                                <div className="px-4 pb-4 sm:px-6">
                                    <div className="bg-gray-50 rounded-xl px-4 py-3">
                                        <p className="text-xs text-gray-500 mb-1">Delivering to</p>
                                        <p className="text-sm font-medium text-gray-900 mb-1">{selectedAddress.fullName}</p>
                                        <p className="text-xs text-gray-600 font-medium">
                                            {selectedAddress.country || "India"}
                                        </p>
                                        <p className="text-xs text-gray-600 mt-0.5">
                                            {selectedAddress.addressLine1}, {selectedAddress.city}, {selectedAddress.state} - {selectedAddress.pincode}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Pay button */}
                            <div className="px-4 pb-5 sm:px-6">
                                <button
                                    onClick={handlePlaceOrder}
                                    disabled={placing || !selectedAddressId}
                                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {placing ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                                        </>
                                    ) : (
                                        <>Pay &#8377;{total.toLocaleString("en-IN")}</>
                                    )}
                                </button>
                                {!selectedAddressId && addresses.length === 0 && !showAddressForm && (
                                    <p className="text-xs text-center text-red-500 mt-2">Please add an address to proceed</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoute>
    );
}
