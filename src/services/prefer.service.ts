import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { Prefer } from "@/types/api/Question";
import { PaginatedResponse } from "@/types/api/Pagination";

const preferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPreferPagination: builder.query<PaginatedResponse<Prefer>, { page?: number; limit?: number; modeId?: string | null; search?: string | null }>({
      query: ({ page = 1, limit = 50, modeId, search } = {}) => {
        let url = `/prefer?page=${page}&limit=${limit}`;
        if (modeId) url += `&modeId=${modeId}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: [TagType.QUESTIONS_PREFER],
    }),
    createPrefer: builder.mutation<Prefer, { choiceOne: string; choiceTwo: string; modeId: string }>({
      query: (body) => ({
        url: "/prefer",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_PREFER],
    }),
    updatePrefer: builder.mutation<Prefer, { id: string; body: { choiceOne: string; choiceTwo: string; modeId: string } }>({
      query: ({ id, body }) => ({
        url: `/prefer/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_PREFER],
    }),
    deletePrefer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/prefer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.QUESTIONS_PREFER],
    }),
    importPrefer: builder.mutation<void, { questions: { choiceOne: string; choiceTwo: string; modeId: string }[] }>({
      query: (body) => ({
        url: "/prefer/import",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPreferPaginationQuery,
  useCreatePreferMutation,
  useUpdatePreferMutation,
  useDeletePreferMutation,
  useImportPreferMutation,
} = preferApi;
