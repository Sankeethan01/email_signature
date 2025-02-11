"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";

interface SignatureEditorProps {
  template: string;
}

export default function SignatureEditor({ template }: SignatureEditorProps) {


  template = `
  <div style="font-family: Arial, sans-serif; padding: 20px; border: 3px solid #4CAF50; width: 420px; background-color: #f9f9f9;">
    <p style="color: #4CAF50; font-size: 20px; font-style: italic; font-weight: bold; margin-bottom: 16px;">Best Regards,</p>
    <table style="width: 100%;">
      <tbody>
        <tr>
          <td style="vertical-align: top; padding-right: 15px;">
            <img src="{{profilePic}}" alt="Profile Picture" width="90" height="90" style="border: 3px solid #4CAF50;" />
          </td>
          <td style="vertical-align: top;">
            <p style="margin: 0; font-size: 20px; font-weight: bold; color: #333;">{{name}}</p>
            <p style="margin: 0; font-size: 16px; color: #666;">{{jobTitle}}</p>
            <p style="margin: 12px 0 0; font-size: 14px;"><strong style="color: #333;">Email:</strong> <a href="mailto:{{email}}" style="color: #0073b1;">{{email}}</a></p>
            <p style="margin: 0; font-size: 14px;"><strong style="color: #333;">Phone:</strong> <span style="color: #333;">{{phone}}</span></p>
            <p style="margin: 0; font-size: 14px;"><strong style="color: #333;">Website:</strong> <a href="{{website}}" style="color: #0073b1;">{{website}}</a></p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
`;


  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "Vivien Vassalo",
    jobTitle: "Founder & CEO of Ascentis Technologies",
    email: "v.vassalo@ascentistechnologies.com",
    phone: "733 663 33",
    website: "ascentistechnologies.com",
    profilePic:
      "https://media.licdn.com/dms/image/v2/D4D03AQFB22WgKStmZQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1732222753849?e=1744848000&v=beta&t=5lcJqHb7lmDkbg9Rc4qRC3bAjmgdF-caKkgCyw3R_Ko",
  });

  const [signatureHTML, setSignatureHTML] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("Copy Signature");

  useEffect(() => {
    setSignatureHTML(generateSignatureHTML(template, formData));
  }, [template, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const generateSignatureHTML = (htmlTemplate: string, data: Record<string, string>): string => {
    if (!htmlTemplate) return "<p>Loading...</p>";

    let updatedHTML = htmlTemplate;
    Object.entries(data).forEach(([key, value]) => {
      updatedHTML = updatedHTML.replace(new RegExp(`{{${key}}}`, "g"), value || "");
    });

    return updatedHTML;
  };

  const copySignature = async () => {
    if (previewRef.current) {
      const range = document.createRange();
      range.selectNodeContents(previewRef.current);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
      document.execCommand("copy");
      selection?.removeAllRanges();

      setCopyStatus("✅ Copied!");
      setTimeout(() => setCopyStatus("Copy Signature"), 2000);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4 bg-gradient-to-r from-blue-400 to-purple-500">
      <Button onClick={() => router.push("/templates")} className="mb-8">
        ⬅️ Back to Templates
      </Button>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Input Fields Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Edit Your Signature</h2>
          <div className="space-y-4">
            <InputField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <InputField label="Website" name="website" value={formData.website} onChange={handleInputChange} />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <div
            ref={previewRef}
            className="border rounded-lg bg-gray-50 shadow-md inline-block max-w-full overflow-scroll md:overflow-auto"
            style={{
              padding: "10px", // Padding for breathing space inside the preview
              maxWidth: "100%", // Ensures it doesn't overflow the container
            }}
            dangerouslySetInnerHTML={{ __html: signatureHTML }}
          />
          
          <Button onClick={copySignature} className="mt-4 w-full md:w-fit block">
            {copyStatus}
          </Button>
        </div>

      </div>
    </div>
  );
}
