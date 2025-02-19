import { prisma } from "@/lib/prisma";

export async function createUser(
  username: string,
  email: string,
  hashedPassword: string
) {
  try {
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error: any) {
    if (error?.code === "P2002") {
      throw new Error("Email already exists");
    }
    throw error;
  }
}
