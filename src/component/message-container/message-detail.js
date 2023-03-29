import MessageHeader from "./message-header";
import { useRef } from "react";
import ImageIcon from "assets/images/image.png";
import Image from "next/image";
import SendIcon from "assets/images/send.png";
import { ChatWrapper, Container, FileIcon, Form, MessageBox } from "./styles";
import Messages from "./messages";

const MessageDetail = () => {
  const fileRef = useRef();

  const rendetImageIcon = () => {
    return (
      <FileIcon>
        <input
          multiple
          accept="image/*"
          style={{ display: "none" }}
          type={"file"}
          // onChange={this.fileSelectedHandler}

          ref={fileRef}
        />

        <Image
          alt="file-icon"
          onClick={() => fileRef?.current?.click()}
          src={ImageIcon}
          height={20}
          width={20}
          style={{ background: "transparent", cursor: "pointer" }}
        />
      </FileIcon>
    );
  };

  return (
    <Container>
      <MessageHeader />

      <div className="wrapper">
        <Messages />

        <Form>
          <div className="input-div">
            <input placeholder="Your message..." type={"text"} />

            <label for="file">
              <span class="fa fa-edit edit-icon"> </span>
            </label>

            {rendetImageIcon()}
          </div>

          <button>
            <Image src={SendIcon} height={16} width={16} />
          </button>
        </Form>
      </div>
    </Container>
  );
};

export default MessageDetail;
