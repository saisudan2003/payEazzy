"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className="ml-4 h-[50px] w-[150px] text-white bg-sky-800 hover:bg-sky-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-xl text-xl px-5 py-2.5 me-2 mb-2">
      {children}
    </button>

  );
};
