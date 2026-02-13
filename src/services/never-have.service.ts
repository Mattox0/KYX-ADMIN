import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { NeverHave } from "@/types/api/Question";
import { PaginatedResponse } from "@/types/api/Pagination";

const neverHaveApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNeverHavePagination: builder.query<PaginatedResponse<NeverHave>, { page?: number; limit?: number; modeId?: string | null; search?: string | null }>({
      query: ({ page = 1, limit = 50, modeId, search } = {}) => {
        let url = `/never-have?page=${page}&limit=${limit}`;
        if (modeId) url += `&modeId=${modeId}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: [TagType.QUESTIONS_NEVER_HAVE],
    }),
    createNeverHave: builder.mutation<NeverHave, { question: string; modeId: string }>({
      query: (body) => ({
        url: "/never-have",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_NEVER_HAVE],
    }),
    updateNeverHave: builder.mutation<NeverHave, { id: string; body: { question: string; modeId: string } }>({
      query: ({ id, body }) => ({
        url: `/never-have/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_NEVER_HAVE],
    }),
    deleteNeverHave: builder.mutation<void, string>({
      query: (id) => ({
        url: `/never-have/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.QUESTIONS_NEVER_HAVE],
    }),
    importNeverHave: builder.mutation<void, { questions: { question: string; modeId: string }[] }>({
      query: (body) => ({
        url: "/never-have/import",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.QUESTIONS_NEVER_HAVE],
    }),
  }),
});

export const {
  useGetNeverHavePaginationQuery,
  useCreateNeverHaveMutation,
  useUpdateNeverHaveMutation,
  useDeleteNeverHaveMutation,
  useImportNeverHaveMutation,
} = neverHaveApi;
