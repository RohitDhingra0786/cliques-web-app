import styled from "styled-components";
import { Colors } from "theme/colors";
import MessageHeader from "./message-header";

const MessageDetail = () => {
  return (
    <Container>
      <MessageHeader />

      <div className="wrapper">
        <ChatWrapper>Hi</ChatWrapper>

        <Form>
          <div className="input-div">
            <input placeholder="Your message..." type={"text"} />

            <label for="file">
              <span class="fa fa-edit edit-icon"> </span>
            </label>
            {/* <input type={"file"} /> */}

            {/* <label for="file">
              <span class="fa fa-edit edit-icon"> </span>
            </label>

            <input type="file" id="file" style="display: none;" /> */}
          </div>

          {/* <button>Test</button> */}
        </Form>
      </div>
    </Container>
  );
};

export default MessageDetail;

const Container = styled.div`
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

const ChatWrapper = styled.section`
  background-color: transparent;
`;

const Form = styled.form`
  height: 200px;
  background-color: white;
  display: flex;
  justify-content: center;

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
