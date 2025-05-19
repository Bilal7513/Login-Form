'use client'
import { useState } from "react";
import { confirmSignUp } from "@/lib/auth";
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function Verify() {
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleVerify = async (e) => {
        e.preventDefault();
        const result = await confirmSignUp(username, code);
        if(result.success){
            setSuccess(true)
            setMsg('✔️ Verified!');
            router.push('/Login');
        } else {
            setSuccess(false);
            setMsg('❌ Error: ' + result.message);
            setUsername("");
            setCode("");
        }
    };

    return (
        <>
            <div className='h-screen flex items-center bg-[url(/hero-area.png)] bg-no-repeat bg-top'>
                <div className='backdrop-opacity-10 bg-black/50 rounded-2xl w-[30%] mx-auto text-center p-8 shadow-2xl'>
                    <h1 className='text-[30px] font-medium text-white mb-4'>Verify Your Account</h1>
                    <form onSubmit={handleVerify}>
                        <input type="text" onChange={e => setUsername(e.target.value)} placeholder='Username'className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>

                        <input type="text" onChange={e => setCode(e.target.value)} placeholder='Verification Code' className='w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]'/>
                        <p className={`${success ? "text-green-600" : "text-red-600"} font-bold`}>{msg}</p>

                        <button type='submit' className='bg-white outline-0 text-black rounded-2xl w-[80%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer'>Verify Account</button>
                    </form>
                    <p className='text-white mt-4'><Link className='underline' href={'/Signup'}>Create new account.</Link></p>
                </div>
            </div>
        </>
    );
}
