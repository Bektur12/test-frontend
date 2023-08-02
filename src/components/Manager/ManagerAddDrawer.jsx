import React, { useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { styled } from "styled-components";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { postManager } from "../../store/actions/managers";
import { useSnackbar } from "../../hooks/useSnackBar";

export const ManagerAddDrawer = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const { notify } = useSnackbar();

  const [dataInput, setDataInput] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: "",
  });
  const handleClickSendFlats = () => {
    if (
      !dataInput.fullName &&
      !dataInput.phone &&
      !dataInput.email &&
      !dataInput.password
    )
      return null;
    dispatch(
      postManager({
        data: { ...dataInput },
        onCloseDrawer: onClose,
        notify,
      })
    );
    setDataInput({
      fullName: "",
      phone: "",
      email: "",
      password: "",
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
          label="Номер"
          onChange={(e) =>
            setDataInput({ ...dataInput, phone: e.target.value })
          }
          value={dataInput.phone}
        />
        <Input
          label="Почта"
          onChange={(e) =>
            setDataInput({ ...dataInput, email: e.target.value })
          }
          value={dataInput.email}
        />
        <Input
          label="Временный пароль"
          onChange={(e) =>
            setDataInput({ ...dataInput, password: e.target.value })
          }
          value={dataInput.password}
        />

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
