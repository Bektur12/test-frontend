import React, { useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { getFlatsById, putFlat } from "../../store/actions/flats";
import { Button } from "antd";
import { styled } from "styled-components";
import CustomTags from "../UI/Tags";
import { useDispatch } from "react-redux";
import { Input } from "../UI/Input/Input";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export const FlatsEditDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const [params] = useSearchParams();

  const id = params.get("id");

  const [dataInput, setDataInput] = useState({
    fullName: "",
    clientNumber: null,
    contractNumber: null,
  });
  const [status, setStatus] = useState("");

  const getFlats = (flatsId) => {
    dispatch(getFlatsById(flatsId))
      .unwrap()
      .then((result) => {
        setDataInput({
          clientNumber: result.clientNumber,
          contractNumber: result.contractNumber,
          fullName: result.fullName,
          status: result,
        });
      });
  };

  useEffect(() => {
    getFlats(id);
  }, [id]);

  const handleClickSendFlats = () => {
    dispatch(
      putFlat({
        flatId: id,
        flatData: { ...dataInput, status },
      })
    );
    setDataInput({
      fullName: "",
      clientNumber: "",
      contractNumber: "",
    });
  };

  const onHandleClickGetStatus = (value) => {
    setStatus(value);
  };
  return (
    <ReusableDrawer open={open} onClose={onClose}>
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
        <Button onClick={handleClickSendFlats}>Добавить</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
