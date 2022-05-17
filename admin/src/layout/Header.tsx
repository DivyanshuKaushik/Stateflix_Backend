import { NavLink, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineArticle, MdOutlineCreateNewFolder } from "react-icons/md";
import {FiLogOut} from 'react-icons/fi'
import { Admin, Private,Editor } from "../layout/Authenticate";

const PrivateHeader = () => {
    const navigate = useNavigate();
    // const role = JSON.parse(String(localStorage.getItem("user"))).role;
    const logout = () => {
        // localStorage.setItem("user", JSON.stringify({ role: "", name: "",email:"",_id:"" }))
        // localStorage.setItem("accessToken", JSON.stringify("none"));
        localStorage.removeItem('user')
        localStorage.removeItem('accessToken')
        navigate("/login");
        window.location.reload();
    };
    return (
        <header className="flex items-center bg-purple-500 sticky top-0 z-50 py-2">
            {/* logo  */}
            <div className="flex-grow px-4">
                <h3 className="text-3xl text-white">StateFlix</h3>
            </div>

            {/* navlinks  */}
            <Private>
                <nav className="flex justify-center space-x-4 w-full">
                    <NavLink
                        to="/dashboard"
                        className="flex items-center text-white"
                    >
                        <FaHome />
                        <span>Dashboard</span>
                    </NavLink>
                    <NavLink
                        to="/posts"
                        className="flex items-center text-white"
                    >
                        <MdOutlineArticle />
                        <span>Posts</span>
                    </NavLink>
                    <NavLink
                        to="/posts/create"
                        className="flex items-center text-white"
                    >
                        <MdOutlineCreateNewFolder />
                        <span>Create</span>
                    </NavLink>
                    <Editor>
                        <NavLink
                            to="/posts/all"
                            className="flex items-center text-white"
                        >
                            <MdOutlineCreateNewFolder />
                            <span>All Posts</span>
                        </NavLink>
                    </Editor>
                    <Admin>
                        <NavLink
                            to="/users"
                            className="flex items-center text-white"
                        >
                            <MdOutlineCreateNewFolder />
                            <span>Users</span>
                        </NavLink>
                    </Admin>
                    <button onClick={logout} className="flex items-center text-white"> <FiLogOut /> Logout</button>
                </nav>
            </Private>
        </header>
    );
};

export default PrivateHeader;
