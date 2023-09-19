"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import TaskCard from "./TaskCard";

const TaskCardList = ({ data, handleTagClick, handleHomeDelete, handleHomeEdit }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) => (
        <TaskCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
          handleHomeEdit={() => handleHomeEdit && handleHomeEdit(post)}
        handleHomeDelete={() => handleHomeDelete && handleHomeDelete(post)}
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

  const fetchPosts = async () => {
    const response = await fetch("/api/task");
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterTasks = (searchtext) => {
    const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.task) ||
        regex.test(item.customer) ||
        regex.test(item.assignee) ||
        regex.test(item.priority) ||
        regex.test(item.dueDate)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTasks(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  // const handleTagClick = (tagName) => {
  //   setSearchText(tagName);

  //   const searchResult = filterPrompts(tagName);
  //   setSearchedResults(searchResult);
  // };

  const handleHomeEdit = (post) => {
    router.push(`/update-task?id=${post._id}`);
  };

  const handleHomeDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/task/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = allPosts.filter((item) => item._id !== post._id);

        setAllPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <TaskCardList
          data={searchedResults} 
          
          handleHomeEdit={() => handleHomeEdit && handleHomeEdit(post)}
          handleHomeDelete={() => handleHomeDelete && handleHomeDelete(post)}
        />
      ) : (
        <TaskCardList data={allPosts} 
        handleHomeEdit={handleHomeEdit}
        handleHomeDelete={handleHomeDelete} />
      )}
      {/* handleTagClick={handleTagClick}  */}
    </section>
  );
};

export default Dashboard;