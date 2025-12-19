"use client"

import { Input } from "@/components/ui/input"

export default function SearchBar() {
  return (
    <Input
      placeholder="Search notes by title..."
      className="max-w-sm"
    />
  )
}
