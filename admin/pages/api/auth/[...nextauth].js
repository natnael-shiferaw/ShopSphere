import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "../../../lib/db";
import { ObjectId } from "mongodb";

// Normalize allowed admin emails from .env.local
const allowedAdminEmails = (process.env.ALLOWED_ADMIN_EMAILS || "")
  .split(",")
  .map(email => email.trim().toLowerCase());

// console.log("Allowed Admin Emails:", allowedAdminEmails);

export default NextAuth({
  // Force JWT-based sessions so our jwt callback always runs.
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      // Always allow sign in; role will be determined in the JWT callback
      return true;
    },
    async jwt({ token, user }) {
      console.log("JWT Callback - token before:", token);
      if (user) {
        const normalizedEmail = user.email?.trim().toLowerCase();
        token.role = allowedAdminEmails.includes(normalizedEmail) ? "admin" : "user";
      }
      token.role = token.role || "user"; // Ensure role is always set
      console.log("JWT Callback - token after:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback - token received:", token);
      // Ensure session.user exists and attach the role from the token
      session.user = session.user || {};
      session.user.role = token.role || "user";
      console.log("Session Callback - session updated:", session);
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      // When a user is created, update the role in the database.
      const normalizedEmail = user.email.trim().toLowerCase();
      const role = allowedAdminEmails.includes(normalizedEmail) ? "admin" : "user";
      const client = await clientPromise;
      const db = client.db();
      await db.collection("users").updateOne(
        { _id: new ObjectId(user.id) },
        { $set: { role } }
      );
    },
    async signIn({ user }) {
      // Force-update the user's role on every sign in.
      const normalizedEmail = user.email.trim().toLowerCase();
      const role = allowedAdminEmails.includes(normalizedEmail) ? "admin" : "user";
      const client = await clientPromise;
      const db = client.db();
      await db.collection("users").updateOne(
        { _id: new ObjectId(user.id) },
        { $set: { role } }
      );
    },
  },
  pages: {
    error: "/auth/error", // Optional: create a custom error page if needed.
  },
});
