import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { HiOutlineChatBubbleOvalLeftEllipsis } from "react-icons/hi2";
import { useEffect } from "react";
import { getUserMatches } from "services/auth";
import { useSelector } from "react-redux";
import { getImageUrl } from "utils";
import Loader from "component/common/Loader";
import NoMatchIcon from "assets/images/noMatches.png";
import Image from "next/image";

const options = [
  { value: "all", label: "All" },
  { value: "solo", label: "Solos" },
  { value: "duo", label: "Duos" },
];

const MatchesContainer = () => {
  const { user_id } = useSelector((state) => state.auth);

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

  return (
    <Container>
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
            <InfoContainer>
              {e?.user_name}{" "}
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
  max-height: 250px;
  @media only screen and (max-width: 768px) {
    width: 70%;
    min-height: 300px;
  }

  background: ${(props) => `url(${props.url})`};
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: transparent;
  color: white;
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
