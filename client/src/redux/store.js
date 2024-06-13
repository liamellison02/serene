import { configureStore } from "@reduxjs/toolkit"
import tweetDataReducer from "./tweetDataSlice"
import { dataApi } from "./tweetDataAPI"
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import { thunk } from 'redux-thunk'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, tweetDataReducer)

const store = configureStore({
  reducer: {
    tweetData: persistedReducer,
    [dataApi.reducerPath]: dataApi.reducer
  },
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({
    serializableCheck: { 
      ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
    }
  }).concat(dataApi.middleware, thunk),
})

export default store
export const persistor = persistStore(store)
