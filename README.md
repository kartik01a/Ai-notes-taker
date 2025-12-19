# 🧠 AI Notes

AI Notes is a full-stack **Next.js App Router** application that lets users create, manage, and enhance personal notes using **AI-powered features** such as content improvement, tag generation, and summarization.

The project focuses on **secure authentication**, **server-first rendering**, and a **clean, modern UI**.

---

## ✨ Features

### 🔐 Authentication
- Email & Password authentication using **NextAuth (Credentials Provider)**
- JWT-based session strategy
- Secure server-side session handling
- Protected routes (Dashboard, Notes)

---

### 📝 Notes
- Create notes with **title, content, and tags**
- View all notes in a dashboard
- View individual note details
- Notes are strictly **user-specific**
- Tags stored as arrays for better querying

---

### 🤖 AI Capabilities (OpenAI)
- **Improve Note** – Enhances note content
- **Generate Tags** – Auto-generates relevant tags
- **Summarize Note** – Shows AI summary in a dialog
- Loaders shown during AI processing

---

### 🎨 UI / UX
- Built with **shadcn/ui + Tailwind CSS**
- Clean, neutral design
- Dark / Light theme toggle
- Loading states and empty states
- Markdown rendering for AI-generated content

---

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Backend APIs**: Hono
- **Authentication**: NextAuth (JWT strategy)
- **Database**: MongoDB + Mongoose
- **AI**: OpenAI API
- **UI**: Tailwind CSS v4, shadcn/ui, Lucide Icons
- **Markdown**: react-markdown

---


---

## 🚀 Getting Started

### 1️⃣ Clone the repository

git clone https://github.com/your-username/ai-notes.git
cd ai-notes
npm install
cp .env.example .env.local
npm run dev
http://localhost:3000


## 🔑 Authentication Flow

- User registers using email & password
- Passwords are hashed using `bcrypt`
- Login handled by **NextAuth Credentials Provider**
- JWT stores `id`, `name`, and `email`
- Server components use `getServerSession(authOptions)`
- APIs derive `userId` from JWT (never from client)

---

## 🧠 AI Architecture

- AI endpoints are implemented using **Hono**
- Each feature has a dedicated API:

  - `/api/ai/improve`
  - `/api/ai/tags`
  - `/api/ai/summary`

- Client triggers AI actions
- Server processes AI requests
- UI updates with loaders and dialogs


