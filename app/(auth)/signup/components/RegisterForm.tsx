"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/Input";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterForm() {

    useEffect(() => {
        signOut({redirect: false})
    },[])

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const register = async () => {
        setLoading(true);
        try {
            const res = await axios.post('/api/register', {
                email, password
            });

            if(res){
                toast.success("Successfully registered");
                window.location.assign("/login");
            }
            //toast.success("Successfully registered");
        } catch (error: any) {
            console.log(error);
            toast.error(error?.response?.data);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-5 flex flex-col items-center">
            <Input 
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
            />
             <Input 
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                type="password"
            />

            <div 
                onClick={register}
                className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70 cursor-pointer"
            >
                Register
            </div>
        </div>
    )
}