"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Loader2, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import api from "@/lib/axios";
import AuthCard from "@/components/Auth/AuthCard";
import FormField from "@/components/Auth/FormField";

const resetSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/[A-Z]/, "Must include an uppercase letter")
            .regex(/[0-9]/, "Must include a number"),
        confirmPassword: z.string().min(1, "Please confirm your password"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type ResetValues = z.infer<typeof resetSchema>;

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetValues>({
        resolver: zodResolver(resetSchema),
    });

    // No token in URL
    if (!token) {
        return (
            <AuthCard title="Invalid Link">
                <div className="flex flex-col items-center text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center mb-4">
                        <AlertTriangle className="w-7 h-7 text-orange-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link
                        href="/forgot-password"
                        className="mt-4 text-sm text-orange-500 hover:text-orange-600 font-medium transition-colors"
                    >
                        Request a new reset link
                    </Link>
                </div>
            </AuthCard>
        );
    }

    // Success state
    if (success) {
        return (
            <AuthCard title="Password Reset">
                <div className="flex flex-col items-center text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <CheckCircle className="w-7 h-7 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-600">
                        Your password has been reset successfully. You can now sign
                        in with your new password.
                    </p>
                    <Link
                        href="/login"
                        className="mt-5 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors"
                    >
                        Sign In
                    </Link>
                </div>
            </AuthCard>
        );
    }

    async function onSubmit(values: ResetValues) {
        setError("");
        try {
            await api.post("/auth/reset-password", {
                token,
                password: values.password,
            });
            setSuccess(true);
        } catch (err: unknown) {
            setError(
                (axios.isAxiosError(err) &&
                    (err.response?.data?.message || err.response?.data?.error)) ||
                    "This link may have expired. Please request a new one."
            );
        }
    }

    return (
        <AuthCard
            title="Set New Password"
            subtitle="Choose a strong password for your account"
            footer={
                <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-700 font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back to Sign In
                </Link>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        {error}
                    </div>
                )}

                <FormField
                    label="New Password"
                    type="password"
                    placeholder="At least 8 characters"
                    registration={register("password")}
                    error={errors.password?.message}
                    autoComplete="new-password"
                />

                <FormField
                    label="Confirm New Password"
                    type="password"
                    placeholder="Re-enter your password"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                    autoComplete="new-password"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Resetting...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </button>
            </form>
        </AuthCard>
    );
}
