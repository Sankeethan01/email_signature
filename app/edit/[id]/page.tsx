"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import SignatureEditor from "@/components/SignatureEditor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function EditPage() {
  const [template, setTemplate] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const id = localStorage.getItem("selectedTemplateId");

    if (!id) {
      console.error("No template ID found. Redirecting...");
      router.push("/templates"); // Redirect if no ID found
      return;
    }
    fetchTemplate(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTemplate(id: string) {
    const { data, error } = await supabase
      .from("templates")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error("Error fetching template:", error);
      setTemplate(""); // Ensure template is always a string
    } else {
      console.log("Fetched data from Supabase:", data); // Log the fetched data
      console.log("Type of data.html:", typeof data?.html_code); // Check type

      if (typeof data?.html_code === "string") {
        setTemplate(data.html_code);
      } else {
        console.warn(
          "Supabase returned a non-string template. Defaulting to an empty string."
        );
        setTemplate(""); // Prevent errors
      }
    }
  }

  if (!template) return <div>Loading...</div>;

  return (
    <>
      {/* Navbar */}
      <Navbar />
      {/* Add Some Gap Above Navbar */}
      <div className="mb-10 bg-white h-14"></div>

      {/* Editing Section */}
      <SignatureEditor template={template} />

      {/* Footer */}
      <Footer />
    </>
  );
}
