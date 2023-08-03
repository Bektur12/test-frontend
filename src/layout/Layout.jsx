import React from "react";
import SideBar from "../components/UI/Sidebar/SideBar";
import { Layout as AntLayout } from "antd";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { Header } from "./Header";

const { Content } = AntLayout;

export const Layout = () => {
  return (
    <Container>
      <SideBar />
      <div className="content">
        <Header />
        <Outlet />
      </div>
    </Container>
  );
};

const Container = styled("div")`
  display: flex;
  height: 100vh;
  width: 100%;
  .content {
    width: 100%;
    height: inherit;
  }
`;
