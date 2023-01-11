import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/categorySlice'
import userReducer from './features/userSlice'
import publisherReducer from './features/publisherSlice'
import changeReducer from './features/changeSlice'

export const store = configureStore({
  reducer: {
    user:userReducer,
    category:categoryReducer,
    publisher:publisherReducer,
    changes:changeReducer
  },
})