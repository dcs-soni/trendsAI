import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
