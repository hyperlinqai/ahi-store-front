import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductsPage from "@/app/products/ProductsPage";
import type { Category } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

interface PageProps {
    params: Promise<{ slug: string }>;
}

const COLLECTION_CONFIG: Record<
    string,
    {
        eyebrow: string;
        title: string;
        description: string;
        extraApiParams?: Record<string, string>;
        hideCategoryFilter?: boolean;
    }
> = {
    all: {
        eyebrow: "Collection",
        title: "All Collections",
        description: "Browse every signature piece across our jewellery edit.",
    },
    new: {
        eyebrow: "Just In",
        title: "New Arrivals",
        description: "Freshly added styles and the latest drops from Ahi Jewellery.",
        extraApiParams: { sort: "newest" },
    },
    featured: {
        eyebrow: "Handpicked",
        title: "Featured Collection",
        description: "Our standout pieces, curated to highlight the best of the house.",
        extraApiParams: { isFeatured: "true" },
    },
    sale: {
        eyebrow: "Curated Edit",
        title: "Seasonal Spotlight",
        description: "A featured mix of giftable, statement, and everyday favourites.",
    },
};

function flattenCategories(categories: Category[]): Category[] {
    return categories.flatMap((category) => [
        category,
        ...(category.children ? flattenCategories(category.children) : []),
    ]);
}

async function fetchCategories(): Promise<Category[]> {
    try {
        const res = await fetch(`${API_BASE}/categories`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data as Category[]) || [];
    } catch {
        return [];
    }
}

async function resolveCollection(slug: string) {
    const collection = COLLECTION_CONFIG[slug];
    if (collection) {
        return { ...collection, lockedCategory: undefined as string | undefined };
    }

    const categories = await fetchCategories();
    const category = flattenCategories(categories).find((item) => item.slug === slug);

    if (!category) {
        return null;
    }

    return {
        eyebrow: "Category",
        title: category.name,
        description:
            category.description || `Discover our ${category.name.toLowerCase()} collection.`,
        lockedCategory: category.slug,
        hideCategoryFilter: true,
        extraApiParams: undefined as Record<string, string> | undefined,
    };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const collection = await resolveCollection(slug);

    if (!collection) {
        return {
            title: "Collection Not Found | Ahi Jewellery",
        };
    }

    return {
        title: `${collection.title} | Ahi Jewellery`,
        description: collection.description,
    };
}

export default async function CollectionPage({ params }: PageProps) {
    const { slug } = await params;
    const collection = await resolveCollection(slug);

    if (!collection) {
        notFound();
    }

    return (
        <Suspense>
            <ProductsPage
                eyebrow={collection.eyebrow}
                title={collection.title}
                description={collection.description}
                extraApiParams={collection.extraApiParams}
                lockedCategory={collection.lockedCategory}
                hideCategoryFilter={collection.hideCategoryFilter}
            />
        </Suspense>
    );
}
