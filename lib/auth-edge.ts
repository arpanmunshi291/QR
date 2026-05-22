/**
 * Lightweight NextAuth config for Edge runtime (middleware).
 * No Prisma — JWT only. Must stay free of Node.js-only imports.
 */
import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  secret: process.env.AUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
});
