import { prisma } from "@/lib/prisma";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const adminMail = process.env.ADMIN_EMAIL!;
  const adminPassword = process.env.ADMIN_PASSWORD!;
  const hashedAdminPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: {
      email: adminMail,
    },
    update: {},

    create: {
      email: adminMail,
      username: "admin",
      password: hashedAdminPassword,
      role: Role.ADMIN,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
