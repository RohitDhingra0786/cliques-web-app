import moment from "moment";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getAudioUrl, getImageUrl } from "utils";
import { ChatWrapper, MessageBox } from "./styles";
import UserImg from "assets/images/user.png";
import { useRef } from "react";
import { useEffect } from "react";
import { setMessageLimit } from "redux/message-reducer";
import { randomColors } from "theme/colors";
import { useState } from "react";

const Messages = ({ list, details }) => {
  const messagesRef = useRef();

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const { messageLimit } = useSelector((state) => state.message);

  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 500);
  }, [details]);

  useEffect(() => {
    const element = document.querySelector(".scroll-top");
    setTimeout(() => {
      const domNode = messagesRef.current;

      if (domNode && element?.scrollHeight) {
        domNode?.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 500);
  }, [list]);

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

  if (loader) return <></>;

  return (
    <ChatWrapper
      onScroll={handleScroll}
      className="scroll-top"
      ref={messagesRef}
    >
      {list.map((item, i) => {
        let myMsg = item?.senderId === user_id;

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
              <div className="outer-div">
                {!myMsg ? (
                  <div className="msg-info">
                    <div
                      style={{
                        color:
                          randomColors[
                            Math.floor(Math.random() * randomColors.length)
                          ],
                      }}
                      className="msg-info-name"
                    >
                      {item?.name}
                    </div>
                  </div>
                ) : null}

                <div className="msg-bubble">
                  {item?.messageType === "audio" ? (
                    <audio controls src={getAudioUrl(item?.message)} />
                  ) : item?.messageType === "gif" ? (
                    <Image
                      title="gif"
                      alt="gif"
                      width={200}
                      height={200}
                      src={item?.message}
                      style={{ borderRadius: 5, marginTop: 5 }}
                    />
                  ) : item?.messageType === "image" ? (
                    <a href={getImageUrl(item?.message)} target="_blank">
                      <Image
                        title="user-icon"
                        alt="user-icon"
                        width={200}
                        height={200}
                        src={getImageUrl(item?.message)}
                        style={{ borderRadius: 5, marginTop: 5 }}
                      />
                    </a>
                  ) : (
                    <div className="msg-text">{item?.message}</div>
                  )}

                  <div className="msg-info-time">
                    {moment(item?.timestamp).format("hh:mm A")}
                  </div>
                </div>

                {myMsg && item?.read_status === 3 && (
                  <span className="seen-text">Seen</span>
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
