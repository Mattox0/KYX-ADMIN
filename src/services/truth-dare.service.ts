import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { TruthDare } from "@/types/api/Question";
import { PaginatedResponse } from "@/types/api/Pagination";

const truthDareApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTruthDarePagination: builder.query<PaginatedResponse<TruthDare>, { page?: number; limit?: number; modeId?: string | null; search?: string | null }>({
      query: ({ page = 1, limit = 50, modeId, search } = {}) => {
        let url = `/truth-dare?page=${page}&limit=${limit}`;
        if (modeId) url += `&modeId=${modeId}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: [TagType.QUESTIONS_TRUTH_DARE],
    }),
    createTruthDare: builder.mutation<TruthDare, { type: string; gender: string; modeId: string }>({
      query: (body) => ({
        url: "/truth-dare",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_TRUTH_DARE],
    }),
    updateTruthDare: builder.mutation<TruthDare, { id: string; body: { type: string; gender: string; modeId: string } }>({
      query: ({ id, body }) => ({
        url: `/truth-dare/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_TRUTH_DARE],
    }),
    deleteTruthDare: builder.mutation<void, string>({
      query: (id) => ({
        url: `/truth-dare/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.QUESTIONS_TRUTH_DARE],
    }),
    importTruthDare: builder.mutation<void, { questions: { type: string; gender: string; question: string; modeId: string }[] }>({
      query: (body) => ({
        url: "/truth-dare/import",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_TRUTH_DARE],
    }),
  }),
});

export const {
  useGetTruthDarePaginationQuery,
  useCreateTruthDareMutation,
  useUpdateTruthDareMutation,
  useDeleteTruthDareMutation,
  useImportTruthDareMutation,
} = truthDareApi;
