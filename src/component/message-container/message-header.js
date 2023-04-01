import Image from "next/image";
import styled from "styled-components";
import UserImg from "assets/images/user.png";
import { BiDotsVerticalRounded } from "react-icons/bi";

const MessageHeader = ({ title, details }) => {
  return (
    <Header>
      <Image src={UserImg} height={50} width={50} />
      <div className="right-container">
        <div className="name-container">
          <span>{title}</span>
          {details?.type === "group" ? (
            <span className="active-text">
              {details?.membersList?.length} members
            </span>
          ) : (
            <span className="active-text">Inactive</span>
          )}
        </div>
        <BiDotsVerticalRounded
          size={30}
          style={{ background: "transparent" }}
        />
      </div>
    </Header>
  );
};
export default MessageHeader;

const Header = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  padding: 0 25px;
  align-items: center;

  .right-container {
    padding-left: 20px;
    color: #000;
    display: flex;
    justify-content: space-between;
    width: 100%;

    span {
      color: #000;
      font-size: 20px;
    }
  }

  .name-container {
    display: flex;
    flex-direction: column;

    .active-text {
      font-size: 14px;
      margin: 3px;
      color: rgb(210, 210, 209);
    }
  }
`;
