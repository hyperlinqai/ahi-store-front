"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useState } from "react";

export default function Header() {
    const { items } = useCartStore();
    const itemTotal = items.reduce((total, item) => total + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-500 hover:text-gray-900 focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex justify-center lg:justify-start flex-1 lg:flex-none">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900">
                            AHI <span className="text-orange-500">JEWELLERY</span>
                        </span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex lg:items-center lg:gap-8">
                    <Link href="/collections/all" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        Shop All
                    </Link>
                    <Link href="/collections/rings" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        Rings
                    </Link>
                    <Link href="/collections/necklaces" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        Necklaces
                    </Link>
                    <Link href="/collections/earrings" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        Earrings
                    </Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center gap-4 lg:gap-6">
                    <button className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
                        <Search className="h-5 w-5" />
                    </button>

                    <Link href="/account" className="text-gray-500 hover:text-gray-900 transition-colors hidden sm:block">
                        <User className="h-5 w-5" />
                    </Link>

                    <Link href="/cart" className="group relative text-gray-500 hover:text-gray-900 transition-colors flex items-center">
                        <ShoppingBag className="h-5 w-5" />
                        {itemTotal > 0 && (
                            <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
                                {itemTotal}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-gray-100 bg-white">
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        <Link href="/collections/all" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            Shop All
                        </Link>
                        <Link href="/collections/rings" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            Rings
                        </Link>
                        <Link href="/account" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            Account
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
