import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types";

// Used when API returns no categories
const FALLBACK_CATEGORIES: Category[] = [
    {
        id: "1",
        name: "Rings",
        slug: "rings",
        imageUrl:
            "https://images.unsplash.com/photo-1605100804763-247f66154ce5?auto=format&fit=crop&q=80&w=800",
        description: "Engagement, wedding & fashion rings",
    },
    {
        id: "2",
        name: "Necklaces",
        slug: "necklaces",
        imageUrl:
            "https://images.unsplash.com/photo-1599643478524-fb66fa5320e5?auto=format&fit=crop&q=80&w=800",
        description: "Pendants, chains & statement pieces",
    },
    {
        id: "3",
        name: "Earrings",
        slug: "earrings",
        imageUrl:
            "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
        description: "Studs, drops & chandeliers",
    },
    {
        id: "4",
        name: "Bracelets",
        slug: "bracelets",
        imageUrl:
            "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=800",
        description: "Bangles, cuffs & tennis bracelets",
    },
];

interface FeaturedCategoriesProps {
    categories: Category[];
}

export default function FeaturedCategories({ categories }: FeaturedCategoriesProps) {
    const items = categories.length > 0 ? categories.slice(0, 6) : FALLBACK_CATEGORIES;

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <p className="text-sm text-orange-500 font-semibold uppercase tracking-[0.25em] mb-2">
                        Collections
                    </p>
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Shop by Category
                    </h2>
                    <p className="mt-3 text-base text-gray-500 max-w-md mx-auto">
                        Explore our curated collections of premium jewellery pieces.
                    </p>
                </div>

                {/* Category Grid */}
                {items.length === 1 ? (
                    // Single category — full width
                    <CategoryCard category={items[0]} tall />
                ) : items.length <= 3 ? (
                    // 2-3 categories — equal columns
                    <div className={`grid gap-4 grid-cols-1 ${items.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"}`}>
                        {items.map((cat) => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                ) : (
                    // 4+ categories — editorial hero grid
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {/* First card spans 2 rows on md+ */}
                        <div className="col-span-2 row-span-2 md:col-span-2 md:row-span-2">
                            <CategoryCard category={items[0]} tall className="h-full min-h-[320px] md:min-h-[540px]" />
                        </div>
                        {/* Remaining cards */}
                        {items.slice(1, 5).map((cat) => (
                            <div key={cat.id}>
                                <CategoryCard category={cat} className="h-[200px] md:h-[260px]" />
                            </div>
                        ))}
                    </div>
                )}

                {/* View All Link */}
                <div className="text-center mt-10">
                    <Link
                        href="/collections/all"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 rounded-full px-7 py-3 hover:border-orange-500 hover:text-orange-500 transition-colors"
                    >
                        View All Categories
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}

// ----------------------------------------
// Category Card Sub-component
// ----------------------------------------
function CategoryCard({
    category,
    tall = false,
    className = "",
}: {
    category: Category;
    tall?: boolean;
    className?: string;
}) {
    return (
        <Link
            href={`/collections/${category.slug}`}
            className={`group relative rounded-2xl overflow-hidden cursor-pointer block ${
                tall && !className ? "h-[320px] md:h-full" : ""
            } ${className}`}
            style={!className && !tall ? { height: "260px" } : undefined}
        >
            {/* Background Image */}
            {category.imageUrl ? (
                <Image
                    src={category.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50" />
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent group-hover:from-gray-900/90 transition-all duration-500" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="text-xl font-bold text-white mb-1">{category.name}</h3>
                {category.description && (
                    <p className="text-gray-300 text-xs mb-2 line-clamp-1 hidden md:block">
                        {category.description}
                    </p>
                )}
                <span className="inline-flex items-center gap-1.5 text-orange-400 font-medium text-sm group-hover:gap-3 transition-all duration-300">
                    Explore
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </span>
            </div>
        </Link>
    );
}
