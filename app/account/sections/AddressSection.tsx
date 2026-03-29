"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { indianStates } from "@/lib/indianStates";
import { countriesList } from "@/lib/countries";

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

const addressSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    phone: z.string().min(10, "Valid phone is required").max(15),
    addressLine1: z.string().min(3, "Address is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    state: z.string().min(2, "State is required"),
    pincode: z.string().min(3, "Valid ZIP/Pincode is required").max(15, "ZIP/Pincode too long"),
    isDefault: z.boolean().optional(),
});

type AddressValues = z.infer<typeof addressSchema>;

export default function AddressSection() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<AddressValues>({ 
        resolver: zodResolver(addressSchema),
        defaultValues: { country: "India" }
    });

    const selectedCountry = watch("country") || "India";

    const fetchAddresses = () => {
        api.get("/addresses")
            .then((res) => setAddresses(res.data.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchAddresses(); }, []);

    async function onSubmit(values: AddressValues) {
        setError("");
        try {
            await api.post("/addresses", values);
            reset();
            setShowForm(false);
            fetchAddresses();
        } catch {
            setError("Failed to add address.");
        }
    }

    async function deleteAddress(id: string) {
        try {
            await api.delete(`/addresses/${id}`);
            setAddresses((prev) => prev.filter((a) => a.id !== id));
        } catch {
            setError("Failed to delete address.");
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Delivery Addresses</h3>
                    <p className="mt-1 text-sm text-gray-500">Manage your saved addresses.</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1.5 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Add New
                </button>
            </div>

            {error && (
                <div className="mx-4 mt-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                    {error}
                </div>
            )}

            {showForm && (
                <div className="px-4 py-6 sm:px-6 border-b border-gray-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-lg">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                                <input {...register("fullName")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                                {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone</label>
                                <input {...register("phone")} type="tel" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                                {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 1</label>
                            <input {...register("addressLine1")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                            {errors.addressLine1 && <p className="text-xs text-red-500 mt-1">{errors.addressLine1.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address Line 2</label>
                            <input {...register("addressLine2")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
                            <select {...register("country")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none bg-white">
                                {countriesList.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.country && <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>}
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">State/Province</label>
                                {selectedCountry === "India" ? (
                                    <select {...register("state")} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none bg-white">
                                        <option value="">Select state</option>
                                        {indianStates.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <input {...register("state")} placeholder="State" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none bg-white" />
                                )}
                                {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
                                <input {...register("city")} placeholder="Enter city" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                                {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">ZIP/Pincode</label>
                                <input {...register("pincode")} placeholder="Code" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors outline-none" />
                                {errors.pincode && <p className="text-xs text-red-500 mt-1">{errors.pincode.message}</p>}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input {...register("isDefault")} type="checkbox" id="isDefault" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                            <label htmlFor="isDefault" className="text-sm text-gray-700">Set as default address</label>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60"
                            >
                                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                                Save Address
                            </button>
                            <button type="button" onClick={() => { setShowForm(false); reset(); }} className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors">
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {addresses.length === 0 && !showForm ? (
                <div className="px-4 py-16 text-center">
                    <MapPin className="mx-auto h-10 w-10 text-gray-300" strokeWidth={1} />
                    <p className="mt-3 text-sm text-gray-500">No saved addresses yet.</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {addresses.map((addr) => (
                        <li key={addr.id} className="px-4 py-5 sm:px-6 flex items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-sm font-semibold text-gray-900">{addr.fullName}</p>
                                    {addr.isDefault && (
                                        <span className="inline-flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-[11px] font-medium text-orange-600 ring-1 ring-inset ring-orange-500/20">
                                            Default
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                    {addr.addressLine1}{addr.addressLine2 ? `, ${addr.addressLine2}` : ""}
                                </p>
                                <p className="text-sm text-gray-600 font-medium my-0.5">{addr.country || "India"}</p>
                                <p className="text-sm text-gray-600">{addr.city}, {addr.state} - {addr.pincode}</p>
                                <p className="text-xs text-gray-400 mt-1">{addr.phone}</p>
                            </div>
                            <button onClick={() => deleteAddress(addr.id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
