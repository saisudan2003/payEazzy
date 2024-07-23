"use client"
import { useState } from "react";
import { signinSchema } from "../app/constants/userSchema";
import { useRouter } from "next/navigation"
import * as z from "zod";
import { signIn } from "next-auth/react";

type SigninSchema = z.infer<typeof signinSchema>;

export const Signin = () => {
    const router = useRouter()
  const [postInputs, setPostInputs] = useState<SigninSchema>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPostInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log(postInputs)
        const result = await signIn("credentials", {
            redirect: false,
            email: postInputs.email,
            password: postInputs.password,
        });

        console.log("Sign-in result:", result);
        
        if (result?.ok) {
            console.log("Signed in successfully");
            router.push('/');
        } else {
            console.error("Sign-in error:", result?.error);
        }
    } catch (error: any) {
        console.error("Validation Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 mt-10 w-screen px-[50px]">
        <div className="m-5 bg-white rounded-3xl px-3 py-4">
            <div className="flex items-center">
            <img className="h-[140px] w-[140px]"src="https://assetscdn1.paytm.com/images/catalog/view_item/764072/1615964143086.png" alt="" />
            <p className="text-md font-sans font-bold">Send Money to<br />Anyone</p>
            </div>
            <div className="px-7 mt-4">
            <h1 className="text-5xl font-sans font-bold text-sky-500">The Most Reliable</h1>
            <h1 className="text-5xl font-sans font-bold text-sky-800 mt-2">Payment Wallet in the country.</h1>
            <h1 className="text-lg font-sans font-semibold mt-10 pb-10">With the PayEazzy, 
                <span className=" text-sky-500"> Transfer Funds</span> or <span className=" text-sky-500">Pay</span> anyone without a worry in the world. It is convenient with built-in safety features & easy access to your account balance & payment history.</h1>
            </div>
        </div>
        <div className="m-5 bg-white rounded-3xl flex flex-col justify-center items-center pb-[80px]">
            <h1 className="text-4xl font-sans font-bold text-sky-800 mt-4">Sign In</h1>
            <h1>Dont have an account? <span className="text-sky-500 font-semibold cursor-pointer" onClick={() => router.push("/signup")}>Sign Up</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <input
                    type="email"
                    name="email"
                    value={postInputs.email}
                    onChange={handleChange}
                    className="w-[350px] px-5 mt-[60px] h-[50px] bg-white text-lg border border-black rounded-lg"
                    placeholder="Email"
                />
                <input
                    type="password"
                    name="password"
                    value={postInputs.password}
                    onChange={handleChange}
                    className="w-[350px] px-5 mt-[30px] h-[50px] bg-white text-lg border border-black rounded-lg"
                    placeholder="Password"
                />
                <button className="w-[350px] mt-[40px] h-[50px] bg-sky-500 text-xl text-white font-bold border-black rounded-lg font-sans" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
    
  );
};
