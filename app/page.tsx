"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      {/* Navbar */}
      <Navbar />

       {/* Add Some Gap Above Navbar */}
       <div className="mb-10 bg-gray-100"></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-32 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
          Create Your Professional <span className="text-yellow-300">Email Signature</span>
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mb-8">
          Stand out with a unique, personalized signature. Choose from 50+ templates and customize in minutes—all for free!
        </p>
        <Link href="/templates">
          <Button className="bg-white text-purple-600 hover:bg-gray-200 text-xl py-4 px-8 rounded-lg shadow-lg">
            Create Your Signature
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="bg-white text-gray-800 py-20 px-6 md:px-12">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Why Choose Simple Email Signature?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Easy to Use", desc: "No coding required, just fill in your details.", icon: <FaCheckCircle className="text-blue-500 text-4xl" /> },
              { title: "Professional Designs", desc: "Choose from 50+ modern templates.", icon: <FaCheckCircle className="text-green-500 text-4xl" /> },
              { title: "100% Free", desc: "No sign-ups or hidden fees!", icon: <FaCheckCircle className="text-purple-500 text-4xl" /> },
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md">
                {feature.icon}
                <h3 className="text-2xl font-semibold mt-4">{feature.title}</h3>
                <p className="mt-2 text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-500 text-white py-20 text-center">
        <h2 className="text-4xl font-bold mb-6">Start Creating Your Signature Today!</h2>
        <Link href="/templates">
          <Button className="bg-white text-purple-700 hover:bg-gray-200 text-xl py-4 px-8 rounded-lg shadow-lg">
            Get Started for Free
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
