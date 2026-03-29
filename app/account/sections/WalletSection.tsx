"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Wallet, ArrowUpRight, ArrowDownLeft, Loader2 } from "lucide-react";

interface Transaction {
    id: string;
    amount: number;
    type: "CREDIT" | "DEBIT";
    description: string | null;
    createdAt: string;
}

interface WalletData {
    id: string;
    balance: number;
    transactions: Transaction[];
}

export default function WalletSection() {
    const [wallet, setWallet] = useState<WalletData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/wallet")
            .then((res) => setWallet(res.data.data))
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Balance Card */}
            <div className="bg-gray-900 rounded-2xl p-6 text-white">
                <p className="text-sm text-gray-400">Wallet Balance</p>
                <p className="text-3xl font-bold mt-1">&#8377;{(wallet?.balance || 0).toLocaleString("en-IN")}</p>
            </div>

            {/* Transactions */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-100">
                    <h3 className="text-base font-semibold leading-6 text-gray-900">Transaction History</h3>
                </div>
                {!wallet?.transactions || wallet.transactions.length === 0 ? (
                    <div className="px-4 py-16 text-center">
                        <Wallet className="mx-auto h-10 w-10 text-gray-300" strokeWidth={1} />
                        <p className="mt-3 text-sm text-gray-500">No transactions yet.</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {wallet.transactions.map((txn) => (
                            <li key={txn.id} className="px-4 py-4 sm:px-6 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${txn.type === "CREDIT" ? "bg-emerald-50" : "bg-red-50"}`}>
                                        {txn.type === "CREDIT" ? (
                                            <ArrowDownLeft className="w-4 h-4 text-emerald-600" />
                                        ) : (
                                            <ArrowUpRight className="w-4 h-4 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{txn.description || txn.type}</p>
                                        <p className="text-xs text-gray-400">
                                            {new Date(txn.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        </p>
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold ${txn.type === "CREDIT" ? "text-emerald-600" : "text-red-600"}`}>
                                    {txn.type === "CREDIT" ? "+" : "-"}&#8377;{txn.amount.toLocaleString("en-IN")}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
