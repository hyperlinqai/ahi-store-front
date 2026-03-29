import type { Banner, Category, Product } from "@/types";
import HeroBannerSlider from "@/components/Home/HeroBannerSlider";
import FeaturedCategories from "@/components/Home/FeaturedCategories";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import PromoBanner from "@/components/Home/PromoBanner";
import NewArrivals from "@/components/Home/NewArrivals";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

type SectionData = Banner[] | Category[] | Product[] | Banner | null;

// Types
interface LayoutSection {
    id: string;
    type: string;
    title?: string;
    position?: string;
    categoryId?: string;
    data?: SectionData;
}

// Fetchers
async function fetchLayout(): Promise<LayoutSection[]> {
    try {
        const res = await fetch(`${API_BASE}/settings/home-layout`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return json.data || [];
    } catch {
        return [];
    }
}

async function fetchBanners(position: string): Promise<Banner[]> {
    try {
        const res = await fetch(`${API_BASE}/banners?position=${encodeURIComponent(position)}`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data as Banner[]) || [];
    } catch {
        return [];
    }
}

async function fetchFeaturedProducts(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_BASE}/products?isFeatured=true`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data as Product[]) || [];
    } catch {
        return [];
    }
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

async function fetchNewArrivals(): Promise<Product[]> {
    try {
        const res = await fetch(`${API_BASE}/products?sort=newest&limit=8`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data as Product[]) || [];
    } catch {
        return [];
    }
}

async function fetchCategoryProducts(categoryId: string): Promise<Product[]> {
    try {
        const res = await fetch(`${API_BASE}/products?categoryId=${categoryId}&limit=8`, { next: { revalidate: 60 } });
        if (!res.ok) return [];
        const json = await res.json();
        return (json.data as Product[]) || [];
    } catch {
        return [];
    }
}

// Page Component
export default async function Home() {
    // 1. Fetch layout structure
    let layout = await fetchLayout();
    
    // Fallback if layout comes back empty/failed
    if (!layout || layout.length === 0) {
        layout = [
            { id: "default-1", type: "HERO_BANNER" },
            { id: "default-2", type: "FEATURED_CATEGORIES", title: "Shop by Category" },
            { id: "default-3", type: "FEATURED_PRODUCTS", title: "Featured Products" },
            { id: "default-4", type: "PROMO_BANNER", position: "PROMO" },
            { id: "default-5", type: "NEW_ARRIVALS", title: "New Arrivals" }
        ];
    }

    // 2. Pre-fetch common resources we know we'll likely need, or fetch individually
    // For maximum flexibility, we map each section to its required data fetch
    const sectionPromises = layout.map(async (section) => {
        switch (section.type) {
            case "HERO_BANNER":
                return { ...section, data: await fetchBanners("HERO") };
            case "FEATURED_CATEGORIES":
                return { ...section, data: await fetchCategories() };
            case "FEATURED_PRODUCTS":
                return { ...section, data: await fetchFeaturedProducts() };
            case "NEW_ARRIVALS":
                return { ...section, data: await fetchNewArrivals() };
            case "PROMO_BANNER":
                const promoBanners = await fetchBanners(section.position || "PROMO");
                // The current PromoBanner design uses a single banner. Grab the first active one.
                return { ...section, data: promoBanners[0] || null };
            case "CATEGORY_PRODUCTS":
                if (!section.categoryId) return { ...section, data: [] };
                return { ...section, data: await fetchCategoryProducts(section.categoryId) };
            default:
                return section;
        }
    });

    // Resolve all data requirements for the layout
    const resolvedSections = await Promise.all(sectionPromises);

    return (
        <div className="flex flex-col">
            {resolvedSections.map((section) => {
                switch (section.type) {
                    case "HERO_BANNER":
                        return <HeroBannerSlider key={section.id} banners={(section.data as Banner[]) ?? []} />;
                        
                    case "FEATURED_CATEGORIES":
                        return <FeaturedCategories key={section.id} categories={(section.data as Category[]) ?? []} />;
                        
                    case "FEATURED_PRODUCTS":
                        return <FeaturedProducts key={section.id} products={(section.data as Product[]) ?? []} title={section.title} />;
                        
                    case "NEW_ARRIVALS":
                        return <NewArrivals key={section.id} products={(section.data as Product[]) ?? []} />;
                        
                    case "PROMO_BANNER":
                        return <PromoBanner key={section.id} banner={(section.data as Banner | null) ?? undefined} />;
                        
                    case "CATEGORY_PRODUCTS":
                        if (!section.data || (section.data as Product[]).length === 0) return null;
                        return (
                            <FeaturedProducts 
                                key={section.id} 
                                products={(section.data as Product[]) ?? []} 
                                title={section.title || "Category Collection"} 
                                subtitle="Specially curated pieces" 
                            />
                        );
                        
                    default:
                        return null;
                }
            })}
        </div>
    );
}
