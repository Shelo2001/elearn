import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useAuthentication = create(
    devtools((set) => ({
        user: {},
        token: null,
        loading: false,
        errorUser: null,
        login: async (data) => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/login`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                set({ user: await res.data.user, token: await res.data.token });
                window.location.href = "/";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
        },
        register: async (data) => {
            try {
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/register`,
                    data
                );
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                window.location.href = "/";
            } catch (error) {
                set({
                    errorUser:
                        (await error?.response?.data?.error) ||
                        (await error?.response?.data?.message),
                });
                setTimeout(() => {
                    set({
                        errorUser: null,
                    });
                }, 3000);
            }
        },
        logout: async () => {
            const token = localStorage.getItem("token");
            await axios.get(`${import.meta.env.VITE_BASE_URL}/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
        },

        getGoogleAuthUrl: async () => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/auth/google`
            );
            set({ googleUrl: data.url });
        },

        googleAuthentication: async (url) => {
            const res = await axios.get(
                `http://localhost:8000/api/auth/google/callback${url}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                }
            );
            console.log(res);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));
            window.location.href = "/";
        },
    }))
);
