"use client"
import { useState } from "react";
import { createUser } from "../app/lib/actions/signup-act";
import { userSchema } from "../app/constants/userSchema";
import { useRouter } from "next/navigation"
import * as z from "zod";

type UserSchema = z.infer<typeof userSchema>;

export const Signup = () => {
    const router = useRouter()
  const [postInputs, setPostInputs] = useState<UserSchema>({
    name: "",
    email: "",
    password: "",
    number: "",
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
      await createUser(postInputs);
      console.log("created successfully")
      router.push('/')
    } catch (error: any) {
      console.error("Validation Error:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 mt-10 w-screen px-[50px]">
        <div className="m-5 bg-white rounded-3xl px-3 py-4">
            <div className="flex items-center m-7">
            <img className="h-[80px] w-[80px]"src="https://pwebassets.paytm.com/commonwebassets/commonweb/images/online-payments/online-icon.png" alt="" />
            <p className="pl-3 text-md font-sans font-bold">Send Money to<br />Anyone</p>
            </div>
            <div className="px-7 mt-4">
            <h1 className="text-5xl font-sans font-bold text-sky-500">India Pays & Shops Online</h1>
            <h1 className="text-5xl font-sans font-bold text-sky-800 mt-2">with PayEazzy</h1>
            <h1 className="text-lg font-sans font-semibold mt-10 pb-10">With the PayEazzy, 
                <span className=" text-sky-500"> Transfer Funds</span> or <span className=" text-sky-500">Pay</span> anyone without a worry in the world. It is convenient with built-in safety features & easy access to your account balance & payment history.</h1>
            </div>
        </div>
        <div className="m-5 bg-white rounded-3xl flex flex-col justify-center items-center pb-[80px]">
            <h1 className="text-4xl font-sans font-bold text-sky-800 mt-10">Sign Up</h1>
            <h1>Already have an account? <span className="text-sky-500 font-semibold cursor-pointer" onClick={() => router.push("/signin")}>Sign In</span></h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col">
                <input
                    type="text"
                    name="name"
                    value={postInputs.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-[350px] px-5 mt-[40px] h-[50px] bg-white text-lg border border-black rounded-lg"
                />
                <input
                    type="email"
                    name="email"
                    value={postInputs.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-[350px] px-5 mt-[20px] h-[50px] bg-white text-lg border border-black rounded-lg"
                />
                <input
                    type="password"
                    name="password"
                    value={postInputs.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-[350px] px-5 mt-[20px] h-[50px] bg-white text-lg border border-black rounded-lg"
                />
                <input
                    type="text"
                    name="number"
                    value={postInputs.number}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-[350px] px-5 mt-[20px] h-[50px] bg-white text-lg border border-black rounded-lg"
                />
                <button className="w-[350px] mt-[40px] h-[50px] bg-sky-500 text-xl text-white font-bold border-black rounded-lg font-sans" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
  );
};
{/* <h1 className="font-bold text-5xl">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            value={postInputs.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={postInputs.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={postInputs.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="text"
            name="number"
            value={postInputs.number}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <button type="submit">Sign Up</button>
        </div>
      </form> */}
