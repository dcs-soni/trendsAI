import { DefaultSession } from "next-auth";
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  }
  interface Session {
    user: User & {
      // id and role are explicily repeated to ensure they are included in Session.user
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }
}
