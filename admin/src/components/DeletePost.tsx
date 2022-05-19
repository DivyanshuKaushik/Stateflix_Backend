import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import swal from 'sweetalert'
import API from "../API";
import { ChangeContext } from "../context/ChangeContext";
const DeletePost = ({id}:any) => {
    const {updated,setUpdated}= useContext(ChangeContext)
    // delete post 
    const deletePost = async()=>{
      try{
        const willDelete = await swal({
          title: "Are you sure?",
          text: "Once deleted, you will not be able to recover this Post!",
          icon: "warning",
          buttons: ["Cancel", true],
          dangerMode: true,
        })
        if (willDelete) {
          const res = (await API.delete('/deletePost/'+ id)).data.message
          setUpdated(!updated)
          swal(res, {
            icon: "success",
          });
        }

      }catch(error){
        console.error(error)
      }
    }

    return (
        <button className="" onClick={deletePost}>
            <AiOutlineDelete className="text-red-600 text-lg" />
        </button>
    );
};

export default DeletePost;
