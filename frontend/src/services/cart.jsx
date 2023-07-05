import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create(
    devtools((set) => ({
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
        addToCart: (item) => {
            set((state) => {
                const updatedCartItems = [...state.cartItems, item];
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(updatedCartItems)
                );
                return { cartItems: updatedCartItems };
            });
        },
        removeFromCart: (item) => {
            set((state) => {
                const updatedCartItems = state.cartItems.filter(
                    (i) => i.id !== item.id
                );
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(updatedCartItems)
                );
                return { cartItems: updatedCartItems };
            });
        },
    }))
);