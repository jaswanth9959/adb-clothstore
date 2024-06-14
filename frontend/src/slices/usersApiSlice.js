import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constants";
// import { STAFF_URL } from "../constants";
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.id}`,
        method: "PUT",
        body: data,
      }),
    }),
    // staffprofile: builder.mutation({
    //   query: (data) => ({
    //     url: `${STAFF_URL}/${data.staffId}/profile`,
    //     method: "PUT",
    //     body: data,
    //   }),
    // }),
    // staffLogin: builder.mutation({
    //   query: (data) => ({
    //     url: `${STAFF_URL}/login`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["User"],
    }),
    // createStaff: builder.mutation({
    //   query: (data) => ({
    //     url: `${STAFF_URL}`,
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Staff"],
    // }),
    // loginAdmin: builder.mutation({
    //   query: (data) => ({
    //     url: `${STAFF_URL}/admin`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),
    // updateStaff: builder.mutation({
    //   query: (data) => ({
    //     url: `${STAFF_URL}/${data.staffId}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Staff"],
    // }),
    getUserByID: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (staffId) => ({
        url: `${USERS_URL}/${staffId}`,
        method: "DELETE",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useGetUsersQuery,
  useProfileMutation,
  useDeleteUserMutation,
  useGetUserByIDQuery,
} = userApiSlice;
