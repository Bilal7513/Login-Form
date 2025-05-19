'use client'
import React from 'react'
import Link from "next/link";
import { useState } from "react";
import { signIn, signInWithBrowser } from "@/lib/auth";
import { useRouter } from 'next/navigation';

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await signIn(username, password);
        if(result.success){
            setSuccess(true)
            setMsg('✔️ Logged in successfully!');
            router.push('/');
        } else {
            setSuccess(false)
            setMsg('❌ Login failed: ' + result.message)
            setUsername("")
            setPassword("")
        }
    };
    
    return (
        <>
            <div className='h-screen flex items-center bg-[url(/hero-area.png)] bg-no-repeat bg-top'>
                <div className='backdrop-opacity-10 bg-black/50 rounded-2xl w-[30%] mx-auto text-center p-8 shadow-2xl'>
                    <h1 className='text-[30px] font-medium text-white mb-4'>Login here</h1>
                    <form onSubmit={handleLogin}>
                        <input type="email" onChange={e => setUsername(e.target.value)} placeholder='Email'className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>

                        <input type="password" onChange={e => setPassword(e.target.value)} placeholder='Password' className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>
                        <p className='text-white mt-0.5 ml-[140px]'><Link className='underline' href={'/ForgotPassword'}>Forgot password?</Link></p>
                        <p className={`${success ? "text-green-600" : "text-red-600"} font-bold`}>{msg}</p>
                        <button type='submit' className='bg-white outline-0 text-black rounded-2xl w-[80%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer'>Login</button>
                    </form>
                    <button className='mt-4 bg-[#174EA6] cursor-pointer outline-0 rounded-2xl w-[80%] px-8 py-2 text-lg font-medium' onClick={() => signInWithBrowser("Google")}>Sign in with Google</button>
                    <button className='mt-4 bg-[#00a1f1] cursor-pointer outline-0 rounded-2xl w-[80%] px-8 py-2 text-lg font-medium' onClick={() => signInWithBrowser("Microsoft")}>Sign in with Microsoft</button>
                    <p className='text-white mt-4'><Link className='underline' href={'/Signup'}>Create new account.</Link></p>
                </div>
            </div>
        </>
    )
}