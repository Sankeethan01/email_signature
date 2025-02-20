"use client";

// import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

// Define TypeScript types for a template
type Template = {
  id: string;
  name: string;
  thumbnail: string;
};

// Define Props for TemplateGrid Component
interface TemplateGridProps {
  templates: Template[];
}

export default function TemplateGrid({ templates }: TemplateGridProps) {
  // const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null);
  const router = useRouter();

  const selectTemplate = (templateId: string, templateName: string) => {
    // Store the ID in localStorage
    localStorage.setItem("selectedTemplateId", templateId);

    // Navigate with only the template name in the URL
    router.push(`/edit/${encodeURIComponent(templateName)}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {templates.map((template) => (
        <div
          key={template.id}
          className="relative rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105 p-4 flex flex-col items-center"
        >
          {/* Template Image */}
          <div className="relative w-full">
            <Image
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              width={500} // Adjust width
              height={300} // Adjust height
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          {/* Button - Always centered under the template */}
          <div className="w-full flex justify-center mt-4">
            <Button
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 py-2 px-4 rounded-md text-sm"
              onClick={() => selectTemplate(template.id, template.name)}
            >
              Choose Template
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
