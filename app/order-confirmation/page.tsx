"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Package, ArrowRight, RotateCcw } from "lucide-react";

function OrderConfirmationContent() {
    const searchParams = useSearchParams();
    const status = searchParams.get("status"); // "success" | "failed"
    const orderNumber = searchParams.get("orderNumber");

    const isSuccess = status === "success";

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
