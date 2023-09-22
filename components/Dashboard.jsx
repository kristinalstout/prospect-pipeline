"use client";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";


import TaskCard from "./TaskCard";

const TaskCardList = ({ data,setAllPosts}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <TaskCard
          key={post.id}
          post={post}  
          setAllPosts={setAllPosts}
         
        />
      ))}
    </div>
  );
};

const Dashboard= () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const router = useRouter();

  // Search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5555/tasks")
      .then((res)=>res.json())
      .then((data)=>{
        setAllPosts(data)
      })
  },[])

  // function handleDelete(post){
    
  //   fetch(`/tasks/${post.id}`,{method: "DELETE"}).then((response)=>{
      
  //     if (response.ok){
  //       console.log(post.id)
  //       setAllPosts((data)=>
  //       data.filter((da)=>da.id !==post.id))
  //     } else {
  //       // Handle the case when the server returns an error (e.g., task not found)
  //       console.error("Failed to delete task:", response.status);
  //     }
  //   })
  //   .catch((error) => {
  //     // Handle network errors or other issues
  //     console.error("An error occurred while deleting the task:", error);
  //   });
  //   }
  

  return (
    <section className='feed'>
      {/* <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form> */}
      {searchText ? (
        <TaskCardList
          data={searchedResults}
        />
      ) : (
        <TaskCardList data={allPosts} 
        setAllPosts={setAllPosts}
  />
      )}

    </section>
  );
};

export default Dashboard;