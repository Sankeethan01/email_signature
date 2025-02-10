"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/utils/supabase"
import SignatureEditor from "@/components/SignatureEditor"

export default function EditPage() {
  const [template, setTemplate] = useState<string>("");
  const { id } = useParams()

  useEffect(() => {
    fetchTemplate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchTemplate() {
    const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()
    if (error) {
      console.error("Error fetching template:", error);
      setTemplate(""); // Ensure template is always a string
    } else {
      console.log("Fetched data from Supabase:", data); // Log the fetched data
      console.log("Type of data.html:", typeof data?.html_code); // Check type
  
      if (typeof data?.html_code === "string") {
        setTemplate(data.html_code);
      } else {
        console.warn("Supabase returned a non-string template. Defaulting to an empty string.");
        setTemplate(""); // Prevent errors
      }
    }
  } 

  if (!template) return <div>Loading...</div>

  return <SignatureEditor template={template} />
}

