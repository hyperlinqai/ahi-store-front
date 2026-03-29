"use client";

import { useEffect } from "react";
import { X } from "lucide-react";

interface MobileFilterDrawerProps {
    open: boolean;
    onClose: () => void;
    onClearAll: () => void;
    children: React.ReactNode;
}

export default function MobileFilterDrawer({
    open,
    onClose,
    onClearAll,
    children,
}: MobileFilterDrawerProps) {
    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity lg:hidden ${
                    open ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
                    open ? "translate-y-0" : "translate-y-full"
                }`}
                style={{ maxHeight: "85vh" }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h2 className="text-base font-bold text-gray-900">Filters</h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Filter Content */}
                <div className="overflow-y-auto p-5" style={{ maxHeight: "calc(85vh - 130px)" }}>
                    {children}
                </div>

                {/* Footer */}
                <div className="flex gap-3 px-5 py-4 border-t border-gray-100">
                    <button
                        onClick={() => {
                            onClearAll();
                            onClose();
                        }}
                        className="flex-1 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={onClose}
                        className="flex-1 py-2.5 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-orange-500 transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </>
    );
}
