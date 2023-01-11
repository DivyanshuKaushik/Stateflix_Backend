import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    categories: [],
    active:{}
}

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
        state.active = action.payload
    },
    setCategories: (state, action) => {
        state.categories = action.payload
    }

  }
});

export const {setActiveCategory,setCategories} = categorySlice.actions
const selectCategories = (state) => state.category.categories
const activeCategory = (state) => state.category.active
export {selectCategories,activeCategory}
export default categorySlice.reducer