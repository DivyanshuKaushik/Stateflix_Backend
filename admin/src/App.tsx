import { Routes, Route } from "react-router-dom";
import { Admin, Editor } from "./layout/Authenticate";
import Header from "./layout/Header";
import Navbar from "./layout/Navbar";
import AllPosts from "./pages/AllPost";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewsByCategory from "./pages/NewsByCategory";
import NewsDetail from "./pages/NewsDetail";
import Posts from "./pages/Posts";
function App() {
    const role = JSON.parse(String(localStorage.getItem("user"))).role;
    console.log(role)
    return (
        <>
            {/* <Navbar /> */}
            <Header />
            <Routes>
                {/* login page  */}
                <Route path="/login" element={<Login />} />
                {/* home page  */}
                <Route path="/" element={<Home />} />
                {/* news routes  */}
                {/* <Route path=":category" element={<NewsByCategory />} />
                <Route path=":category/:id" element={<NewsDetail />} /> */}
                {/* posts  */}
                {/* common private routes  */}
                <Route path="/dashboard" element={<h3 >dashboard</h3>} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/posts/create" element={<CreatePost />} />

                {/* editor & admin common routes  */}
                {(role === "admin" || role==="editor") && (
                    <Route path="/posts/all" element={<AllPosts />} /> 
                )}

                {/* reporter & admin common routes  */}
                {/* {(role === "admin" || role==="editor") && (
                    // <Route path="/posts/all" element={<h3>hellp</h3>} /> 
                )} */}

                {/* admin routes  */}

                {/* page not found  */}
                <Route path="*" element={<h3>not found</h3>} />
            </Routes>
        </>
    );
}
export default App;
