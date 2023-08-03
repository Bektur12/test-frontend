import React from "react";
import { Button as AntButton } from "antd";
import { styled } from "styled-components";

export const Button = ({ onClick, children, backgroundColor, ...other }) => {
  return (
    <ButtonStyled
    background={backgroundColor}
      onClick={onClick}
      {...other}
    >
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled(AntButton)`
  &.ant-btn {
    background: ${(p) => p.background};
  }
`;
