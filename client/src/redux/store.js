import { configureStore } from "@reduxjs/toolkit"
import TweetDataReducer from "./tweetDataSlice"
import { dataApi } from "./tweetDataAPI"

const store = configureStore({
  reducer: {
    tweetData: TweetDataReducer,
    [dataApi.reducerPath]: dataApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(dataApi.middleware)
})

export default store
