import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { LeftCircleOutlined } from "@ant-design/icons";
import { gsap, Power4 } from "gsap";
import styled from "styled-components";
import "./Page3.scss";

const Image = styled.div`
    width: 50%;
    height: 70%;
    border-radius: 5px;
    border: 1px solid white;
    background-size: contain;
    background-position: center center;
`;

const getOrdinalNum = (n) => {
    return (
        n +
        (n > 0
            ? ["th", "st", "nd", "rd"][
                  (n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10
              ]
            : "")
    );
};

const dateReturner = (date) => {
    const nDate = new Date(date);
    return `${getOrdinalNum(nDate.getDate())} ${nDate.toLocaleString(
        "default",
        { month: "long" }
    )} ${nDate.getFullYear()}`;
};

export default function Page3(props) {
    const apod = useSelector((state) => state.data.apod);

    const textsRevRef = useRef([]);
    const textsRev2Ref = useRef();
    const bgReveal = useRef();
    const lnavRef = useRef();

    const onClick = useCallback(() => {
        props.setPage(1);
    }, [props]);

    useEffect(() => {
        console.log(props.page);
        if (props.page === 2) {
            const page3TL = gsap.timeline({ delay: 2 });
            page3TL
                .fromTo(
                    textsRevRef.current,
                    { width: "0%" },
                    {
                        width: "100%",
                        duration: 0.8,
                        stagger: 0.4,
                        ease: Power4.easeInOut,
                    }
                )
                .fromTo(
                    textsRev2Ref.current,
                    { width: "0%" },
                    { width: "40%", duration: 0.8, ease: Power4.easeInOut },
                    "-=0.4"
                )
                .fromTo(
                    bgReveal.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8, ease: Power4.easeInOut },
                    "-=0.4"
                )
                .fromTo(
                    lnavRef.current,
                    { autoAlpha: 0 },
                    { autoAlpha: 1, duration: 0.5, ease: Power4.easeInOut }
                );
        } else if (props.page === 1) {
            const page3TLRev = gsap.timeline();
            page3TLRev
                .fromTo(
                    lnavRef.current,
                    { autoAlpha: 1 },
                    { autoAlpha: 0, duration: 0.5, ease: Power4.easeInOut }
                )
                .fromTo(
                    bgReveal.current,
                    { opacity: 1 },
                    { opacity: 0, duration: 0.8, ease: Power4.easeInOut },
                    "-=0.1"
                )
                .fromTo(
                    textsRev2Ref.current,
                    { width: "40%" },
                    { width: "0%", duration: 0.8, ease: Power4.easeInOut },
                    "-=0.4"
                )
                .fromTo(
                    textsRevRef.current,
                    { width: "100%" },
                    {
                        width: "0%",
                        duration: 0.8,
                        stagger: 0.4,
                        ease: Power4.easeInOut,
                    },
                    "-=0.4"
                );
        }
    }, [props.page]);

    return (
        <div className="container3">
            <div ref={lnavRef} className="leftside">
                <LeftCircleOutlined onClick={onClick} />
            </div>
            {apod && (
                <div className="middle">
                    <div
                        ref={(element) => (textsRevRef.current[0] = element)}
                        className="h1cover"
                    >
                        <h1>apod</h1>
                    </div>
                    <div
                        ref={(element) => (textsRevRef.current[1] = element)}
                        className="h4cover"
                    >
                        <h4>{dateReturner(apod.date)}</h4>
                    </div>
                    <div className="centerpart">
                        <div ref={textsRev2Ref} className="explcover">
                            <div className="explanation">
                                <h2 className="titles">{apod.title}</h2>
                                <p>{apod.explanation}</p>
                            </div>
                        </div>
                        <Image
                            ref={bgReveal}
                            style={{ backgroundImage: `url("${apod.url}")` }}
                        />
                    </div>
                </div>
            )}
            <div className="rightside"></div>
        </div>
    );
}
