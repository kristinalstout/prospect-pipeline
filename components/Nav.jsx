"use client";

import Link from "next/link";
import Image from "next/image";
import Search from "./search";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response)
    }
    setUpProviders();
  },[])


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
     
      {/* replace isUserLoggedIn with session?.user */}
      <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <div className='flex gap-2 ml-2'>
        <Link href='/customers' className='black_btn'>
          Customers
        </Link>
        <Link href='/calendar' className='black_btn'>
          Calendar
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
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={()=> setProfileDropdown(!profileDropdown)}
              />
              {profileDropdown &&(
                <div className="dropdown">
                  <Link 
                    href='/profile'
                    className='dropdown_link'
                    onClick={()=> setProfileDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <button 
                    type='button' 
                    onClick={signOut} 
                    className='outline_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>

      
    </nav>
  );
};

export default Nav;