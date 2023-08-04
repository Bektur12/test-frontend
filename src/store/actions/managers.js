import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/consts";

export const putManager = createAsyncThunk(
  "managers/putManager",
  async ({ id, data, onClose, notify }, { dispatch }) => {
    try {
      const response = await axios.put(`${BASE_URL}/managers/${id}`, data);
      dispatch(getManagers());
      if (response.status === 200) {
        notify({
          type: "success",
          title: "Updated",
          message: "Успешно обновлен",
        });
        onClose(false);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteManager = createAsyncThunk(
  "managers/deleteManager",
  async ({ id, notify }, { dispatch }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/managers/${id}`);
      dispatch(getManagers());
      if (response.status === 200) {
        notify({
          type: "success",
          title: "Deleted",
          message: "Успешно удален",
        });
      }
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const postManager = createAsyncThunk(
  "managers/postManager",
  async ({ data, onClose, notify }, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      dispatch(getManagers());

      if (response.status === 201) {
        notify({
          type: "success",
          title: "Добавить",
          message: "Менеджер успешно добавлен",
        });
        onClose(false);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const getManagers = createAsyncThunk(
  "managers/getManagers",
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/managers`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getManagersById = createAsyncThunk(
  "managers/getManagersById",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/managers/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
