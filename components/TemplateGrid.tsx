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

  const selectTemplate = (templateId: string) => {
    router.push(`/edit/${templateId}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {templates.map((template) => (
        <div
          key={template.id}
          className="relative rounded-lg overflow-hidden shadow-lg bg-white transition-transform duration-300 hover:scale-105 p-4"
          // onMouseEnter={() => setHoveredTemplate(template.id)}
          // onMouseLeave={() => setHoveredTemplate(null)}
        >
          {/* Using Next.js Image with similar styles */}
          <div className="relative w-full h-auto">
            <Image
              src={template.thumbnail || "/placeholder.svg"}
              alt={template.name}
              width={500} // Adjust width
              height={300} // Adjust height
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <Button
               className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 py-2 px-4 rounded-md mt-4"
               onClick={() => selectTemplate(template.id)}
             >
               Choose This Template
             </Button>

          {/* {hoveredTemplate === template.id && (
             <div
             className={`absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center transition-opacity ${
               hoveredTemplate === template.id ? "opacity-100" : "opacity-0 sm:opacity-100"
             }`}
           >
             <Button
               className="block bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 py-2 px-6 rounded-lg"
               onClick={() => selectTemplate(template.id)}
             >
               Choose This Template
             </Button>
           </div>
          )} */}
        </div>
      ))}
    </div>
  );
}
