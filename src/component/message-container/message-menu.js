import styled from "styled-components";
import {
  AiFillHome,
  AiFillMessage,
  AiOutlineHome,
  AiOutlineMessage,
} from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { onLogout } from "redux/auth-reducer";

const MessageMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pathname } = router;

  console.log({ pathname });

  const handleLogout = () => {
    dispatch(onLogout());
    router.replace("/login");
  };

  return (
    <Menu>
      {pathname === "/home" ? (
        <AiFillHome
          className="icons"
          size={30}
          onClick={() => router.push("/home")}
        />
      ) : (
        <AiOutlineHome
          className="icons not-active"
          size={30}
          onClick={() => router.push("/home")}
        />
      )}

      {pathname === "/messages" ? (
        <AiFillMessage
          onClick={() => router.push("/messages")}
          className="icons"
          size={30}
        />
      ) : (
        <AiOutlineMessage
          className="icons not-active"
          size={30}
          onClick={() => router.push("/messages")}
        />
      )}

      <BiLogOut onClick={handleLogout} className="icons not-active" size={30} />
    </Menu>
  );
};

export default MessageMenu;

const Menu = styled.div`
  width: 120px;

  height: 100vh;
  background-image: linear-gradient(180deg, #a46aeb, #4ab1e7);
  flex-direction: column;
  display: flex;
  align-items: center;

  padding-top: 5%;
  position: fixed;

  z-index: 1000;

  > * {
    margin-bottom: 50px;
  }

  .icons {
    background: transparent;
    cursor: pointer;
    color: #fff;
  }

  .not-active {
    opacity: 0.8;
  }

  @media only screen and (max-width: 768px) {
    visibility: hidden;
    width: 0%;
  }
`;
