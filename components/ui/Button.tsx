"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";

// Define TypeScript Props for Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

export const Button = ({ children, className = "", ...props }: ButtonProps) => (
  <button
    className={`px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </button>
);
