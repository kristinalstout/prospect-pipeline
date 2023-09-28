'use client'
import React from 'react'
import {useContext,useState} from "react";
import { setCookie,getCookie } from 'cookies-next';
import {Input, Button} from "@nextui-org/react";
import {appContext} from '@components/Provider'
import { useRouter, useSearchParams } from "next/navigation";



export default function SignUp() {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const [value, setValue] = React.useState("");
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isLoggedIn, setisLoggedIn] = React.useState(getCookie("isloggedin"));
    const {user,setUser} = useContext(appContext);
    const router = useRouter();
    
    
  
    function handleSignIn(e) {
      e.preventDefault();
      const makePostRequest = async () => {
        const response = await fetch('http://127.0.0.1:5555/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        });
        if (response.status === 200) {
          setCookie("isloggedin", true)
          setisLoggedIn(true)
          setUser(true)
          router.push("/");

        } else {
          console.log('Incorrect username/password');
        }
      };
      makePostRequest();
    };
  
  return (
    <>
    <section className='w-full max-w-full flex-start flex-col'>
    <h1 className='head_text text-left'>
        <span className='blue_gradient'>Sign In</span>
      </h1>
      <div className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
    <span className='font-satoshi font-semibold text-base text-gray-700'>
      Username
    </span>
    <Input
      value={value}
      type="username"
      variant="bordered"
      placeholder="Username"
      onValueChange={setValue}
      className='form_input'
      onChange={(e) => setUsername(e.target.value)}

    />
    <span className='font-satoshi font-semibold text-base text-gray-700'>
      Password
    </span>
    <Input
      variant="bordered"
      placeholder="Password"
      type={"text"}
      className='form_input'
      onChange={(e) => setPassword(e.target.value)}
    />

    <Button onClick={handleSignIn} className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'>Sign in</Button>
    </div>
    </section>
    
    </>
  );
}
