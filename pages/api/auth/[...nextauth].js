import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import jwt from "jsonwebtoken";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
});

// session: {
//   jwt: true,
// },
// callbacks: {
//   async jwt(token, user) {
//     if (user) {
//       token.id = user.id;
//     }
//     return token;
//   },
//   async session(session, token) {
//     session.user.id = token.id;
//     return session;
//   },
// },
// pages: {
//   signIn: "/auth/signin",
// },
