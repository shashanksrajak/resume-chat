"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, ArrowRight, User, Bot, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { askQuestionAboutResume } from "@/actions/resume-actions";

interface ChatSectionProps {
  fileName: string;
  fileUri: string;
  mimeType: string;
  aiMessage?: string;
  onReset?: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function ChatSection({
  fileName,
  fileUri,
  mimeType,
  aiMessage,
  onReset,
}: ChatSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text:
        aiMessage ||
        `Resume "${fileName}" has been uploaded successfully. I'm ready to analyze this candidate's profile. What would you like to know?`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const question = inputValue;
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await askQuestionAboutResume(
        question,
        fileUri,
        mimeType
      );

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.success
          ? response.answer!
          : response.error || "Sorry, I couldn't process your question.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error asking question:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, there was an error processing your question. Please try again.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Upload New Resume
            </Button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-purple-600" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-800">
                  Recruiter AI Assistant
                </h1>
                <p className="text-sm text-gray-600">📄 {fileName} uploaded</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-6 flex flex-col min-h-0">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col h-full min-h-0">
          <div className="p-6 border-b border-gray-100 flex-shrink-0">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Analyze Candidate Profile
            </h2>
            <p className="text-gray-600">
              Ask questions about skills, experience, and role fit
            </p>
          </div>

          <div className="flex-1 flex flex-col p-6 min-h-0">
            {/* Chat Messages Area */}
            <div className="flex-1 bg-gray-50 rounded-lg p-4 overflow-y-auto mb-4 min-h-0 max-h-full">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex items-start gap-2 max-w-[80%] ${
                        message.sender === "user"
                          ? "flex-row-reverse"
                          : "flex-row"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-purple-600 text-white"
                        }`}
                      >
                        {message.sender === "user" ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-200"
                        }`}
                      >
                        {message.sender === "bot" ? (
                          <div className="text-sm">
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm]}
                              components={{
                                p: ({ children }) => (
                                  <p className="text-gray-700 my-2">
                                    {children}
                                  </p>
                                ),
                                strong: ({ children }) => (
                                  <strong className="text-gray-800">
                                    {children}
                                  </strong>
                                ),
                                ul: ({ children }) => (
                                  <ul className="text-gray-700 my-2 list-disc list-inside">
                                    {children}
                                  </ul>
                                ),
                                ol: ({ children }) => (
                                  <ol className="text-gray-700 my-2 list-decimal list-inside">
                                    {children}
                                  </ol>
                                ),
                                li: ({ children }) => (
                                  <li className="text-gray-700 my-1">
                                    {children}
                                  </li>
                                ),
                                code: ({ children }) => (
                                  <code className="text-purple-700 bg-purple-50 px-1 py-0.5 rounded">
                                    {children}
                                  </code>
                                ),
                                pre: ({ children }) => (
                                  <pre className="bg-gray-100 text-gray-800 p-3 rounded overflow-x-auto">
                                    {children}
                                  </pre>
                                ),
                              }}
                            >
                              {message.text}
                            </ReactMarkdown>
                          </div>
                        ) : (
                          <p className="text-sm">{message.text}</p>
                        )}
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Auto-scroll target */}
                <div ref={messagesEndRef} />
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Input */}
            <div className="flex gap-2 flex-shrink-0">
              <Input
                placeholder="Ask about the candidate's qualifications..."
                className="flex-1"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
