"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid2x2, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/collections/all", label: "Shop", icon: Grid2x2 },
    { href: "/cart", label: "Cart", icon: ShoppingBag },
    { href: "/account", label: "Account", icon: User },
];

export default function MobileBottomBar() {
    const pathname = usePathname();
    const { items } = useCartStore();
    const cartCount = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur md:hidden">
            <div className="mx-auto grid max-w-md grid-cols-4 px-2">
                {navItems.map((item) => {
                    const isActive =
                        item.href === "/"
                            ? pathname === item.href
                            : pathname === item.href || pathname.startsWith(`${item.href}/`);
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`relative flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-medium transition-colors ${
                                isActive
                                    ? "text-orange-500"
                                    : "text-gray-500 hover:text-gray-900"
                            }`}
                        >
                            <div className="relative">
                                <Icon className="h-5 w-5" strokeWidth={isActive ? 2.2 : 1.9} />
                                {item.href === "/cart" && cartCount > 0 && (
                                    <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </div>
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
