import NextAuth, { DefaultSession } from "next-auth";

// tells typescript that Session object has a user property with optional role field
declare module "next-auth" {
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}
