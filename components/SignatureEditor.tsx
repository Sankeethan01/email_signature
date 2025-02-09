"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";

interface SignatureEditorProps {
  template: string;
}

const hardcodedTemplate = `
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
          <p style="margin: 0; font-size: 14px;"><strong style="color: #333;">Phone:</strong><span style="color: #333;"> {{phone}}</span></p>
          <p style="margin: 0; font-size: 14px;"><strong style="color: #333;">Website:</strong> <a href="{{website}}" style="color: #0073b1;">{{website}}</a></p>
        </td>
      </tr>
    </tbody>
  </table>
</div>

`;

export default function SignatureEditor({ template }: SignatureEditorProps) {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "David Wilson",
    jobTitle: "Freelancers Motion Designer",
    email: "wilson@ascentistechnologies.com",
    phone: "733 663 33",
    website: "www.davidwil.com",
    profilePic: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const [signatureHTML, setSignatureHTML] = useState<string>("");

  const finalTemplate = template || hardcodedTemplate;

  useEffect(() => {
    setSignatureHTML(generateSignatureHTML(finalTemplate, formData));
  }, [finalTemplate,formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSignatureHTML = (htmlTemplate: string, data: Record<string, string>): string => {
    if (typeof htmlTemplate !== "string") {
      console.error("generateSignatureHTML received a non-string template:", htmlTemplate);
      return ""; // Return empty string to prevent errors
    }
  
    let updatedHTML = htmlTemplate;
    Object.entries(data).forEach(([key, value]) => {
      updatedHTML = updatedHTML.replace(new RegExp(`{{${key}}}`, "g"), value || "");
    });
    return updatedHTML;
  };

  const handlePreviewEdit = (e: React.FormEvent<HTMLDivElement>) => {
    const editedContent = e.currentTarget.innerHTML;
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = editedContent;

    setFormData({
      ...formData,
      name: tempDiv.querySelector("p:nth-of-type(1)")?.textContent || "",
      jobTitle: tempDiv.querySelector("p:nth-of-type(2)")?.textContent || "",
      email: tempDiv.querySelector("span:nth-of-type(1)")?.textContent || "",
      phone: tempDiv.querySelector("span:nth-of-type(2)")?.textContent || "",
      website: tempDiv.querySelector("span:nth-of-type(3)")?.textContent || "",
    });
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
    }
    alert("Signature copied!");
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
            <InputField label="Your Name" name="name" value={formData.name} onChange={handleInputChange} color="black"/>
            <InputField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} color="black" />
            <InputField label="Email" name="email" value={formData.email} onChange={handleInputChange} color="black" />
            <InputField label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} color="black" />
            <InputField label="Website" name="website" value={formData.website} onChange={handleInputChange} color="black"/>

            <div>
              <label className="block text-gray-700 font-bold mb-2">Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full text-sm" />
            </div>
          </div>
         
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold mb-4">Preview</h2>
          <div
            ref={previewRef}
            className="border p-4 rounded-lg bg-gray-50 shadow-md"
            contentEditable
            onInput={handlePreviewEdit}
            dangerouslySetInnerHTML={{ __html: signatureHTML }}
          />
           <Button onClick={copySignature} className="mt-8">
            Copy Signature
          </Button>
        </div>
      </div>
    </div>
  );
}
