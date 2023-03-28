import Image from "next/image";
const { default: styled } = require("styled-components");
const { Colors } = require("theme/colors");
import UserImg from "assets/images/user.png";
import { useState } from "react";

const userArr = [
  { name: "Rohit", email: "rohit@mailiator.com" },
  { name: "Dalbir", email: "dalbir@mailiator.com" },
];

const Header = ({ title }) => {
  const [isActive, setActive] = useState(false);

  const onClickOutsideListener = () => {
    setActive(false);
    document.removeEventListener("click", onClickOutsideListener);
  };

  return (
    <Container
      onMouseLeave={() => {
        document.addEventListener("click", onClickOutsideListener);
      }}
    >
      <Title>{title}</Title>
      <NameLetter onClick={() => setActive(!isActive)}>R</NameLetter>
      <Overlay isActive={isActive}>
        {userArr.map((e, i) => (
          <Item key={i}>
            <ImageConatiner>
              <Image height={25} width={25} src={UserImg} alt="user" />
            </ImageConatiner>
            <Info>
              <Name>{e.name}</Name>
              <Email>{e.email}</Email>
            </Info>
          </Item>
        ))}
      </Overlay>
    </Container>
  );
};

export default Header;

const Container = styled.header`
  height: 80px;
  border-bottom: 1px solid ${Colors.gray};
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  width: calc(100% - 250px);
  margin-left: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const Title = styled.h2`
  color: ${Colors.black};
`;

const NameLetter = styled.button`
  height: 40px;
  width: 40px;
  border-radius: 25px;
  display: flex;
  background-color: ${Colors.primary};
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0px;
  color: #fff;
  :hover,
  :focus,
  :active {
    border: 3px solid ${Colors.lightBlue};
  }
`;

const Overlay = styled.div`
  position: absolute;
  z-index: ${(props) => (props.isActive ? "1000" : "0")};
  right: 30px;
  top: 60px;
  background-color: ${Colors.white};
  width: 20%;
  border-radius: 5px;
  color: black;
  box-shadow: 0 3px 3px rgb(0 0 0 / 0.2);
  border: 4px solid ${Colors.gray};
  max-height: 20%;
  padding: 10px 5px;
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;

const Item = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  cursor: pointer;
  :hover {
    border-radius: 5px;
    background-color: ${Colors.gray};
  }
`;

const ImageConatiner = styled.div`
  width: 20%;
  background-color: transparent;
  display: flex;
  align-items: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;

const Name = styled.span`
  font-size: 14px;
  background-color: transparent;
`;

const Email = styled.span`
  font-size: 12px;
  background-color: transparent;
`;
