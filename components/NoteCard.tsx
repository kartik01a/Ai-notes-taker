"use client"
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SummaryDialog from "./SummaryDialog";

export default function NoteCard({ note }: any) {
  return (
    <Link href={`/notes/${note._id}`}>
      <Card className="hover:shadow-md transition">
        <CardHeader>
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {note.content}
          </p>
          <div className="flex gap-2 flex-wrap my-4">
            {note.tags.map((tag: string) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-3 py-1 text-sm rounded-full border"
              >
                {tag}
              </span>
            ))}
          </div>
          <div onClick={(e) => e.stopPropagation()}>
            <SummaryDialog content={note.content} />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
