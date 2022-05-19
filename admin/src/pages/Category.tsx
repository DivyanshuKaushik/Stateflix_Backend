import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import swal from "sweetalert";
import API from "../API";
import { Private } from "../layout/Authenticate";

const Category = () => {
    const [addNew,setAddNew] = useState(false)
    const [data, setData] = useState({ name: "", hindiName: "" });
    const [categories, setCategories] = useState([]);
    const [change,setChange] = useState(false)
    // fetch all categories
    useEffect(() => {
        async function fetchCategories() {
            try {
                const categories = (await API.get("/category")).data.data;
                setCategories(categories);
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, [change]);

    // function to handle change in input fields and save the data
    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    // add category
    const addCategory = async (e: any) => {
        e.preventDefault();
        console.log(data)
        // API.post('/category',data).then(res=>console.log(res.data))
        try {
            if (data.name === "" || data.hindiName === "") {
                return swal("Please fill all the fields",{icon:"warning"});
            }
            const res = (await API.post("/category",data)).data.message;
            setChange(!change)
            setData({name:"",hindiName:""})
            setAddNew(false)
            swal(res, {
                icon: "success",
            });
        } catch (error) {
            console.error(error);
        }
    };
    // delete category 
    const deleteCategory = async (id:any) => {
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
                    className="w-full mt-4 flex flex-wrap space-y-2 space-x-2 my-2 p-4 border shadow"
                    onSubmit={addCategory}
                >
                    <div className="space-x-2">
                        <label htmlFor="" className="">
                            Category Name
                        </label>
                        <input
                            type="text"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder="sports"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-x-2">
                        <label htmlFor="" className="">
                            Hindi Name
                        </label>
                        <input
                            type="text"
                            className="py-1 focus:outline-none border pl-2"
                            placeholder="खेल"
                            name="hindiName"
                            value={data.hindiName}
                            onChange={handleChange}
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
                    <button className="bg-purple-600 text-white py-2 px-3" onClick={()=>setAddNew(true)}>Add New Category</button>
                </div>
                 }
                {/* all categories  */}
                <table className="min-w-full bg-white">
                    <thead className="bg-purple-800 text-white">
                        <tr className="">
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Name
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Hindi Name
                            </th>
                            <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-700">
                        {categories?.map(
                            ({ name, hindiName,_id }: any, index: any) => (
                                <tr
                                    key={index}
                                    className="my-3 border-b odd:bg-white even:bg-slate-100"
                                >
                                    <td className="pl-4 py-2">{name}</td>
                                    <td className="pl-4 py-2">{hindiName}</td>
                                    <td className="pl-4 py-2">
                                        <button className="text-center text-red-400" onClick={()=>deleteCategory(_id)}>
                                            <AiOutlineDelete />
                                        </button>{" "}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </main>
        </Private>
    );
};

export default Category;
