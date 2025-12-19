export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Note from "@/model/Note";
import NoteCard from "@/components/NoteCard";
import SearchBar from "@/components/SearchBar";
import { ThemeToggle } from "@/components/ThemeToggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/SignOutButton";
import { authOptions } from "@/lib/auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();
  const notes = await Note.find({ userId: session.user.id }).lean();

  return (
    <div className="min-h-screen p-6 space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {session?.user?.name}'s Notes
        </h1>
        <div className="flex gap-3">
          {/* <ThemeToggle /> */}
          <Link href="/notes/new">
            <Button className="cursor-pointer">Create Note</Button>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <SearchBar />

      {notes.length === 0 ? (
        <div className="text-center text-muted-foreground py-20 border rounded-lg mx-20">
          <p className="text-xl font-semibold">No notes added yet</p>
          <p className="text-lg">Create your first note to get started</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.map((n) => (
            <NoteCard key={n._id.toString()} note={n} />
          ))}
        </div>
      )}
    </div>
  );
}
