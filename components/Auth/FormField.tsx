"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface FormFieldProps {
    label: string;
    type?: string;
    placeholder?: string;
    error?: string;
    registration: UseFormRegisterReturn;
    autoComplete?: string;
}

export default function FormField({
    label,
    type = "text",
    placeholder,
    error,
    registration,
    autoComplete,
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                {label}
            </label>
            <div className="relative">
                <input
                    {...registration}
                    type={inputType}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm transition-colors outline-none ${
                        error
                            ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                            : "border-gray-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                    }`}
                />
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                        ) : (
                            <Eye className="w-4 h-4" />
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
