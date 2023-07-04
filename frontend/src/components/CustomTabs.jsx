import React, { useState, useEffect } from "react";
import { Box, Text, Flex } from "@chakra-ui/react";
import axios from "axios";

const CustomTabs = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        fetchCourses();
    }, [activeTab]);

    const fetchCourses = async () => {
        let path = "";
        switch (activeTab) {
            case 0:
                path = "/design";
                break;
            case 1:
                path = "/IT";
                break;
            case 2:
                path = "/python";
                break;
            case 3:
                path = "/laravel";
                break;
            case 4:
                path = "/react";
                break;

            default:
                break;
        }

        try {
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}${path}`
            );
            setCourses(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    const renderTabContent = (index) => {
        if (courses.length === 0) {
            return <p>Loading...</p>;
        }

        return (
            <ul>
                {courses.map((course) => (
                    <li key={course.id}>{course.name}</li>
                ))}
            </ul>
        );
    };

    return (
        <Box width="400px" boxShadow="lg" borderRadius="md">
            <Flex>
                <Tab
                    onClick={() => handleTabClick(0)}
                    isActive={activeTab === 0}
                >
                    Design
                </Tab>
                <Tab
                    onClick={() => handleTabClick(1)}
                    isActive={activeTab === 1}
                >
                    IT
                </Tab>
                <Tab
                    onClick={() => handleTabClick(2)}
                    isActive={activeTab === 2}
                >
                    Python
                </Tab>
                <Tab
                    onClick={() => handleTabClick(3)}
                    isActive={activeTab === 3}
                >
                    Laravel
                </Tab>
                <Tab
                    onClick={() => handleTabClick(4)}
                    isActive={activeTab === 4}
                >
                    React
                </Tab>
            </Flex>
            <Box p={4}>{renderTabContent(activeTab)}</Box>
        </Box>
    );
};

const Tab = ({ children, onClick, isActive }) => (
    <Box
        px={4}
        py={2}
        borderBottom={isActive ? "2px solid black" : "2px solid transparent"}
        cursor="pointer"
        _hover={{ borderBottom: "2px solid black" }}
        onClick={onClick}
    >
        <Text
            color={isActive ? "black" : "gray.500"}
            fontWeight={isActive ? "bold" : "normal"}
        >
            {children}
        </Text>
    </Box>
);

export default CustomTabs;
