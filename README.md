🧠 AI Notes App

AI Notes is a full-stack Next.js App Router application that allows users to create, manage, and enhance personal notes using AI-powered features like text improvement, tagging, and summarization.

The app focuses on secure authentication, clean UI, and server-first architecture with modern best practices.

✨ Features
🔐 Authentication

Email & Password authentication using NextAuth (Credentials Provider)

JWT-based session strategy

Secure session handling on server components

Protected routes (Dashboard, Notes)

📝 Notes Management

Create notes with title, content, and tags

View all notes in a dashboard

View individual note details

Tags stored as arrays for better querying

Notes are strictly user-scoped (per user access only)

🤖 AI Features (OpenAI)

Improve Note – Enhances the content using AI

Generate Tags – Auto-generates relevant tags

Summarize Note – Generates a concise summary (shown in dialog)

AI actions show loaders for better UX

🎨 UI / UX

Built with shadcn/ui + Tailwind CSS

Neutral, clean design

Dark / Light theme toggle

Loading spinners and empty states

Markdown rendering for AI-generated content

🏗️ Tech Stack

Frontend: Next.js 14 (App Router)

Backend APIs: Hono (inside Next.js API routes)

Authentication: NextAuth (JWT strategy)

Database: MongoDB + Mongoose

AI: OpenAI API

UI: Tailwind CSS v4, shadcn/ui, Lucide Icons

Markdown Rendering: react-markdown

📁 Project Structure (Simplified)
app/
 ├─ api/
 │   ├─ auth/[...nextauth]/route.ts
 │   ├─ [[...route]]/route.ts   # Hono APIs
 ├─ dashboard/
 ├─ notes/
 │   ├─ new/
 │   ├─ [id]/
 ├─ login/
 ├─ register/
components/
lib/
model/
types/

🚀 Getting Started
1️⃣ Clone the repository
git clone https://github.com/your-username/ai-notes.git
cd ai-notes

2️⃣ Install dependencies
npm install

3️⃣ Environment Variables

You’ve already pushed .env.example.
Create your own .env file based on it:

cp .env.example .env

Required Environment Variables
# MongoDB
MONGODB_URI=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=

Notes

NEXTAUTH_SECRET can be generated using:

openssl rand -base64 32


MongoDB should be a valid connection string

OpenAI key is required for AI features (Improve, Tags, Summary)

4️⃣ Run the development server
npm run dev


Open:

http://localhost:3000

🔑 Authentication Flow

User registers using email & password

Passwords are hashed using bcrypt

Login handled by NextAuth Credentials provider

JWT stores id, name, and email

Server components use getServerSession(authOptions)

APIs derive userId from JWT (never from client)

🧠 AI Architecture

AI APIs are implemented using Hono

Each AI action has its own endpoint:

/api/ai/improve

/api/ai/tags

/api/ai/summary

Requests are client-triggered

Responses update UI optimistically

Loaders shown during AI processing

🔐 Security Considerations

User ID is never trusted from client

Notes are fetched using both noteId and userId

Protected routes enforced via server-side session checks

API access validated using JWT tokens

📌 Why This Architecture

Server Components for performance & security

Hono for lightweight, structured APIs

JWT strategy for scalable auth

Markdown storage for AI-generated content

Tailwind + shadcn for consistent UI

🧪 Future Improvements

Edit / Delete notes

Full-text search

Tag-based filtering

AI streaming responses

Role-based access

Note sharing

👨‍💻 Author

Kartik Singh
MERN Stack & Full-Stack Developer
Focused on scalable, production-ready web apps
