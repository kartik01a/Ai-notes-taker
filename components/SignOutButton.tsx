"use client"

import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignOutButton() {
  return (
    <Button
      className="cursor-pointer"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      Sign out
    </Button>
  )
}
