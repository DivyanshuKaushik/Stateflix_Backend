import { useContext, useLayoutEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Admin, Editor } from "./layout/Authenticate";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import AllPosts from "./pages/AllPost";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import Users from "./pages/Users";
import {AuthContext} from './context/AuthContext'
function App() {
    const navigate = useNavigate()
    // const user = JSON.parse(String(localStorage.getItem("user")))

    const {user,setUser} = useContext(AuthContext)
    // useLayoutEffect(()=>{
    //     if(!user) localStorage.setItem("user", JSON.stringify({ user: null }))
    //     console.log(user)
    // },[])
    // console.log(user)
    return (
        <>
            {/* <Navbar /> */}
            <Header />
            <Routes>    
                {/* login page  */}
                <Route path="/login" element={<Login />} />
                {/* home page  */}
                <Route
                    path="/"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/posts" replace />
                            ) : (
                                <Navigate to="/login" replace />
                            )}
                        </>
                    }
                />
                {/* news routes  */}
                {/* <Route path=":category" element={<NewsByCategory />} />
                <Route path=":category/:id" element={<NewsDetail />} /> */}
                {/* posts  */}
                {/* common private routes  */}
                <Route path="/dashboard" element={<h3>dashboard</h3>} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePost />} />

                {/* editor & admin common routes  */}
                {(user?.role === "admin" || user?.role === "editor") && (
                    <>
                        <Route path="/posts/all" element={<AllPosts />} />
                    </>
                )}

                {/* reporter & admin common routes  */}
                {/* {(role === "admin" || role==="editor") && (
                    // <Route path="/posts/all" element={<h3>hellp</h3>} /> 
                )} */}

                {/* admin routes  */}
                {user?.role === "admin" && (
                    <>
                        <Route path="/users" element={<Users />} />
                    </>
                )}

                {/* page not found  */}
                <Route path="*" element={<h3>not found</h3>} />
            </Routes>
        </>
    );
}
export default App;
