import { CATEGORY_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORY_URL}/${data.catId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    getCategory: builder.query({
      query: (catID) => ({
        url: `${CATEGORY_URL}/${catID}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});
export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useGetCategoryQuery,
} = categoryApiSlice;
