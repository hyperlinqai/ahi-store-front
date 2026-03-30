import Image from "next/image";
import Link from "next/link";
import { cloudinaryUrl, blurUrl } from "@/lib/cloudinaryUrl";

const PROMO_FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
        title: "Free Shipping",
        desc: "On all orders across India",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        ),
        title: "Hassle Free Exchange",
        desc: "Easy exchange",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.47 4.412a2.25 2.25 0 01-2.133 1.588H8.603a2.25 2.25 0 01-2.133-1.588L5 14.5m14 0H5" />
            </svg>
        ),
        title: "Nickel Free Jewellery",
        desc: "Safe & skin-friendly materials",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
        ),
        title: "Secure Payment",
        desc: "100% safe & encrypted checkout",
    },
];

import { Banner } from "@/types";

export default function PromoBanner({ banner }: { banner?: Banner }) {
    return (
        <>
            {/* Trust Strip */}
            <section className="bg-gray-50 border-y border-gray-100 py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {PROMO_FEATURES.map((feat) => (
                            <div key={feat.title} className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <div className="flex-shrink-0 text-orange-500">{feat.icon}</div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900">{feat.title}</p>
                                    <p className="text-xs text-gray-500">{feat.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Promo Banner */}
            <section className="relative overflow-hidden bg-gray-950 py-20 md:py-28 group">
                {banner?.imageUrl ? (
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={cloudinaryUrl(banner.imageUrl, { width: 1920 })}
                            alt={banner.title || "Promo"}
                            fill
                            className="object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105"
                            sizes="100vw"
                            loading="lazy"
                            placeholder={blurUrl(banner.imageUrl) ? "blur" : "empty"}
                            blurDataURL={blurUrl(banner.imageUrl) || undefined}
                        />
                        <div className="absolute inset-0 bg-gray-950/70" />
                    </div>
                ) : (
                    <>
                        {/* Decorative radial glow */}
                        <div
                            className="absolute inset-0 opacity-20 pointer-events-none"
                            style={{
                                background:
                                    "radial-gradient(ellipse 80% 60% at 50% 50%, #f97316 0%, transparent 70%)",
                            }}
                        />

                        {/* Decorative circles */}
                        <div className="absolute top-[-80px] left-[-80px] w-[320px] h-[320px] rounded-full border border-white/5" />
                        <div className="absolute bottom-[-60px] right-[-60px] w-[280px] h-[280px] rounded-full border border-white/5" />
                        <div className="absolute top-[-40px] right-[10%] w-[160px] h-[160px] rounded-full border border-orange-500/10" />
                    </>
                )}

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-orange-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4">
                        First Order Offer
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                        {banner?.title ? (
                            banner.title
                        ) : (
                            <>
                                Get{" "}
                                <span className="text-orange-400">10% Off</span>
                                <br />
                                on Your First Order
                            </>
                        )}
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg mb-6 max-w-xl mx-auto font-light">
                        {banner?.subtitle || "Use coupon code at checkout and enjoy 10% off on your first purchase. Start your jewellery journey with AHI today."}
                    </p>
                    <div className="mb-10 inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
                        <span className="text-gray-300 text-sm">Use Code:</span>
                        <span className="text-orange-400 text-lg font-bold tracking-widest">AHIFIRST</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {banner?.ctaLink && banner?.ctaText ? (
                            <Link
                                href={banner.ctaLink}
                                className="rounded-full bg-orange-500 px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-600 active:scale-95 transition-all uppercase tracking-widest"
                            >
                                {banner.ctaText}
                            </Link>
                        ) : (
                            <Link
                                href="/products"
                                className="rounded-full bg-orange-500 px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-600 active:scale-95 transition-all uppercase tracking-widest"
                            >
                                Shop Now
                            </Link>
                        )}

                        <Link
                            href="/collections/all"
                            className="rounded-full border border-white/20 px-9 py-3.5 text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-all uppercase tracking-widest backdrop-blur-sm"
                        >
                            Browse All
                        </Link>
                    </div>

                    {/* Countdown-style decorative chips */}
                    <div className="mt-10 flex flex-wrap justify-center gap-3">
                        {["Rings", "Necklaces", "Earrings", "Bracelets"].map((item) => (
                            <Link
                                key={item}
                                href={`/collections/${item.toLowerCase()}`}
                                className="text-xs font-medium text-gray-400 border border-white/10 rounded-full px-4 py-1.5 hover:border-orange-500/50 hover:text-orange-400 transition-colors"
                            >
                                {item} →
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
