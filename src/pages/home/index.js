import Header from "component/common/Header";
import MatchesContainer from "component/matches-container";

const Home = () => {
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
