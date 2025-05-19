import { BACKENDURL } from "@/utils/constants";
import React, { useState } from "react";
import FeatureComparisonCardSkeleton from "../loaders/RadarChartSkelton";

interface Presentation {
  presentation_id: string;
  title: string;
  description: string;
  image: string;
}

const presentationData: Presentation[] = [
  {
    presentation_id: "template1",
    title: "Professional Template",
    description: "Clean and modern design perfect for business presentations",
    image: "/ppt1.png",
  },
  {
    presentation_id: "template2",
    title: "Creative Template",
    description: "Bold and artistic design for creative presentations",
    image: "/ppt2.png",
  },
  {
    presentation_id: "template3",
    title: "Minimal Template",
    description: "Simple and elegant design focusing on content",
    image: "/ppt2.png",
  },
];

interface SocialShareProps {
    // Add a body or summary to the props
     investor_id: string;
   }

const PresentationGenerator: React.FC<SocialShareProps> = ({ investor_id }) =>  {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileLink, setFileLink] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setSelectedId(id);
  };

  const handleGenerateClick = async () => {
    if (selectedId) {
      setIsLoading(true);
      setIsModalOpen(true);
      setFileLink(null);

      try {
        const selectedTemplate = presentationData.find((p) => p.presentation_id === selectedId);
        const response = await fetch(`${BACKENDURL}/generate-presentation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: investor_id,
            template_name: selectedId,
          }),
        });

        const data = await response.json();
        if (data.file_link) {
          setFileLink(data.file_link);
        }
      } catch (error) {
        console.error("Error generating presentation:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };


  return (
    <div className="p-8 max-w-7xl mx-auto bg-[hsl(var(--accent))] rounded-lg mt-10">
      <h1 className="text-2xl font-bold  mb-8">Presentation Generator</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {presentationData.map((presentation) => (
          <div
            key={presentation.presentation_id}
            className={`border rounded-lg p-4 cursor-pointer ${
              selectedId === presentation.presentation_id ? "border-indigo-500 bg-indigo-950" : "border-gray-300"
            }`}
            onClick={() => handleCardClick(presentation.presentation_id)}
          >
            <img
              src={presentation.image}
              alt={presentation.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-semibold mb-2">{presentation.title}</h2>
            <p className="text-gray-300 text-sm">{presentation.description}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-8 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition block mx-auto"
        onClick={handleGenerateClick}
      >
        Generate Presentation
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-black p-6 rounded-lg text-center relative min-w-[900px] min-h-[500px]">
            {isLoading && <p className="text-gray-200 mb-4">Your presentation is generating...</p>}

            {fileLink ? (
              <>
                <img
                  src={presentationData.find((p) => p.presentation_id === selectedId)?.image}
                  alt="Selected Presentation"
                  className="w-full  object-cover rounded-md mb-4"
                />
                <a
                  href={fileLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition inline-block"
                >
                  Download Presentation
                </a>
              </>
            ) : (
              isLoading && <div className="loader  mx-auto min-w-[700px] min-h-[400px]">

                <FeatureComparisonCardSkeleton/>
              </div>
            )}

            <button
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PresentationGenerator;
