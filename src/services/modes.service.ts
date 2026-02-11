import { baseApi } from "./baseApi";
import { Mode } from "@/types/api/Mode";

const modesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNeverHaveModes: builder.query<Mode[], void>({
      query: () => "/mode/game/never-have",
    }),
    getPreferModes: builder.query<Mode[], void>({
      query: () => "/mode/game/prefer",
    }),
    getTruthDareModes: builder.query<Mode[], void>({
      query: () => "/mode/game/truth-dare",
    }),
  }),
});

export const {
  useGetNeverHaveModesQuery,
  useGetPreferModesQuery,
  useGetTruthDareModesQuery,
} = modesApi;
