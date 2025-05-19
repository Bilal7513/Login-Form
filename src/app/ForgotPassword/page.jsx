'use client'
import Link from 'next/link'
import { useState } from "react";
import { forgotPassword, confirmNewPassword } from "@/lib/auth";
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [msg, setMsg] = useState("");
    const [success, setSuccess] = useState(null);
    const router = useRouter();

    const handleSendCode = async (e) => {
      e.preventDefault();
        const result = await forgotPassword(username);
        if (result.success) {
          setStep(2);
          setSuccess(true)
          setMsg("Code sent to your email.");
        } else {
          setSuccess(false)
          setMsg(result.message);
        }
    };

    const handleReset = async () => {
        const result = await confirmNewPassword(username, code, newPassword);
        if (result.success) {
          setStep(2);
          setSuccess(true)
          setMsg("Password reset!");
          router.push('/Login')
        } else {
          setSuccess(false)
          setMsg(result.message);
          setUsername("");
          setCode("");
          setNewPassword("");
        }
    };

    return (
        <>
          <div className='h-screen flex items-center bg-[url(/hero-area.png)] bg-no-repeat bg-top'>
            <div className='backdrop-opacity-10 bg-black/50 rounded-2xl w-[30%] mx-auto text-center p-8 shadow-2xl'>
              {step === 1 ? (
                <>
                  <h1 className='text-[30px] font-medium text-white'>Trouble logging in?</h1>
                  <h4 className='w-[75%] mx-auto text-[15px] font-medium text-gray-300 mb-4'>
                    Enter your email and we'll send you a link to get back into your account.
                  </h4>
                  <form onSubmit={handleSendCode}>
                    <input type="text" placeholder="Email" onChange={(e) => setUsername(e.target.value)} className="w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]"
                    />
                    <p className={`${success ? "text-green-600" : "text-red-600"} font-bold`}>{msg}</p>
                    <button type="submit" className="bg-white outline-0 text-black rounded-2xl w-[80%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer"
                    >Send login link</button>
                  </form>
                  <div className="flex justify-center mt-[20px]">
                    <div className="relative top-[10px] h-[1.2px] w-[120px] bg-gray-400"></div>
                    <div className="mx-2">OR</div>
                    <div className="relative top-[10px] h-[1.2px] w-[100px] bg-gray-400"></div>
                  </div>
                  <p className="text-white mt-4">
                    <Link className="underline" href={"/Signup"}>
                      Create new account.
                    </Link>
                  </p>
                </>
              ) : (
                <div>
                  <input placeholder="Code" onChange={(e) => setCode(e.target.value)} className="w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]"/>
                  <input placeholder="New Password" type="password" onChange={(e) => setNewPassword(e.target.value)} className="w-[80%] rounded-2xl border border-white placeholder:text-gray-300 text-gray-300 mt-3 outline-0 px-3 py-2 text-[17px]"/>
                  <p className={`${success ? "text-green-600" : "text-red-600"} font-bold mt-1`}>{msg}</p>
                  <button onClick={handleReset} className="bg-white outline-0 text-black rounded-2xl w-[80%] mt-4 px-8 py-2 text-lg font-medium cursor-pointer">Reset Password</button>
                </div>
              )}
            </div>
          </div>
        </>
      );
      
}