import React, { useEffect, useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { Button } from "antd";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { Input } from "../UI/Input/Input";
import { useSearchParams } from "react-router-dom";
import { getManagersById, putManager } from "../../store/actions/managers";

export const ManagerEditDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [params] = useSearchParams();

  const id = params.get("id");

  const [dataInput, setDataInput] = useState({
    fullName: "",
    phone: "",
    email: "",
  });

  const getManagersId = (managerId) => {
    dispatch(getManagersById(managerId))
      .unwrap()
      .then((result) => {
        setDataInput({
          fullName: result.fullName,
          phone: result.phone,
          email: result.email,
        });
      });
  };

  useEffect(() => {
    getManagersId(id);
  }, [id]);

  const handleClickSendFlats = () => {
    dispatch(
      putManager({
        id: id,
        data: { ...dataInput },
        onClose,
      })
    );
    setDataInput({
      fullName: "",
      phone: "",
      email: "",
    });
  };

  return (
    <ReusableDrawer
      open={open}
      onClose={onClose}
      title={"Измененить данные менеджера"}
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
        <Button onClick={handleClickSendFlats}>Сохранить</Button>
        <Button onClick={() => onClose(false)}>Отмена</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
