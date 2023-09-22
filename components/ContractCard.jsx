"use client";

import { useState, useContext } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";


const ContractCard = ({ post, handleDelete,handleEdit, handleTagClick, handleHomeDelete, handleHomeEdit }) => {


  const router = useRouter();
  const [contract, setContract] = useState([]);

  
  useEffect(()=>{
    fetch("http://localhost:5555/contracts")
      .then((res)=>res.json())
      .then((data)=>{
        setContract(data)
      })
  },[])

  

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
        >
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {contract.name}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {contract.email}
            </p>
          </div>
        </div>

      </div>

      <p className='post'>{contract.phone_number}</p>
      <p className='post'>{contract.tasks}</p>

    </div>
  );
};

export default ContractCard;