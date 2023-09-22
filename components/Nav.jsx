"use client";

import Link from "next/link";
import Image from "next/image";
import Search from "./search";
import { useEffect, useState, useContext } from "react";
// import { signIn, signOut} from "next-auth/react";
import {appContext} from '@components/Provider'


const Nav = () => {

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // useEffect(() => {
  //   const setUpProviders = async () => {
  //     const response = await getProviders();

  //     setProviders(response)
  //   }
  //   setUpProviders();
  // },[])
  const {user,setUser} = useContext(appContext);

  function logOut(){
    fetch('http://localhost:5555/logout',{
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify()
    })
    .then((res)=>res.json())
    .then((res)=>{
    setProfileDropdown(false)
    setUser(false) 
    }
   )
  }

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/images/newlogo.png'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Prospect Pipeline</p>
      </Link>
     
      <div className='sm:flex hidden'>
        {user ? (
          <div className='flex gap-3 md:gap-5'>
            <div className='flex gap-2 ml-2'>
        <Link href='/customers' className='black_btn'>
          Customers
        </Link>
      </div>
            <button 
              type='button' 
              className="black_btn"
              onClick={()=> setToggleDropdown(!toggleDropdown)}
            >+
            </button>
            {toggleDropdown && (
              <div className='dropdown'>
                <Link 
                  href='/create-task' 
                  className='dropdown_link'
                  onClick={()=> setToggleDropdown(false)}
                >Create Task</Link>
                <Link 
                  href='/create-customer' 
                  className='dropdown_link'
                  onClick={()=> setToggleDropdown(false)}
                >Create Customer</Link>

                  
              </div>
            )}
           
            <Search setSearchValue={setSearchValue}/>
            
          
              <Image
                src='/images/newlogo.png'
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={()=> setProfileDropdown(!profileDropdown)}
              />
              {profileDropdown &&(
                <div className="dropdown" top={300}>
                  <Link 
                    href='/profile'
                    className='dropdown_link'
                    onClick={()=> setProfileDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    type='button' 
                    onClick={logOut} 
                    className='outline_btn'
                  >
                    Sign Out
                  </button>
                
                </div>
              )}
            
          </div>
        ) : (
          <>
              <Link href='/login' className='link'>
                Sign In
              </Link>
          </>
        )}
      </div>

      
    </nav>
  );
};

export default Nav;