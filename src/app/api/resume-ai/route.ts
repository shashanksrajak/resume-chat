import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Resume AI API is running",
    endpoints: {
      upload: "/api/resume-ai/upload",
      ask: "/api/resume-ai/ask",
    },
  });
}
