"use client";

import InputElement from "@/components/InputElement";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Register() {
  const router = useRouter();

  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
      }),
    });

    if (res.ok) {
      router.push("/signin");
    } else {
      const data = await res.json();
      console.log(data);
      alert(data.error);
    }
  };

  return (
    <div>
      <div>
        <h2 className="text-4xl font-bold text-center mb-2">
          Create your account
        </h2>
        <p className="text-center text-gray-400 text-lg">
          Join our community of AI enthusiasts
        </p>
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputElement
            htmlFor="username"
            type="text"
            reference={usernameRef as React.RefObject<HTMLInputElement>}
            placeholder="Username">
            Username
          </InputElement>

          <InputElement
            htmlFor="email"
            type="email"
            reference={emailRef as React.RefObject<HTMLInputElement>}
            placeholder="Email">
            Email
          </InputElement>

          <InputElement
            htmlFor="password"
            type="password"
            reference={passwordRef as React.RefObject<HTMLInputElement>}
            placeholder="Password">
            Password
          </InputElement>
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-medium rounded-xl text-black bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          Create account
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="font-medium text-blue/70 hover:text-blue/80 transition-colors cursor-pointer">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
