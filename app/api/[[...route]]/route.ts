import { Hono } from "hono";
import { handle } from "hono/vercel";
import Note from "@/model/Note";
import { connectDB } from "@/lib/mongodb";
import OpenAI from "openai";
import User from "@/model/User";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";

const app = new Hono().basePath("/api");
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/register", async (c) => {
  await connectDB();
  const { name, email, password } = await c.req.json();

  const exists = await User.findOne({ email });
  if (exists) {
    return c.json({ error: "User already exists" }, 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ name, email, password: hashedPassword });

  return c.json({ success: true });
});

app.post("/notes", async (c) => {
  const token = await getToken({
    req: c.req.raw as any,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token?.id) {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await connectDB();
  const body = await c.req.json();

  const note = await Note.create({
    userId: token.id,
    title: body.title,
    content: body.content,
    tags: body.tags,
  });
  return c.json(note);
});

app.get("/notes/:userId", async (c) => {
  await connectDB();
  const notes = await Note.find({ userId: c.req.param("userId") });
  return c.json(notes);
});

app.put("/notes/:id", async (c) => {
  await connectDB();
  const body = await c.req.json();
  await Note.findByIdAndUpdate(c.req.param("id"), body);
  return c.json({ success: true });
});

app.delete("/notes/:id", async (c) => {
  await connectDB();
  await Note.findByIdAndDelete(c.req.param("id"));
  return c.json({ success: true });
});

app.post("/ai/summary", async (c) => {
  const { content } = await c.req.json();
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: `Summarize:\n${content}` }],
  });
  return c.json({ result: res.choices[0].message.content });
});

app.post("/ai/improve", async (c) => {
  const { content } = await c.req.json();
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Improve this & return in correct markdown with relevant spaces:\n${content}`,
      },
    ],
  });
  return c.json({ result: res.choices[0].message.content });
});

app.post("/ai/tags", async (c) => {
  const { content } = await c.req.json();
  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Generate 5 short tags (comma separated):\n${content}`,
      },
    ],
  });
  return c.json({
    result: res.choices[0].message.content
      ?.split(",")
      ?.map((t: string) => t.trim()),
  });
});

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
