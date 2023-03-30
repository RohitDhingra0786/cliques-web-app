import Image from "next/image";
import { useSelector } from "react-redux";
import { getImageUrl } from "utils";
import { ChatWrapper, MessageBox } from "./styles";

const Messages = ({ list }) => {
  const { user_id } = useSelector((state) => state.auth);

  return (
    <ChatWrapper>
      {/* Left Container */}

      {list.map((item, i) => {
        // if (item?.senderId !== user_id) {
        return (
          <MessageBox key={i}>
            <div
              class={`msg  ${
                item?.senderId !== user_id ? "right-msg" : "left-msg"
              }  `}
            >
              <div class="msg-bubble">
                <div class="msg-info">
                  <div class="msg-info-name">{item?.name}</div>
                  <div class="msg-info-time">12:46</div>
                </div>

                {item?.messageType === "gif" ? (
                  <Image
                    width={200}
                    height={200}
                    src={item?.message}
                    style={{ borderRadius: 5 }}
                  />
                ) : item?.messageType === "image" ? (
                  <Image
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
