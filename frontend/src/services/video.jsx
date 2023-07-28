import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useVideos = create(
    devtools((set) => ({
        courseVideos: [],
        getVideos: async (id) => {
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/course/${id}/videos`
            );
            set({ courseVideos: data?.courseVideos });
        },
    }))
);
