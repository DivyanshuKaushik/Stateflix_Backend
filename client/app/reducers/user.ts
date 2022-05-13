import API from "../../service/API";
export const userReducer = (state, action) => {
    switch (action.type) {
        case "GET_USER":
            return state;
        case "CREATE_USER_SESSION":
            console.log('called')
            // const user =  (await API.get("/getAuthenticatedUser")).data
            // console.log(user,"hello");
            // return user;
            return state
        default:
            return state;
    }
};
