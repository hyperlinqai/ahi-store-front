"use client";

import { useState } from "react";
import type { Product, ReviewsResponse } from "@/types";
import ReviewSection from "./ReviewSection";

interface ProductTabsProps {
    product: Product;
    reviewsData: ReviewsResponse | null;
    reviewsLoading: boolean;
}

const TABS = ["Description", "Specifications", "Reviews"] as const;
type Tab = (typeof TABS)[number];

function formatWeight(grams: number): string {
    return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${grams} g`;
}

export default function ProductTabs({
    product,
    reviewsData,
    reviewsLoading,
}: ProductTabsProps) {
    const [activeTab, setActiveTab] = useState<Tab>("Description");

    const selectedVariant = product.variants[0];

    return (
        <div>
            {/* Tab Headers */}
            <div className="flex border-b border-gray-200">
                {TABS.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-5 py-3 text-sm font-medium transition-colors relative ${
                            activeTab === tab
                                ? "text-orange-600"
                                : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {tab}
                        {tab === "Reviews" && product.reviewCount > 0 && (
                            <span className="ml-1.5 text-xs text-gray-400">
                                ({product.reviewCount})
                            </span>
                        )}
                        {activeTab === tab && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500" />
                        )}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="py-6">
                {activeTab === "Description" && (
                    <div className="prose prose-sm prose-gray max-w-none">
                        {product.description ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        ) : (
                            <p className="text-gray-400 italic">
                                No description available for this product.
                            </p>
                        )}
                    </div>
                )}

                {activeTab === "Specifications" && (
                    <div className="max-w-lg">
                        <table className="w-full text-sm">
                            <tbody className="divide-y divide-gray-100">
                                {product.brand && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium w-40">Brand</td>
                                        <td className="py-3 text-gray-900">{product.brand}</td>
                                    </tr>
                                )}
                                {product.category && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">Category</td>
                                        <td className="py-3 text-gray-900">
                                            {product.category.name}
                                        </td>
                                    </tr>
                                )}
                                {selectedVariant?.sku && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">SKU</td>
                                        <td className="py-3 text-gray-900 font-mono text-xs">
                                            {selectedVariant.sku}
                                        </td>
                                    </tr>
                                )}
                                {selectedVariant?.material && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">Material</td>
                                        <td className="py-3 text-gray-900">
                                            {selectedVariant.material}
                                        </td>
                                    </tr>
                                )}
                                {selectedVariant?.color && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">Color</td>
                                        <td className="py-3 text-gray-900">
                                            {selectedVariant.color}
                                        </td>
                                    </tr>
                                )}
                                {selectedVariant?.size && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">Size</td>
                                        <td className="py-3 text-gray-900">
                                            {selectedVariant.size}
                                        </td>
                                    </tr>
                                )}
                                {selectedVariant?.weight != null && (
                                    <tr>
                                        <td className="py-3 text-gray-500 font-medium">Weight</td>
                                        <td className="py-3 text-gray-900">
                                            {formatWeight(selectedVariant.weight)}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === "Reviews" && (
                    <ReviewSection data={reviewsData} isLoading={reviewsLoading} />
                )}
            </div>
        </div>
    );
}
