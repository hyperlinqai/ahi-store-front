"use client";

import { useState, useEffect } from "react";
import { Info, FileText, Diamond, Truck, RefreshCw, Plus, Minus } from "lucide-react";
import type { Product } from "@/types";

interface ProductAccordionProps {
    product: Product;
}

interface StorePolicies {
    jewelleryCare: string;
    shippingInfo: string;
    returnExchange: string;
    disclaimer: string;
}

const defaultCareHtml = `<p>At AHI, every piece is thoughtfully handcrafted and designed to be cherished. With the right care, your jewellery will retain its beauty for years to come.</p><ol><li>Always wear your jewellery last while getting ready. Avoid contact with cosmetics, perfumes, and hairsprays.</li><li>Store your pieces in a cool, dry place away from moisture, humidity, and extreme temperatures.</li><li>Keep your jewellery in the pouch to protect it from scratches and preserve its shine.</li><li>Avoid direct contact with water and remove jewellery before bathing or swimming.</li><li>Gently wipe your jewellery with a soft cloth after each use to maintain its finish.</li></ol>`;

const defaultShippingHtml = `<p>The product will be dispatched within 5 to 7 business days. This product is not applicable for return, only exchange.</p><p>Please note that during festivals, holidays, or unexpected delays, delivery times may be longer than usual. We appreciate your understanding and will do our best to ensure your order arrives as quickly as possible.</p>`;

const defaultReturnHtml = `<p>This product is eligible for exchange only and is not applicable for return.</p><p>Since our products are handcrafted, it might have slight irregularities which only adds to its beauty. Due to different display screens of various devices, the product lighting may differ resulting in a slight variation in color.</p>`;

export default function ProductAccordion({ product }: ProductAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [globalPolicies, setGlobalPolicies] = useState<StorePolicies | null>(null);

    const selectedVariant = product.variants[0];

    // Fetch global policies as fallback
    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";
        fetch(`${apiUrl}/settings/policies`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.data) {
                    setGlobalPolicies(data.data);
                }
            })
            .catch(() => {});
    }, []);

    // Resolve content: per-product > global setting > hardcoded default
    const careContent = product.careInstructions || globalPolicies?.jewelleryCare || "";
    const shippingContent = product.shippingInfo || globalPolicies?.shippingInfo || "";
    const returnContent = product.returnPolicy || globalPolicies?.returnExchange || "";

    // Check if content is HTML (from TipTap editor) or plain text
    const isHtml = (str: string) => /<[a-z][\s\S]*>/i.test(str);

    // Render content: if HTML render as HTML, if plain text render line-by-line, if empty use default
    const renderContent = (content: string, defaultHtml: string) => {
        if (!content) {
            return <div className="prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: defaultHtml }} />;
        }
        if (isHtml(content)) {
            return <div className="prose prose-sm prose-gray max-w-none" dangerouslySetInnerHTML={{ __html: content }} />;
        }
        // Plain text: render each line as a paragraph
        return (
            <div className="space-y-2">
                {content.split("\n").filter(Boolean).map((line, i) => (
                    <p key={i} className="text-sm text-gray-600">{line}</p>
                ))}
            </div>
        );
    };

    // Format weight for display
    const formatWeight = (weight: number | null | undefined) => {
        if (!weight) return null;
        if (weight >= 1000) return `${(weight / 1000).toFixed(2)} kg`;
        return `${weight} g`;
    };

    const formatDimension = (value: number | null | undefined) => {
        if (!value) return null;
        return `${value} cm`;
    };

    const featuresList = product.features
        ? product.features.split(",").map((f) => f.trim()).filter(Boolean)
        : [];

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
                            {product.material && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Material</td>
                                    <td className="py-2 text-gray-900">{product.material}</td>
                                </tr>
                            )}
                            {(product.length || product.width || product.height) && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Dimensions</td>
                                    <td className="py-2 text-gray-900">
                                        {[
                                            formatDimension(product.length),
                                            formatDimension(product.width),
                                            formatDimension(product.height),
                                        ].filter(Boolean).join(" x ")}
                                    </td>
                                </tr>
                            )}
                            {product.weight && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Weight</td>
                                    <td className="py-2 text-gray-900">{formatWeight(product.weight)}</td>
                                </tr>
                            )}
                            {featuresList.length > 0 && (
                                <tr>
                                    <td className="py-2 text-gray-500 font-medium">Features</td>
                                    <td className="py-2 text-gray-900">{featuresList.join(", ")}</td>
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
                    {renderContent(careContent, defaultCareHtml)}
                </div>
            )
        },
        {
            icon: <Truck className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "SHIPPING INFO",
            content: (
                <div className="text-sm text-gray-600 pb-4 leading-relaxed">
                    {renderContent(shippingContent, defaultShippingHtml)}
                </div>
            )
        },
        {
            icon: <RefreshCw className="w-[18px] h-[18px] stroke-[1.5]" />,
            label: "RETURN AND EXCHANGE",
            content: (
                <div className="text-sm text-gray-600 pb-4 leading-relaxed">
                    {renderContent(returnContent, defaultReturnHtml)}
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
                                    <div className="w-[18px]" />
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
