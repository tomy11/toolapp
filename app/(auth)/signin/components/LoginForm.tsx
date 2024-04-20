"use client"

import Input from "@/components/Input";
import { signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginForm() {
    useEffect(() => {
        signOut({redirect: false});
    }, [])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        const res = await signIn("credentials", {
            email, password, redirect: false,
        });

        if(res?.ok){
          toast.success("Correct login");
          window.location.assign("/");
        }
        else if(res?.error){
          toast.error(res?.error);
        }
      
          setLoading(false);
    }

    return (
        <div className='space-y-5 flex flex-col items-center'>
          <Input 
            label='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Input 
            label='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            type='password'
          />
          <div
            onClick={login}
            className='px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer'
          >
            Login
          </div>
        </div>  
      )
}