import styled from "styled-components";
import { slide as Menu } from "react-burger-menu";
import Link from "next/link";
import { Colors } from "theme/colors";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <Menu
        noOverlay
        disableOverlayClick
        className="menu"
        width={"250px"}
        isOpen
      >
        <Link className="menu-link active-menu" href="/home">
          Home
        </Link>
        <Link className="menu-link" href="/about">
          About
        </Link>
      </Menu>
    </>
  );
};

export default DashboardLayout;

const Warpper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100vh;
  background-color: ${Colors.white};
`;

const RightWrapper = styled.div`
  margin-left: 250px;
  padding: 20px;
  box-shadow: 20px #fff;
`;
