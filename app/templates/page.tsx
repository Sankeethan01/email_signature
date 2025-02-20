"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import TemplateGrid from "@/components/TemplateGrid";
import { FaFilter } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Define Type for Templates
type Template = {
  id: string;
  name: string;
  category: string;
  thumbnail: string;
};

// Define Type for Categories
const categoryOptions: string[] = [
  "All",
  "Corporate",
  "Creative",
  "Minimalist",
  "Modern",
  "Business",
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTemplates() {
    setLoading(true);

    let query = supabase.from("templates").select("*").limit(50);

    if (selectedCategory !== "All") {
      query = query.eq("category", selectedCategory);
    }

    const { data, error } = await query;
    if (error) {
      console.error("Error fetching templates:", error);
    } else {
      setTemplates(data as Template[]); // Ensure TypeScript knows the type
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar (Matching Landing Page) */}
      <Navbar />

      {/* Add Some Gap Above Navbar */}
      <div className="mb-10 bg-white h-14"></div>

      {/* Hero Section (Matching Landing Page Style) */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 text-center -mt-1">
        <h1 className="text-5xl font-bold mb-4">
          Let&apos;s create your first signature!
        </h1>
        <p className="text-xl mb-6">Pick a design that suits you best</p>
      </section>

      <div className="container mx-auto flex flex-col md:flex-row gap-10 py-12 px-8">
        {/* Sidebar Filter */}
        <aside className="hidden md:block md:w-1/4 bg-white shadow-lg rounded-lg p-6 sticky top-20 h-fit">
          <h2 className="text-xl font-semibold mb-4 flex items-center text-gray-800">
            <FaFilter className="mr-2" /> Filter by Category
          </h2>
          <ul className="space-y-3">
            {categoryOptions.map((category) => (
              <li
                key={category}
                className={`cursor-pointer p-2 rounded-md text-gray-700 hover:bg-gray-200 transition ${
                  selectedCategory === category
                    ? "bg-purple-500 text-white"
                    : ""
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </aside>

        {/* Template Grid */}
        <div className="md:w-3/4">
          {loading ? (
            <p className="text-center text-2xl text-gray-500">
              Loading templates...
            </p>
          ) : (
            <TemplateGrid templates={templates} />
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
