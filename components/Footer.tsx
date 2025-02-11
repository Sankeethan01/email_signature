"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import Logo from "@/public/assets/footer logo.svg";

export default function Footer() {
  return (
    <footer className="bg-footerDark text-white py-5 px-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-start text-center md:text-left mt-5">
        {/* Column 1: Company Info */}
        <div className="flex flex-col items-start">
          <div className="flex items-center space-x-2">
            <Image src={Logo} width={60} height={60} alt="Logo" />
            <h2 className="text-xl font-bold">Simple Email Signature</h2>
          </div>
          <p className="text-white mt-2">
            Create professional email signatures in minutes.
          </p>
          <Image
            src="/assets/company logo.png"
            alt="Ascentis Signature Maker Logo"
            width={200} // Default width
            height={100} // Default height (must be >0)
            className="mt-4 ml-12 px-3 w-full max-w-[200px] sm:max-w-[250px] object-contain"
          />
        </div>

        {/* Column 2: Quick Links (Centered) */}
        <div className="flex flex-col items-center">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/templates"
                className="hover:text-purple-600 transition"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-purple-600 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div className="flex flex-col items-end">
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:support@example.com" className="hover:text-red-500">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-300 pt-2">
        © {new Date().getFullYear()} Simple Email Signature. All rights
        reserved.
      </div>
    </footer>
  );
}
