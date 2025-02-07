"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/InputField"; // Import InputField
import { Button } from "@/components/ui/Button";

// Define TypeScript types
type Template = {
  id: string;
  name: string;
  html_code: string;
};

interface SignatureEditorProps {
  template: Template;
}

export default function SignatureEditor({ template }: SignatureEditorProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "",
    jobTitle: "",
    company: "",
    email: "",
    phone: "",
    website: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getSignatureHTML = (): string => {
    if (!template?.html_code) return "<p>Loading...</p>"; // Prevents undefined error

    let signatureHTML = template.html_code;
    Object.entries(formData).forEach(([key, value]) => {
      signatureHTML = signatureHTML.replace(new RegExp(`{{${key}}}`, "g"), value);
    });
    return signatureHTML;
  };

  const copyEmbedCode = () => {
    const embedCode = getSignatureHTML();
    navigator.clipboard.writeText(embedCode);
    alert("Signature copied to clipboard!");
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-r from-blue-400 to-purple-500">
      <Button onClick={() => router.push("/templates")} className="mb-8">
        ← Back to Templates
      </Button>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Edit Your Signature</h2>
          <div className="space-y-4">
            <InputField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            <InputField label="Company" name="company" value={formData.company} onChange={handleInputChange} />
            <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <InputField label="Website" name="website" value={formData.website} onChange={handleInputChange} />
          </div>
          <Button onClick={copyEmbedCode} className="mt-8">
            Copy Signature
          </Button>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <div className="border p-4 rounded-lg" dangerouslySetInnerHTML={{ __html: getSignatureHTML() }} />
        </div>
      </div>
    </div>
  );
}
