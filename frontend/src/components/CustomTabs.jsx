import React, { useState } from "react";
import { Tabs, Tab, TabPanel, TabPanels, TabList } from "@chakra-ui/react";
import CoursesByCategory from "./CoursesByCategory";

const CustomTabs = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (index) => {
        setActiveTab(index);
    };

    return (
        <Tabs
            colorScheme="black"
            style={{ width: "70%", margin: "auto", marginTop: "20px" }}
            isLazy
        >
            <TabList>
                <Tab
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => handleTabChange(0)}
                >
                    Business
                </Tab>
                <Tab
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => handleTabChange(1)}
                >
                    Development
                </Tab>
                <Tab
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => handleTabChange(2)}
                >
                    Design
                </Tab>
                <Tab
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => handleTabChange(3)}
                >
                    Marketing
                </Tab>
                <Tab
                    style={{ fontSize: "20px", fontWeight: "bold" }}
                    onClick={() => handleTabChange(4)}
                >
                    IT
                </Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    {activeTab === 0 && <CoursesByCategory url="Business" />}
                </TabPanel>
                <TabPanel>
                    {activeTab === 1 && <CoursesByCategory url="Development" />}
                </TabPanel>
                <TabPanel>
                    {activeTab === 2 && <CoursesByCategory url="Design" />}
                </TabPanel>
                <TabPanel>
                    {activeTab === 3 && <CoursesByCategory url="Marketing" />}
                </TabPanel>
                <TabPanel>
                    {activeTab === 4 && <CoursesByCategory url="IT" />}
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};

export default CustomTabs;
