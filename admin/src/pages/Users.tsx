import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";
import API from "../API";
import { Private } from "../layout/Authenticate";
import Dropdown from "../components/utils/Dropdown"


const Users = () => {
    const [addNew,setAddNew] = useState(false)
    const [data, setData] = useState({ name: "", email: "",password:"",phone:"",role:"" });
    const [confirmPass,setConfirmPass] = useState("")
    const [users, setUsers] = useState([]);
    const [change,setChange] = useState(false)
    // fetch all users
    useEffect(() => {
        async function fetchUsers() {
            try {
                const users = (await API.get("/users")).data.data;
                setUsers(users);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, [change]);

    // function to handle change in input fields and save the data
    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    // add category
    const addUser = async (e: any) => {
        e.preventDefault();
        console.log(data)
        // API.post('/category',data).then(res=>console.log(res.data))
        try {
            if (!(data.name && data.email && data.password && data.phone && data.role)) {
                return swal("Please fill all the fields",{icon:"warning"});
            }
            if(confirmPass!==data.password){
              return swal("Password and confirm password should be same!",{icon:"warning"});
            }
            const res = (await API.post("/auth/register",data)).data.message;
            setChange(!change)
            setData({name:"",email:"",password:"",phone:"",role:""})
            setConfirmPass("")
            setAddNew(false)
            swal(res, {
                icon: "success",
            });
        } catch (error) {
            console.error(error);
        }
    };
    // delete category 
    const deleteUser = async (id:any) => {
        try {
            const res = (await API.delete("/category/"+id)).data.message;
            setChange(!change)
            swal(res, {
                icon: "success",
            });
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Private>
            <main className="w-2/3 mx-auto mt-4">
                 {/* add new category  */}
                 {addNew ? 
                 <form
                    className="w-full mt-4 flex flex-wrap space-x-2 my-2 p-4 border shadow"
                    onSubmit={addUser}
                >
                    <div className="space-x-2 my-2">
                        <label htmlFor="" className="">
                            Name
                        </label>
                        <input
                            type="text"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder=""
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-x-2 my-2">
                        <label htmlFor="" className="">
                            Email
                        </label>
                        <input
                            type="email"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder=""
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-x-2 my-2">
                        <label htmlFor="" className="">
                            Phone
                        </label>
                        <input
                            type="phone"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder=""
                            name="phone"
                            value={data.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <Dropdown name="role" items={['admin','editor','reporter']} onChange={handleChange} className="" />
                    <div className="space-x-2 my-2">
                        <label htmlFor="" className="">
                            Password
                        </label>
                        <input
                            type="password"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder=""
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-x-2 my-2">
                        <label htmlFor="" className="">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder=""
                            name="conform_password"
                            value={confirmPass}
                            onChange={(e:any)=>setConfirmPass(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="px-3 bg-purple-400 text-white font-semibold rounded"
                    >
                        Add
                    </button>
                </form>:
                <div className="flex justify-end my-2">
                    <button className="bg-purple-600 text-white py-2 px-3" onClick={()=>setAddNew(true)}>Add User</button>
                </div>
                 }
                {/* all users  */}
                <table className="min-w-full bg-white">
                    <thead className="bg-purple-800 text-white">
                        <tr className="">
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Name
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Email
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Phone
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Role
                            </th>
                            {/* <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Delete
                            </th> */}
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {users?.map(
                            ({ name, email,_id ,phone,role}: any, index: any) => (
                                <tr
                                    key={index}
                                    className="my-3 border-b odd:bg-white even:bg-slate-100"
                                >
                                    <td className="pl-4 py-2">{name}</td>
                                    <td className="pl-4 py-2">{email}</td>
                                    <td className="pl-4 py-2">{phone}</td>
                                    <td className="pl-4 py-2 capitalize">{role}</td>
                                    {/* <td className="pl-4 py-2">
                                        <button className="text-center text-red-400" onClick={()=>deleteUser(_id)}>
                                            <AiOutlineDelete />
                                        </button>{" "}
                                    </td> */}
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </main>
        </Private>
    );
};

export default Users;
