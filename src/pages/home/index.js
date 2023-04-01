import Header from "component/common/Header";
import MatchesContainer from "component/matches-container";
import useMessages from "hooks/use-messages";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUserDetail } from "redux/auth-reducer";
import { getotherUserInfo } from "services/auth";

const Home = () => {
  const dispatch = useDispatch();
  const { user_id } = useSelector((state) => state.auth);

  useEffect(() => {
    getuserInfo();
  }, [user_id]);

  const getuserInfo = async () => {
    try {
      const response = await getotherUserInfo({
        user_id: user_id,
        other_user_id: user_id,
        user_latitude: 30.704649,
        user_longitude: 76.717873,
      });
      console.log({ response });

      if (response?.success === "true") {
        let payload = response;
        delete payload.msg;
        delete payload.success;

        dispatch(setSelectedUserDetail(payload));
      }
    } catch (error) {}
  };

  return (
    <div className="dashboard-main">
      <Header title={"Matches"} />
      <div className="dashboard-container">
        <MatchesContainer />
      </div>
    </div>
  );
};

export default Home;
