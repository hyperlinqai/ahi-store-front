"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SlidersHorizontal } from "lucide-react";
import api from "@/lib/axios";
import type { Product, Category } from "@/types";
import { useProductFilters } from "@/hooks/useProductFilters";
import FilterSidebar from "@/components/Products/FilterSidebar";
import MobileFilterDrawer from "@/components/Products/MobileFilterDrawer";
import ActiveFilters from "@/components/Products/ActiveFilters";
import SortDropdown from "@/components/Products/SortDropdown";
import ProductGrid from "@/components/Products/ProductGrid";
import ProductSkeleton from "@/components/Products/ProductSkeleton";
import Pagination from "@/components/Products/Pagination";

interface ProductsResponse {
    data: Product[];
    meta: {
        page: number;
        limit: number;
        totalCount: number;
        totalPages: number;
    };
}

interface ProductsPageProps {
    eyebrow?: string;
    title?: string;
    description?: string;
    extraApiParams?: Record<string, string>;
    lockedCategory?: string;
    hideCategoryFilter?: boolean;
}

export default function ProductsPage({
    eyebrow = "Collection",
    title = "All Products",
    description = "Discover our exquisite collection of fine jewellery",
    extraApiParams,
    lockedCategory,
    hideCategoryFilter = false,
}: ProductsPageProps) {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const {
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
    } = useProductFilters();

    const selectedCategory = lockedCategory || filters.category;

    const requestParams: Record<string, string> = {
        ...apiParams,
        ...(extraApiParams || {}),
    };

    if (selectedCategory) {
        requestParams.category = selectedCategory;
    }

    // Fetch products
    const { data: productsData, isLoading } = useQuery<ProductsResponse>({
        queryKey: ["products", requestParams],
        queryFn: async () => {
            const res = await api.get("/products", { params: requestParams });
            return res.data;
        },
    });

    // Fetch categories for filter sidebar
    const { data: categoriesData } = useQuery<{ data: Category[] }>({
        queryKey: ["categories"],
        queryFn: async () => {
            const res = await api.get("/categories");
            return res.data;
        },
        staleTime: 5 * 60 * 1000, // 5 min
    });

    // Fetch distinct brands for filter sidebar
    const { data: brandsData } = useQuery<{ data: string[] }>({
        queryKey: ["product-brands"],
        queryFn: async () => {
            const res = await api.get("/products/brands");
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const products = productsData?.data || [];
    const pagination = productsData?.meta || { page: 1, limit: 12, totalCount: 0, totalPages: 1 };
    const categories = categoriesData?.data || [];
    const brands = brandsData?.data || [];

    const sidebarContent = (
        <FilterSidebar
            categories={categories}
            brands={brands}
            showCategories={!hideCategoryFilter}
            selectedCategory={selectedCategory}
            minPrice={filters.minPrice}
            maxPrice={filters.maxPrice}
            selectedBrands={filters.brands}
            selectedRating={filters.rating}
            inStock={filters.inStock}
            onCategoryChange={setCategory}
            onPriceChange={setPriceRange}
            onBrandToggle={toggleBrand}
            onRatingChange={setRating}
            onInStockChange={setInStock}
        />
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
                <p className="text-sm text-orange-500 font-semibold uppercase tracking-[0.25em] mb-2">
                    {eyebrow}
                </p>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-sm text-gray-500 mt-1">
                    {description}
                </p>
            </div>

            <div className="flex gap-8">
                {/* Desktop Sidebar */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-28">{sidebarContent}</div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                    {/* Toolbar: mobile filter button + active filters + sort */}
                    <div className="flex items-center justify-between gap-4 mb-4">
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="lg:hidden flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-300 transition-colors"
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            {hasActiveFilters && (
                                <span className="flex items-center justify-center w-5 h-5 bg-orange-500 text-white text-[10px] font-bold rounded-full">
                                    !
                                </span>
                            )}
                        </button>
                        <div className="hidden lg:block" />
                        <SortDropdown value={filters.sort} onChange={setSort} />
                    </div>

                    {/* Active Filter Chips */}
                    {hasActiveFilters && (
                        <ActiveFilters
                            filters={{
                                ...filters,
                                category: hideCategoryFilter ? "" : filters.category,
                            }}
                            onRemove={removeFilter}
                            onClearAll={clearAll}
                        />
                    )}

                    {/* Product Grid or Skeleton */}
                    {isLoading ? (
                        <ProductSkeleton />
                    ) : (
                        <ProductGrid products={products} total={pagination.totalCount} />
                    )}

                    {/* Pagination */}
                    {!isLoading && (
                        <Pagination
                            currentPage={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={setPage}
                        />
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <MobileFilterDrawer
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                onClearAll={clearAll}
            >
                {sidebarContent}
            </MobileFilterDrawer>
        </div>
    );
}
