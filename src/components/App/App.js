import React, { useEffect, useRef } from "react";
import { easeBackOut } from "d3-ease";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchJsonData } from "../../features/dataFetcher/dataFetcherSlice";
import { useChain, useSpring, animated, config } from "react-spring";
import "./App.scss";

function App() {
    // const dispatch = useDispatch();
    // const apiData = useSelector((state) => state.data.posts);

    // // useEffect(() => {
    // //     dispatch(fetchJsonData());
    // // }, [dispatch]);
    // const worldRef = useRef();
    // const nasaRef = useRef();
    // const textRef = useRef();

    const fadeRef = useRef();
    const nasaRef = useRef();
    const textRef = useRef();
    const removalRef = useRef();

    const fade = useSpring({
        opacity: 0.7,
        transform: "scale(1)",
        from: { opacity: 0, transform: "scale(1.5)" },
        config: { duration: 2000, easing: (t) => easeBackOut(t) },
        delay: 500,
        ref: fadeRef,
    });

    const logoProp = useSpring({
        to: async (next) => {
            await next({ opacity: 0.5 });
        },
        from: { opacity: 0 },
        config: { duration: 1000 },
        ref: nasaRef,
    });

    const textProps = useSpring({
        width: "300px",
        from: { width: "0px" },
        config: config.slow,
        ref: textRef,
    });

    const containerProps = useSpring({
        opacity: 0,
        from: { opacity: 0.5 },
        ref: removalRef,
    });

    useChain([fadeRef, nasaRef, textRef, removalRef], [0, 2.5, 3.2, 6]);

    return (
        <div className="container">
            <animated.div
                style={fade}
                className={"mainbackground"}
            ></animated.div>
            <animated.div style={containerProps} className="nasaContainer">
                <animated.div
                    style={logoProp}
                    className="nasalogo"
                ></animated.div>
                <animated.div style={textProps} className="textContainer">
                    <animated.h1>Nasa Redux Hooks</animated.h1>
                </animated.div>
            </animated.div>
        </div>
    );
}

export default App;
