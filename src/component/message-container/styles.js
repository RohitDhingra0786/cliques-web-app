import styled from "styled-components";
import { Colors } from "theme/colors";

export const Container = styled.div`
  width: 100%;
  height: calc(100% - 80px);

  .wrapper {
    display: flex;
    background-color: #fbfbfb;
    height: 100%;
    justify-content: space-between;
    flex-direction: column;
  }

  .loader-container {
    position: absolute;
    top: 45%;
    left: 60%;
    background: transparent;
  }
`;

export const ChatWrapper = styled.section`
  background-color: transparent;
  width: 100%;
  padding: 10px;
  overflow-y: scroll;
  max-height: 78%;

  display: flex; /* added */
  flex-flow: column-reverse;

  /* display: flex;
  flex-direction: column-reverse; */
  /* transform: scale(1, -1); */

  .system-msg {
    background-color: ${Colors.blueShadeGray};
    background-color: #add8e6;
    display: table;
    max-width: 60%;
    min-width: 100px;
    margin: auto;
    margin-bottom: 10px;
    padding: 4px 12px;
    border-radius: 5px;
    font-size: 12px;
    text-align: center;
  }
`;

export const Form = styled.form`
  height: 120px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    height: 40px;
    width: 40px;
    border-radius: 20px;
    border: 0px;
    background-color: ${Colors.primary};
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

  .seen-text {
    background: transparent;
    margin-top: 5px;
    color: #7777;
    font-size: 11px;
    text-align: right;
    right: 3px;
    position: relative;
  }
  .outer-div {
    display: flex;
    flex-direction: column;
    max-width: 60%;
  }

  audio {
    background: transparent;
    margin-top: 5px;
  }

  div {
    background: transparent;
  }

  .msg {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
    background: transparent;
    color: #000;
  }
  .msg:last-of-type {
    margin: 0;
  }

  .msg-bubble {
    /* max-width: 60%; */
    padding: 6px 10px;
    border-radius: 10px;
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
    font-size: 12px;
    margin-top: 5px;
  }
  .msg-info-time {
    font-size: 10px;
    margin-top: 5px;
    text-align: right;
    color: #707070;
  }

  .left-msg .msg-bubble {
    border-bottom-left-radius: 0;
  }

  .right-msg {
    flex-direction: row-reverse;
  }
  .right-msg .msg-bubble {
    color: #000;
    border-bottom-right-radius: 0;
    background-image: linear-gradient(to right, #f2e9fd, #d9f2ff);
  }
  .right-msg .msg-img {
    margin: 0 0 0 10px;
  }
`;

export const Notice = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: red;
  cursor: pointer;
`;
