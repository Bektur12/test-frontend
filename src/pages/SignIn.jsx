import React from "react";
import styled from "styled-components";
import { Button, Form } from "antd";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Input } from "../components/UI/Input/Input";
import { authManager } from "../store/actions/auth";
import { useSnackbar } from "../hooks/useSnackBar";
import { Snackbar } from "../components/UI/Snackbar/SnackBar";

export const SignIn = () => {
  const { notify } = useSnackbar();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const onFinish = (data) => {
    dispatch(authManager({ data, navigate, notify }));
  };

  return (
    <Container>
      <Snackbar />
      <FormWrapper form={form} onFinish={onFinish}>
        <Title>Login</Title>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Email is required" },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required" }]}
        >
          <Input placeholder="Password" />
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </FormWrapper>
    </Container>
  );
};

const Container = styled("div")`
  background-color: #353436;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled(Form)`
  display: grid;
  grid-template-rows: auto auto auto auto;
  width: 400px;
  align-items: center;
  gap: 15px;
  & .ant-form-item {
    margin-bottom: 0;
  }
  & .ant-btn {
    margin-top: 10px;
  }
`;

const Title = styled("h1")`
  color: #ffffff;
  font-family: "Inter";
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 29px;
`;
