import React from "react";
import { RotatingLines } from "react-loader-spinner";
import styled from "styled-components";

const Loader = ({ isVisible }) => {
  return (
    <Container>
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width={"55"}
        visible={isVisible}
      />
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  position: fixed;
  display: flex;
  width: 100%;
  height: 90%;
  align-items: center;
  justify-content: center;
`;
