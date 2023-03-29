import styled from "styled-components";
import { Colors } from "theme/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  .wrapper {
    display: flex;
    background-color: #fbfbfb;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
  }
`;

export const ChatWrapper = styled.section`
  background-color: transparent;
  width: 100%;
  padding: 10px;
`;

export const Form = styled.form`
  height: 200px;
  background-color: white;
  display: flex;
  justify-content: center;

  button {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    border: 0px;
    background-color: ${Colors.primary};
    margin-top: 45px;
    margin-left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .input-div {
    height: 50px;
    width: 80%;
    background-color: rgb(246, 246, 246);
    border-radius: 10px;
    margin-top: 40px;
    padding: 0 20px;
    display: flex;
  }

  input {
    height: 100%;
    width: 100%;
    outline: 0;
    border: 0;
    color: #000;
    background-color: transparent;
  }
`;

export const FileIcon = styled.div`
  cursor: "pointer";
  background-color: transparent;
  display: flex;
  align-items: center;
`;

export const MessageBox = styled.div`
  padding: 10px;
  background: transparent;

  div {
    background: transparent;
  }

  .msg {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    background: transparent;
  }
  .msg:last-of-type {
    margin: 0;
  }

  .msg-bubble {
    max-width: 60%;
    padding: 15px;
    border-radius: 15px;
    background: rgb(240, 240, 240);
  }

  .msg-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  .msg-info-name {
    margin-right: 10px;
    font-weight: bold;
  }
  .msg-info-time {
    font-size: 0.85em;
  }

  .left-msg .msg-bubble {
    border-bottom-left-radius: 0;
  }

  .right-msg {
    flex-direction: row-reverse;
  }
  .right-msg .msg-bubble {
    background: ${Colors.primary};
    color: #fff;
    border-bottom-right-radius: 0;
  }
  .right-msg .msg-img {
    margin: 0 0 0 10px;
  }
`;
