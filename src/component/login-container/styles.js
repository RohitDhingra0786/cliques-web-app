import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  margin: auto;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

export const Form = styled.form`
  flex-direction: column;
  display: flex;
`;
