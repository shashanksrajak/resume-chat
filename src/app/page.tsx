"use client";

import { useState } from "react";
import Footer from "./_components/footer";
import UploadSection from "./_components/upload-section";
import ChatSection from "./_components/chat-section";
import FeaturesSection from "./_components/features-section";
import SampleQuestions from "./_components/sample-questions";
import { Brain } from "lucide-react";
import { uploadResumeToAI } from "@/actions/resume-actions";

interface FileMetadata {
  uri: string;
  mimeType: string;
  fileName: string;
  aiMessage?: string;
}

export default function Home() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileMetadata, setFileMetadata] = useState<FileMetadata | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    const form = new FormData();
    form.append("file", file);

    try {
      const response = await uploadResumeToAI(form);
      if (!response.success) {
        alert(response.error || "Failed to upload file");
        return;
      }

      console.log("Gemini AI response:", response);
      setUploadedFile(file);
      setFileMetadata({
        uri: response.fileUri!,
        mimeType: response.mimeType!,
        fileName: response.fileName || file.name,
        aiMessage: response.AI_message,
      });
    } catch (error) {
      console.error("Upload error:", error);
      alert("An error occurred during upload");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setUploadedFile(null);
    setFileMetadata(null);
  };

  return (
    <div
      className={`${
        uploadedFile && fileMetadata
          ? "h-screen overflow-hidden"
          : "min-h-screen"
      } bg-gradient-to-br from-blue-50 via-white to-purple-50`}
    >
      {/* Full Screen Chat Mode */}
      {uploadedFile && fileMetadata ? (
        <ChatSection
          fileName={uploadedFile.name}
          fileUri={fileMetadata.uri}
          mimeType={fileMetadata.mimeType}
          aiMessage={fileMetadata.aiMessage}
          onReset={handleReset}
        />
      ) : (
        /* Normal Mode - Upload Interface */
        <div className="container max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <header className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-3 bg-blue-600 rounded-2xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Recruiter AI Assistant
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Upload candidate resumes and get AI-powered insights to make
              informed hiring decisions. Analyze qualifications, skills, and
              role suitability with intelligent conversations.
            </p>
          </header>

          {/* Upload Section */}
          <UploadSection
            onFileUpload={handleFileUpload}
            isLoading={isLoading}
          />

          {/* Features Section */}
          <FeaturesSection />

          {/* Sample Questions */}
          <SampleQuestions />
        </div>
      )}

      {/* Footer - Only show in normal mode */}
      {!uploadedFile && <Footer />}
    </div>
  );
}
