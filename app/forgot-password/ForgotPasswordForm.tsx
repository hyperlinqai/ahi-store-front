"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import api from "@/lib/axios";
import AuthCard from "@/components/Auth/AuthCard";
import FormField from "@/components/Auth/FormField";

const forgotSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type ForgotValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordForm() {
    const [sent, setSent] = useState(false);
    const [sentEmail, setSentEmail] = useState("");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotValues>({
        resolver: zodResolver(forgotSchema),
    });

    async function onSubmit(values: ForgotValues) {
        setError("");
        try {
            await api.post("/auth/forgot-password", values);
            setSentEmail(values.email);
            setSent(true);
        } catch (err: unknown) {
            setError(
                (axios.isAxiosError(err) &&
                    (err.response?.data?.message || err.response?.data?.error)) ||
                    "Something went wrong. Please try again."
            );
        }
    }

    if (sent) {
        return (
            <AuthCard title="Check Your Email">
                <div className="flex flex-col items-center text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
                        <CheckCircle className="w-7 h-7 text-emerald-500" />
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We&apos;ve sent a password reset link to{" "}
                        <span className="font-semibold text-gray-900">{sentEmail}</span>.
                        Please check your inbox and follow the instructions.
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                        Didn&apos;t receive the email? Check your spam folder or{" "}
                        <button
                            onClick={() => setSent(false)}
                            className="text-orange-500 hover:text-orange-600 font-medium"
                        >
                            try again
                        </button>
                        .
                    </p>
                    <Link
                        href="/login"
                        className="flex items-center gap-1.5 mt-6 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </Link>
                </div>
            </AuthCard>
        );
    }

    return (
        <AuthCard
            title="Forgot Password"
            subtitle="Enter your email and we'll send you a reset link"
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
                    label="Email"
                    type="email"
                    placeholder="you@example.com"
                    registration={register("email")}
                    error={errors.email?.message}
                    autoComplete="email"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Sending...
                        </>
                    ) : (
                        "Send Reset Link"
                    )}
                </button>
            </form>
        </AuthCard>
    );
}
