import Image from "next/image";
import { Colors } from "theme/colors";
import UserImg from "assets/images/user.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { setSelectedUser } from "redux/auth-reducer";

const Header = ({ title }) => {
  const dispatch = useDispatch();
  const { usersList, user_id, selectedUser } = useSelector(
    (state) => state.auth
  );

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
      <NameLetter onClick={() => setActive(!isActive)}>
        {selectedUser?.user_name?.charAt(0)?.toUpperCase()}
      </NameLetter>
      <Overlay isActive={isActive}>
        {usersList?.map((e, i) => (
          <Item
            onClick={() => {
              dispatch(setSelectedUser(e));
              setActive(false);
            }}
            className={user_id === e?.user_id ? "selected-container" : ""}
            key={i}
          >
            <ImageConatiner>
              <Image
                height={25}
                width={25}
                src={e?.user_image || UserImg}
                alt="user"
                style={{ borderRadius: 20 }}
              />
            </ImageConatiner>
            <Info>
              <Name>{e.user_name}</Name>
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
  min-height: 150px;
  max-height: 40%;
  padding: 10px 5px;
  opacity: ${(props) => (props.isActive ? "1" : "0")};
  @media only screen and (max-width: 768px) {
    width: 50%;
  }
  overflow-y: scroll;

  .selected-container {
    border-radius: 5px;
    background-color: ${Colors.gray};
  }
`;

const Item = styled.div`
  display: flex;
  padding: 10px;
  flex-direction: row;
  cursor: pointer;
  margin: 4px 0;

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
