import Header from "component/common/Header";
import MatchesContainer from "component/matches-container";
import useMessages from "hooks/use-messages";

const Home = () => {
  const {} = useMessages();
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
