import NextAuth, { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [

  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
}

export default NextAuth(authOptions)
