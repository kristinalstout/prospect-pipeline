"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import CustomerForm from "@components/CustomerForm";

const CreateCustomer = () => {
  const router = useRouter();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ 
    name:"",
    address:"",
    phoneNumber:"",
  });

  const createCustomer = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5555/customers", {
        method: "POST",
        body: JSON.stringify({
            name:post.name,
            address:post.address,
            phoneNumber:post.phoneNumber,
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
    <CustomerForm
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createCustomer}
    />
  );
};

export default CreateCustomer;