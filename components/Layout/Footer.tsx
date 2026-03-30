"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

function getFooterCategories(categories: Category[]) {
    if (categories.length === 0) return [];

    const primaryCollection =
        categories.length === 1 && categories[0].children && categories[0].children.length > 0
            ? categories[0]
            : null;

    if (primaryCollection) {
        return primaryCollection.children!.slice(0, 4);
    }

    return categories
        .flatMap((category) =>
            category.children && category.children.length > 0 ? category.children : [category]
        )
        .slice(0, 4);
}

export default function Footer() {
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
                // Footer should remain usable even if category fetch fails.
            }
        }

        loadCategories();

        return () => {
            isActive = false;
        };
    }, []);

    const collectionLink =
        categories.length === 1 ? `/collections/${categories[0].slug}` : "/collections/all";
    const collectionLabel = categories.length === 1 ? categories[0].name : "Collections";
    const shopLinks = [
        { label: "Shop All", href: "/collections/all" },
        { label: collectionLabel, href: collectionLink },
        ...getFooterCategories(categories).map((category) => ({
            label: category.name,
            href: `/collections/${category.slug}`,
        })),
    ].slice(0, 5);

    const supportLinks = [
        { label: "Jewellery Care Guide", href: "/jewellery-care-guide" },
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Returns, Exchange & Repair", href: "/returns-exchange-repair-policy" },
        { label: "Shipping Policy", href: "/shipping-policy" },
        { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ];

    return (
        <footer className="bg-gray-50 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <Link href="/" className="inline-flex">
                            <img
                                src="/ahi-logo.png"
                                alt="Ahi Jewellery"
                                className="h-[77px] w-auto sm:h-[88px]"
                            />
                        </Link>
                        <p className="text-sm text-gray-500 leading-6">
                            Crafting timeless elegance. Discover our exclusive collection of fine jewelry designed for your most precious moments.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 xl:col-span-2 xl:mt-0">
                        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Shop</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {shopLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Support</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    {supportLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link href={link.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-200 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Ahi Jewellery. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
