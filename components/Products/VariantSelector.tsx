"use client";

import type { ProductVariant } from "@/types";

interface VariantSelectorProps {
    variants: ProductVariant[];
    selectedId: string | null;
    onSelect: (variant: ProductVariant) => void;
}

// Extract unique values for a given attribute
function getUniqueValues(
    variants: ProductVariant[],
    key: "size" | "color" | "material"
): string[] {
    const values = new Set<string>();
    for (const v of variants) {
        const val = v[key];
        if (val) values.add(val);
    }
    return Array.from(values);
}

export default function VariantSelector({
    variants,
    selectedId,
    onSelect,
}: VariantSelectorProps) {
    if (variants.length <= 1) return null;

    const sizes = getUniqueValues(variants, "size");
    const colors = getUniqueValues(variants, "color");
    const materials = getUniqueValues(variants, "material");

    const selected = variants.find((v) => v.id === selectedId) ?? null;

    function renderGroup(label: string, values: string[], attrKey: "size" | "color" | "material") {
        if (values.length === 0) return null;

        return (
            <div className="mb-5">
                <p className="text-sm font-semibold text-gray-900 mb-2.5">
                    {label}
                    {selected?.[attrKey] && (
                        <span className="font-normal text-gray-500 ml-1.5">
                            — {selected[attrKey]}
                        </span>
                    )}
                </p>
                <div className="flex flex-wrap gap-2">
                    {values.map((val) => {
                        // Find the variant matching this value (prefer one that also matches other selected attrs)
                        const matchingVariant = variants.find((v) => {
                            if (v[attrKey] !== val) return false;
                            // If other attrs are selected, try to match them
                            if (attrKey !== "size" && selected?.size && v.size !== selected.size)
                                return false;
                            if (attrKey !== "color" && selected?.color && v.color !== selected.color)
                                return false;
                            if (
                                attrKey !== "material" &&
                                selected?.material &&
                                v.material !== selected.material
                            )
                                return false;
                            return true;
                        }) ?? variants.find((v) => v[attrKey] === val);

                        const outOfStock = matchingVariant ? matchingVariant.stock <= 0 : true;
                        const isActive = selected?.[attrKey] === val;

                        if (attrKey === "color") {
                            return (
                                <button
                                    key={val}
                                    onClick={() => matchingVariant && onSelect(matchingVariant)}
                                    disabled={outOfStock}
                                    title={`${val}${outOfStock ? " (Out of Stock)" : ""}`}
                                    className={`relative px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                        outOfStock
                                            ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                                            : isActive
                                            ? "border-orange-500 bg-orange-50 text-orange-700"
                                            : "border-gray-200 text-gray-700 hover:border-gray-400"
                                    }`}
                                >
                                    {val}
                                </button>
                            );
                        }

                        return (
                            <button
                                key={val}
                                onClick={() => matchingVariant && onSelect(matchingVariant)}
                                disabled={outOfStock}
                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                                    outOfStock
                                        ? "border-gray-200 text-gray-300 cursor-not-allowed line-through"
                                        : isActive
                                        ? "border-orange-500 bg-orange-50 text-orange-700"
                                        : "border-gray-200 text-gray-700 hover:border-gray-400"
                                }`}
                            >
                                {val}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    return (
        <div>
            {renderGroup("Size", sizes, "size")}
            {renderGroup("Color", colors, "color")}
            {renderGroup("Material", materials, "material")}
        </div>
    );
}
