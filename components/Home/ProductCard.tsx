"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, Star, Check, ImageOff } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";

function formatPrice(price: number): string {
    return `₹${price.toLocaleString("en-IN")}`;
}

export default function ProductCard({ product }: { product: Product }) {
    const [added, setAdded] = useState(false);
    const addItem = useCartStore((s) => s.addItem);
    const router = useRouter();

    const mainImage = product.images?.[0]?.url ?? null;
    const hoverImage = product.images?.[1]?.url ?? null;
    const firstVariant = product.variants?.[0] ?? null;
    const inStock = firstVariant ? firstVariant.stock > 0 : false;

    const discount =
        product.compareAtPrice && product.compareAtPrice > product.price
            ? Math.round(
                  ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
              )
            : null;

    function handleAddToCart(e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        if (!firstVariant || !inStock) return;

        addItem({
            id: firstVariant.id,
            productId: product.id,
            name: product.title,
            price: product.price,
            quantity: 1,
            image: mainImage ?? undefined,
            color: firstVariant.color ?? undefined,
            material: firstVariant.material ?? undefined,
        });

        setAdded(true);
        router.push("/cart");
    }

    return (
        <Link href={`/products/${product.slug}`} className="group flex flex-col">
            {/* Image Container */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                {/* Discount Badge */}
                {discount && (
                    <div className="absolute top-3 left-3 z-10 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
                        -{discount}%
                    </div>
                )}

                {/* Out of stock overlay */}
                {!inStock && firstVariant && (
                    <div className="absolute top-3 right-3 z-10 bg-gray-800/80 text-white text-[11px] font-medium px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        Sold Out
                    </div>
                )}

                {mainImage ? (
                    <>
                        <Image
                            src={mainImage}
                            alt={product.title}
                            fill
                            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
                                hoverImage ? "group-hover:opacity-0" : ""
                            }`}
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        {hoverImage && (
                            <Image
                                src={hoverImage}
                                alt={product.title}
                                fill
                                className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            />
                        )}
                    </>
                ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-300">
                        <ImageOff className="w-10 h-10" strokeWidth={1} />
                        <span className="text-xs">No image</span>
                    </div>
                )}

                {/* Add to Cart — slides up on hover */}
                <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                    <button
                        onClick={handleAddToCart}
                        disabled={!inStock}
                        className={`w-full flex items-center justify-center gap-2 py-3.5 text-sm font-semibold transition-colors ${
                            added
                                ? "bg-emerald-500 text-white"
                                : inStock
                                ? "bg-gray-900 text-white hover:bg-orange-500"
                                : "bg-gray-500 text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        {added ? (
                            <>
                                <Check className="w-4 h-4" />
                                Added to Cart
                            </>
                        ) : inStock ? (
                            <>
                                <ShoppingBag className="w-4 h-4" />
                                Add to Cart
                            </>
                        ) : (
                            "Out of Stock"
                        )}
                    </button>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-3.5 flex flex-col gap-1 px-0.5">
                {product.category && (
                    <p className="text-[11px] text-orange-500 font-semibold uppercase tracking-widest">
                        {product.category.name}
                    </p>
                )}
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
                    {product.title}
                </h3>

                {/* Rating */}
                {product.reviewCount > 0 && (
                    <div className="flex items-center gap-1 mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-3 h-3 ${
                                    i < Math.round(product.avgRating)
                                        ? "fill-orange-400 text-orange-400"
                                        : "fill-gray-200 text-gray-200"
                                }`}
                            />
                        ))}
                        <span className="text-[11px] text-gray-400 ml-0.5">
                            ({product.reviewCount})
                        </span>
                    </div>
                )}

                {/* Price Row */}
                <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-sm font-bold text-gray-900">
                        {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                            {formatPrice(product.compareAtPrice)}
                        </span>
                    )}
                    {discount && (
                        <span className="text-xs font-semibold text-emerald-600">
                            {discount}% off
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}
