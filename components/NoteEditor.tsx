"use client"

import { Textarea } from "@/components/ui/textarea"

export default function NoteEditor({ value, onChange }: any) {
  return (
    <Textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder="Write your note..."
      className="h-80"
    />
  )
}
