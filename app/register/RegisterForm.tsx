"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import api from "@/lib/axios";
import AuthCard from "@/components/Auth/AuthCard";
import FormField from "@/components/Auth/FormField";

const registerSchema = z
    .object({
        name: z.string().min(2, "Full name is required").max(100),
        email: z.string().min(1, "Email is required").email("Enter a valid email"),
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

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterValues>({
        resolver: zodResolver(registerSchema),
    });

    async function onSubmit(values: RegisterValues) {
        setError("");
        try {
            const { name, email, password } = values;
            const res = await api.post("/auth/register", { name, email, password });
            if (res.data.success) {
                router.push(
                    `/login?registered=1&email=${encodeURIComponent(email)}`
                );
            }
        } catch (err: unknown) {
            setError(
                (axios.isAxiosError(err) &&
                    (err.response?.data?.message || err.response?.data?.error)) ||
                    "Something went wrong. Please try again."
            );
        }
    }

    return (
        <AuthCard
            title="Create Account"
            subtitle="Join Ahi Jewellery today"
            footer={
                <>
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-orange-500 font-medium hover:text-orange-600 transition-colors"
                    >
                        Sign in
                    </Link>
                </>
            }
        >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {error && (
                    <div className="px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-600">
                        {error}
                    </div>
                )}

                <FormField
                    label="Full Name"
                    placeholder="John Doe"
                    registration={register("name")}
                    error={errors.name?.message}
                    autoComplete="name"
                />

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
                    placeholder="At least 8 characters"
                    registration={register("password")}
                    error={errors.password?.message}
                    autoComplete="new-password"
                />

                <FormField
                    label="Confirm Password"
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
                            <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </button>
            </form>
        </AuthCard>
    );
}
