import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
export async function createUser(
  username: string,
  email: string,
  password: string,
  role: Role = "USER"
) {
  return prisma.user.create({
    data: {
      username,
      email,
      password,
      role,
    },
  });
}
