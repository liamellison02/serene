import { createSlice } from "@reduxjs/toolkit"
import { dataApi } from "./tweetDataAPI"

const tweetDataSlice = createSlice({
  name: "tweetData",
  initialState: {
    hasData: false,
    data: undefined,
  },
  reducers: {},
  extraReducers: builder => { 
    builder.addMatcher(
      dataApi.endpoints.getData.matchFulfilled,
      (state, action) => {
        return { hasData: true, data: action.payload}
      }
    )
  }
})

export { tweetDataSlice }
export const { setData } = tweetDataSlice.actions
export default tweetDataSlice.reducer
