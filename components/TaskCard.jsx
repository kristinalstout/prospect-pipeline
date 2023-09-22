"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {appContext} from '@components/Provider'
import Link from "next/link";

const TaskCard = ({ post,allPosts,setAllPosts}) => {

  const pathName = usePathname();
  const router = useRouter();
  const [myPosts, setMyPosts] = useState([]);
  let user = useContext(appContext);

  const using = useContext(user)

  function handleDelete(){
   
    fetch(`http://localhost:5555/tasks/${post.id}`,
      {method: "DELETE"})
      .then((response)=>{
          if (response.ok){
            console.log("success")
            setAllPosts((data)=>
            data.filter((da)=>da.id !==post.id))
          }})
  }

  return (
    <div className='prompt_card'>
      
      <p className='post'>Description: {post.description}</p>
      <p className='post'>Due Date: {post.dueDate}</p>
      <p className='post'>Priority: {post.priority}</p>
      {/* <p className='post'>{post.users}</p> */}
      <p className='post'>Status: {post.status}</p>
      <p className='font-inter text-sm green_gradient cursor-pointer' onClick={()=>router.push(`/update-task/`+post.id)}>Edit</p>
      
         <button
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={()=>handleDelete()}
          >
           Delete
          </button>
        </div>
        
  );
};

export default TaskCard;

  // const handleProfileClick = () => {
  //   console.log(post);

  //   if (post.creator._id === session?.user.id) return router.push("/profile");

  //   router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  // };