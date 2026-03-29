import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface FeaturedProductsProps {
    products: Product[];
    title?: string;
    subtitle?: string;
}

export default function FeaturedProducts({ products, title, subtitle }: FeaturedProductsProps) {
    if (products.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm text-orange-500 font-semibold uppercase tracking-[0.25em] mb-2">
                            Handpicked
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            {title || "Featured Collection"}
                        </h2>
                        <p className="mt-2 text-base text-gray-500">
                            {subtitle || "Our most-loved pieces, curated just for you."}
                        </p>
                    </div>
                    <Link
                        href="/collections/featured"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors flex-shrink-0 mb-1"
                    >
                        View All
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="text-center mt-10 sm:hidden">
                    <Link
                        href="/collections/featured"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-7 py-3 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                        View All Featured
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
