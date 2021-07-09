import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:44371/api/" }),
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "Book",
    }),
  }),
});

export const { useGetAllBooksQuery } = bookApi;
