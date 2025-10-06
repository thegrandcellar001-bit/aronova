"use client";

import axios from "axios";
import { store } from "./store";
import { logout } from "./features/auth/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const auth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
      return Promise.reject(error);
    }
  }
);

export default api;
