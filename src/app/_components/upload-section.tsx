"use client";

import { useState } from "react";
import { FileText, Upload } from "lucide-react";

interface UploadSectionProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
}

export default function UploadSection({
  onFileUpload,
  isLoading = false,
}: UploadSectionProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        onFileUpload(file);
      } else {
        alert("Please upload a PDF file only.");
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onFileUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Upload className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Upload Candidate Resume
        </h2>
        <p className="text-gray-600">PDF files only, up to 10MB</p>
      </div>

      <div className="space-y-4">
        <label
          htmlFor="resume-upload"
          className={`block border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">
            {isLoading ? "Processing..." : "Click to upload or drag and drop"}
          </p>
          <p className="text-sm text-gray-500">PDF up to 10MB</p>
          <input
            id="resume-upload"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileInput}
            disabled={isLoading}
          />
        </label>
      </div>
    </div>
  );
}
