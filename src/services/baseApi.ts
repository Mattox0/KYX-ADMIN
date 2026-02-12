import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TagType } from "@/types/tags-types";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  tagTypes: Object.values(TagType),
  endpoints: () => ({}),
});
