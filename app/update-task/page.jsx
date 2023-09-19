"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import TaskForm from "@components/TaskForm";

const UpdateTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  const [post, setPost] = useState({
    task: "",  
    dueDate: "", 
    priority:'',
    assignee:'',
    customer:'',
    note:'' 
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`/api/task/${taskId}`);
      const data = await response.json();

      setPost({
        task: data.task,  
        dueDate:data.dueDate, 
        priority:data.priority,
        assignee:data.assignee,
        customer:data.customer,
        note:data.note
      });
    };

    if (taskId) getTaskDetails();
  }, [taskId]);

  const updateTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!taskId) return alert("Missing TaskId!");

    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: post.task,  
          dueDate:post.dueDate, 
          priority:post.priority,
          assignee:post.assignee,
          customer:post.customer,
          note:post.note
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

  return (
    <TaskForm
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default UpdateTask;