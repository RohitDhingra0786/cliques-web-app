import styled from "styled-components";
import ListContainer from "./list-container";
import MessageDetail from "./message-detail";

const MessageContainer = () => {
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
