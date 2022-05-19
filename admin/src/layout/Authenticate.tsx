import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface Child {
    children: React.ReactFragment;
}
export const Admin = ({ children }: any) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const role = user.role;
    if (!role) navigate("/login");
    return <>{role === "admin" && children}</>;
};

export const Editor = ({ children }: Child) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const role = user.role;
    if (!role) navigate("/login");
    return <>{(role === "admin" || role === "editor") && children}</>;
};

export const Reporter = ({ children }: any) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const role = user.role;
    if (!role) navigate("/login");
    return <>{(role === "admin" || role === "reporter") && children}</>;
};

export const Private = ({ children }: any) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const localUser = JSON.parse(String(localStorage.getItem("user"))) || {role: "", name: "",email:"",_id:"",accessToken:""}
    const role = localUser.role;
    useEffect(() => {   
        if (!role) navigate("/login");
    }, []);
    return <>{role && user && children}</>;
};
