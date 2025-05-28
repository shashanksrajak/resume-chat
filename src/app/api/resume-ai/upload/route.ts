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
    console.log("received request to upload resume");
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are allowed" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload file to Gemini AI
    const blob = new Blob([buffer], { type: file.type });
    console.log(file.type);
    const doc = await ai.files.upload({
      file: blob,
      config: {
        mimeType: file.type,
      },
    });

    console.log("Uploaded file to Gemini:", doc);

    if (!doc) {
      return NextResponse.json(
        { error: "Failed to upload file to Gemini" },
        { status: 500 }
      );
    }

    // Wait for file to be processed
    const modelName = "gemini-2.0-flash-001";
    if (!doc.uri || !doc.mimeType) {
      return NextResponse.json(
        { error: "Invalid file URI or mime type" },
        { status: 500 }
      );
    }
    // const cache = await ai.caches.create({
    //   model: modelName,
    //   config: {
    //     contents: createUserContent(createPartFromUri(doc.uri, doc.mimeType)),
    //     systemInstruction: systemInstruction,
    //   },
    // });
    // console.log("Cache created:", cache);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: createUserContent([
        createPartFromUri(doc.uri, doc.mimeType),
        `${systemInstruction}
        
        Please summarize the content of this resume in brief.`,
      ]),
    });

    console.log("Response text:", response.text);

    return NextResponse.json({
      success: true,
      //   cacheName: cache.name,
      AI_message: response.text,
      fileUri: doc.uri,
      fileMimeType: doc.mimeType,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
