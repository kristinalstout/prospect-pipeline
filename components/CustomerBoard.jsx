import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";


import CustomerCard from "./CustomerCard";

const CustomerCardList = ({ data }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((customer) => (
        <CustomerCard
          key={customer._id}
          customer={customer}
        />
      ))}
    </div>
  );
};

const CustomerBoard = () => {
  const [allPosts, setAllPosts] = useState([]);
  
  const router = useRouter();

  useEffect(()=>{
    fetch("http://localhost:5555/customers")
      .then((res)=>res.json())
      .then((data)=>{
        setAllPosts(data)
      })
  },[])

  return (
    <section className='feed'>

        <CustomerCardList data={allPosts}/>

    </section>
  );
};

export default CustomerBoard;