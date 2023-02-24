import React from "react";
import { Spinner } from "../Spinner";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  isLoading: boolean;
}

export function Button({ title, isLoading, ...props }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="bg-purple-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded mt-4 disabled:cursor-not-allowed disabled:bg-gray-300"
    >
      {isLoading ? <Spinner /> : title}
    </button>
  );
}
