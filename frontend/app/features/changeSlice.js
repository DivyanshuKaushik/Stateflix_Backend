import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    posts:false,
    categories:false,
    publisher: false,
    ads:false,
    polls:false,
    users:false,
    trending:false,
}

const changeSlice = createSlice({
  name: "changes",
  initialState,
  reducers: {
    setChange: (state, action) => {
        state[action.payload] = !state[action.payload]
    }

  }
});

export const {setChange} = changeSlice.actions


// export {selectPublisher}

export default changeSlice.reducer