import { baseApi } from "./baseApi";
import { TagType } from "@/types/tags-types";
import { PaginatedResponse } from "@/types/api/Pagination";
import { AdminUser } from "@/types/api/User";

const adminUserApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminUserPagination: builder.query<PaginatedResponse<AdminUser>, { page?: number; limit?: number; search?: string | null }>({
      query: ({ page = 1, limit = 50, search } = {}) => {
        let url = `/admin-user?page=${page}&limit=${limit}`;
        if (!!search) url += `&search=${encodeURIComponent(search)}`;
        return url;
      },
      providesTags: [TagType.ADMIN_USERS],
    }),
    createAdminUser: builder.mutation<AdminUser, FormData>({
      query: (body) => ({
        url: "/admin-user",
        method: "POST",
        body,
      }),
      invalidatesTags: [TagType.ADMIN_USERS],
    }),
    updateAdminUser: builder.mutation<AdminUser, { id: string; body: FormData }>({
      query: ({ id, body }) => ({
        url: `/admin-user/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [TagType.ADMIN_USERS],
    }),
    deleteAdminUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/admin-user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [TagType.ADMIN_USERS],
    }),
  }),
});

export const {
  useGetAdminUserPaginationQuery,
  useCreateAdminUserMutation,
  useUpdateAdminUserMutation,
  useDeleteAdminUserMutation,
} = adminUserApi;
