import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import MyCreatedCourses from "../components/MyCreatedCourses";
import NewCourse from "../components/NewCourse";
import { useDisclosure } from "@chakra-ui/react";

const CourseCreate = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, []);

    return (
        <>
            <NewCourse onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
            <MyCreatedCourses />
        </>
    );
};

export default CourseCreate;
