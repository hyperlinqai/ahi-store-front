"use client";

import { useCartStore, CartItem } from "../../store/cartStore";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

function CartItemRow({ item }: { item: CartItem }) {
    const { updateQuantity, removeItem } = useCartStore();

    return (
        <li className="flex gap-4 px-4 py-5 sm:px-6">
            {/* Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                {item.image ? (
                    <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <ShoppingBag className="w-6 h-6 text-gray-300" />
                    </div>
                )}
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{item.name}</h3>
                        {(item.color || item.material) && (
                            <p className="text-xs text-gray-500 mt-0.5">
                                {[item.color, item.material].filter(Boolean).join(" / ")}
                            </p>
                        )}
                    </div>
                    <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex items-end justify-between mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-200 rounded-lg">
                        <button
                            onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                            <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-medium text-gray-900 min-w-[2rem] text-center">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            <Plus className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Price */}
                    <p className="text-sm font-bold text-gray-900">
                        &#8377;{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                </div>
            </div>
        </li>
    );
}

export default function CartPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const total = getCartTotal();

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-8 pb-4 border-b border-gray-200">
                <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                    Shopping Cart
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                    {items.length} {items.length === 1 ? "item" : "items"} in your cart
                </p>
            </div>

            {items.length === 0 ? (
                <div className="text-center py-20">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-300" strokeWidth={1} />
                    <h3 className="mt-4 text-lg font-semibold text-gray-900">Your cart is empty</h3>
                    <p className="mt-1 text-sm text-gray-500">Looks like you haven&apos;t added anything yet.</p>
                    <Link
                        href="/products"
                        className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                    >
                        Continue Shopping <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-8">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-sm font-semibold text-gray-900">Cart Items</h3>
                                <button
                                    onClick={clearCart}
                                    className="text-xs font-medium text-red-500 hover:text-red-600 transition-colors"
                                >
                                    Clear All
                                </button>
                            </div>
                            <ul className="divide-y divide-gray-100">
                                {items.map((item) => (
                                    <CartItemRow key={item.id} item={item} />
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden sticky top-24">
                            <div className="px-4 py-4 sm:px-6 bg-gray-50 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-900">Order Summary</h3>
                            </div>
                            <div className="px-4 py-5 sm:px-6 space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
                                    <span className="font-medium text-gray-900">&#8377;{total.toLocaleString("en-IN")}</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Shipping</span>
                                    <span className="font-medium text-emerald-600">Free</span>
                                </div>
                                <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
                                    <span className="text-base font-semibold text-gray-900">Total</span>
                                    <span className="text-base font-bold text-gray-900">&#8377;{total.toLocaleString("en-IN")}</span>
                                </div>
                            </div>
                            <div className="px-4 pb-5 sm:px-6">
                                <Link
                                    href="/checkout"
                                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                                >
                                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="/products"
                                    className="block w-full text-center mt-3 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
