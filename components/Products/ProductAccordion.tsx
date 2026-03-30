"use client";

import { useState } from "react";
import { Info, FileText, Diamond, Truck, RefreshCw, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";

interface ProductAccordionProps {
    product: Product;
}

export default function ProductAccordion({ product }: ProductAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

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
                            {selectedVariant?.name && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">{selectedVariant.name}</td>
                                    <td className="py-2 text-gray-900">{selectedVariant.value}</td>
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
                <div className="text-sm text-gray-600 pb-4 leading-relaxed">
                    <p className="mb-3">At AHI, every piece is thoughtfully handcrafted and designed to be cherished. With the right care, your jewellery will retain its beauty for years to come.</p>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Always wear your jewellery last while getting ready. Avoid contact with cosmetics, perfumes, and hairsprays.</li>
                        <li>Store your pieces in a cool, dry place away from moisture, humidity, and extreme temperatures.</li>
                        <li>Keep your jewellery in the pouch to protect it from scratches and preserve its shine.</li>
                        <li>Avoid direct contact with water and remove jewellery before bathing or swimming.</li>
                        <li>Gently wipe your jewellery with a soft cloth after each use to maintain its finish.</li>
                    </ol>
                </div>
            )
        },
        {
            icon: <Truck className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "SHIPPING INFO",
            content: (
                <div className="text-sm text-gray-600 space-y-3 pb-4 leading-relaxed">
                    <p>The product will be dispatched within 5 to 7 business days. This product is not applicable for return, only exchange.</p>
                    <p>Please note that during festivals, holidays, or unexpected delays, delivery times may be longer than usual. We appreciate your understanding and will do our best to ensure your order arrives as quickly as possible.</p>
                </div>
            )
        },
        {
            icon: <RefreshCw className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "RETURN AND EXCHANGE",
            content: (
                <div className="text-sm text-gray-600 space-y-3 pb-4 leading-relaxed">
                    <p>This product is eligible for exchange only and is not applicable for return.</p>
                    <p>Since our products are handcrafted, it might have slight irregularities which only adds to its beauty. Due to different display screens of various devices, the product lighting may differ resulting in a slight variation in color.</p>
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
