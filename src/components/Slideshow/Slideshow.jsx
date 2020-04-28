import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { a } from "react-spring";
import InfiniteSlider from "./Slider";

const Main = styled.div`
    height: 200px;
`;

const Content = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px 50px;
    font-size: 18px;
    user-select: none;
`;

const Marker = styled.span`
    height: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    border-bottom: 1px solid white;
`;

const Image = styled(a.div)`
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-size: cover;
    background-position: center center;
    background-color: rgba(19, 3, 3, 0.2);
`;

export default function Slideshow() {
    const apiData = useSelector((state) => state.data.apiData);
    return (
        apiData && (
            <Main>
                <InfiniteSlider items={apiData} width={350} visible={4}>
                    {({ SOL, AT, First_UTC }) => (
                        <Content>
                            <Marker>
                                <span>SOL{SOL}</span> <span>{First_UTC}</span>
                            </Marker>

                            <Image>
                                <div>Average: {AT.av}&deg; C</div>
                                <div>High: {AT.mx}&deg; C</div>
                                <div>Low: {AT.mn}&deg; C</div>
                            </Image>
                        </Content>
                    )}
                </InfiniteSlider>
            </Main>
        )
    );
}
