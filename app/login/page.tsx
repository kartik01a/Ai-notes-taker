"use client"

import { useForm } from "react-hook-form"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = async (data: any) => {
    const res = await signIn("credentials", {
      ...data,
      redirect: false
    })
    if (res?.ok) router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            Sign in to continue to AI Notes
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input {...register("email")} type="email" placeholder="you@example.com" />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input {...register("password")} type="password" placeholder="••••••••" />
            </div>

            <Button className="w-full cursor-pointer">Sign In</Button>

            <p className="text-sm text-center text-muted-foreground">
              Don’t have an account?{" "}
              <Link href="/register" className="underline cursor-pointer">
                Sign up
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
