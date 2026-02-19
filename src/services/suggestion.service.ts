import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { PaginatedResponse } from "@/types/api/Pagination";
import { Suggestion } from "@/types/api/Suggestion";

const suggestionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSuggestionPagination: builder.query<PaginatedResponse<Suggestion>, { page?: number; limit?: number; search?: string | null; resolved?: boolean }>({
      query: ({ page = 1, limit = 50, search, resolved } = {}) => {
        let url = `/suggestion?page=${page}&limit=${limit}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        if (resolved !== undefined) url += `&resolved=${resolved}`;
        return url;
      },
      providesTags: [TagType.SUGGESTIONS],
    }),
    updateSuggestion: builder.mutation<Suggestion, { id: string; body: { resolved?: boolean } }>({
      query: ({ id, body }) => ({
        url: `/suggestion/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.SUGGESTIONS],
    }),
    deleteSuggestion: builder.mutation<void, string>({
      query: (id) => ({
        url: `/suggestion/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.SUGGESTIONS],
    }),
  }),
});

export const {
  useGetSuggestionPaginationQuery,
  useUpdateSuggestionMutation,
  useDeleteSuggestionMutation,
} = suggestionApi;
