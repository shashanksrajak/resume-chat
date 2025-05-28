# 📄 Recruiter AI Assistant

An AI-powered resume analysis webapp designed specifically for recruiters to upload candidate resumes and conduct intelligent conversations about their qualifications using Google's Gemini AI.

![Landing Page](./frontend/assets/landing-page.png)

## ✨ Features

- **🔄 Smart PDF Upload**: Drag & drop interface with PDF validation and processing
- **🤖 AI-Powered Analysis**: Powered by Google Gemini AI for intelligent resume analysis
- **💬 Conversational Interface**: Natural language queries about candidate qualifications
- **📱 Full-Screen Chat Mode**: Immersive chat experience after file upload
- **📝 Rich Markdown Responses**: Properly formatted AI responses with lists, bold text, and code blocks
- **⚡ Real-time Responses**: Instant AI-powered answers about candidates
- **🎨 Modern UI**: Beautiful interface built with Tailwind CSS and shadcn/ui components

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **AI Integration**: Google Gemini AI
- **File Processing**: PDF upload and analysis
- **Markdown**: react-markdown with remark-gfm
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd resume-chat
   ```

2. **Install dependencies**

   ```bash
   cd frontend
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the frontend directory:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   API_URL=http://localhost:3001
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### For Recruiters

1. **Upload Resume**: Drag and drop a PDF resume or click to browse files
2. **Start Conversation**: Once uploaded, the interface switches to full-screen chat mode
3. **Ask Questions**: Use natural language to inquire about:
   - Technical skills and experience levels
   - Educational background and certifications
   - Previous work experience and roles
   - Project experience and achievements
   - Culture fit and soft skills

### Sample Questions

- "What programming languages does this candidate know?"
- "How many years of React experience do they have?"
- "What are their strongest technical skills?"
- "Do they have any leadership experience?"
- "What type of projects have they worked on?"

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── _components/           # React components
│   │   │   ├── chat-section.tsx   # Full-screen chat interface
│   │   │   ├── upload-section.tsx # File upload component
│   │   │   ├── features-section.tsx
│   │   │   └── sample-questions.tsx
│   │   ├── api/
│   │   │   └── resume-ai/         # API routes
│   │   │       ├── upload/        # File upload endpoint
│   │   │       └── ask/           # Question asking endpoint
│   │   ├── layout.tsx             # App layout
│   │   └── page.tsx               # Main page
│   ├── actions/
│   │   └── resume-actions.ts      # Server actions
│   ├── components/ui/             # shadcn/ui components
│   └── lib/
├── assets/                        # Project assets
├── public/                        # Static files
└── package.json
```

## 🔧 API Endpoints

### POST `/api/resume-ai/upload`

Uploads and processes PDF resume files.

**Request:**

- Multipart form data with PDF file

**Response:**

```json
{
  "success": true,
  "fileUri": "generated_file_uri",
  "mimeType": "application/pdf",
  "message": "AI analysis result"
}
```

### POST `/api/resume-ai/ask`

Asks questions about uploaded resume.

**Request:**

```json
{
  "question": "What programming languages does the candidate know?",
  "fileUri": "file_uri",
  "mimeType": "application/pdf"
}
```

**Response:**

```json
{
  "success": true,
  "answer": "Formatted AI response with analysis"
}
```

## 🔑 Environment Variables

| Variable         | Description                                      | Required |
| ---------------- | ------------------------------------------------ | -------- |
| `GEMINI_API_KEY` | Google Gemini AI API key                         | Yes      |
| `API_URL`        | Backend API URL (default: http://localhost:3001) | Yes      |

## 🚀 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Environment Setup

1. Set up Google Gemini API key in your hosting platform
2. Configure environment variables
3. Deploy to your preferred platform (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
