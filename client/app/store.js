import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/categorySlice'
import authReducer from './features/authSlice'
import publisherReducer from './features/publisherSlice'
import changeReducer from './features/changeSlice'

export const store = configureStore({
  reducer: {
    auth:authReducer,
    category:categoryReducer,
    publisher:publisherReducer,
    changes:changeReducer
  },
})