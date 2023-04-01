import moment from "moment";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAudioUrl, getImageUrl } from "utils";
import { ChatWrapper, MessageBox } from "./styles";
import UserImg from "assets/images/user.png";
import { useRef } from "react";
import { useEffect } from "react";
import { setMessageLimit } from "redux/message-reducer";

const Messages = ({ list, details }) => {
  const messagesRef = useRef();

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const { messageLimit } = useSelector((state) => state.message);

  useEffect(() => {
    const element = document.querySelector(".scroll-top");
    setTimeout(() => {
      const domNode = messagesRef.current;

      if (domNode) {
        domNode?.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 500);
  }, [details]);

  const getImage = (val) => {
    let userObj = details.membersList.find((e) => e.user_id === val.senderId);

    if (userObj?.image) {
      return getImageUrl(userObj?.image);
    }
    return UserImg;
  };

  const handleScroll = (event) => {
    if (event.target.scrollTop === 0 && messageLimit <= list?.length) {
      dispatch(setMessageLimit(messageLimit + 20));
    }
  };

  return (
    <ChatWrapper
      onScroll={handleScroll}
      className="scroll-top"
      ref={messagesRef}
    >
      {list.map((item, i) => {
        if (item?.senderId === 0)
          return (
            <div key={i} className="system-msg">
              {item.message}
            </div>
          );
        return (
          <MessageBox key={i}>
            <div
              className={`msg  ${
                item?.senderId === user_id ? "right-msg" : "left-msg"
              }  `}
            >
              {item?.senderId !== user_id && details?.type === "group" ? (
                <Image
                  title="group-icon"
                  alt="group-icon"
                  style={{ marginRight: 10, borderRadius: 15 }}
                  height={30}
                  width={30}
                  src={getImage(item)}
                />
              ) : null}

              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">{item?.name}</div>
                  <div class="msg-info-time">
                    {moment(item?.timestamp).format("hh:mm A")}
                  </div>
                </div>

                {item?.messageType === "audio" ? (
                  <audio controls src={getAudioUrl(item?.message)} />
                ) : item?.messageType === "gif" ? (
                  <Image
                    title="gif"
                    alt="gif"
                    width={200}
                    height={200}
                    src={item?.message}
                    style={{ borderRadius: 5 }}
                  />
                ) : item?.messageType === "image" ? (
                  <Image
                    title="user-icon"
                    alt="user-icon"
                    width={200}
                    height={200}
                    src={getImageUrl(item?.message)}
                    style={{ borderRadius: 5 }}
                  />
                ) : (
                  <div class="msg-text">{item?.message}</div>
                )}
              </div>
            </div>
          </MessageBox>
        );
      })}
    </ChatWrapper>
  );
};

export default Messages;
