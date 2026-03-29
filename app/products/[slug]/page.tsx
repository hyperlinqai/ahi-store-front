import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Product } from "@/types";
import ProductDetailPage from "./ProductDetailPage";

const API_BASE =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

async function fetchProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(`${API_BASE}/products/by-slug/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const json = await res.json();
        return (json.data as Product) || null;
    } catch {
        return null;
    }
}

// ─── SEO Metadata ────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: { slug: string };
}): Promise<Metadata> {
    const product = await fetchProduct(params.slug);
    if (!product) {
        return { title: "Product Not Found | Ahi Jewellery" };
    }

    const price = `₹${product.price.toLocaleString("en-IN")}`;
    const image = product.images[0]?.url;
    const description =
        product.description?.replace(/<[^>]*>/g, "").slice(0, 160) ||
        `Shop ${product.title} at Ahi Jewellery. ${price}`;

    return {
        title: `${product.title} | Ahi Jewellery`,
        description,
        openGraph: {
            title: product.title,
            description,
            type: "website",
            ...(image && { images: [{ url: image, width: 800, height: 800, alt: product.title }] }),
        },
        twitter: {
            card: "summary_large_image",
            title: product.title,
            description,
            ...(image && { images: [image] }),
        },
    };
}

// ─── Page Component (SSR) ────────────────────────────────────
export default async function ProductPage({
    params,
}: {
    params: { slug: string };
}) {
    const product = await fetchProduct(params.slug);
    if (!product) notFound();

    return <ProductDetailPage product={product} />;
}
