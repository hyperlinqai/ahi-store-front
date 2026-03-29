import Link from "next/link";

const PROMO_FEATURES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: "BIS Hallmarked",
        desc: "Certified purity on every piece",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
        ),
        title: "Free Shipping",
        desc: "On orders above ₹5,000",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
        ),
        title: "Easy Returns",
        desc: "30-day hassle-free returns",
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
        ),
        title: "Secure Payments",
        desc: "100% safe & encrypted",
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
                        <img src={banner.imageUrl} alt={banner.title || "Promo"} className="w-full h-full object-cover transition-transform duration-[20s] ease-linear group-hover:scale-105" />
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
                        Limited Time Offer
                    </p>
                    <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
                        {banner?.title ? (
                            banner.title
                        ) : (
                            <>
                                Up to{" "}
                                <span className="text-orange-400">40% Off</span>
                                <br />
                                on Select Collections
                            </>
                        )}
                    </h2>
                    <p className="text-gray-400 text-base md:text-lg mb-10 max-w-xl mx-auto font-light">
                        {banner?.subtitle || "Celebrate life's milestones with our exclusive sale. Finest craftsmanship at prices you'll love — for a limited time only."}
                    </p>

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
                                href="/collections/sale"
                                className="rounded-full bg-orange-500 px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/40 hover:bg-orange-600 active:scale-95 transition-all uppercase tracking-widest"
                            >
                                Shop the Sale
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
