export const categoryReducer = (state, action) => {
    switch (action.type) {
        case "GET_CATEGORY":
            // console.warn('hello')
            return [
                "Sports",
                "Bussiness",
                "National",
                "state",
                "local",
                "media",
                "bollywood",
                "tech",
            ];
        default:
            return state
    }
};
