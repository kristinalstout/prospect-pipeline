"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

import TaskForm from "@components/TaskForm";

const UpdateTask = () => {

  // return <div>My Post: {params.slug}</div>
// }

  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");
  const params = useParams()
  const id = parseInt(params['id'])

  const [post, setPost] = useState({
    description: "",  
    dueDate: "", 
    priority:'',
    customer:'' 
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`http://localhost:5555/tasks/`+id);
      const data = await response.json();

      setPost({
        description: data.description,  
        dueDate:data.dueDate, 
        priority:data.priority,
        status:data.status
      });
    };

    getTaskDetails();
  }, []);
 

  
  const updateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const response = await fetch(`http://localhost:5555/tasks/`+id ,{
        method: "PATCH",  
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "description": post.description,  
          "dueDate":post.dueDate, 
          "priority":post.priority,
          "status":post.status
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
  };
  // async function generateStaticParams() {
  //   const tasks = await fetch('https://localhost:5555/tasks').then((res) => res.json())
   
  //   return tasks.map((task) => ({
  //     slug: task.slug,
  //   }))
  // }

  
  return (
    // <><div> Update Tasks{params.updatetask}</div>
    <TaskForm
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTask}
    />
    // </>
  );
};

export default UpdateTask;