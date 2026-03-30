"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cloudinaryUrl } from "@/lib/cloudinaryUrl";
import { Clock } from "lucide-react";

interface ViewedProduct {
    slug: string;
    title: string;
    price: number;
    image: string;
}

export default function RecentlyViewedSection() {
    const [products, setProducts] = useState<ViewedProduct[]>([]);

    useEffect(() => {
        try {
            const stored = localStorage.getItem("recently-viewed");
            if (stored) setProducts(JSON.parse(stored));
        } catch {}
    }, []);

    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
                <h3 className="text-base font-semibold leading-6 text-gray-900">Recently Viewed Products</h3>
                <p className="mt-1 text-sm text-gray-500">Products you&apos;ve browsed recently.</p>
            </div>
            {products.length === 0 ? (
                <div className="px-4 py-16 text-center">
                    <Clock className="mx-auto h-10 w-10 text-gray-300" strokeWidth={1} />
                    <p className="mt-3 text-sm text-gray-500">No recently viewed products.</p>
                </div>
            ) : (
                <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            className="group block"
                        >
                            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-2">
                                <Image
                                    src={cloudinaryUrl(product.image, { width: 400 })}
                                    alt={product.title}
                                    width={200}
                                    height={200}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <p className="text-sm font-semibold text-gray-900 line-clamp-2">{product.title}</p>
                            <p className="text-sm font-bold text-gray-900 mt-0.5">&#8377;{product.price.toLocaleString("en-IN")}</p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}
