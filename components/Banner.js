import React from "react";
import Title from "./Title";
import PropTypes from "prop-types";
import Swiper from "react-native-web-swiper";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const SliderContainer = styled.View`
  width: 100%;
  height: ${HEIGHT / 3}px;
  margin-bottom: 40px;
`;

const Banner = ({ children }) => (
    <>
        <SliderContainer>
            <Swiper controlsEnabled={false} loop timeout={3}>
                {children}
            </Swiper>
        </SliderContainer>
    </>
);

Banner.propTypes = {
    children: PropTypes.node.isRequired
};

export default Banner;