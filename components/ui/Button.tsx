"use client"

import type { ButtonHTMLAttributes, ReactNode } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  className?: string
}

export const Button = ({ children, className = "", style, ...props }: ButtonProps) => (
  <button
    className={`px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 ${className}`}
    style={style}
    {...props}
  >
    {children}
  </button>
)

