import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";

const options = [
  { value: "all", label: "All" },
  { value: "solo", label: "Solos" },
  { value: "duo", label: "Duos" },
];

const MatchesContainer = () => {
  const [selectedValue, setSelectedValue] = useState("all");

  return (
    <Container>
      <Select
        value={selectedValue}
        className="dropdown"
        options={options}
        onChange={({ value }) => setSelectedValue(value)}
      />

      <List>
        {[1, 2, 3, 4, 5, 6, 7, 8, 92, 23, 4, 2, 3, 4, 5].map((e, i) => (
          <Card key={i}>
            <InfoContainer>
              Rohit{" "}
              <BiDotsVerticalRounded
                size={20}
                style={{ background: "transparent" }}
              />
            </InfoContainer>

            <ChatButton>
              <HiOutlineChatBubbleOvalLeftEllipsis
                style={{ background: "transparent", marginRight: 5 }}
                size={20}
              />
              Chat
            </ChatButton>
          </Card>
        ))}
      </List>
    </Container>
  );
};

export default MatchesContainer;

const Container = styled.div`
  height: 100%;
  background-color: transparent;
  width: calc(100% - 250px);
  margin-left: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Card = styled.div`
  width: 180px;
  border-radius: 5px;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80");
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 0px;
  min-height: 200px;
  @media only screen and (max-width: 768px) {
    width: 70%;
    min-height: 300px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: white;
`;

const ChatButton = styled.button`
  background-image: linear-gradient(to  right,#a46aeb, #4ab1e7);
  margin-top: 10px;
  height: 35px;
  width: 60%;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: white;
  align-self: center;
  border: 0px;
  cursor: pointer;
`;

const List = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: transparent;
  flex-wrap: wrap;
  > * {
    margin-right: 5%;
    margin-bottom: 50px;
  }
  overflow-y: scroll;
`;
