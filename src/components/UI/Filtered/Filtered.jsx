import React from "react";
import { MenuFiltered } from "../Menu/MenuFiltered";
import { useSearchParams } from "react-router-dom";
import { styled } from "styled-components";

export const Filtered = ({ title }) => {
  const [params, setParams] = useSearchParams();

  const onHandleFilteredByStatus = ({ value }) => {
    const existingParams = Object.fromEntries(params);
    const newParams = { ...existingParams, status: value };
    setParams(newParams);
  };

  const options = [
    {
      value: "Активна",
    },
    {
      value: "Бронь",
    },
    {
      value: "Куплено",
    },
    {
      value: "Рассрочка",
    },
    {
      value: "Бартер",
    },
  ];
  return (
    <Wrapper>
      <Title>{title}</Title>
      <MenuFiltered items={options} onClick={onHandleFilteredByStatus} />
    </Wrapper>
  );
};

const Wrapper = styled("div")`
  display: flex;
  margin-bottom: 25px;
`;

const Title = styled("span")`
  font-family: Inter;
`;
