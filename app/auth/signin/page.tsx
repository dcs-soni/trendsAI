"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      alert(result?.error || "Failed to sign in");
    }
  };

  return (
    <div>
      <h2>Signin to your account</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} type="email" id="email" name="email" required />

        <label htmlFor="password">Password</label>
        <input
          ref={passwordRef}
          type="password"
          id="password"
          name="password"
          required
        />

        <button type="submit">Sign In</button>
      </form>

      <div>
        <h3>Dont have an account?</h3>
        <Link href="/auth/register">Register here</Link>
      </div>
    </div>
  );
}
