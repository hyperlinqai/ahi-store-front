import Link from "next/link";

interface AuthCardProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

export default function AuthCard({ title, subtitle, children, footer }: AuthCardProps) {
    return (
        <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link href="/" className="mb-8 flex justify-center">
                    <img
                        src="/ahi-logo.png"
                        alt="Ahi Jewellery"
                        className="h-[120px] w-auto"
                    />
                </Link>

                {/* Card */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
                    <h1 className="text-xl font-bold text-gray-900 text-center">{title}</h1>
                    {subtitle && (
                        <p className="text-sm text-gray-500 text-center mt-1.5">{subtitle}</p>
                    )}

                    <div className="mt-6">{children}</div>
                </div>

                {/* Footer links */}
                {footer && (
                    <div className="text-center mt-5 text-sm text-gray-500">{footer}</div>
                )}
            </div>
        </div>
    );
}
