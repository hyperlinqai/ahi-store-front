"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";
import { useAuthStore } from "@/store/authStore";
import AuthCard from "@/components/Auth/AuthCard";
import FormField from "@/components/Auth/FormField";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/account";
    const registered = searchParams.get("registered") === "1";
    const emailFromQuery = searchParams.get("email") || "";
    const setAuth = useAuthStore((s) => s.setAuth);

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: emailFromQuery,
            password: "",
        },
    });

    async function onSubmit(values: LoginValues) {
        setError("");
        try {
            const res = await api.post("/auth/login", values);
            const { user, accessToken } = res.data.data;
            setAuth(user, accessToken);
            router.push(redirect);
        } catch (err: unknown) {
            setError(
                (axios.isAxiosError(err) &&
                    (err.response?.data?.message || err.response?.data?.error)) ||
                    "Invalid email or password. Please try again."
            );
        }
    }

    return (
        <AuthCard
            title="Welcome Back"
            subtitle="Sign in to your account"
            footer={
                <>
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                    >
                        Create one
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {registered && !error && (
                    <div className="px-4 py-3 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-700">
                        Account created successfully. Please verify your email, then sign in.
                    </div>
                )}

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

                <FormField
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    registration={register("password")}
                    error={errors.password?.message}
                    autoComplete="current-password"
                />

                <div className="flex justify-end">
                    <Link
                        href="/forgot-password"
                        className="text-xs text-orange-500 hover:text-orange-600 font-medium transition-colors"
                    >
                        Forgot Password?
                    </Link>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-orange-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                        </>
                    ) : (
                        "Sign In"
                    )}
                </button>
            </form>
        </AuthCard>
    );
}
