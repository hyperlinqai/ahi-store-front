import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WishlistItem } from "@/types";

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleItem: (item: WishlistItem) => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) =>
                set((state) => {
                    if (state.items.some((i) => i.id === item.id)) return state;
                    return { items: [...state.items, item] };
                }),
            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),
            isInWishlist: (id) => get().items.some((i) => i.id === id),
            toggleItem: (item) => {
                const exists = get().items.some((i) => i.id === item.id);
                if (exists) {
                    set((state) => ({
                        items: state.items.filter((i) => i.id !== item.id),
                    }));
                } else {
                    set((state) => ({ items: [...state.items, item] }));
                }
            },
        }),
        { name: "wishlist-storage" }
    )
);
