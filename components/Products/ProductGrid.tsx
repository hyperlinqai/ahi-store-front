import type { Product } from "@/types";
import ProductCard from "@/components/Home/ProductCard";
import { PackageSearch } from "lucide-react";

interface ProductGridProps {
    products: Product[];
    total: number;
}

export default function ProductGrid({ products, total }: ProductGridProps) {
    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <PackageSearch className="w-16 h-16 mb-4" strokeWidth={1} />
                <p className="text-lg font-medium text-gray-600">No products found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <div>
            <p className="text-sm text-gray-500 mb-4">
                Showing {products.length} of {total} products
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}
