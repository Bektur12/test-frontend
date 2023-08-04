import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../../utils/consts";
import axios from "axios";
import { baseAuth } from "../reducers/authSlice";

export const authManager = createAsyncThunk(
  "auth/post",
  async ({ data, navigate, notify }, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);
      if (response.data) {
        localStorage.setItem("AUTH", JSON.stringify(response.data.accessToken));
        dispatch(
          baseAuth({
            jwt: response.data.accessToken,
          })
        );
        return navigate("/");
      }
    } catch (error) {
      notify({
        type: "error",
        title: "Manager is not found! ",
        message: "Не существует",
      });
      throw new Error(error.message);
    }
  }
);
