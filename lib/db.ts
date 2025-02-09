import { prisma } from "@/lib/prisma";
export async function createUser(
  username: string,
  email: string,
  password: string
) {
  return prisma.user.create({
    data: {
      username,
      email,
      password,
    },
  });
}
