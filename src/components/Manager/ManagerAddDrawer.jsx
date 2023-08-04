import React from "react";
import ReusableDrawer from "../UI/Drawer/Drawer";
import { styled } from "styled-components";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { useDispatch } from "react-redux";
import { postManager } from "../../store/actions/managers";
import { useSnackbar } from "../../hooks/useSnackBar";
import { Form } from "antd";
import { RULES, VALIDATE_TEXT } from "../../utils/consts";
import { InputNumber } from "../UI/Input/InputNumber";

export const ManagerAddDrawer = ({ onClose, open }) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const { notify } = useSnackbar();

  const handleClickSendManager = (data) => {
    dispatch(
      postManager({
        data: data,
        onClose,
        notify,
      })
    );
  };

  return (
    <ReusableDrawer
      open={open}
      onClose={() => onClose(false)}
      title={"Добавить"}
    >
      <ContentWrapper onFinish={handleClickSendManager} form={form}>
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
        <Form.Item
          name="password"
          rules={[
            { required: true, message: VALIDATE_TEXT },
            {
              type: "password",
              message: "Please enter a valid password",
            },
          ]}
        >
          <Input label="Временный пароль" />
        </Form.Item>

        <Button htmlType="submit" backgroundColor="#5780EB">
          Добавить
        </Button>
        <Button>Отмена</Button>
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
