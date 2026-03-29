import Link from "next/link";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";

interface NewArrivalsProps {
    products: Product[];
}

export default function NewArrivals({ products }: NewArrivalsProps) {
    if (products.length === 0) return null;

    // Limit to 8 for the homepage section
    const displayed = products.slice(0, 8);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-end justify-between mb-10">
                    <div>
                        <p className="text-sm text-orange-500 font-semibold uppercase tracking-[0.25em] mb-2">
                            Just In
                        </p>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            New Arrivals
                        </h2>
                        <p className="mt-2 text-base text-gray-500">
                            Fresh styles added to our collection this season.
                        </p>
                    </div>
                    <Link
                        href="/collections/new"
                        className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors flex-shrink-0 mb-1"
                    >
                        See All New Arrivals
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {displayed.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Mobile View All */}
                <div className="text-center mt-10 sm:hidden">
                    <Link
                        href="/collections/new"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-7 py-3 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                        See All New Arrivals
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}
