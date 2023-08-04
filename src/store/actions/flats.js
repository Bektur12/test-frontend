import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/consts";

export const putFlat = createAsyncThunk(
  "flats/putFlat",
  async ({ flatId, flatData, notify }, { dispatch }) => {
    try {
      const response = await axios.put(`${BASE_URL}/flats/${flatId}`, flatData);
      dispatch(getFlats());
      if (response.status === 200) {
        notify({
          type: "success",
          title: "Add",
          message: "Успешно изменен",
        });
      }
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteFlat = createAsyncThunk(
  "flats/deleteFlat",
  async ({ id, notify }, { dispatch }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/flats/${id}`);
      if (response.status === 200) {
        notify({
          type: "success",
          title: "Deleted",
          message: "Успешно удален",
        });
      }
      return id;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const postFlat = createAsyncThunk(
  "flats/postFlat",
  async ({ data, onCloseDrawer, notify }, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/flats`, data);
      dispatch(getFlats());
      if (response.status === 201) {
        notify({
          type: "success",
          title: "Добавлен",
          message: "Успешно добавлен",
        });
        onCloseDrawer();
      }

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const getFlats = createAsyncThunk(
  "flats/getFlats",
  async ({ title, status }) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/flats/${title || "Все"}/${status || "Все"}`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const getFlatsById = createAsyncThunk(
  "flats/getFlatsById",
  async (id, { dispatch }) => {
    try {
      const response = await axios.get(`${BASE_URL}/flats/${id}`);
      dispatch(getFlats());
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
