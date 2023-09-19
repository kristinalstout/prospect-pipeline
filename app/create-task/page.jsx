"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import TaskForm from "@components/TaskForm";

const CreateTask = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ 
    task: "",  
    dueDate: "", 
    priority:'',
    assignee:'',
    customer:'',
    note:'' 
  });

  const createTask = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/task/new", {
        method: "POST",
        body: JSON.stringify({
          task: post.task,
          userId: session?.user.id,
          dueDate: post.dueDate,
          priority: post.priority,
          assignee: post.assignee,
          customer: post.customer,
          note: post.note,
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
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createTask}
    />
  );
};

export default CreateTask;