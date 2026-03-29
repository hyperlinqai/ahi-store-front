"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Product } from "@/types";
import ProductCard from "@/components/Home/ProductCard";

interface RelatedProductsProps {
    products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    if (products.length === 0) return null;

    function scroll(direction: "left" | "right") {
        if (!scrollRef.current) return;
        const amount = 300;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    }

    return (
        <section className="mt-16">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">You May Also Like</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-600 hover:border-gray-400 transition-colors"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto scrollbar-hide pb-2 snap-x snap-mandatory"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="min-w-[220px] max-w-[260px] flex-shrink-0 snap-start"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </section>
    );
}
