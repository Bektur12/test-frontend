import React from "react";
import { Button } from "../components/UI/Button/Button";
import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickLogout = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/signin");
  };
  return (
    <HeaderStyled>
      <Button onClick={handleClickLogout}>logout</Button>
    </HeaderStyled>
  );
};

const HeaderStyled = styled("header")`
  padding: 20px;
  text-align: end;
`;
