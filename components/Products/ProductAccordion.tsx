"use client";

import { useState } from "react";
import { Info, FileText, Diamond, Truck, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";

interface ProductAccordionProps {
    product: Product;
}

function formatWeight(grams: number): string {
    return grams >= 1000 ? `${(grams / 1000).toFixed(2)} kg` : `${grams} g`;
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0); // 0 is description, open by default

    const selectedVariant = product.variants[0];

    const accordionItems = [
        {
            icon: <Info className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "DESCRIPTION",
            content: (
                <div className="prose prose-sm prose-gray max-w-none pb-4">
                    {product.description ? (
                        <div dangerouslySetInnerHTML={{ __html: product.description }} />
                    ) : (
                        <p className="text-gray-400 italic">No description available.</p>
                    )}
                </div>
            )
        },
        {
            icon: <FileText className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "PRODUCT DETAILS",
            content: (
                <div className="pb-4">
                    <table className="w-full text-sm">
                        <tbody className="divide-y divide-gray-100">
                            {product.brand && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium w-40">Brand</td>
                                    <td className="py-2 text-gray-900">{product.brand}</td>
                                </tr>
                            )}
                            {product.category && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Category</td>
                                    <td className="py-2 text-gray-900">{product.category.name}</td>
                                </tr>
                            )}
                            {selectedVariant?.sku && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">SKU</td>
                                    <td className="py-2 text-gray-900 font-mono text-xs">{selectedVariant.sku}</td>
                                </tr>
                            )}
                            {selectedVariant?.material && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Material</td>
                                    <td className="py-2 text-gray-900">{selectedVariant.material}</td>
                                </tr>
                            )}
                            {selectedVariant?.color && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Color</td>
                                    <td className="py-2 text-gray-900">{selectedVariant.color}</td>
                                </tr>
                            )}
                            {selectedVariant?.size && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Size</td>
                                    <td className="py-2 text-gray-900">{selectedVariant.size}</td>
                                </tr>
                            )}
                            {selectedVariant?.weight != null && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Weight</td>
                                    <td className="py-2 text-gray-900">{formatWeight(selectedVariant.weight)}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )
        },
        {
            icon: <Diamond className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "JEWELLERY CARE",
            content: (
                <div className="text-sm text-gray-600 space-y-2 pb-4 leading-relaxed">
                    <p>Keep your pieces shining by avoiding direct contact with perfume and lotions.</p>
                    <p>Store them in the provided premium packaging when not wearing to prevent oxidation and scratching.</p>
                </div>
            )
        },
        {
            icon: <Truck className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "SHIPPING INFO",
            content: (
                <div className="text-sm text-gray-600 space-y-2 pb-4 leading-relaxed">
                    <p>Domestic orders are typically delivered within 3-5 business days.</p>
                    <p>International shipping usually resolves within 7-14 business days depending on customs.</p>
                </div>
            )
        },
        {
            icon: null,
            label: "RETURN / EXCHANGE POLICY",
            content: (
                <div className="text-sm text-gray-600 space-y-2 pb-4 leading-relaxed">
                    <p>We accept returns within 14 days of receipt in original condition and packaging.</p>
                    <p>Please contact our support for a seamless exchange process.</p>
                </div>
            )
        }
    ];

    return (
        <div className="w-full mt-6 mb-8 border-t border-gray-200">
            {accordionItems.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                    <div key={idx} className="border-b border-gray-200 relative">
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between py-5 text-left text-gray-900 focus:outline-none"
                        >
                            <div className="flex items-center gap-4 text-gray-700">
                                {item.icon ? (
                                    <div className="text-gray-500">{item.icon}</div>
                                ) : (
                                    <div className="w-[18px]" /> /* spacer if no icon */
                                )}
                                <span className="text-[13px] font-medium tracking-wide">{item.label}</span>
                            </div>
                            <div className="text-gray-400">
                                {isOpen ? <Minus className="w-[18px] h-[18px] stroke-[1]" /> : <Plus className="w-[18px] h-[18px] stroke-[1]" />}
                            </div>
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
                        >
                            <div className="pl-10 pr-2">
                                {item.content}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
