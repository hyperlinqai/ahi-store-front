"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Package, Loader2 } from "lucide-react";

interface OrderItem {
    id: string;
    productName: string;
    sku: string;
    price: number;
    quantity: number;
}

interface Order {
    id: string;
    orderNumber: string;
    total: number;
    status: string;
    paymentStatus: string;
    createdAt: string;
    items: OrderItem[];
}

const statusColor: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-700 ring-yellow-600/10",
    CONFIRMED: "bg-blue-50 text-blue-700 ring-blue-700/10",
    PROCESSING: "bg-indigo-50 text-indigo-700 ring-indigo-700/10",
    SHIPPED: "bg-purple-50 text-purple-700 ring-purple-700/10",
    DELIVERED: "bg-emerald-50 text-emerald-700 ring-emerald-700/10",
    CANCELLED: "bg-red-50 text-red-700 ring-red-700/10",
    RETURNED: "bg-gray-50 text-gray-700 ring-gray-600/10",
};

export default function OrdersSection() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/orders/my")
            .then((res) => setOrders(res.data.data || []))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-base font-semibold leading-6 text-gray-900">My Orders</h3>
                <p className="mt-1 text-sm text-gray-500">Track and manage your orders.</p>
            </div>
            {orders.length === 0 ? (
                <div className="px-4 py-16 text-center">
                    <Package className="mx-auto h-10 w-10 text-gray-300" strokeWidth={1} />
                    <p className="mt-3 text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-100">
                    {orders.map((order) => (
                        <li key={order.id} className="px-4 py-5 sm:px-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">#{order.orderNumber}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">
                                        {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                    </p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${statusColor[order.status] || "bg-gray-50 text-gray-700 ring-gray-600/10"}`}>
                                        {order.status}
                                    </span>
                                    <span className="text-sm font-bold text-gray-900">&#8377;{order.total.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                            {order.items && order.items.length > 0 && (
                                <div className="mt-3 space-y-1">
                                    {order.items.map((item) => (
                                        <p key={item.id} className="text-xs text-gray-500">
                                            {item.productName} &times; {item.quantity}
                                        </p>
                                    ))}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
