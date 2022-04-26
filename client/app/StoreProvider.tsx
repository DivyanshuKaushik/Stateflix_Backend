import React, { useReducer } from "react";
import { categoryReducer } from "./reducers/category";

type InitialStateType = {
    category: string[];
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
    ]
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
const rootReducer = ({ category }, action) => ({
    category: categoryReducer(category, action),
});

// store provider to provide data to entire app 
const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);
    return (
        <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
    );
};

export default StoreProvider;
