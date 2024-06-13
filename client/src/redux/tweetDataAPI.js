import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

function getDataDef(user_id) {
  return {
    url: `/api/analyze?user_id=${user_id}`
  }
}

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:5000" }),
  endpoints: builder => ({
    getData: builder.query({ query: getDataDef })
  })
})

export const { useGetDataQuery } = dataApi
