import useMessages from "hooks/use-messages";
import { useState } from "react";
import styled from "styled-components";
import ListContainer from "./list-container";
import MessageDetail from "./message-detail";

const MessageContainer = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Container>
      <ListContainer setSelectedChat={setSelectedChat} />
      {selectedChat ? <MessageDetail data={selectedChat} /> : null}
    </Container>
  );
};

export default MessageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
`;
