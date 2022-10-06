import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios';
import API from '../../service/API';
import type { RootState } from '../store';

const initialState = {
    user: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
      createUserSession: (state, action: PayloadAction<{user: any}>) => {
        console.log(action.payload.user)
        state.user = action.payload.user;
      }
  }
});

export const {createUserSession} = userSlice.actions

export default userSlice.reducer