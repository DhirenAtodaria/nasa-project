import React, { useEffect, useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { useSpring, animated } from "react-spring";
import { gsap, Power4 } from "gsap";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Slideshow from "../Slideshow/Slideshow";
import "./Page2.scss";

export default function Page2(props) {
    const currentData = useSelector((state) => state.data.apiData[6]);
    const backRef = useRef();
    const outerRef = useRef([]);
    const currentRef = useRef([]);
    const containRef = useRef();
    const clickRefs = useRef();
    const click2Refs = useRef();

    const calc = (x, y) => [
        x - window.innerWidth / 2,
        y - window.innerHeight / 2,
    ];

    const trans1 = (x, y) => `translate3d(${x / 50}px,${y / 50}px,0)`;
    const [propsz, set] = useSpring(() => ({
        xy: [0, 0],
        config: { mass: 20, tension: 550, friction: 170 },
    }));

    const onClick = useCallback(() => {
        props.setPage(0);
    }, [props]);

    const onClick2 = useCallback(() => {
        props.setPage(2);
    }, [props]);

    useEffect(() => {
        if (props.page === 1) {
            const page2TL = gsap.timeline({ delay: 2 });
            page2TL
                .addLabel("timings")
                .to(
                    containRef.current,
                    {
                        x: "0%",
                        duration: 1,
                        ease: Power4.easeInOut,
                    },
                    "timings"
                )
                .fromTo(
                    outerRef.current,
                    { x: "-15px", width: "0%" },
                    {
                        x: "0px",
                        width: "100%",
                        duration: 1,
                        stagger: 0.5,
                        ease: Power4.easeInOut,
                    },
                    "timings+=0.5"
                )
                .fromTo(
                    currentRef.current,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.5,
                        stagger: 0.25,
                        ease: Power4.easeInOut,
                    },
                    "timings+=1.5"
                )
                .addLabel("clickies")
                .fromTo(
                    clickRefs.current,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 1, ease: Power4.easeInOut },
                    "clickies"
                )
                .fromTo(
                    click2Refs.current,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 1, ease: Power4.easeInOut },
                    "clickies"
                );
        } else if (props.page === 0) {
            const page2TLR = gsap.timeline();
            page2TLR
                .addLabel("opacities")
                .fromTo(
                    clickRefs.current,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, duration: 1, ease: Power4.easeInOut },
                    "opacities"
                )
                .fromTo(
                    click2Refs.current,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, duration: 1, ease: Power4.easeInOut },
                    "opacities"
                )
                .fromTo(
                    currentRef.current,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5, stagger: 0.5 },
                    "opacities"
                )
                .fromTo(
                    outerRef.current,
                    { x: "0px", width: "100%" },
                    { x: "-15px", width: "0%", duration: 1, stagger: 0.5 },
                    "opacities+=0.5"
                );
        } else if (props.page === 2) {
            const page2TLR = gsap.timeline();
            page2TLR
                .addLabel("opacities")
                .fromTo(
                    clickRefs.current,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, duration: 1, ease: Power4.easeInOut },
                    "opacities"
                )
                .fromTo(
                    click2Refs.current,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, duration: 1, ease: Power4.easeInOut },
                    "opacities"
                )
                .fromTo(
                    currentRef.current,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.5, stagger: 0.5 },
                    "opacities"
                )
                .fromTo(
                    outerRef.current,
                    { x: "0px", width: "100%" },
                    { x: "-15px", width: "0%", duration: 1, stagger: 0.5 },
                    "opacities+=0.5"
                )
                .fromTo(
                    containRef.current,
                    { x: "0%" },
                    { x: "-110%", duration: 1, ease: Power4.easeInOut },
                    "opacities+=1.25"
                );
        }
    }, [props.page]);

    return (
        <div
            onMouseMove={({ clientX: x, clientY: y }) =>
                set({ xy: calc(x, y) })
            }
            ref={containRef}
            className="container2"
        >
            <animated.div
                style={{ transform: propsz.xy.interpolate(trans1) }}
                ref={backRef}
                className="bg"
            ></animated.div>
            <div ref={clickRefs} className="lbord">
                <LeftCircleOutlined onClick={onClick} />
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
            <div ref={click2Refs} className="rbord">
                <RightCircleOutlined onClick={onClick2} />
            </div>
        </div>
    );
}
