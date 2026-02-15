import { baseApi } from "./baseApi";
import { setCredentials } from "@/store/authSlice";

interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
}

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/admin-user/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;
        dispatch(
          setCredentials({
            token: data.access_token,
            user: { email: _arg.email },
          }),
        );
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
