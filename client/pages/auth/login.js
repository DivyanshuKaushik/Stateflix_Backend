import React, { useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
// import Input from "../components/utils/Input";
import API from "../../services/API";
import Image from "next/image";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
const Login = () => {
    // const navigate = useNavigate()
    const router = useRouter();
    // const {setUser} = useContext(AuthContext)

    const [credentials, setCrerdentials] = useState({email:"", password:""});

    // handle change in input fields
    const handleChange = (e) => {
       setCrerdentials({...credentials, [e.target.name]: e.target.value});
    };
    // login on form submit 
    const login = async (e) => {
        e.preventDefault();
        try{
            const data = (await API.post("/auth/login", credentials)).data.data;
            // save jwt accessToken to cookie 
            // setUser({...data.user, accessToken: data.token});
            // Cookie.set("accessToken", data.token, {expires: 10});
            router.push("/panel");
            // localStorage.setItem("user", JSON.stringify({...data.user,accessToken:data.token}));
            // localStorage.setItem("accessToken", JSON.stringify(data.token));
            // swal("Success", "Login Successful", "success");
            // redirect to dashboard after successful login 
            // window.location.replace('/posts')
        //    navigate("/posts");
            
        }catch(err){
            console.error(err);
        }
    }

    return (
        <main className="container mx-auto flex justify-center items-center h-screen">
        <div className="w-2/3 md:w-1/2 grid grid-cols-1 place-content-center place-items-center gap-6">

                {/* logo  */}
                <div className="relative h-8 w-full">
                    <Image src="/sf-logo.png" layout="fill" className="h-full w-full object-contain" alt="logo" />
                </div>
                    <h3 className="text-lg text-secondary capitalize">
                        Sign in to your account
                    </h3>
                {/* form  */}
                <form className="space-y-3 w-3/4 mx-auto" onSubmit={login}>
                    {/* email  */}
                    <div className="border-2 border-primary flex space-x-2 px-2 py-1.5 rounded-full">
                        <HiOutlineMail size={25} className="text-primary" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={credentials.email}
                            onChange={handleChange}
                            className="bg-transparent focus:outline-none w-full text-sm "
                        />
                    </div>
                    {/* password  */}
                    <div className="border-2 border-primary flex space-x-2 px-2 py-1.5 rounded-full">
                        <HiOutlineLockClosed size={25} className="text-primary" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Passsword"
                            value={credentials.password}
                            onChange={handleChange}
                            className="bg-transparent focus:outline-none w-full text-sm "
                        />
                    </div>
                    {/* forget password?  */}
                    <div className="flex justify-end text-sm text-secondary">
                        <span role="button">Forget Password?</span>
                    </div>
                    {/* submit  */}
                    <button
                        type="submit"
                        className="bg-blue-500 px-3 w-full py-1.5 font-bold rounded-md text-gray-50 btn"
                    >
                        Login
                    </button>
                </form>
        </div>
            
        </main>
    );
};

export default Login;