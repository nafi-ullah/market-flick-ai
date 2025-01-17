import React, { useEffect, useState } from 'react';
import { FaGlobe } from 'react-icons/fa';

interface ModalProps {
  handleClose: () => void;
  sources: string[];
}

const SourcesModal: React.FC<ModalProps> = ({ handleClose, sources }) => {
  const [titles, setTitles] = useState<{ url: string; title: string }[]>([]);

  useEffect(() => {
    const fetchTitles = async () => {
      const titlePromises = sources.map(async (url) => {
        try {
      
          
            // Extract the desired part of the URL
            const cleanUrl = url.startsWith('https://www.')
              ? url.split('https://www.')[1].split('/')[0]
              : url.split('https://')[1].split('/')[0];
          
            return { url, title: `${cleanUrl}` };
          } catch (error) {
            // Extract the desired part of the URL even in case of an error
            const cleanUrl = url.startsWith('https://www.')
              ? url.split('https://www.')[1].split('/')[0]
              : url.split('https://')[1].split('/')[0];
          
            return { url, title: `${cleanUrl}` };
          }
      });

      const resolvedTitles = await Promise.all(titlePromises);
      setTitles(resolvedTitles);
    };

    fetchTitles();
  }, [sources]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">Source Links</h2>
        <ul className="space-y-3">
          {titles.map(({ url, title }, index) => (
            <li key={index} className="flex items-center space-x-3">
              <FaGlobe className="text-blue-500" />
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SourcesModal;
