import React from "react";
import { Button } from "../components/UI/Button/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const Header = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const viewText = () => {
    if (location.pathname === "/managers") {
      return "Менеджеры";
    } else if (location.pathname === "/flats") {
      return "Квартиры";
    }
  };

  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <HeaderStyled>
      <Title>{viewText()}</Title>
      <Button onClick={handleClickLogout}>logout</Button>
    </HeaderStyled>
  );
};

const HeaderStyled = styled("header")`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Inter;
  font-size: 17px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  border-bottom: 1px solid #d9d9d9;
`;

const Title = styled("span")`
  opacity: 0.3;
`;
