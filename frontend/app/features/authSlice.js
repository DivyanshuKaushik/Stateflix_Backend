import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    isLoading: false,
    visitor: null
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser:(state, action) => {
        state.isLoading  = true;
        state.user = action.payload;
        state.isLoading  = false;
    },
    setVisitor:(state, action) => {
        state.isLoading  = true;
        state.visitor = action.payload;
        state.isLoading  = false;
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
    }
  }
});

export const {setUser,setVisitor,setIsLoading} = authSlice.actions

const selectUser = (state) => state.auth.user;
const selectVisitor = (state) => state.auth.visitor;
const selectIsLoading = (state) => state.auth.isLoading;

export {selectUser,selectVisitor,selectIsLoading}

export default authSlice.reducer