import { createUser } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextResponse) {
  const { username, email, password } = await req.json();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await createUser(username, email, hashedPassword);

    return NextResponse.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "User already exists" });
    }
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
