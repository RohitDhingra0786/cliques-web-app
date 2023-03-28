import styled from "styled-components";
import CreateIcon from "assets/images/edit.png";
import Image from "next/image";
import UserImg from "assets/images/user.png";
import { Colors } from "theme/colors";

const ListContainer = () => {
  return (
    <Container>
      <TopContainer>
        <h1 className="msg-heading">Messages</h1>
        <Image alt="icon" src={CreateIcon} height={20} width={20} />
      </TopContainer>

      <div className="list-container">
        {[1, 2, 4, 5, 6, 7, 5, 6, 7, 88].map((e, i) => (
          <Card key={i}>
            <Image alt="profile-icon" src={UserImg} height={35} width={35} />

            <div className="card-info">
              <div className="info-div">
                <label className="user-name">Rohit</label>
                <span className="time-text">4:30PM</span>
              </div>
              <p className="last-msg">Hi New message</p>
            </div>
          </Card>
        ))}
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
    height: 100%;
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
    width: 100%;
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
  }
`;
