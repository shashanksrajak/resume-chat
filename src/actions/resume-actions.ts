"use server";

interface UploadResponse {
  success: boolean;
  fileUri?: string;
  fileName?: string;
  displayName?: string;
  mimeType?: string;
  AI_message?: string;
  error?: string;
}

interface AskResponse {
  success: boolean;
  question?: string;
  answer?: string;
  fileName?: string;
  error?: string;
}

export async function uploadResumeToAI(
  formData: FormData
): Promise<UploadResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resume-ai/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to upload file",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Upload action error:", error);
    return {
      success: false,
      error: "Network error occurred during upload",
    };
  }
}

export async function askQuestionAboutResume(
  question: string,
  fileUri: string,
  mimeType: string
): Promise<AskResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/resume-ai/ask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
          fileUri,
          mimeType,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || "Failed to get answer",
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ask action error:", error);
    return {
      success: false,
      error: "Network error occurred while asking question",
    };
  }
}
