/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { InputField } from "@/components/ui/InputField";
import { Button } from "@/components/ui/Button";
import { supabase } from "@/utils/supabase";

export default function SignatureEditor({ template }: { template: string }) {
  const router = useRouter();
  const previewRef = useRef<HTMLDivElement>(null);

  // User Data
  const [formData, setFormData] = useState<Record<string, string>>({
    name: "Vivien Vassalo",
    jobTitle: "Founder & CEO of Ascentis Technologies",
    email: "v.vassalo@ascentistechnologies.com",
    phone: "733 663 33",
    website: "ascentistechnologies.com",
    profilePic: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
  });

  const [signatureHTML, setSignatureHTML] = useState<string>("");
  const [copyStatus, setCopyStatus] = useState<string>("📋 Copy Signature");
  const [uploading, setUploading] = useState<boolean>(false);

  // Supabase Storage
  const STORAGE_BUCKET = "email_signature"; // Supabase bucket
  const STORAGE_FOLDER = "user_images"; // Folder for user images

  useEffect(() => {
    setSignatureHTML(generateSignatureHTML(template, formData));
  }, [formData, template]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload Image to Supabase Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    // Generate a unique file name
    const fileName = `${Date.now()}_${file.name}`;

    // Upload file to Supabase Storage
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(`${STORAGE_FOLDER}/${fileName}`, file);

    if (error) {
      console.error("Error uploading image:", error.message);
      setUploading(false);
      return;
    }

    // Get Public URL of uploaded image
    const { data: publicURLData } = supabase.storage
      .from(STORAGE_BUCKET)
      .getPublicUrl(`${STORAGE_FOLDER}/${fileName}`);

    const imageUrl = publicURLData?.publicUrl || "";

    // Update state with image URL
    setFormData((prev) => ({ ...prev, profilePic: imageUrl }));
    setUploading(false);
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

  // Copy Signature and Save to Supabase
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
      setTimeout(() => setCopyStatus("📋 Copy Signature"), 2000);
    }

    // Save user data to Supabase Database
    const { error } = await supabase.from("user_data").insert([
      {
        name: formData.name,
        jobTitle: formData.jobTitle,
        email: formData.email,
        phone: formData.phone,
        website: formData.website,
        profilePic: formData.profilePic, // Store uploaded image URL
      },
    ]);

    if (error) {
      console.error("Error saving user data:", error.message);
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

            {/* Profile Picture Upload Section */}
            <div className="border p-4 rounded-lg bg-white shadow-md">
              <label className="block text-gray-800 font-semibold mb-2">
                📸 Display Image
              </label>

              {/* Display uploaded image preview */}
              {formData.profilePic && (
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={formData.profilePic}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full border border-gray-300 shadow-md"
                  />
                  <button
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, profilePic: "" }))
                    }
                    className="mt-2 text-red-600 text-sm font-semibold hover:text-red-800 transition"
                  >
                    ❌ Remove Picture
                  </button>
                </div>
              )}

              {/* Custom Styled File Input */}
              <div className="relative flex items-center justify-center border border-gray-300 p-3 rounded-md bg-gray-100 hover:bg-gray-200 cursor-pointer transition">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={uploading}
                />
                <span className="text-gray-700 font-semibold">📁 Choose an Image</span>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 border">
          <h2 className="text-2xl font-bold mb-4 text-black">Preview</h2>
          <div
            ref={previewRef}
            className="border rounded-lg bg-gray-50 shadow-md inline-block w-full max-w-lg overflow-auto p-4"
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
