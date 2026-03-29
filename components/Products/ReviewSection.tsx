"use client";

import { Star, CheckCircle } from "lucide-react";
import type { Review, ReviewsResponse } from "@/types";

interface ReviewSectionProps {
    data: ReviewsResponse | null;
    isLoading: boolean;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                        i < rating
                            ? "fill-orange-400 text-orange-400"
                            : "fill-gray-200 text-gray-200"
                    }`}
                />
            ))}
        </div>
    );
}

function RatingBreakdown({
    distribution,
    total,
}: {
    distribution: Record<string, number>;
    total: number;
}) {
    return (
        <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
                const count = distribution[String(star)] || 0;
                const pct = total > 0 ? (count / total) * 100 : 0;
                return (
                    <div key={star} className="flex items-center gap-3 text-sm">
                        <span className="w-7 text-right text-gray-600 font-medium">{star}★</span>
                        <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-orange-400 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                            />
                        </div>
                        <span className="w-8 text-gray-400 text-xs">{count}</span>
                    </div>
                );
            })}
        </div>
    );
}

function ReviewCard({ review }: { review: Review }) {
    const date = new Date(review.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="py-5 border-b border-gray-100 last:border-b-0">
            <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <StarRating rating={review.rating} />
                        {review.title && (
                            <span className="text-sm font-semibold text-gray-900">
                                {review.title}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-gray-700">{review.userName}</span>
                        {review.isVerifiedPurchase && (
                            <span className="flex items-center gap-0.5 text-emerald-600">
                                <CheckCircle className="w-3 h-3" />
                                Verified Purchase
                            </span>
                        )}
                    </div>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{date}</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
        </div>
    );
}

export default function ReviewSection({ data, isLoading }: ReviewSectionProps) {
    if (isLoading) {
        return (
            <div className="animate-pulse space-y-4">
                <div className="h-6 w-40 bg-gray-200 rounded" />
                <div className="h-32 bg-gray-100 rounded-xl" />
                <div className="space-y-4">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="space-y-2">
                            <div className="h-4 w-24 bg-gray-200 rounded" />
                            <div className="h-3 w-full bg-gray-100 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!data || data.summary.totalReviews === 0) {
        return (
            <div className="text-center py-12 text-gray-400">
                <p className="text-base font-medium text-gray-600">No reviews yet</p>
                <p className="text-sm mt-1">Be the first to review this product</p>
            </div>
        );
    }

    const { summary, data: reviews } = data;

    return (
        <div>
            {/* Summary */}
            <div className="flex flex-col sm:flex-row gap-8 mb-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex flex-col items-center justify-center gap-1 sm:pr-8 sm:border-r sm:border-gray-200">
                    <span className="text-4xl font-bold text-gray-900">
                        {summary.avgRating.toFixed(1)}
                    </span>
                    <StarRating rating={Math.round(summary.avgRating)} />
                    <span className="text-xs text-gray-500 mt-1">
                        {summary.totalReviews} review{summary.totalReviews !== 1 ? "s" : ""}
                    </span>
                </div>
                <div className="flex-1">
                    <RatingBreakdown
                        distribution={summary.distribution}
                        total={summary.totalReviews}
                    />
                </div>
            </div>

            {/* Individual Reviews */}
            <div>
                {reviews.map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
            </div>
        </div>
    );
}
