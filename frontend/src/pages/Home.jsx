import React from "react";
import Hero from "../components/Hero";
import CustomTabs from "../components/CustomTabs";
import { TypeAnimation } from "react-type-animation";

const Home = () => {
    return (
        <>
            <div style={{ textAlign: "center" }}>
                <TypeAnimation
                    sequence={[
                        "Best courses of Business",
                        1500,
                        "Best courses of Development",
                        1500,
                        "Best courses of Design",
                        1500,
                        "Best courses of Marketing",
                        1500,
                        "Best courses of IT",
                        1500,
                    ]}
                    speed={50}
                    style={{
                        fontSize: "2em",
                        fontWeight: "bold",
                        display: "inline-block",
                    }}
                    repeat={Infinity}
                />
            </div>
            <Hero />
            <CustomTabs />
        </>
    );
};

export default Home;
