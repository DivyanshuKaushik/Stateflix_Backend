export const categoryReducer = (state, action) => {
    switch (action.type) {
        case "SET_CATEGORY":
            state = action.payload;
            console.log(action.payload)
            return state;
        default:
            return state
    }
};
