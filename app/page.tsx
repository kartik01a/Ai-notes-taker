import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 border-b">
        <h1 className="text-xl font-semibold">AI Notes</h1>
        <div className="flex gap-3">
          <Link href="/login">
            <Button variant="outline">Login</Button>
          </Link>
          <Link href="/register">
            <Button>Register</Button>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-6">
        <div className="max-w-2xl text-center space-y-6">
          <h2 className="text-4xl font-bold tracking-tight">
            Think. Write. Improve.
          </h2>
          <p className="text-muted-foreground text-lg">
            AI Notes helps you capture ideas, organize thoughts, and enhance your writing
            using powerful AI features like summaries, improvements, and smart tags.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link href="/register">
              <Button size="lg">Get Started</Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
