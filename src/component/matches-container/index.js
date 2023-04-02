import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { useEffect } from "react";
import { getUserMatches } from "services/auth";
import { useDispatch, useSelector } from "react-redux";
import { getImageUrl } from "utils";
import Loader from "component/common/Loader";
import NoMatchIcon from "assets/images/noMatches.png";
import Image from "next/image";
import Header from "component/common/Header";
import { useRouter } from "next/router";
import { setSelectedChat } from "redux/message-reducer";
import { UpdateUserInboxMe, UpdateUserInboxOther } from "services/message";

const options = [
  { value: "all", label: "All" },
  { value: "solo", label: "Solos" },
  { value: "duo", label: "Duos" },
];

const MatchesContainer = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);
  const { inboxList } = useSelector((state) => state.message);

  //
  const [arrHolder, setArrHolder] = useState([]);
  const [selectedValue, setSelectedValue] = useState("all");
  const [matchedArr, setMatchedArr] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getMatches();
  }, [user_id]);

  const getMatches = async () => {
    setLoading(true);
    try {
      // const response = await getUserMatches(user_id);
      const response = await getUserMatches(125888);
      setSelectedValue("all");

      if (response.success === "true") {
        setMatchedArr(
          Array.isArray(response?.matched_arr) ? response?.matched_arr : []
        );
        setArrHolder(
          Array.isArray(response?.matched_arr) ? response?.matched_arr : []
        );
      } else {
        setMatchedArr([]);
        setArrHolder([]);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onValueChange = (key) => {
    let filterData = Array.from(arrHolder).filter((e) => e.type === key);
    setMatchedArr(key === "all" ? arrHolder : filterData);
  };

  console.log({ matchedArr });

  if (loading) {
    return <Loader isVisible={loading} />;
  }

  const onChat = (item) => {
    const isAvailable = inboxList.findIndex(
      (i) => i?.tempId == `u_${item?.other_user_id}`
    );

    if (isAvailable > -1) {
      // navigate("Conversation", {
      //   details: inboxList[isAvailable],
      //   inboxList: inboxList,
      // });

      dispatch(
        setSelectedChat({
          details: inboxList[isAvailable],
          other_user_id: item?.other_user_id,
        })
      );

      router.push("/messages");
    } else {
      const user_id_send = "u_" + user_id;
      const other_user_id = item?.other_user_id;
      const other_user_id_send = "u_" + other_user_id;

      const inbox_id_me = "u_" + other_user_id;
      const inbox_id_other = "u_" + user_id;

      var jsonUserDataMe = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        type: "single",
        user_id: other_user_id,
        typing_status: "no",
        block_status: "no",
        match_status: "yes",
        lastMsgTime: database.ServerValue.TIMESTAMP,
      };

      var jsonUserDataother = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        type: "single",
        user_id: user_id,
        typing_status: "no",
        block_status: "no",
        match_status: "yes",
        lastMsgTime: database.ServerValue.TIMESTAMP,
      };
      UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
      UpdateUserInboxOther(
        other_user_id_send,
        inbox_id_other,
        jsonUserDataother
      );

      setTimeout(() => {
        navigateUser(item);
      }, 2000);
    }
  };

  const navigateUser = (item) => {
    const updatedList = inboxList || [];
    const _newUser = updatedList?.findIndex(
      (i) => i?.tempId == `u_${item?.other_user_id}`
    );
    if (_newUser > -1) {
      dispatch(
        setSelectedChat({
          details: updatedList[_newUser],
          other_user_id: updatedList[_newUser]?.other_user_id,
        })
      );

      router.push("/messages");
    }
  };

  return (
    <Container>
      <Header title={"Matches"} />
      {!matchedArr?.length ? (
        <Empty>
          <Image priority={true} alt="empty-match" src={NoMatchIcon} />
          <span>You don't have any new Matches!</span>
        </Empty>
      ) : (
        <Select
          styles={{
            option: (baseStyles, state) => ({
              ...baseStyles,
              color: state?.isSelected ? "#fff" : "#000",
            }),
            singleValue: (baseStyles, state) => ({
              ...baseStyles,
              zIndex: 1000,
            }),
          }}
          value={Array.from(options).filter((e) => e.value === selectedValue)}
          className="dropdown"
          options={options}
          onChange={({ value }) => {
            setSelectedValue(value);
            onValueChange(value);
          }}
        />
      )}

      <List>
        {matchedArr.map((e, i) => (
          <Card key={i} url={getImageUrl(e?.user_image)}>
            <div className="layer"></div>
            <InfoContainer>
              {e?.user_name}{" "}
              <BiDotsVerticalRounded
                size={20}
                style={{ background: "transparent" }}
              />
            </InfoContainer>

            <ChatButton onClick={() => onChat(e)}>
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
  width: calc(100% - 120px);
  margin-left: auto;

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
  display: block;
  position: relative;
`;

const List = styled.div`
  padding-top: 20px;
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 100%;
  background-color: transparent;
  flex-wrap: wrap;

  > * {
    margin-right: 2%;

    @media only screen and (max-width: 768px) {
      margin-right: 5%;
    }
  }
  overflow-y: scroll;
  padding: 25px;
`;

const Card = styled.div`
  width: 180px;
  border-radius: 5px;
  background-size: cover;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
  height: 200px;

  @media only screen and (max-width: 768px) {
    width: 45%;
    height: 250px;
  }

  background-image: ${(props) => (props?.url ? `url(${props.url})` : "")};
  position: relative;
  .layer {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    z-index: 10;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: white;
  z-index: 20;
`;

const ChatButton = styled.button`
  background-image: linear-gradient(to right, #a46aeb, #4ab1e7);
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
  z-index: 20;
`;

const Empty = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  flex-direction: column;

  img {
    height: 50%;
    width: 50%;
    object-fit: contain;
    transform: rotate(-8deg);
  }

  span {
    color: #000;
    margin-top: 10px;
    text-align: center;
  }
`;
