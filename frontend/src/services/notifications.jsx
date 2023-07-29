import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useNotifications = create(
    devtools((set) => ({
        setNotificationsToSeen: async (id) => {
            let token = localStorage.getItem("token");
            const { data } = await axios.put(
                `${import.meta.env.VITE_BASE_URL}/notifications/${id}/seen`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(data);
        },
        deleteNotifications: async (notifications) => {
            const { data } = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/notifications/delete`,
                notifications
            );
            console.log(data);
        },
    }))
);
