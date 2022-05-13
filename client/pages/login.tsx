import { useState } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import Input from "../components/utils/Input";
import API from "../service/API";
import Cookies from 'js-cookie'
import { useRouter } from "next/router";
import swal from 'sweetalert';

const Login = () => {
    const router = useRouter();

    const [credentials, setCrerdentials] = useState({email:"", password:""});

    // handle change in input fields
    const handleChange = (e) => {
       setCrerdentials({...credentials, [e.target.name]: e.target.value});
    };
    // login on form submit 
    const login = async e => {
        e.preventDefault();
        try{
            console.log(credentials)
            const data = (await API.post("/auth/login", credentials)).data;
            // save jwt accessToken to cookie 
            Cookies.set('accessToken', data.token, { expires: 5 })
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("accessToken", JSON.stringify(data.token));
            // swal("Success", "Login Successful", "success");
            // redirect to dashboard after successful login 
            router.push("/dashboard");
            console.log(data);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <main className="flex flex-col space-y-4 border shadow-xl rounded-2xl p-5 w-4/5 lg:w-2/5 mt-10 mx-auto">
            {/* logo  */}
            <div className="text-center">
                <span className="text-3xl text-primary-dark font-semibold">
                    Stateflix
                </span>
                <h3 className="text-lg text-secondary capitalize">
                    Sign in to your account
                </h3>
            </div>
            {/* form  */}
            <form className="space-y-3 w-3/4 mx-auto" onSubmit={login}>
                {/* email  */}
                <div className="border-2 border-primary flex space-x-2 px-2 py-1.5 rounded-full">
                    <HiOutlineMail size={25} className="text-primary" />
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={credentials.email}
                        onChange={handleChange}
                    />
                </div>
                {/* password  */}
                <div className="border-2 border-primary flex space-x-2 px-2 py-1.5 rounded-full">
                    <HiOutlineLockClosed size={25} className="text-primary" />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Passsword"
                        value={credentials.password}
                        onChange={handleChange}
                    />
                </div>
                {/* forget password?  */}
                <div className="flex justify-end text-sm text-secondary">
                    <span role="button">Forget Password?</span>
                </div>
                {/* submit  */}
                <button
                    type="submit"
                    className="bg-primary px-3 w-full py-1.5 rounded-md text-gray-50 btn"
                >
                    Login
                </button>
            </form>
        </main>
    );
};

export default Login;
