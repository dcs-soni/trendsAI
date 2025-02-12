import "next/auth";
import { StyledString } from "next/dist/build/swc/types";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
    };
  }
}
