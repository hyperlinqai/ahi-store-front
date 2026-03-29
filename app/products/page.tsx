import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsPage from "./ProductsPage";

export const metadata: Metadata = {
    title: "Shop All Products | Ahi Jewellery",
    description:
        "Browse our complete collection of fine jewellery. Filter by category, price, brand, and more.",
};

export default function ProductsRoute() {
    return (
        <Suspense>
            <ProductsPage />
        </Suspense>
    );
}
