"use client";

import { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


const CustomerCard = ({ customer }) => {


  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  // const handleProfileClick = () => {
  //   console.log(post);

  //   if (post.creator._id === session?.user.id) return router.push("/profile");

  //   router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  // };

  useEffect(()=>{
    fetch("http://localhost:5555/customers")
      .then((res)=>res.json())
      .then((data)=>{
        setCustomers(data)
      })
  },[])

  

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          // onClick={handleProfileClick}
        >
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {customer.name}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {customer.address}
            </p>
          </div>
        </div>

      </div>

      <p className='post'>{customer.phone_number}</p>
      {/* <p className='post'>{customer.contract}</p> */}

    </div>
  );
};

export default CustomerCard;