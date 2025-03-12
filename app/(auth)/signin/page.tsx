"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";

import InputElement from "@/components/InputElement";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function SignIn() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const redirectPath =
        session.user.role === "ADMIN" ? "/admin" : "/dashboard";
      router.replace(redirectPath);
    }
  }, [session, status, router]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const result = await signIn("credentials", {
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        redirect: false,
      });

      if (result?.error) {
        toast.error(result.error)
      } else {
        toast.success("Signin successful")
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Sign in error:", error);
     
      toast.error("Failed to sign in. Please try again.")
    }
  };

  const handleOAuthSignIn = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(`${provider} sign in error:`, error);
  
      toast.error(`Failed to sign in with ${provider}. Please try again.`)
    }
  };

  // If loading, show a loading state
  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-white">Loading...</div>
      </div>
    );
  }

  // If already authenticated, the useEffect will handle the redirect
  if (status === "authenticated") {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}>
      <div>
        <h2 className="text-4xl font-bold text-center mb-2">Welcome back</h2>
        <p className="text-center text-gray-400 text-lg">
          Sign in to continue your AI journey
        </p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500">
          {error === "Callback"
            ? "This email is not registered. Please sign up first."
            : error}
        </div>
      )}

      {/* OAuth Sign-in Options */}
      <div className="mt-8 space-y-4">
        <button
          onClick={() => handleOAuthSignIn("google")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
          </svg>
          <span>Continue with Google</span>
        </button>

        <button
          onClick={() => handleOAuthSignIn("github")}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
          <span>Continue with GitHub</span>
        </button>
      </div>

      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-400">Or continue with</span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
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
          Sign in
        </button>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-blue/70 hover:text-blue/80 transition-colors cursor-pointer">
            Sign up here
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
