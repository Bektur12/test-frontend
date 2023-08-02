import React from "react";
import { Tag } from "antd";
import { styled } from "styled-components";

const CustomTags = ({ onTagClick }) => {
  const handleTagClick = (tagValue) => {
    onTagClick(tagValue);
  };

  const status = ["Бронь", "Куплено", "Активна"];
  return (
    <Wrapper>
      <span>Статус</span>
      <InnerWrapper>
        {status.map((item) => {
          return (
            <StyledTag onClick={() => handleTagClick(item)}>{item}</StyledTag>
          );
        })}
      </InnerWrapper>
    </Wrapper>
  );
};

export default CustomTags;

const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledTag = styled(Tag)`
  &.ant-tag {
    background-color: #f5f5f5;
    width: 74px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
`;
const InnerWrapper = styled("div")`
  display: flex;
  flex-wrap: wrap;
`;
