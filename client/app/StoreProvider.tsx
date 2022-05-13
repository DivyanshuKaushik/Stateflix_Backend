import React, { useReducer } from "react";
import { categoryReducer } from "./reducers/category";
import { userReducer } from "./reducers/user";

type User = {
    _id?:string,
    name?:string,
    email?:string,
    password?:string,
    phone?:string,
    role?:string,
    createdAt?:string,
    updatedAt?:string,
    __v?:number
}

type InitialStateType = {
    category: string[];
    user: User;
};
// initialState 
const initialState = {
    category:  [
        "sports",
        "bussiness",
        "sational",
        "state",
        "local",
        "media",
        "bollywood",
        "tech",
    ],
    user:{}
};
// store context (Global Store)
export const Store = React.createContext<{
    state: InitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null,
});

// merge all reducers 
const rootReducer =async({category,user}, action) => ({
    category: categoryReducer(category, action),
    user: userReducer(user, action),
});

// store provider to provide data to entire app 
const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
};

export default StoreProvider;