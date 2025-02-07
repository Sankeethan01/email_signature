"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/utils/supabase"
import SignatureEditor from "@/components/SignatureEditor"

export default function EditPage() {
  const [template, setTemplate] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    fetchTemplate()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function fetchTemplate() {
    const { data, error } = await supabase.from("templates").select("*").eq("id", id).single()
    if (error) console.error("Error fetching template:", error)
    else setTemplate(data)
  }

  if (!template) return <div>Loading...</div>

  return <SignatureEditor template={template} />
}

