import { ChatWrapper, MessageBox } from "./styles";

const Messages = () => {
  return (
    <ChatWrapper>
      {/* Left Container */}

      <MessageBox>
        <div className="msg left-msg">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">BOT</div>
              <div class="msg-info-time">12:45</div>
            </div>

            <div class="msg-text">
              Hi, welcome to SimpleChat! Go ahead and send me a message. 😄
            </div>
          </div>
        </div>
      </MessageBox>

      {/* Right Container */}

      <MessageBox>
        <div class="msg right-msg">
          <div class="msg-bubble">
            <div class="msg-info">
              <div class="msg-info-name">Sajad</div>
              <div class="msg-info-time">12:46</div>
            </div>

            <div class="msg-text">You can change your name in JS section!</div>
          </div>
        </div>
      </MessageBox>
    </ChatWrapper>
  );
};

export default Messages;
