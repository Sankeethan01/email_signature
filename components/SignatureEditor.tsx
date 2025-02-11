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
    <div className="container mx-auto py-12 px-10 bg-gray-100 mb-10">
      <Button onClick={() => router.push("/templates")} className="mb-8 text-xl px-5">
        ⬅️
      </Button>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Input Fields Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-black">Edit Your Signature</h2>
          <div className="space-y-4">
            <InputField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} />
            <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} />
            <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
            <InputField label="Website" name="website" value={formData.website} onChange={handleInputChange} />
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-black">Preview</h2>
          <div
            ref={previewRef}
            className="border rounded-lg bg-gray-50 shadow-md p-4 overflow-auto"
            style={{ minHeight: "150px" }}
            dangerouslySetInnerHTML={{ __html: signatureHTML }}
          />
          
          <Button onClick={copySignature} className="mt-4 w-full md:w-fit block bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90">
            {copyStatus}
          </Button>
        </div>
      </div>
    </div>
  );
}
