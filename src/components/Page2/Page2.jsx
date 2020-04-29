import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { gsap } from "gsap";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Slideshow from "../Slideshow/Slideshow";
import "./Page2.scss";

export default function Page2(props) {
    const currentData = useSelector((state) => state.data.apiData[6]);
    const isInitialMount = useRef(true);
    const backRef = useRef();
    const outerRef = useRef([]);
    const currentRef = useRef([]);

    const calc = (x, y) => [
        x - window.innerWidth / 2,
        y - window.innerHeight / 2,
    ];
    const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;
    const [propsz, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 20, tension: 550, friction: 170 },
    }));

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            const page2TL = gsap.timeline({ delay: 2 });
            page2TL
                .fromTo(
                    backRef.current,
                    { opacity: 0.4 },
                    { opacity: 1, duration: 0.5 }
                )
                .fromTo(
                    outerRef.current,
                    { x: "-15px", width: "0%" },
                    { x: "0px", width: "100%", duration: 1, stagger: 0.5 }
                )
                .fromTo(
                    currentRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.5, stagger: 0.5 }
                );
        }
    }, [props.pageSet]);

    return (
        <div
            onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xy: calc(x, y) })
            }
            className="container2"
        >
            <animated.div
                style={{ transform: propsz.xy.interpolate(trans1) }}
                ref={backRef}
                className="bg"
            ></animated.div>
            <div className="lbord">
                <LeftCircleOutlined />
            </div>
            <div className="center">
                <div
                    ref={(element) => (outerRef.current[0] = element)}
                    className="outerh1"
                >
                    <h1>elysium planitia weather</h1>
                </div>
                <div className="desc">
                    <div
                        ref={(element) => (outerRef.current[1] = element)}
                        className="outerp"
                    >
                        <p className="descCnt">
                            InSight weather data aquired from the Nasa API.
                            Taking daily weather measuremeants on the surface of
                            Mars at Elysium Planitia. A flat, smooth plain near
                            Mars' equator.
                        </p>
                    </div>
                    <div
                        ref={(element) => (currentRef.current[0] = element)}
                        className="current"
                    >
                        {currentData && (
                            <>
                                <h1>
                                    {`Season: ${
                                        currentData.Season.charAt(
                                            0
                                        ).toUpperCase() +
                                        currentData.Season.slice(1)
                                    }`}
                                </h1>
                                <h2>
                                    <span>SOL {currentData.SOL}</span>{" "}
                                    <span>
                                        High: {currentData.AT.mx}&deg; C
                                    </span>{" "}
                                </h2>
                                <h2>
                                    <span>{currentData.First_UTC}</span>
                                    <span>Low: {currentData.AT.mn}&deg; C</span>
                                </h2>
                            </>
                        )}
                    </div>
                </div>
                <div
                    ref={(element) => (currentRef.current[1] = element)}
                    className="root"
                >
                    <Slideshow />
                </div>
            </div>
            <div className="rbord">
                <RightCircleOutlined />
            </div>
        </div>
    );
}
