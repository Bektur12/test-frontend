import React, { useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { styled } from "styled-components";
import { Button } from "../UI/Button/Button";
import CustomTags from "../UI/Tags";
import { Input } from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { postFlat } from "../../store/actions/flats";

export const FlatsAddDrawer = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const onHandleClickGetStatus = (value) => {
    setStatus(value);
  };

  const [dataInput, setDataInput] = useState({
    fullName: "",
    clientNumber: null,
    contractNumber: null,
  });
  const handleClickSendFlats = () => {
    if (
      !dataInput.fullName &&
      !dataInput.clientNumber &&
      !dataInput.contractNumber
    )
      return null;
    dispatch(
      postFlat({
        data: { ...dataInput, status },
        onCloseDrawer: onClose,
      })
    );
    setDataInput({
      fullName: "",
      clientNumber: "",
      contractNumber: "",
    });
  };
  return (
    <ReusableDrawer
      open={open}
      onClose={() => onClose(false)}
      title={"Добавить"}
    >
      <ContentWrapper>
        <Input
          onChange={(e) =>
            setDataInput({ ...dataInput, fullName: e.target.value })
          }
          value={dataInput.fullName}
          label="ФИО клиента"
        />
        <Input
          label="Номер клиента"
          onChange={(e) =>
            setDataInput({ ...dataInput, clientNumber: e.target.value })
          }
          value={dataInput.clientNumber}
        />
        <Input
          label="№ Договора"
          onChange={(e) =>
            setDataInput({ ...dataInput, contractNumber: e.target.value })
          }
          value={dataInput.contractNumber}
        />
        <CustomTags onTagClick={onHandleClickGetStatus} />
        <Button backgroundColor="#5780EB" onClick={handleClickSendFlats}>
          Добавить
        </Button>
        <Button onClick={handleClickSendFlats}>Отмена</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
