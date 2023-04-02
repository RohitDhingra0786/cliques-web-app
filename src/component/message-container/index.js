import dynamic from "next/dynamic";
import styled from "styled-components";
import ListContainer from "./list-container";
import useMediaQuery from "hooks/use-mediaQuery";
import { useSelector } from "react-redux";

const MessageDetail = dynamic(() => import("./message-detail"), {
  loading: () => <p>Loading...</p>,
});

const MessageContainer = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { selectedChat } = useSelector((state) => state.message);

  return (
    <Container>
      {(isMobile && !selectedChat?.details) || isDesktop ? (
        <ListContainer />
      ) : null}

      {selectedChat?.details ? <MessageDetail /> : null}
    </Container>
  );
};

export default MessageContainer;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: calc(100% - 120px);
  margin-left: auto;
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
