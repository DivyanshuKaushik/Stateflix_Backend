import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    publisher: [],
}

const categorySlice = createSlice({
  name: "publisher",
  initialState,
  reducers: {
    setPublisher: (state, action) => {
        state.publisher = action.payload
    }

  }
});

export const {setActiveCategory,setPublisher} = categorySlice.actions

const selectPublisher = (state) => state.publisher.publisher

export {selectPublisher}

export default categorySlice.reducer