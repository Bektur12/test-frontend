import React, { useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { styled } from "styled-components";
import { Button } from "../UI/Button/Button";
import CustomTags from "../UI/Tags";
import { Input } from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { getFlats, postFlat } from "../../store/actions/flats";
import { Form } from "antd";
import { RULES, VALIDATE_TEXT } from "../../utils/consts";
import { InputNumber } from "../UI/Input/InputNumber";
import { useSearchParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";
import { useSnackbar } from "../../hooks/useSnackBar";

export const FlatsAddDrawer = ({ onClose, open }) => {
  const [form] = Form.useForm();

  const { notify } = useSnackbar();

  const [params] = useSearchParams();

  const { TABS, status: statusParam } = Object.fromEntries(params);

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const onHandleClickGetStatus = (value) => setStatus(value);

  const handleClickSendFlats = () => {
    form.validateFields().then((values) => {
      const { fullName, clientNumber, contractNumber, object, price, floor } =
        values;
      dispatch(
        postFlat({
          data: {
            fullName,
            clientNumber,
            contractNumber,
            object,
            price,
            floor,
            status,
          },
          onCloseDrawer: onClose,
          notify,
        })
      )
        .then(unwrapResult)
        .then(() => dispatch(getFlats({ title: TABS, status: statusParam })));

      form.resetFields();
    });
  };

  return (
    <ReusableDrawer
      open={open}
      onClose={() => onClose(false)}
      title={"Добавить"}
    >
      <ContentWrapper onFinish={handleClickSendFlats} form={form}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="ФИО клиента" />
        </Form.Item>

        <Form.Item name="clientNumber" rules={RULES}>
          <InputNumber label="Номер клиента" />
        </Form.Item>

        <Form.Item
          name="contractNumber"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="№ Договора" />
        </Form.Item>

        <Form.Item
          name="object"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="Объект" />
        </Form.Item>

        <Form.Item
          name="price"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="Цена" />
        </Form.Item>

        <Form.Item
          name="floor"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="Этаж" />
        </Form.Item>

        <CustomTags onTagClick={onHandleClickGetStatus} />
        <Button backgroundColor="#5780EB" htmlType="submit">
          Добавить
        </Button>
        <Button onClick={() => form.resetFields()}>Отмена</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & .ant-form-item {
    margin-bottom: 0;
  }
`;
