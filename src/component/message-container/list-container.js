import styled from "styled-components";
import CreateIcon from "assets/images/edit.png";
import Image from "next/image";
import UserImg from "assets/images/user.png";
import { Colors } from "theme/colors";
import { getImageUrl } from "utils";
import moment from "moment";
import { BsFileEarmarkMusicFill, BsFillImageFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  chatRoomIdUpdate,
  msg_update_read_status,
  UpdateUserInboxMe,
} from "services/message";
import {
  setCurrentConversationList,
  setMessageLimit,
  setSelectedChat,
} from "redux/message-reducer";

const ListContainer = ({}) => {
  const dispatch = useDispatch();

  const { inboxList, allUserList } = useSelector((state) => state.message);
  const { user_id } = useSelector((state) => state.auth);

  console.log("inboxList", inboxList);

  const onCardPress = (item) => {
    dispatch(setSelectedChat({ details: item, other_user_id: item?.user_id }));

    dispatch(setCurrentConversationList([]));
    dispatch(setMessageLimit(20));

    if (item?.count > 0 && item?.type !== "group") {
      onPressChat(item);
    } else {
      UpdateUserInboxMe("u_" + user_id, item?.group_id, {
        count: 0,
      });
    }

    chatRoomIdUpdate(
      user_id,
      item?.type == "group" ? item?.group_id : item?.user_id
    );
  };

  const onPressChat = (detail) => {
    const user_id_send = "u_" + user_id;
    const inbox_id_me = "u_" + detail?.user_id;
    UpdateUserInboxMe(user_id_send, inbox_id_me, {
      count: 0,
    });
    msg_update_read_status(user_id, detail?.user_id, allUserList);
  };

  const renderLastMsg = (e) => (
    <BottomDiv>
      <p className="last-msg">
        {e?.messageType == "audio" ||
        e?.lastMsgType == "audio" ||
        e?.lastMessageType == "audio" ? (
          <BsFileEarmarkMusicFill size={10} color={Colors.primary} />
        ) : e?.messageType == "image" ||
          e?.lastMsgType == "image" ||
          e?.lastMessageType == "image" ? (
          <BsFillImageFill size={10} color={Colors.primary} />
        ) : (
          ""
        )}

        {e?.type === "group"
          ? e?.messageType == "image" || e?.lastMsgType == "image"
            ? "Photo"
            : e?.messageType == "audio" || e?.lastMsgType == "audio"
            ? "Voice Note"
            : e?.lastMsgType == "text" || e?.lastMsgType == ""
            ? e?.lastMsg
            : ""
          : e?.lastMessageType == "text" || e?.lastMessageType == ""
          ? e?.lastMsg
          : e?.lastMessageType == "audio" || e?.lastMessageType == "audio"
          ? "Voice Note"
          : "Photo"}
      </p>

      {/* Count */}
      <Count isHide={!e?.count}>{e?.count}</Count>
    </BottomDiv>
  );

  const renderGroupImage = (info) => {
    let list = info?.membersList || [];
    list = list.filter((e) => e.image);

    return <></>;
  };

  return (
    <Container>
      <TopContainer>
        <h1 className="msg-heading">Messages</h1>
        <Image alt="icon" src={CreateIcon} height={20} width={20} />
      </TopContainer>

      <div className="list-container">
        {inboxList?.map((e, i) => {
          return (
            <Card onClick={() => onCardPress(e)} key={i}>
              {e?.type == "group" && e.hasOwnProperty("groupIcon") ? (
                <GroupIcon>{e?.name?.slice(0, 2)}</GroupIcon>
              ) : e?.type == "group" ? (
                renderGroupImage(e)
              ) : (
                <Image
                  alt="profile-icon"
                  src={getImageUrl(e?.image) || UserImg}
                  height={35}
                  width={35}
                  style={{ borderRadius: 35 / 2 }}
                />
              )}

              <div className="card-info">
                <div className="info-div">
                  <label className="user-name">{e?.name}</label>
                  <span className="time-text">
                    {moment(e?.lastMsgTime).fromNow()}
                  </span>
                </div>
                {renderLastMsg(e)}
              </div>
            </Card>
          );
        })}
      </div>
    </Container>
  );
};

export default ListContainer;

const Container = styled.div`
  width: 25%;
  height: 100%;

  border-right: 1px solid #ddd;
  .list-container {
    overflow-y: scroll;
    height: 90%;
    padding: 0 25px;
    margin-top: 10px;
  }
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px;

  .msg-heading {
    color: #000;
  }
`;

const Card = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 0.6px solid ${Colors.gray};
  margin-bottom: 20px;
  cursor: pointer;

  .card-info {
    display: block;
    width: 90%;
    padding-left: 15px;
    margin-top: 4px;
  }

  .info-div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .user-name {
    color: #000;
  }

  .time-text {
    font-size: 12px;
    color: rgb(196, 196, 196);
  }

  .last-msg {
    font-size: 13px;
    margin-top: 8px;
    font-weight: 400;
    color: #000;

    * {
      margin-right: 5px;
    }
  }
`;

const BottomDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2px;
`;

const Count = styled.div`
  height: 16px;
  width: 16px;
  border-radius: 10px;
  background-color: ${Colors.primary};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  visibility: ${(props) => (props?.isHide ? "hidden" : "visible")};
`;

const GroupIcon = styled.div`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  justify-content: center;
  display: flex;
  align-items: center;
  background-color: ${Colors.primary};
  color: #fff;
  font-size: 12px;
`;
