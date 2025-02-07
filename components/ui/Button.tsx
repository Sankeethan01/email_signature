"use client"

export const Button = ({ children, className, ...props }) => (
    <button
      className={`px-6 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );