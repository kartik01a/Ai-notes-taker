import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import UserModel from "@/model/User"
import { connectDB } from "@/lib/mongodb"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials) {
        await connectDB()
        const user = await UserModel.findOne({ email: credentials!.email })
        if (!user) return null

        const valid = await bcrypt.compare(
          credentials!.password,
          user.password
        )
        if (!valid) return null

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.email = token.email as string
      session.user.name = token.name as string
      return session
    }
  }
}
