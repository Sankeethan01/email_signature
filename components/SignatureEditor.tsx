/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";

export default function SignatureEditor() {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);

  // User Data
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
  const [copyStatus, setCopyStatus] = useState<string>("📋 Copy Signature");

  // Signature Template
  const signatureTemplate = `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 3px solid #4CAF50; width: 100%; max-width: 420px; background-color: #f9f9f9;">
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

  useEffect(() => {
    setSignatureHTML(generateSignatureHTML(signatureTemplate, formData));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          profilePic: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateSignatureHTML = (
    htmlTemplate: string,
    data: Record<string, string>
  ): string => {
    if (!htmlTemplate) return "<p>Loading...</p>";

    let updatedHTML = htmlTemplate;
    Object.entries(data).forEach(([key, value]) => {
      updatedHTML = updatedHTML.replace(
        new RegExp(`{{${key}}}`, "g"),
        value || ""
      );
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

      setCopyStatus("✅ Copied!            ");
      setTimeout(() => setCopyStatus("📋 Copy Signature"), 2000);
    }
  };

  return (
    <div className="container mx-auto py-12 px-10 bg-gray-100 mb-10">
      <Button
        onClick={() => router.push("/templates")}
        className="mb-8 text-xl px-5"
      >
        ⬅️
      </Button>
      <div className="flex flex-col md:flex-row gap-10">
        {/* Input Fields Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-black">
            Edit Your Signature
          </h2>
          <div className="space-y-4">
            <InputField
              label="Your Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <InputField
              label="Job Title"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <InputField
              label="Website"
              name="website"
              value={formData.website}
              onChange={handleInputChange}
            />

            {/* Profile Picture Upload */}
            <div className="border p-4 rounded-lg bg-white shadow-md">
              <label className="block text-gray-800 font-semibold mb-2">
                Upload Profile Picture
              </label>

              {/* Profile Image Preview */}
              {formData.profilePic && (
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-20 h-20 rounded-full border border-gray-300 shadow-sm"
                  />
                  <button
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilePic: "" }))
                    }
                    className="mt-2 text-red-600 text-sm hover:text-red-800 transition"
                  >
                    ❌ Remove Picture
                  </button>
                </div>
              )}

              {/* Custom Styled File Input */}
              <div className="relative flex items-center justify-center border border-gray-300 p-2 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <span className="text-gray-700 font-semibold">
                  📁 Choose an Image
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-black">Preview</h2>
          <div
            ref={previewRef}
            className="border rounded-lg bg-gray-50 shadow-md inline-block w-full max-w-md overflow-auto p-4"
            dangerouslySetInnerHTML={{ __html: signatureHTML }}
          />
          <Button
            onClick={copySignature}
            className="mt-4 w-full md:w-auto block"
          >
            {copyStatus}
          </Button>
        </div>
      </div>
    </div>
  );
}
