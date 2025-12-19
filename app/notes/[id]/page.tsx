export const dynamic = "force-dynamic";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Note from "@/model/Note";
import { authOptions } from "@/lib/auth";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function NotePage({ params }: PageProps) {
  const { id } = await params;

  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  await connectDB();

  const note = await Note.findOne({
    _id: id,
    userId: session.user.id,
  }).lean();

  if (!note) redirect("/dashboard");

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <header>
          <Link href="/dashboard">
            <Button variant="outline">← Back</Button>
          </Link>
        </header>

        <Card>
          <CardHeader className="space-y-4">
            <CardTitle className="text-3xl leading-tight">
              {note.title}
            </CardTitle>

            {note.tags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>

          <CardContent>
            <div className="prose prose-neutral dark:prose-invert max-w-none overflow-hidden [&_*]:break-words [&_pre]:whitespace-pre-wrap [&_code]:whitespace-pre-wrap">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
