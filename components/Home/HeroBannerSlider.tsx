"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Banner } from "@/types";

const FALLBACK_BANNER: Banner = {
    id: "fallback",
    title: "Timeless Elegance, Crafted for You",
    subtitle:
        "Discover our exclusive collection of fine jewelry designed to celebrate your most precious moments.",
    ctaText: "Shop Collection",
    ctaLink: "/collections/all",
    imageUrl:
        "https://images.unsplash.com/photo-1515562141207-7a8efbf34707?q=80&w=3300&auto=format&fit=crop",
    position: "HOME_HERO",
    isActive: true,
    sortOrder: 0,
};

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroBannerSlider({ banners }: { banners: Banner[] }) {
    const slides = banners.length > 0 ? banners : [FALLBACK_BANNER];
    const [current, setCurrent] = useState(0);
    const [paused, setPaused] = useState(false);

    const goTo = useCallback(
        (index: number) => setCurrent((index + slides.length) % slides.length),
        [slides.length]
    );

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    useEffect(() => {
        if (slides.length <= 1 || paused) return;
        const timer = setInterval(next, AUTO_PLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [next, slides.length, paused]);

    const slide = slides[current];
    const hasText = Boolean(slide.title || slide.subtitle || slide.ctaText);

    return (
        <section
            className="relative h-[85vh] min-h-[520px] w-full overflow-hidden bg-gray-900"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Slides */}
            {slides.map((s, i) => (
                <div
                    key={s.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                    aria-hidden={i !== current}
                >
                    <Image
                        src={s.imageUrl}
                        alt={s.title}
                        fill
                        priority={i === 0}
                        className="object-cover object-top"
                        sizes="100vw"
                    />
                    {/* Multi-layer gradient for depth */}
                    {hasText && (
                        <>
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/40 to-gray-900/10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/30 to-transparent" />
                        </>
                    )}
                </div>
            ))}

            {/* Content */}
            {hasText && (
                <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                    <div className="text-center px-4 max-w-4xl mx-auto pointer-events-auto">
                        {/* Eyebrow */}
                        <p className="text-orange-400 text-sm font-semibold uppercase tracking-[0.3em] mb-4 opacity-0 animate-[fadeInUp_0.6s_0.1s_forwards]">
                            Fine Jewellery
                        </p>

                        {/* Title */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-5 leading-tight opacity-0 animate-[fadeInUp_0.6s_0.2s_forwards]">
                            {(slide.title ?? "").includes(",") ? (
                                <>
                                    {slide.title!.split(",")[0]},
                                    <br />
                                    <span className="text-orange-400 font-serif italic">
                                        {slide.title!.split(",").slice(1).join(",").trim()}
                                    </span>
                                </>
                            ) : (
                                slide.title ?? ""
                            )}
                        </h1>

                        {/* Subtitle */}
                        {slide.subtitle != null && slide.subtitle !== "" && (
                            <p className="mt-2 text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed opacity-0 animate-[fadeInUp_0.6s_0.3s_forwards]">
                                {slide.subtitle}
                            </p>
                        )}

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0 animate-[fadeInUp_0.6s_0.4s_forwards]">
                            {slide.ctaText != null && slide.ctaLink != null && (
                                <Link
                                    href={slide.ctaLink}
                                    className="rounded-full bg-orange-500 px-9 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/30 hover:bg-orange-600 active:scale-95 transition-all uppercase tracking-widest"
                                >
                                    {slide.ctaText}
                                </Link>
                            )}
                            <Link
                                href="/collections/new"
                                className="rounded-full bg-white/10 backdrop-blur-md border border-white/25 px-9 py-3.5 text-sm font-semibold text-white hover:bg-white/20 active:scale-95 transition-all uppercase tracking-widest"
                            >
                                New Arrivals
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Arrow Navigation */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                        aria-label="Previous slide"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={next}
                        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                        aria-label="Next slide"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </>
            )}

            {/* Dot Navigation */}
            {slides.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => goTo(i)}
                            className={`transition-all duration-300 rounded-full ${
                                i === current
                                    ? "w-7 h-2 bg-orange-500"
                                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                            }`}
                            aria-label={`Go to slide ${i + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Slide counter (top right) */}
            {slides.length > 1 && (
                <div className="absolute top-6 right-6 z-20 text-white/60 text-xs font-medium tabular-nums">
                    {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
                </div>
            )}
        </section>
    );
}
