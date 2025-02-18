import { DefaultSession, DefaultUser } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }

  interface Session {
    user: User & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }
}
