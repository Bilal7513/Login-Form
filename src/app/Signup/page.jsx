'use client'
import Link from 'next/link'
import { useState } from 'react'
import { signUp } from '@/lib/auth'
import { useRouter } from 'next/navigation';

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signUp(form);
        if (result.success) {
            setSuccess(true)
            setMsg("Signup successful! Check your email for verification code.");
            router.push('/Verification');
        } else {
            setSuccess(false)
            setMsg("Signup error: " + result.message);
        }
      };
    
    return (
        <>
            <div className='h-screen flex items-center bg-[url(/hero-area.png)] bg-no-repeat bg-top'>
                <div className='backdrop-opacity-10 bg-black/50 rounded-2xl w-[30%] mx-auto text-center p-8 shadow-2xl'>
                    <h1 className='text-[30px] font-medium text-white'>Create a new account</h1>
                    <h4 className='text-[15px] font-medium text-gray-300 mb-4'>It's quick and easy.</h4>
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='Username' onChange={e => setForm({ ...form, username: e.target.value })} className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-2 outline-0 px-3 py-2 text-[17px]'/>

                        <input type="email" placeholder='Email' onChange={e => setForm({ ...form, email: e.target.value })} className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>

                        <input type="password" placeholder='Password' onChange={e => setForm({ ...form, password: e.target.value })} className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>
                        <p className={`${success ? "text-green-600" : "text-red-600"} font-bold`}>{msg}</p>

                        <button type='submit' className='bg-white outline-0 text-black rounded-2xl w-[80%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer'>Signup</button>
                    </form>
                    <p className='text-white mt-4'><Link className='underline' href={'/Login'}>Already have an account?</Link></p>
                </div>
            </div>
        </>
    )
}

