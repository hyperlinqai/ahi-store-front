"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useRef, useEffect } from "react";

export interface ProductFilters {
    category: string;
    minPrice: string;
    maxPrice: string;
    brands: string[];
    rating: string;
    inStock: string;
    sort: string;
    page: string;
}

const DEFAULTS: ProductFilters = {
    category: "",
    minPrice: "",
    maxPrice: "",
    brands: [],
    rating: "",
    inStock: "",
    sort: "newest",
    page: "1",
};

export function useProductFilters() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const filters: ProductFilters = useMemo(() => ({
        category: searchParams.get("category") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        brands: searchParams.get("brand")?.split(",").filter(Boolean) || [],
        rating: searchParams.get("rating") || "",
        inStock: searchParams.get("inStock") || "",
        sort: searchParams.get("sort") || "newest",
        page: searchParams.get("page") || "1",
    }), [searchParams]);

    // Build URLSearchParams from filters, omitting defaults/empty values
    const buildParams = useCallback((updated: Partial<ProductFilters>) => {
        const merged = { ...filters, ...updated };
        const params = new URLSearchParams();

        if (merged.category) params.set("category", merged.category);
        if (merged.minPrice) params.set("minPrice", merged.minPrice);
        if (merged.maxPrice) params.set("maxPrice", merged.maxPrice);
        if (merged.brands.length) params.set("brand", merged.brands.join(","));
        if (merged.rating) params.set("rating", merged.rating);
        if (merged.inStock) params.set("inStock", merged.inStock);
        if (merged.sort && merged.sort !== "newest") params.set("sort", merged.sort);
        if (merged.page && merged.page !== "1") params.set("page", merged.page);

        return params;
    }, [filters]);

    const pushParams = useCallback(
        (updated: Partial<ProductFilters>) => {
            const params = buildParams(updated);
            const qs = params.toString();
            router.push(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
        },
        [buildParams, pathname, router]
    );

    // Setters — each resets page to 1 except setPage
    const setCategory = useCallback(
        (v: string) => pushParams({ category: v, page: "1" }),
        [pushParams]
    );

    const setPriceRange = useCallback(
        (min: string, max: string) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                pushParams({ minPrice: min, maxPrice: max, page: "1" });
            }, 400);
        },
        [pushParams]
    );

    const toggleBrand = useCallback(
        (brand: string) => {
            const next = filters.brands.includes(brand)
                ? filters.brands.filter((b) => b !== brand)
                : [...filters.brands, brand];
            pushParams({ brands: next, page: "1" });
        },
        [filters.brands, pushParams]
    );

    const setRating = useCallback(
        (v: string) => pushParams({ rating: v, page: "1" }),
        [pushParams]
    );

    const setInStock = useCallback(
        (v: boolean) => pushParams({ inStock: v ? "true" : "", page: "1" }),
        [pushParams]
    );

    const setSort = useCallback(
        (v: string) => pushParams({ sort: v, page: "1" }),
        [pushParams]
    );

    const setPage = useCallback(
        (v: number) => pushParams({ page: String(v) }),
        [pushParams]
    );

    const clearAll = useCallback(
        () => router.push(pathname, { scroll: false }),
        [pathname, router]
    );

    const removeFilter = useCallback(
        (key: string, value?: string) => {
            if (key === "brand" && value) {
                toggleBrand(value);
            } else if (key === "category") {
                setCategory("");
            } else if (key === "minPrice" || key === "maxPrice") {
                pushParams({ minPrice: "", maxPrice: "", page: "1" });
            } else if (key === "rating") {
                setRating("");
            } else if (key === "inStock") {
                setInStock(false);
            }
        },
        [toggleBrand, setCategory, pushParams, setRating, setInStock]
    );

    // Build API query params object
    const apiParams = useMemo(() => {
        const p: Record<string, string> = {
            page: filters.page,
            limit: "12",
            sort: filters.sort,
        };
        if (filters.category) p.category = filters.category;
        if (filters.minPrice) p.minPrice = filters.minPrice;
        if (filters.maxPrice) p.maxPrice = filters.maxPrice;
        if (filters.brands.length) p.brand = filters.brands.join(",");
        if (filters.rating) p.rating = filters.rating;
        if (filters.inStock) p.inStock = filters.inStock;
        return p;
    }, [filters]);

    // Has any active filter (excluding sort and page)
    const hasActiveFilters = useMemo(
        () =>
            !!(
                filters.category ||
                filters.minPrice ||
                filters.maxPrice ||
                filters.brands.length ||
                filters.rating ||
                filters.inStock
            ),
        [filters]
    );

    // Cleanup debounce on unmount
    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    return {
        filters,
        apiParams,
        hasActiveFilters,
        setCategory,
        setPriceRange,
        toggleBrand,
        setRating,
        setInStock,
        setSort,
        setPage,
        clearAll,
        removeFilter,
    };
}
