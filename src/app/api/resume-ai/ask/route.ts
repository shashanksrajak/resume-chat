import {
  GoogleGenAI,
  createUserContent,
  createPartFromUri,
} from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { systemInstruction } from "../system-instruction";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, fileUri, mimeType } = body;

    if (!question) {
      return NextResponse.json(
        { error: "No question provided" },
        { status: 400 }
      );
    }

    if (!fileUri) {
      return NextResponse.json(
        { error: "File information missing" },
        { status: 400 }
      );
    }

    const modelName = "gemini-2.0-flash-001";

    // Create the content with the uploaded file
    const response = await ai.models.generateContent({
      model: modelName,
      contents: [
        createUserContent([
          createPartFromUri(fileUri, mimeType),
          { text: question },
        ]),
      ],
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const answer = response.text;

    return NextResponse.json({
      success: true,
      question,
      answer,
    });
  } catch (error) {
    console.error("Ask error:", error);
    return NextResponse.json(
      { error: "Failed to get answer from AI" },
      { status: 500 }
    );
  }
}
