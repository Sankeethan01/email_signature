"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 md:px-12 py-4 flex items-center justify-between z-50">
      {/* Logo & Brand Name */}
      <Link href="/" className="flex items-center space-x-1">
        <Image src="/assets/Logo.svg" alt="Ascentis Signature Maker Logo" width={60} height={60} />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">
          Simple Email Signature
        </span>
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex md:space-x-3 space-x-6 text-gray-800  -ml-20 text-xl font-semibold">
        <Link href="/" className="hover:text-purple-600 transition">Home</Link>
        <Link href="/templates" className="hover:text-purple-600 transition">Templates</Link>
        <Link href="/about" className="hover:text-purple-600 transition">About</Link>
        <Link href="/contact" className="hover:text-purple-600 transition">Contact</Link>
      </div>

      {/* CTA Button */}
      <Link href="/templates">
        <Button className="hidden md:inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 py-2 px-6 rounded-lg mr-2">
          Create Your Signature
        </Button>
      </Link>

      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-800">
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center space-y-6 shadow-lg">
          <Link href="/" className="text-2xl text-gray-800" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/templates" className="text-2xl text-gray-800" onClick={() => setMenuOpen(false)}>Templates</Link>
          <Link href="/about" className="text-2xl text-gray-800" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="text-2xl text-gray-800" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="/templates" onClick={() => setMenuOpen(false)}>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 py-2 px-6 rounded-lg text-xl">
              Create Signature
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
}
