import React, { useState } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import {
  getFlatsById,
  putFlat,
  getFlats as getFlatsRequest,
} from "../../store/actions/flats";
import { Form } from "antd";
import { styled } from "styled-components";
import CustomTags from "../UI/Tags";
import { useDispatch } from "react-redux";
import { Input } from "../UI/Input/Input";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../UI/Button/Button";
import { RULES, VALIDATE_TEXT } from "../../utils/consts";
import { InputNumber } from "../UI/Input/InputNumber";
import { useSnackbar } from "../../hooks/useSnackBar";
import { unwrapResult } from "@reduxjs/toolkit";

export const FlatsEditDrawer = ({ open, onClose }) => {
  const dispatch = useDispatch();

  const { notify } = useSnackbar();

  const [form] = Form.useForm();

  const [params, setParams] = useSearchParams();

  const id = params.get("id");
  const { TABS, status: statusParam } = Object.fromEntries(params);

  const [status, setStatus] = useState("");

  const getFlats = (flatsId) => {
    dispatch(getFlatsById(flatsId))
      .unwrap()
      .then((result) => {
        form.setFieldsValue({
          clientNumber: result.clientNumber,
          contractNumber: result.contractNumber,
          fullName: result.fullName,
          status: result,
        });
      });
  };

  useEffect(() => {
    if (id) {
      getFlats(id);
    }
  }, [id]);

  const handleClickEditFlats = () => {
    form.validateFields().then((values) => {
      dispatch(
        putFlat({
          flatId: id,
          flatData: { ...values, status },
          notify,
        })
      )
        .then(unwrapResult)
        .then(() =>
          dispatch(getFlatsRequest({ title: TABS, status: statusParam }))
        );
      form.resetFields();
      setParams({});
    });
  };

  const onHandleClickGetStatus = (value) => {
    setStatus(value);
  };

  return (
    <ReusableDrawer open={open} onClose={onClose}>
      <ContentWrapper form={form} onFinish={handleClickEditFlats}>
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

        <CustomTags onTagClick={onHandleClickGetStatus} />
        <Button htmlType="submit">Добавить</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
