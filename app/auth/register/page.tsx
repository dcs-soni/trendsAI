"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

export default function Register() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

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
      router.push("/auth/signin");
    } else {
      const data = await res.json();
      console.log(data);
      alert(data.error);
    }
  };

  return (
    <div>
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input ref={usernameRef} type="text" id="name" required />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" id="email" required />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input ref={passwordRef} type="password" id="password" required />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
