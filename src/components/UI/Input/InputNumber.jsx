import React, { forwardRef } from "react";
import { Input as AntInput } from "antd";
import { styled } from "styled-components";

export const InputNumber = forwardRef(({ label, ...otherProps }, ref) => {
  return (
    <div>
      <Label>{label}</Label>
      <InputStyled
        maxLength={9}
        addonBefore={"+996"}
        ref={ref}
        {...otherProps}
      />
    </div>
  );
});

const InputStyled = styled(AntInput)`
  &.ant-input-group-wrapper {
    background-color: white;
    margin-top: 8px;
    & .ant-input {
      padding: 10px;
    }
  }
`;

const Label = styled("label")`
  opacity: 0.6;
`;
