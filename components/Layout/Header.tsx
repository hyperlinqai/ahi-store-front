"use client";

import Link from "next/link";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { useCartStore } from "../../store/cartStore";
import { useEffect, useState } from "react";
import type { Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

function getNavigationCategories(categories: Category[]) {
    if (categories.length === 0) return [];

    const primaryCollection =
        categories.length === 1 && categories[0].children && categories[0].children.length > 0
            ? categories[0]
            : null;

    if (primaryCollection) {
        return primaryCollection.children!.slice(0, 3);
    }

    return categories
        .flatMap((category) =>
            category.children && category.children.length > 0 ? category.children : [category]
        )
        .slice(0, 3);
}

export default function Header() {
    const { items } = useCartStore();
    const itemTotal = items.reduce((total, item) => total + item.quantity, 0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        let isActive = true;

        async function loadCategories() {
            try {
                const res = await fetch(`${API_BASE}/categories`);
                if (!res.ok) return;
                const json = await res.json();
                if (!isActive) return;
                setCategories(json.data || []);
            } catch {
                // Keep header navigation resilient if categories are unavailable.
            }
        }

        loadCategories();

        return () => {
            isActive = false;
        };
    }, []);

    const navigationCategories = getNavigationCategories(categories);
    const collectionLink =
        categories.length === 1 ? `/collections/${categories[0].slug}` : "/collections/all";
    const collectionLabel = categories.length === 1 ? categories[0].name : "Collections";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
                {/* Mobile Menu Button */}
                <div className="flex items-center lg:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>

                {/* Logo */}
                <div className="flex justify-center lg:justify-start flex-1 lg:flex-none">
                    <Link href="/" className="flex items-center">
                        <img
                            src="/ahi-logo.svg"
                            alt="Ahi Jewellery"
                            className="h-[48px] w-auto sm:h-[68px]"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex lg:items-center lg:gap-8">
                    <Link href="/collections/all" className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        Shop All
                    </Link>
                    <Link href={collectionLink} className="text-sm font-medium text-gray-700 hover:text-orange-500">
                        {collectionLabel}
                    </Link>
                    {navigationCategories.map((category) => (
                        <Link
                            key={category.id}
                            href={`/collections/${category.slug}`}
                            className="text-sm font-medium text-gray-700 hover:text-orange-500"
                        >
                            {category.name}
                        </Link>
                    ))}
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
                <div className="lg:hidden border-t border-gray-100 bg-white shadow-sm">
                    <div className="space-y-1 px-4 pb-4 pt-3">
                        <Link href="/collections/all" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            Shop All
                        </Link>
                        <Link href={collectionLink} className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            {collectionLabel}
                        </Link>
                        {navigationCategories.map((category) => (
                            <Link
                                key={category.id}
                                href={`/collections/${category.slug}`}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {category.name}
                            </Link>
                        ))}
                        <Link href="/account" className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500" onClick={() => setIsMenuOpen(false)}>
                            Account
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
