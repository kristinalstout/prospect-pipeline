"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import TaskForm from "@components/TaskForm";

const CreateTask = ({}) => {
  const router = useRouter();


  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ 
    description: "",  
    dueDate: "", 
    priority:'',
    status:'',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
  
      try {
        const response = await fetch("http://localhost:5555/tasks", {
          method: "POST",
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: post.description,
            dueDate: post.dueDate,
            priority: post.priority,
            status: post.status,  
          }),
        });
  
        if (response.ok) {
          router.push("/");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsSubmitting(false);
      }
  }
  console.log(post.description)
  return (
    // <TaskForm
    //   type='Create'
    //   post={post}
    //   setPost={setPost}
    //   submitting={submitting}
    //   handleSubmit={createTask}
  
    <>
    <section className='w-full max-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
      <span className='blue_gradient'>Create Task</span>
    </h1>
    <p className='desc text-left max-w-md'>
      Create & Update Task
    </p>

    <form
      onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
    >
      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Task
        </span>

        <textarea
          value={post.description || ''}
          onChange={(e) => setPost({ ...post, description: e.target.value })}
          placeholder='Task description here'
          required
          className='form_textarea '
        />
      </label>

      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Priority Level{" "}
          <span className='font-normal'>
            (High,Medium,Low)
          </span>
        </span>
        <input
          value={post.priority|| ''}
          onChange={(e) => setPost({ ...post, priority: e.target.value })}
          type='text'
          placeholder='Priority'
          required
          className='form_input'
        />
      </label>


     

      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Due Date{" "}
        </span>
        <input
          value={post.dueDate|| ''}
          onChange={(e) => setPost({ ...post, dueDate: e.target.value })}
          type='text'
          placeholder='Due Date'
          required
          className='form_input'
        />
      </label>

      <label>
        <span className='font-satoshi font-semibold text-base text-gray-700'>
          Status{" "}
        </span>
        <input
          value={post.status|| ''}
          onChange={(e) => setPost({ ...post, status: e.target.value })}
          type='text'
          placeholder='Not Completed, Done, etc.'
          required
          className='form_input'
        />
      </label>

      <div className='flex-end mx-3 mb-5 gap-4'>
        <Link href='/' className='text-gray-500 text-sm'>
          Cancel
        </Link>

        <button
          type='submit'
          disabled={submitting}
          className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
        >Submit
        </button>
      </div>
    </form>
    </section>
    </>
  );
};

export default CreateTask;