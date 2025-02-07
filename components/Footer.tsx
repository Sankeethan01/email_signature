"use client";

import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white text-black py-12 px-6">
      {/* Horizontal Line for Separation */}
      <hr className="border-gray-300 mb-10" />

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Column 1: Company Info */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl font-bold">Ascentis Signature Maker</h2>
          <p className="text-gray-600 mt-2">
            Create professional email signatures in minutes.
          </p>
          <Image
            src="/assets/footer logo.png"
            alt="Ascentis Signature Maker Logo"
            width={160}
            height={0}
            className="mt-4"
          />
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:text-purple-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/templates" className="hover:text-purple-600 transition">
                Templates
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-purple-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-purple-600 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
              <FaLinkedin size={24} />
            </a>
            <a href="mailto:support@example.com" className="hover:text-red-500">
              <FaEnvelope size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-gray-500 mt-10 border-t border-gray-300 pt-4">
        © {new Date().getFullYear()} Ascentis Signature Maker. All rights reserved.
      </div>
    </footer>
  );
}
