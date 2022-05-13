import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import API from "../../service/API";
import { Store } from "../../app/StoreProvider";
import PrivateHeader from "./PrivateHeader";
import { useDispatch } from "react-redux";
import { createUserSession } from "../../app/slices/userSlice";
interface Props {
    children: React.ReactNode;
}

const PrivatePage = ({ children }: Props) => {
    const dispatch = useDispatch()
    const router = useRouter();
    const [user, setUser] = useState({});
    useEffect(() => {
        async function getAuthUser() {
            try {
                const token = Cookie.get("accessToken");
                if (!token) router.push("/login");
                const user = (await API.get("/getAuthenticatedUser")).data;
                if (!user) router.push("/login");
                dispatch(createUserSession(user))
                setUser(user);
            } catch (error) {
                router.push("/login");
            }
        }
        getAuthUser();
    }, []);
    // const {state,dispatch} = useContext(Store)


    return (
        <div>
            {user ? (
                <>
                    {/* private navbar  */}
                    <PrivateHeader />
                    {children}{" "}
                </>
            ) : (
                <div>You are not authorized to view this page</div>
            )}
        </div>
    );
};

export default PrivatePage;
