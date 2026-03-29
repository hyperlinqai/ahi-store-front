import React from "react";
import { Heart, Gift, Diamond, Globe, Sparkles } from "lucide-react";

export default function FeatureBadges() {
    const features = [
        {
            icon: <Heart className="w-4 h-4 text-gray-400 stroke-[1.5]" />,
            label: "Handcrafted in India",
        },
        {
            icon: <Gift className="w-4 h-4 text-gray-400 stroke-[1.5]" />,
            label: "Premium Packaging",
        },
        {
            icon: <Diamond className="w-4 h-4 text-gray-400 stroke-[1.5]" />,
            label: "Unbeatable Craftsmanship",
        },
        {
            icon: <Globe className="w-4 h-4 text-gray-400 stroke-[1.5]" />,
            label: "Shipping Worldwide",
        },
    ];

    return (
        <div className="flex flex-col gap-3 mt-6 mb-8 lg:mt-8">
            <div className="grid grid-cols-2 gap-3">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-2.5 px-3 py-3 border border-gray-200 rounded-sm bg-gray-50/50"
                    >
                        {feature.icon}
                        <span className="text-[13px] text-gray-600 font-medium tracking-tight">
                            {feature.label}
                        </span>
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center gap-2.5 px-3 py-3 border border-gray-200 rounded-sm bg-gray-50/50 w-full">
                <Sparkles className="w-4 h-4 text-gray-400 stroke-[1.5]" />
                <span className="text-[13px] text-gray-600 font-medium tracking-tight">
                    Hypoallergenic and Anti-tarnish jewellery
                </span>
            </div>
        </div>
    );
}
