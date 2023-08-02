import React, { forwardRef } from "react";
import { Input as AntInput } from "antd";
import { styled } from "styled-components";

export const Input = forwardRef(({ label, ...otherProps }, ref) => {
  return (
    <div>
      <Label>{label}</Label>
      <InputStyled ref={ref} {...otherProps} />
    </div>
  );
});

const InputStyled = styled(AntInput)`
  &.ant-input {
    background-color: white;
    padding: 10px;
    margin-top: 8px;
  }
`;

const Label = styled("label")`
  opacity: 0.6;
`;
