import { X } from "lucide-react";
import type { ProductFilters } from "@/hooks/useProductFilters";

interface ActiveFiltersProps {
    filters: ProductFilters;
    onRemove: (key: string, value?: string) => void;
    onClearAll: () => void;
}

function formatPrice(price: string): string {
    return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function ActiveFilters({ filters, onRemove, onClearAll }: ActiveFiltersProps) {
    const chips: { label: string; key: string; value?: string }[] = [];

    if (filters.category) {
        chips.push({
            label: `Category: ${filters.category}`,
            key: "category",
        });
    }
    if (filters.minPrice || filters.maxPrice) {
        const min = filters.minPrice ? formatPrice(filters.minPrice) : "₹0";
        const max = filters.maxPrice ? formatPrice(filters.maxPrice) : "Any";
        chips.push({ label: `Price: ${min} – ${max}`, key: "minPrice" });
    }
    for (const brand of filters.brands) {
        chips.push({ label: `Brand: ${brand}`, key: "brand", value: brand });
    }
    if (filters.rating) {
        chips.push({ label: `${filters.rating}★ & up`, key: "rating" });
    }
    if (filters.inStock) {
        chips.push({ label: "In Stock Only", key: "inStock" });
    }

    if (chips.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {chips.map((chip, i) => (
                <button
                    key={`${chip.key}-${chip.value ?? i}`}
                    onClick={() => onRemove(chip.key, chip.value)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 text-orange-700 text-xs font-medium rounded-full hover:bg-orange-100 transition-colors"
                >
                    {chip.label}
                    <X className="w-3 h-3" />
                </button>
            ))}
            <button
                onClick={onClearAll}
                className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
                Clear All
            </button>
        </div>
    );
}
