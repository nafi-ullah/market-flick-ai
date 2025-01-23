import React, { useState } from 'react';
import { FaFileAlt, FaTimes } from 'react-icons/fa';
import { IoCloudUploadOutline } from "react-icons/io5";

type UploadedFile = {
  file: File;
  preview: string | null;
};

const FileUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.split('/')[0];
      const preview =
        fileType === 'image'
          ? URL.createObjectURL(file)
          : null; // Only preview images
      setUploadedFile({ file, preview });
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="flex flex-col items-center px-5 py-3">
      {/* File Upload Box */}
      {!uploadedFile && (
        <label
          htmlFor="file-upload"
          className="flex flex-col items-center justify-center w-full h-32  border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition duration-150"
        >
          <div className="flex flex-col items-center">
            <IoCloudUploadOutline className='text-2xl'/>
            <p className="mt-2 text-sm text-gray-200">
              Click to upload or drag and drop
            </p>
            <p className="mt-1 text-xs text-gray-400">CSV, PDF, XLSX, Image</p>
          </div>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      )}

      {/* File Preview */}
      {uploadedFile && (
        <div className="relative w-64 h-32 border rounded-lg overflow-hidden shadow-lg mt-4">
          {uploadedFile.preview ? (
            <img
              src={uploadedFile.preview}
              alt="File Preview"
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 text-gray-500">
              <FaFileAlt size={40} />
              <p className="text-sm">{uploadedFile.file.name}</p>
            </div>
          )}
          <button
            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition duration-150"
            onClick={handleRemoveFile}
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
