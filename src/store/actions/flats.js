import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/consts";

export const putFlat = createAsyncThunk(
  "flats/putFlat",
  async ({ flatId, flatData }, { dispatch }) => {
    try {
      const response = await axios.put(`${BASE_URL}/flats/${flatId}`, flatData);
      dispatch(getFlats());
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const deleteFlat = createAsyncThunk(
  "flats/deleteFlat",
  async (flatId, { dispatch }) => {
    try {
      await axios.delete(`${BASE_URL}/flats/${flatId}`);
      dispatch(getFlats());
      return flatId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);

export const postFlat = createAsyncThunk(
  "flats/postFlat",
  async ({ data, onCloseDrawer }, { dispatch }) => {
    try {
      const response = await axios.post(`${BASE_URL}/flats`, data);
      dispatch(getFlats());
      onCloseDrawer(false);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
export const getFlats = createAsyncThunk("flats/getFlats", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/flats`);
    return response.data;
  } catch (error) {
    return error;
  }
});

export const getFlatsById = createAsyncThunk(
  "flats/getFlatsById",
  async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/flats/${id}`);
      return response.data;
    } catch (error) {
      return error;
    }
  }
);
