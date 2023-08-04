import React, { useEffect } from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { Form } from "antd";
import { styled } from "styled-components";
import { useDispatch } from "react-redux";
import { Input } from "../UI/Input/Input";
import { useSearchParams } from "react-router-dom";
import { getManagersById, putManager } from "../../store/actions/managers";
import { RULES, VALIDATE_TEXT } from "../../utils/consts";
import { Button } from "../UI/Button/Button";
import { InputNumber } from "../UI/Input/InputNumber";
import { useSnackbar } from "../../hooks/useSnackBar";

export const ManagerEditDrawer = ({ open, onClose }) => {
  const { notify } = useSnackbar();

  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [params] = useSearchParams();

  const id = params.get("id");

  const getManagersId = (managerId) => {
    dispatch(getManagersById(managerId))
      .unwrap()
      .then((result) => {
        form.setFieldsValue({
          email: result.email,
          fullName: result.fullName,
          phone: result.phone,
        });
      });
  };

  useEffect(() => {
    getManagersId(id);
  }, [id]);

  const handleClickUpdateManager = () => {
    form.validateFields().then((values) => {
      dispatch(
        putManager({
          id: id,
          data: { ...values },
          onClose,
          notify,
        })
      );
      form.resetFields();
    });
  };

  return (
    <ReusableDrawer
      open={open}
      onClose={onClose}
      title={"Изменить данные менеджера"}
    >
      <ContentWrapper form={form} onFinish={handleClickUpdateManager}>
        <Form.Item
          name="fullName"
          rules={[{ required: true, message: VALIDATE_TEXT }]}
        >
          <Input label="ФИО клиента" />
        </Form.Item>
        <Form.Item name="phone" rules={RULES}>
          <InputNumber label="Номер" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: VALIDATE_TEXT },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input label="Почта" />
        </Form.Item>
        <Button backgroundColor="#5780EB" htmlType="submit">
          Сохранить
        </Button>
        <Button onClick={() => onClose(false)}>Отмена</Button>
      </ContentWrapper>
    </ReusableDrawer>
  );
};

const ContentWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  & .ant-form-item {
    margin-bottom: 0;
  }
`;
