"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";
import type { ProductImage } from "@/types";

interface ImageGalleryProps {
    images: ProductImage[];
    productTitle: string;
}

export default function ImageGallery({ images, productTitle }: ImageGalleryProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [zoom, setZoom] = useState(false);
    const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
    const mainRef = useRef<HTMLDivElement>(null);

    const activeImage = images[activeIndex] ?? null;

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!mainRef.current) return;
            const rect = mainRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            setZoomPos({ x, y });
        },
        []
    );

    if (images.length === 0) {
        return (
            <div className="aspect-square rounded-2xl bg-gray-100 flex flex-col items-center justify-center text-gray-300">
                <ImageOff className="w-16 h-16" strokeWidth={1} />
                <span className="text-sm mt-2">No image available</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div
                ref={mainRef}
                className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 cursor-crosshair"
                onMouseEnter={() => setZoom(true)}
                onMouseLeave={() => setZoom(false)}
                onMouseMove={handleMouseMove}
            >
                {activeImage && (
                    <Image
                        src={activeImage.url}
                        alt={activeImage.altText || productTitle}
                        fill
                        priority
                        className="object-cover transition-transform duration-200"
                        style={
                            zoom
                                ? {
                                      transform: "scale(2)",
                                      transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                                  }
                                : undefined
                        }
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-1">
                    {images.map((img, i) => (
                        <button
                            key={img.id}
                            onClick={() => setActiveIndex(i)}
                            className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-colors ${
                                i === activeIndex
                                    ? "border-orange-500"
                                    : "border-transparent hover:border-gray-300"
                            }`}
                        >
                            <Image
                                src={img.url}
                                alt={img.altText || `${productTitle} ${i + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
