"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, XCircle, Package, ArrowRight, RotateCcw, ShoppingBag } from "lucide-react";

type ConfirmationItem = {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image?: string | null;
};

type ConfirmationDetails = {
    orderNumber: string;
    total: number;
    itemCount: number;
    email?: string;
    items: ConfirmationItem[];
};

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status"); // "success" | "failed"
    const orderNumber = searchParams.get("orderNumber");
    const [details, setDetails] = useState<ConfirmationDetails | null>(null);

    const isSuccess = status === "success";

    useEffect(() => {
        if (typeof window === "undefined") return;

        const raw = sessionStorage.getItem("latest-order-confirmation");
        if (!raw) return;

        try {
            const parsed = JSON.parse(raw) as ConfirmationDetails;
            if (!orderNumber || parsed.orderNumber === orderNumber) {
                setDetails(parsed);
            }
        } catch {
            sessionStorage.removeItem("latest-order-confirmation");
        }
    }, [orderNumber]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto text-center">
                {/* Icon */}
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
                    isSuccess ? "bg-emerald-50" : "bg-red-50"
                }`}>
                    {isSuccess ? (
                        <CheckCircle className="w-8 h-8 text-emerald-500" />
                    ) : (
                        <XCircle className="w-8 h-8 text-red-500" />
                    )}
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                    {isSuccess ? "Order Placed Successfully!" : "Payment Failed"}
                </h1>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500">
                    {isSuccess
                        ? "Thank you for your purchase. Your order has been confirmed and you will receive an email with the details shortly."
                        : "We couldn't process your payment. Don't worry — your order has been saved. You can retry payment or contact our support team."}
                </p>

                {/* Order number */}
                {orderNumber && (
                    <div className="mt-6 inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-500">Order Number:</span>
                        <span className="text-sm font-bold text-gray-900">{orderNumber}</span>
                    </div>
                )}

                {isSuccess && details && (
                    <div className="mt-6 rounded-2xl border border-gray-200 bg-white text-left shadow-sm overflow-hidden">
                        <div className="border-b border-gray-100 px-5 py-4">
                            <h2 className="text-sm font-semibold text-gray-900">Order Details</h2>
                            <p className="mt-1 text-xs text-gray-500">
                                {details.itemCount} {details.itemCount === 1 ? "item" : "items"}
                                {details.email ? ` • ${details.email}` : ""}
                            </p>
                        </div>
                        <ul className="divide-y divide-gray-100">
                            {details.items.map((item) => (
                                <li key={item.id} className="flex items-center gap-3 px-5 py-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-xl bg-gray-100 flex-shrink-0">
                                        {item.image ? (
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                width={56}
                                                height={56}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">
                                                <ShoppingBag className="h-5 w-5 text-gray-300" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</p>
                                        <p className="mt-1 text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900">
                                        &#8377;{(item.price * item.quantity).toLocaleString("en-IN")}
                                    </p>
                                </li>
                            ))}
                        </ul>
                        <div className="border-t border-gray-100 bg-gray-50 px-5 py-4">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-600">Total Paid</span>
                                <span className="text-base font-bold text-gray-900">
                                    &#8377;{details.total.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {isSuccess ? (
                        <>
                            <Link
                                href="/account"
                                onClick={() => {
                                    // Set orders tab active
                                    if (typeof window !== "undefined") {
                                        sessionStorage.setItem("account-tab", "orders");
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                            >
                                View My Orders <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                href="/products"
                                className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/account"
                                onClick={() => {
                                    if (typeof window !== "undefined") {
                                        sessionStorage.setItem("account-tab", "orders");
                                    }
                                }}
                                className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                            >
                                <RotateCcw className="w-4 h-4" /> View My Orders
                            </Link>
                            <Link
                                href="/products"
                                className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                            >
                                Continue Shopping
                            </Link>
                        </>
                    )}
                </div>

                {/* Support note */}
                {!isSuccess && (
                    <p className="mt-6 text-xs text-gray-400">
                        If the amount was deducted from your account, it will be refunded within 5-7 business days.
                        Need help? Contact us at <a href="mailto:support@ahijewellery.com" className="text-orange-500 hover:text-orange-600">support@ahijewellery.com</a>
                    </p>
                )}
            </div>
        </div>
    );
}

export default function OrderConfirmationPage() {
    return (
        <Suspense
            fallback={
                <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm text-gray-500">Loading...</p>
                </div>
            }
        >
            <OrderConfirmationContent />
        </Suspense>
    );
}
