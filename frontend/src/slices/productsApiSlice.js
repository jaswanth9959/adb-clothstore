import { apiSlice } from "./apiSlice";
import { PRODUCTS_URL } from "../constants";
export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),

    deleteVariant: builder.mutation({
      query: (vId) => ({
        url: `${PRODUCTS_URL}/${vId}/variant`,
        method: "DELETE",
      }),
      providesTags: ["Product"],
    }),
    createVariant: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/variant`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
    getVariant: builder.query({
      query: (id) => ({
        url: `${PRODUCTS_URL}/${id}/variant`,
        method: "GET",
      }),
      keepUnusedDataFor: 5,
    }),
    createProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    editVariant: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.vId}/variant`,
        method: "PUT",
        body: data,
      }),
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useDeleteProductMutation,
  useCreateVariantMutation,
  useDeleteVariantMutation,
  useEditVariantMutation,
  useGetVariantQuery,
  useUploadProductImageMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
} = productsApiSlice;
