import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

function getDataDef(user_id) {
  return {
    url: `/api/analyze?user_id=${user_id}`
  }
}

export const dataApi = createApi({
  reducerPath: "dataApi",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: builder => ({
    getData: builder.query({ query: getDataDef })
  })
})

export const { useGetDataQuery } = dataApi
