import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useCartStore = create(
    devtools((set) => ({
        addToCartSuccess: false,
        cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
        addToCart: (item) => {
            set((state) => {
                const isItemInCart = state.cartItems.some(
                    (cartItem) => cartItem.id === item.id
                );
                if (isItemInCart) {
                    return state;
                }
                const updatedCartItems = [...state.cartItems, item];
                localStorage.setItem(
                    "cartItems",
                    JSON.stringify(updatedCartItems)
                );
                set({ addToCartSuccess: true });
                setTimeout(() => {
                    set({
                        addToCartSuccess: null,
                    });
                }, 3000);
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
