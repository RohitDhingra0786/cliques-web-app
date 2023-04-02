import Image from "next/image";
import styled from "styled-components";
import UserImg from "assets/images/user.png";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BiArrowBack } from "react-icons/bi";
import {
  blockUnblockUser,
  chatRoomIdUpdate,
  clearChatSingle,
  leftGroup,
} from "services/message";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedChat } from "redux/message-reducer";
import { getImageUrl } from "utils";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";
import { db } from "hoc/firebase";
import { useState } from "react";

const MessageHeader = ({ title, details, blocked }) => {
  const dispatch = useDispatch();
  const { user_id, selectedUser } = useSelector((state) => state.auth);
  const { inboxList } = useSelector((state) => state.message);
  const [onlineStatus, setOnlineStatus] = useState(false);

  const isGroup = details?.type === "group";

  const onBackPress = () => {
    dispatch(setSelectedChat(null));

    chatRoomIdUpdate(user_id, "no");
  };

  useEffect(() => {
    if (details?.type !== "group") {
      onValue(ref(db, "users/" + details?.tempId), (snapshot) => {
        if (snapshot.exists()) {
          let info = snapshot.val();
          setOnlineStatus(info.onlineStatus === "true" ? true : false);
        }
      });
    }
  }, []);

  const onClearChat = () => {
    clearChatSingle(user_id, details?.user_id);
  };

  const onBlockUnblock = () => {
    blockUnblockUser(
      user_id,
      details?.user_id,
      details?.block_status == "no" ? "yes" : "no"
    );
  };

  const onLeave = () => {
    leftGroup(details?.group_id, user_id);
    onPressSendMessage(
      "text",
      `"${selectedUser?.user_name}" left the group`,
      1
    );

    dispatch(setSelectedChat(null));
  };

  console.log({ inboxList });
  console.log({ details });

  return (
    <Header>
      <BiArrowBack
        onClick={onBackPress}
        className="back-icon"
        size={35}
        color="#000"
      />

      {details?.type === "group" ? (
        <GroupIcon>{title?.slice(0, 2)?.toUpperCase()}</GroupIcon>
      ) : (
        <Image
          src={getImageUrl(details?.image) || UserImg}
          height={50}
          width={50}
          style={{ borderRadius: 25 }}
        />
      )}

      <div className="right-container">
        <div className="name-container">
          <span>{title}</span>
          {details?.type === "group" ? (
            <span className="active-text">
              {details?.membersList?.length} members
            </span>
          ) : (
            <span className={`active-text  ${onlineStatus ? "active" : ""}`}>
              {onlineStatus ? "Active" : "Inactive"}
            </span>
          )}
        </div>

        <DropDownMenu>
          <BiDotsVerticalRounded id="icon" size={30} />

          <div class="dropdown-content">
            {isGroup ? (
              <li onClick={onLeave}>Leave Group</li>
            ) : (
              <>
                {!blocked ? (
                  <li onClick={onBlockUnblock} className="block-user">
                    {details?.block_status === "yes" ? "Unblock" : "Block User"}
                  </li>
                ) : (
                  <></>
                )}
                <li onClick={onClearChat}>Clear Chat</li>
              </>
            )}
          </div>
        </DropDownMenu>
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

  .back-icon {
    margin-right: 30px;
    cursor: pointer;
  }

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
    .active {
      color: green;
    }
  }
`;

const GroupIcon = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: #017bfc;
  color: #fff;
  font-size: 12px;
`;

const DropDownMenu = styled.div`
  position: relative;
  display: inline-block;

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  :hover .dropdown-content {
    display: block;
    right: 10px;
  }

  li {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 15px;
    cursor: pointer;
  }

  li:hover {
    background-color: #f1f1f1;
  }

  .block-user {
    color: red;
  }
`;
