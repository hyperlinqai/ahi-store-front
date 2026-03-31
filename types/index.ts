// ==========================================
// AUTH TYPES
// ==========================================

export interface User {
    id: string;
    email: string;
    name: string | null;
    role: "USER" | "ADMIN";
}

export interface AuthResponse {
    success: boolean;
    data: {
        user: User;
        accessToken: string;
        refreshToken: string;
    };
}

// ==========================================
// BANNER TYPES
// ==========================================

export interface Banner {
    id: string;
    title: string;
    subtitle?: string | null;
    ctaText?: string | null;
    ctaLink?: string | null;
    imageUrl: string;
    publicId?: string;
    position: string;
    isActive: boolean;
    sortOrder: number;
    startDate?: string | null;
    endDate?: string | null;
}

// ==========================================
// PRODUCT TYPES
// ==========================================

export interface ProductImage {
    id: string;
    url: string;
    altText?: string | null;
    sortOrder?: number;
}

export interface ProductVariant {
    id: string;
    name: string;
    value: string;
    sku: string;
    price: number;
    compareAtPrice?: number | null;
    stock: number;
    lowStockAlert?: number;
    color?: string | null;
    material?: string | null;
    size?: string | null;
    weight?: number | null;
}

export interface Product {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    price: number;
    compareAtPrice?: number | null;
    brand?: string | null;
    isFeatured?: boolean;
    weight?: number | null;
    length?: number | null;
    width?: number | null;
    height?: number | null;
    material?: string | null;
    features?: string | null;
    careInstructions?: string | null;
    shippingInfo?: string | null;
    returnPolicy?: string | null;
    images: ProductImage[];
    category?: { name: string; slug: string } | null;
    variants: ProductVariant[];
    avgRating: number;
    reviewCount: number;
    createdAt?: string;
}

// ==========================================
// CATEGORY TYPES
// ==========================================

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    imageUrl?: string | null;
    sortOrder?: number;
    children?: Category[];
    parent?: Category | null;
}

// ==========================================
// REVIEW TYPES
// ==========================================

export interface Review {
    id: string;
    rating: number;
    title?: string | null;
    comment: string;
    userName: string;
    isVerifiedPurchase?: boolean;
    createdAt: string;
}

export interface ReviewsResponse {
    data: Review[];
    summary: {
        avgRating: number;
        totalReviews: number;
        distribution: Record<string, number>; // "1" through "5" → count
    };
}

// ==========================================
// WISHLIST TYPES
// ==========================================

export interface WishlistItem {
    id: string;
    slug: string;
    title: string;
    price: number;
    image?: string;
}
