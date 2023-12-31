import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";

export const useCourses = create(
    devtools((set) => ({
        courses: [],
        myLearning: [],
        myOrderedCourses: [],
        course: {},
        loading: false,
        success: null,
        createCourse: async (data) => {
            try {
                let token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/course/create`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.data.success) {
                    set({ success: "Course created successfully." });
                }
                setTimeout(() => {
                    set({
                        success: null,
                    });
                }, 3000);
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
        getCourseByCategory: async (category) => {
            set({ loading: true });
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/courses/${category}`
            );
            set({ courses: data.courses.data, loading: false });
        },
        getCourseById: async (id) => {
            set({ loading: true });
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/courses/course/${id}`
            );
            set({ course: data.course, loading: false });
        },
        getMyCreatedCourses: async (id) => {
            set({ loading: true });
            let token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/course/mycourses/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            set({ courses: data.courses, loading: false });
        },
        getMyOrderedCourses: async (id) => {
            set({ loading: true });
            let token = localStorage.getItem("token");
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/course/myordered/${id}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            set({ myOrderedCourses: data.courses, loading: false });
        },
        createReview: async (data) => {
            try {
                let token = localStorage.getItem("token");
                const res = await axios.post(
                    `${import.meta.env.VITE_BASE_URL}/course/review/create`,
                    data,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.data.success) {
                    set({ success: "Review submitted successfully." });
                }
                setTimeout(() => {
                    set({
                        success: null,
                    });
                }, 3000);
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
        getMyLearning: async (id) => {
            set({ loading: true });
            const { data } = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/course/mylearning/${id}`
            );
            set({ myLearning: data.courses, loading: false });
        },
    }))
);
