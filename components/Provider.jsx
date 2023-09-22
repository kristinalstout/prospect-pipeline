'use client';
import {useState, createContext, useEffect} from "react"

export const appContext = createContext()

function Provider({ children}){
  const [user, setUser] = useState(false)
  useEffect(()=>{
    const fetching = async()=>{
      try {
        const response = await fetch("http://127.0.0.1:5555/current_user",{
          credentials: "include"
        })
        if (!response.ok){
          throw new Error("Network error")
        }
        const userData = await response.json()
        setUser(userData)
      } catch(error){
        console.error("Fetch error",error)
      }
    }
    fetching()
  },[])

  return(
  <appContext.Provider value={{user, setUser}}>
    {children}
  </appContext.Provider>
  )}

export default Provider;