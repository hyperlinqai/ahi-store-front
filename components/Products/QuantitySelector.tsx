"use client";

import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
    value: number;
    max: number;
    onChange: (qty: number) => void;
}

export default function QuantitySelector({ value, max, onChange }: QuantitySelectorProps) {
    return (
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden w-fit">
            <button
                onClick={() => onChange(Math.max(1, value - 1))}
                disabled={value <= 1}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center text-sm font-semibold text-gray-900 tabular-nums">
                {value}
            </span>
            <button
                onClick={() => onChange(Math.min(max, value + 1))}
                disabled={value >= max}
                className="flex items-center justify-center w-10 h-10 text-gray-600 hover:bg-gray-50 transition-colors disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                <Plus className="w-4 h-4" />
            </button>
        </div>
    );
}
