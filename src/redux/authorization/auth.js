import { createApi } from "@reduxjs/toolkit/query/react";
import { store } from "../store";
import { toast } from "react-toastify";
import axios from "axios";

export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data }) => {
    const persist = store.getState().auth.token;

    if (url === "/users/current") {
      axios.defaults.headers.common.Authorization = `Bearer ${persist}`;
    }
    try {
      const result = await axios({ url: baseUrl + url, method, data });

      if (url === "/users/logout") {
        axios.defaults.headers.common.Authorization = "";
      }
      if (url === "/users/current") {
        axios.defaults.headers.common.Authorization = `Bearer ${persist}`;
      } else {
        axios.defaults.headers.common.Authorization = `Bearer ${result.data.token}`;
      }

      return { data: result.data };
    } catch (err) {
      const error = { status: err.response?.status, data: err.response?.data };
      if (error.status === 400) {
        toast.warn("This name is already taken!", {
          theme: "colored",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Something get wrong!Please try again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }

      return err;
    }
  };

export const authorizationApi = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: "https://connections-api.herokuapp.com",
  }),
  endpoints(build) {
    return {
      fetchCurrentUser: build.query({
        query: (isLogged) => ({ url: "/users/current", method: "get" }),
      }),
      login: build.mutation({
        query: (credentials) => ({
          url: "/users/login",
          method: "post",
          data: credentials,
        }),
      }),
      logout: build.mutation({
        query: (credentials) => ({
          url: "/users/logout",
          method: "post",
          data: credentials,
        }),
      }),
      register: build.mutation({
        query: (credentials) => ({
          url: "/users/signup",
          method: "post",
          data: credentials,
        }),
      }),
    };
  },
});

export const {
  useFetchCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = authorizationApi;
