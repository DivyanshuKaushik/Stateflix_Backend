import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoading: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser:(state, action) => {
        state.isLoading  = true;
        state.user = action.payload;
        state.isLoading  = false;
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    }
  }
});

export const {setUser,setIsLoading} = userSlice.actions

const selectUser = (state) => state.user.user;
const selectIsLoading = (state) => state.user.isLoading;

export {selectUser,selectIsLoading}

export default userSlice.reducer