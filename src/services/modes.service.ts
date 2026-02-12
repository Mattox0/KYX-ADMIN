import { baseApi } from "./baseApi";
import { Mode } from "@/types/api/Mode";
import { TagType } from "@/types/tags-types";

const ALL_MODE_TAGS = [TagType.MODES_NEVER_HAVE, TagType.MODES_PREFER, TagType.MODES_TRUTH_DARE];

const modesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNeverHaveModes: builder.query<Mode[], void>({
      query: () => "/mode/game/never-have",
      providesTags: [TagType.MODES_NEVER_HAVE],
    }),
    getPreferModes: builder.query<Mode[], void>({
      query: () => "/mode/game/prefer",
      providesTags: [TagType.MODES_PREFER],
    }),
    getTruthDareModes: builder.query<Mode[], void>({
      query: () => "/mode/game/truth-dare",
      providesTags: [TagType.MODES_TRUTH_DARE],
    }),
    createMode: builder.mutation<Mode, FormData>({
      query: (formData) => ({
        url: "/mode",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ALL_MODE_TAGS,
    }),
    updateMode: builder.mutation<Mode, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/mode/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ALL_MODE_TAGS,
    }),
    deleteMode: builder.mutation<void, string>({
      query: (id) => ({
        url: `/mode/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ALL_MODE_TAGS,
    }),
  }),
});

export const {
  useGetNeverHaveModesQuery,
  useGetPreferModesQuery,
  useGetTruthDareModesQuery,
  useCreateModeMutation,
  useUpdateModeMutation,
  useDeleteModeMutation,
} = modesApi;
