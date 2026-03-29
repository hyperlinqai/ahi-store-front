"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronDown, Star } from "lucide-react";
import type { Category } from "@/types";

interface FilterSidebarProps {
    categories: Category[];
    brands: string[];
    showCategories?: boolean;
    // Current filter values
    selectedCategory: string;
    minPrice: string;
    maxPrice: string;
    selectedBrands: string[];
    selectedRating: string;
    inStock: string;
    // Handlers
    onCategoryChange: (slug: string) => void;
    onPriceChange: (min: string, max: string) => void;
    onBrandToggle: (brand: string) => void;
    onRatingChange: (rating: string) => void;
    onInStockChange: (v: boolean) => void;
}

// ─── Category Tree ───────────────────────────────────────────
function CategoryTree({
    categories,
    selected,
    onChange,
    depth = 0,
}: {
    categories: Category[];
    selected: string;
    onChange: (slug: string) => void;
    depth?: number;
}) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    return (
        <ul className={depth > 0 ? "ml-4 mt-1" : ""}>
            {categories.map((cat) => {
                const hasChildren = cat.children && cat.children.length > 0;
                const isExpanded = expanded[cat.id];
                const isSelected = selected === cat.slug;

                return (
                    <li key={cat.id}>
                        <div className="flex items-center gap-1">
                            {hasChildren && (
                                <button
                                    onClick={() =>
                                        setExpanded((prev) => ({
                                            ...prev,
                                            [cat.id]: !prev[cat.id],
                                        }))
                                    }
                                    className="p-0.5 text-gray-400 hover:text-gray-600"
                                >
                                    <ChevronDown
                                        className={`w-3.5 h-3.5 transition-transform ${
                                            isExpanded ? "" : "-rotate-90"
                                        }`}
                                    />
                                </button>
                            )}
                            {!hasChildren && <span className="w-[18px]" />}
                            <button
                                onClick={() => onChange(isSelected ? "" : cat.slug)}
                                className={`text-sm py-1 transition-colors text-left ${
                                    isSelected
                                        ? "text-orange-600 font-semibold"
                                        : "text-gray-700 hover:text-gray-900"
                                }`}
                            >
                                {cat.name}
                            </button>
                        </div>
                        {hasChildren && isExpanded && (
                            <CategoryTree
                                categories={cat.children!}
                                selected={selected}
                                onChange={onChange}
                                depth={depth + 1}
                            />
                        )}
                    </li>
                );
            })}
        </ul>
    );
}

