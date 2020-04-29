import React, { useState, useEffect, useCallback, useRef } from "react";
import { gsap, Power4, Power2, Linear } from "gsap";
import Page2 from "../Page2/Page2";
import { useDispatch } from "react-redux";
import { fetchJsonData } from "../../features/dataFetcher/dataFetcherSlice";
import "./App.scss";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchJsonData());
    }, [dispatch]);

    const [finished, setFinish] = useState(false);
    const [pageChange, setPageChange] = useState(false);

    const backgroundRef = useRef();
    const logoRef = useRef();
    const textRef = useRef();
    const removalRef = useRef();
    const rightRef = useRef();
    const leftRef = useRef();
    const titlesRef = useRef([]);
    const menusRef = useRef([]);
    const page1Ref = useRef();

    const onClick = useCallback(() => {
        const pageTransition = gsap.timeline();
        pageTransition
            .addLabel("textAni")
            .to(
                titlesRef.current,
                {
                    x: "-100%",
                    duration: 0.5,
                    stagger: 0.1,
                    ease: Power2.easeInOut,
                },
                "textAni"
            )
            .to(
                menusRef.current,
                {
                    autoAlpha: 0,
                    duration: 0.5,
                    stagger: 0.25,
                    ease: Power2.easeInOut,
                },
                "textAni"
            )
            .to(
                rightRef.current,
                {
                    left: 0,
                    width: "100vw",
                    duration: 1,
                    ease: Power2.easeInOut,
                },
                "textAni+=1"
            )
            .to(
                leftRef.current,
                {
                    width: "0vw",
                    duration: 1,
                    ease: Power2.easeInOut,
                },
                "textAni+=1"
            )
            .to(
                page1Ref.current,
                { x: "-100%", duration: 1, ease: Power4.easeInOut },
                "textAni+=1.5"
            );

        setPageChange(true);
    }, [titlesRef, menusRef, rightRef, leftRef, page1Ref]);

    useEffect(() => {
        gsap.to(backgroundRef.current, {
            rotation: 360,
            duration: 75,
            repeat: -1,
            ease: Linear,
        });
        const myTween = gsap.timeline();
        myTween
            .fromTo(
                backgroundRef.current,
                { opacity: 0, transform: "scale(1.3)" },
                { opacity: 0.9, transform: "scale(1)", duration: 1.5 }
            )
            .fromTo(
                logoRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5 }
            )
            .to(textRef.current, {
                width: "300px",
                duration: 0.7,
                ease: Power4.easeIn,
            })
            .addLabel("removal")
            .to(
                removalRef.current,
                {
                    width: "0px",
                    x: "-50px",
                    duration: 1,
                    delay: 2,
                    ease: Power4.easeIn,
                },
                "removal"
            )
            .addLabel("borderReveal")
            .fromTo(
                rightRef.current,
                { left: "100%" },
                { left: "55vw", duration: 1.5, ease: Power4.easeOut },
                "borderReveal-=0.2"
            )
            .fromTo(
                leftRef.current,
                { left: "-15vw" },
                { left: "0vw", duration: 1, ease: Power4.easeOut },
                "borderReveal"
            )
            .fromTo(
                titlesRef.current,
                { x: "-100%" },
                {
                    x: "0%",
                    duration: 0.5,
                    stagger: 0.5,
                    ease: Power2.easeInOut,
                },
                "-=1.2"
            )
            .fromTo(
                menusRef.current,
                { opacity: 0 },
                {
                    opacity: 0.9,
                    duration: 0.5,
                    stagger: 0.5,
                    ease: Power2.easeInOut,
                }
            )
            .then(() => {
                setFinish(true);
            });
    }, []);

    return (
        <div className="slidesContainer">
            <div className="pages">
                <div ref={page1Ref} className="container">
                    <div ref={backgroundRef} className={"mainbackground"}></div>
                    <div ref={leftRef} className="leftborder">
                        <div
                            ref={(element) => {
                                menusRef.current[1] = element;
                            }}
                            className="menu"
                        >
                            <div className="nav-icon">
                                <div></div>
                            </div>
                            <div className="text">menu</div>
                        </div>
                    </div>

                    <div ref={rightRef} className="rightborder">
                        <div
                            ref={(element) => {
                                menusRef.current[0] = element;
                            }}
                            onClick={onClick}
                            className="rightArrow"
                        >
                            <div className="rightArrowText">
                                Elysium Planitia
                                <svg
                                    className="triangle-right"
                                    viewBox="0 0 18.6 32.6"
                                >
                                    <path d="M0 0l18.6 16.3L0 32.6z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="titleText">
                        <div
                            ref={(element) => {
                                titlesRef.current[0] = element;
                            }}
                            className="t1"
                        >
                            Nasa
                        </div>
                        <div
                            ref={(element) => {
                                titlesRef.current[1] = element;
                            }}
                            className="t2"
                        >
                            Redux
                        </div>
                        <div
                            ref={(element) => {
                                titlesRef.current[2] = element;
                            }}
                            className="t3"
                        >
                            Hooks.
                        </div>
                    </div>

                    <div
                        style={
                            finished
                                ? { display: "none" }
                                : { display: "block" }
                        }
                        className="nasaContainer"
                    >
                        <div ref={removalRef} className="logoContainer">
                            <div className="overallContainer">
                                <div ref={logoRef} className="nasalogo"></div>
                                <div ref={textRef} className="textContainer">
                                    <h1>Nasa Redux Hooks</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Page2 pageSet={pageChange} />
            </div>
        </div>
    );
}

export default App;
