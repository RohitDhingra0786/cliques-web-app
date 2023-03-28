import styled from "styled-components";
import { reveal as Menu } from "react-burger-menu";
import Link from "next/link";
import { Colors } from "theme/colors";
import { useDispatch } from "react-redux";
import { onLogout } from "redux/auth-reducer";
import { useRouter } from "next/router";

const DashboardLayout = ({}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(onLogout());
    router.replace("/login");
  };

  return (
    <>
      <Menu
        isOpen
        noOverlay
        disableOverlayClick
        className="menu"
        width={"250px"}
      >
        <Link className="menu-link active-menu" href="/home">
          Home
        </Link>

        <Link className="menu-link" href="/messages">
          Messages
        </Link>
        <Logout onClick={handleLogout}>Logout</Logout>
      </Menu>
    </>
  );
};

export default DashboardLayout;

const Logout = styled.div`
  color: ${Colors.red};
  height: 45px;
  padding: 13px 0px 0px 10px;
  cursor: pointer;
  :hover {
    background-color: ${Colors.gray};
    border-radius: 5px;
  }
`;