// ─── Price Range Slider ──────────────────────────────────────
function PriceRangeSlider({
    min,
    max,
    onChange,
}: {
    min: string;
    max: string;
    onChange: (min: string, max: string) => void;
}) {
    const PRICE_MIN = 0;
    const PRICE_MAX = 100000;
    const STEP = 500;

    const [localMin, setLocalMin] = useState(min ? Number(min) : PRICE_MIN);
    const [localMax, setLocalMax] = useState(max ? Number(max) : PRICE_MAX);

    // Sync from URL params when they change externally
    useEffect(() => {
        setLocalMin(min ? Number(min) : PRICE_MIN);
        setLocalMax(max ? Number(max) : PRICE_MAX);
    }, [min, max]);

    const handleMinChange = useCallback(
        (val: number) => {
            const clamped = Math.min(val, localMax - STEP);
            setLocalMin(clamped);
            onChange(
                clamped > PRICE_MIN ? String(clamped) : "",
                localMax < PRICE_MAX ? String(localMax) : ""
            );
        },
        [localMax, onChange]
    );

    const handleMaxChange = useCallback(
        (val: number) => {
            const clamped = Math.max(val, localMin + STEP);
            setLocalMax(clamped);
            onChange(
                localMin > PRICE_MIN ? String(localMin) : "",
                clamped < PRICE_MAX ? String(clamped) : ""
            );
        },
        [localMin, onChange]
    );

    const formatINR = (v: number) => `₹${v.toLocaleString("en-IN")}`;

    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatINR(localMin)}</span>
                <span>{formatINR(localMax)}</span>
            </div>
            <div className="relative h-2">
                {/* Track */}
                <div className="absolute inset-0 rounded-full bg-gray-200" />
                {/* Active range */}
                <div
                    className="absolute top-0 h-full rounded-full bg-orange-400"
                    style={{
                        left: `${((localMin - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                        right: `${100 - ((localMax - PRICE_MIN) / (PRICE_MAX - PRICE_MIN)) * 100}%`,
                    }}
                />
                {/* Min thumb */}
                <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={STEP}
                    value={localMin}
                    onChange={(e) => handleMinChange(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orange-500 [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                />
                {/* Max thumb */}
                <input
                    type="range"
                    min={PRICE_MIN}
                    max={PRICE_MAX}
                    step={STEP}
                    value={localMax}
                    onChange={(e) => handleMaxChange(Number(e.target.value))}
                    className="absolute inset-0 w-full appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-orange-500 [&::-webkit-slider-thumb]:shadow-sm [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-orange-500 [&::-moz-range-thumb]:shadow-sm [&::-moz-range-thumb]:cursor-pointer"
                />
            </div>
        </div>
    );
}

// ─── Main FilterSidebar ──────────────────────────────────────
export default function FilterSidebar({
    categories,
    brands,
    showCategories = true,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedBrands,
    selectedRating,
    inStock,
    onCategoryChange,
    onPriceChange,
    onBrandToggle,
    onRatingChange,
    onInStockChange,
}: FilterSidebarProps) {
    return (
        <aside className="space-y-6">
            {showCategories && (
                <>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                            Categories
                        </h3>
                        <CategoryTree
                            categories={categories}
                            selected={selectedCategory}
                            onChange={onCategoryChange}
                        />
                    </div>

                    <hr className="border-gray-100" />
                </>
            )}

            {/* Price Range */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    Price Range
                </h3>
                <PriceRangeSlider
                    min={minPrice}
                    max={maxPrice}
                    onChange={onPriceChange}
                />
            </div>

            <hr className="border-gray-100" />

            {/* Brands */}
            {brands.length > 0 && (
                <>
                    <div>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                            Brand
                        </h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {brands.map((brand) => (
                                <label
                                    key={brand}
                                    className="flex items-center gap-2.5 cursor-pointer group"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => onBrandToggle(brand)}
                                        className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                                    />
                                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <hr className="border-gray-100" />
                </>
            )}

            {/* Rating */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3">
                    Rating
                </h3>
                <div className="space-y-1.5">
                    {[4, 3, 2, 1].map((r) => (
                        <button
                            key={r}
                            onClick={() =>
                                onRatingChange(selectedRating === String(r) ? "" : String(r))
                            }
                            className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg text-sm transition-colors ${
                                selectedRating === String(r)
                                    ? "bg-orange-50 text-orange-700"
                                    : "text-gray-600 hover:bg-gray-50"
                            }`}
                        >
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-3.5 h-3.5 ${
                                            i < r
                                                ? "fill-orange-400 text-orange-400"
                                                : "fill-gray-200 text-gray-200"
                                        }`}
                                    />
                                ))}
                            </div>
                            <span>& up</span>
                        </button>
                    ))}
                </div>
            </div>

            <hr className="border-gray-100" />

            {/* In Stock Toggle */}
            <div>
                <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm font-bold text-gray-900 uppercase tracking-wide">
                        In Stock Only
                    </span>
                    <button
                        role="switch"
                        aria-checked={inStock === "true"}
                        onClick={() => onInStockChange(inStock !== "true")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            inStock === "true" ? "bg-orange-500" : "bg-gray-200"
                        }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                                inStock === "true" ? "translate-x-6" : "translate-x-1"
                            }`}
                        />
                    </button>
                </label>
            </div>
        </aside>
    );
}
