/**
 * Transform a Cloudinary URL to serve optimized images.
 * Adds auto-format (WebP/AVIF), auto-quality, and optional width resize.
 *
 * Example:
 *   cloudinaryUrl("http://res.cloudinary.com/.../upload/v123/products/abc.jpg", { width: 800 })
 *   → "https://res.cloudinary.com/.../upload/f_auto,q_auto,w_800/v123/products/abc.jpg"
 */
export function cloudinaryUrl(
    url: string | undefined | null,
    opts: { width?: number; quality?: string } = {}
): string {
    if (!url) return "";

    // Force HTTPS
    let transformed = url.replace(/^http:\/\//, "https://");

    // Only transform Cloudinary URLs
    if (!transformed.includes("res.cloudinary.com")) return transformed;

    const parts: string[] = ["f_auto", "q_auto"];
    if (opts.width) parts.push(`w_${opts.width}`);
    if (opts.quality) parts.push(`q_${opts.quality}`);

    const transforms = parts.join(",");

    // Insert transforms after /upload/
    // Pattern: .../upload/v1234/... → .../upload/f_auto,q_auto,w_800/v1234/...
    // If transforms already exist: .../upload/existing/v1234/... → replace
    transformed = transformed.replace(
        /\/upload\/(?:(v\d+)\/)?/,
        `/upload/${transforms}/$1/`
    );

    // Clean up double slashes from empty v-capture
    transformed = transformed.replace(/\/\/+/g, "/").replace("https:/", "https://");

    return transformed;
}

/**
 * Generate a tiny blur placeholder URL (20px wide, low quality).
 */
export function blurUrl(url: string | undefined | null): string {
    if (!url) return "";
    let transformed = url.replace(/^http:\/\//, "https://");
    if (!transformed.includes("res.cloudinary.com")) return "";

    transformed = transformed.replace(
        /\/upload\/(?:(v\d+)\/)?/,
        `/upload/f_auto,q_10,w_20,e_blur:800/$1/`
    );
    transformed = transformed.replace(/\/\/+/g, "/").replace("https:/", "https://");
    return transformed;
}
