"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import AIButton from "@/components/AIButton"
import Spinner from "@/components/Spinner"

export default function SummaryDialog({ content }: { content: string }) {
  const [open, setOpen] = useState(false)
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const summarize = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setOpen(true)
    setLoading(true)
    setSummary("")

    const res = await fetch("/api/ai/summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    })

    const data = await res.json()
    setSummary(data.result)
    setLoading(false)
  }

  return (
    <>
      <AIButton label="Summarize" onClick={summarize} />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-180 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI Summary</DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Spinner size={28} />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {summary}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
