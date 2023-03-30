import MessageHeader from "./message-header";
import { useRef } from "react";
import ImageIcon from "assets/images/image.png";
import Image from "next/image";
import SendIcon from "assets/images/send.png";
import { ChatWrapper, Container, FileIcon, Form, MessageBox } from "./styles";
import Messages from "./messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { limitToLast, query, ref, onValue } from "firebase/database";
import { db } from "hoc/firebase";
import { setCurrentConversationList } from "redux/message-reducer";

const MessageDetail = ({ data }) => {
  const { user_id } = useSelector((state) => state.auth);
  const { messageLimit, conversationList } = useSelector(
    (state) => state.message
  );
  const dispatch = useDispatch();

  console.log({ user_id });

  // Ref
  const fileRef = useRef();

  useEffect(() => {
    const url =
      data?.details?.type == "group"
        ? `/message/${data?.details?.group_id}`
        : `/message/u_${user_id}__u_${data?.details?.user_id}`;

    console.log({ data });

    console.log({ url });

    const recentMessages = query(ref(db, url), limitToLast(messageLimit));

    onValue(recentMessages, (snapshot) => {
      dispatch(
        setCurrentConversationList(snapshot.exists() ? snapshot.val() : {})
      );
    });
  }, [data]);

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

  console.log({ conversationList });

  return (
    <Container>
      <MessageHeader />

      <div className="wrapper">
        <Messages list={conversationList || []} />

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
