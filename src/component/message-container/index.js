import Loader from "component/common/Loader";
import dynamic from "next/dynamic";
import { useState } from "react";
import styled from "styled-components";
import ListContainer from "./list-container";

const MessageDetail = dynamic(() => import("./message-detail"), {
  loading: () => <p>Loading...</p>,
});

const MessageContainer = () => {
  // const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Container>
      <ListContainer />

      <MessageDetail />
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
