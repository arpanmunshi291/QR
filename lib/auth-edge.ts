/**
 * Lightweight NextAuth config for Edge runtime (middleware).
 * No Prisma — JWT only. Must stay free of Node.js-only imports.
 */
import NextAuth from "next-auth";

export const { auth } = NextAuth({
  providers: [],
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  callbacks: {
    async session({ session, user }) {
      if (session.user && user?.id) {
        session.user.id = user.id;
      }
      return session;
    },
  },
});
