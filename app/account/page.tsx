"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/Layout/ProtectedRoute";
import { useAuthStore } from "../../store/authStore";
import {
    User,
    Package,
    MapPin,
    Wallet,
    Clock,
    Lock,
    LogOut,
    ChevronRight,
} from "lucide-react";
import ProfileSection from "./sections/ProfileSection";
import OrdersSection from "./sections/OrdersSection";
import AddressSection from "./sections/AddressSection";
import WalletSection from "./sections/WalletSection";
import RecentlyViewedSection from "./sections/RecentlyViewedSection";
import ChangePasswordSection from "./sections/ChangePasswordSection";

const menuItems = [
    { key: "profile", label: "Profile", icon: User },
    { key: "orders", label: "My Orders", icon: Package },
    { key: "addresses", label: "Delivery Address", icon: MapPin },
    { key: "wallet", label: "My Wallet", icon: Wallet },
    { key: "recently-viewed", label: "Recently Viewed Products", icon: Clock },
    { key: "change-password", label: "Change Password", icon: Lock },
];

export default function AccountPage() {
    const { user, logout } = useAuthStore();
    const [activeSection, setActiveSection] = useState("profile");

    const renderSection = () => {
        switch (activeSection) {
            case "profile":
                return <ProfileSection />;
            case "orders":
                return <OrdersSection />;
            case "addresses":
                return <AddressSection />;
            case "wallet":
                return <WalletSection />;
            case "recently-viewed":
                return <RecentlyViewedSection />;
            case "change-password":
                return <ChangePasswordSection />;
            default:
                return <ProfileSection />;
        }
    };

    return (
        <ProtectedRoute>
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mb-8 pb-4 border-b border-gray-200">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight">
                        My Account
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Welcome back, {user?.name || "Customer"}
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Sidebar */}
                    <aside className="lg:col-span-3 mb-8 lg:mb-0">
                        <nav className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                            <ul className="divide-y divide-gray-100">
                                {menuItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = activeSection === item.key;
                                    return (
                                        <li key={item.key}>
                                            <button
                                                onClick={() => setActiveSection(item.key)}
                                                className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors ${
                                                    isActive
                                                        ? "bg-orange-50 text-orange-600 border-l-[3px] border-orange-500"
                                                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900 border-l-[3px] border-transparent"
                                                }`}
                                            >
                                                <Icon className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
                                                <span className="flex-1 text-left">{item.label}</span>
                                                <ChevronRight className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-orange-400" : "text-gray-300"}`} />
                                            </button>
                                        </li>
                                    );
                                })}
                                <li>
                                    <button
                                        onClick={logout}
                                        className="w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors border-l-[3px] border-transparent"
                                    >
                                        <LogOut className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.5} />
                                        <span className="flex-1 text-left">Log out</span>
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </aside>

                    {/* Content */}
                    <main className="lg:col-span-9">
                        {renderSection()}
                    </main>
                </div>
            </div>
        </ProtectedRoute>
    );
}
