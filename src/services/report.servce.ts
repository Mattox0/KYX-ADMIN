import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { PaginatedResponse } from "@/types/api/Pagination";
import { Report } from "@/types/api/Report";

const preferApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getReportPagination: builder.query<PaginatedResponse<Report>, { page?: number; limit?: number; search?: string | null, resolved?: boolean; }>({
      query: ({ page = 1, limit = 50, search, resolved } = {}) => {
        let url = `/report?page=${page}&limit=${limit}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        if (resolved !== undefined) url += `&resolved=${resolved}`;
        return url;
      },
      providesTags: [TagType.REPORTS],
    }),
    updateReport: builder.mutation<Report, { id: string; body: { reason?: string; resolved?: boolean; comment?: string } }>({
      query: ({ id, body }) => ({
        url: `/report/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.REPORTS],
    }),
    deleteReport: builder.mutation<void, string>({
      query: (id) => ({
        url: `/report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.REPORTS],
    }),
  }),
});

export const {
  useGetReportPaginationQuery,
  useUpdateReportMutation,
  useDeleteReportMutation,
} = preferApi;
