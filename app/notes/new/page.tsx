"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import NoteEditor from "@/components/NoteEditor"
import AIButton from "@/components/AIButton"
import Spinner from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

export default function NewNotePage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [loadingImprove, setLoadingImprove] = useState(false)
  const [loadingTags, setLoadingTags] = useState(false)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const improveText = async () => {
    setLoadingImprove(true)
    const res = await fetch("/api/ai/improve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    })
    const data = await res.json()
    setContent(data.result)
    setLoadingImprove(false)
  }

  const generateTags = async () => {
    setLoadingTags(true)
    const res = await fetch("/api/ai/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    })
    const data = await res.json()
    setTags(data.result)
    setLoadingTags(false)
  }

  const saveNote = async () => {
    setSaving(true)
    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, tags })
    })
    router.push("/dashboard")
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4 mt-20">
      <h1 className="text-2xl font-semibold text-center">Create New Note</h1>

      <Input
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        disabled={saving}
      />

      <NoteEditor value={content} onChange={setContent} />

      <div className="flex gap-3">
        <AIButton
          label={
            loadingImprove ? (
              <span className="flex items-center gap-2">
                <Spinner /> Improving
              </span>
            ) : (
              "Improve"
            )
          }
          onClick={improveText}
          disabled={loadingImprove || saving}
        />

        <AIButton
          label={
            loadingTags ? (
              <span className="flex items-center gap-2">
                <Spinner /> Generating
              </span>
            ) : (
              "Tags"
            )
          }
          onClick={generateTags}
          disabled={loadingTags || saving}
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="flex items-center gap-1 px-3 py-1 text-sm rounded-full border"
            >
              {tag}
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => setTags(tags.filter(t => t !== tag))}
              />
            </span>
          ))}
        </div>
      )}

      <Button
        onClick={saveNote}
        disabled={saving}
        className="flex items-center gap-2 cursor-pointer"
      >
        {saving && <Spinner />}
        Save Note
      </Button>
    </div>
  )
}
