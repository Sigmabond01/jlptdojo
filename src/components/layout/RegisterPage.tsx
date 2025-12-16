'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import YinYangBackground from "@/components/ui/Background";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { GoogleIcon } from "../ui/GoogleIcon";

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: 'POST',
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      router.push('/login?registered=true');
    } else {
      setError(data.error || "Something went wrong!");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-400 dark:bg-black">
      <div className="absolute inset-0 opacity-40 dark:opacity-5">
        <div className="absolute inset-0 text-black dark:text-white" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 50px, currentColor 50px, currentColor 51px), repeating-linear-gradient(90deg, transparent, transparent 50px, currentColor 50px, currentColor 51px)`
        }} />
      </div>
      <YinYangBackground />

      <div className="relative w-full max-w-md p-8 bg-white/80 backdrop-blur-md border border-black/20 dark:bg-neutral-900/50 dark:border-white/10">
        {/* Decorative corner elements */}
        <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-black/40 dark:border-white/40" />
        <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-black/40 dark:border-white/40" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-black/40 dark:border-white/40" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black/40 dark:border-white/40" />

        <h1 className="text-center text-4xl md:text-5xl md:text-6xl font-bold tracking-tight text-black dark:text-white">
          Register
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6 mb-8 text-sm uppercase tracking-widest">
          Train your fluency.
        </p>

        {/* Traditional email/password form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40"
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/40 dark:focus:ring-white/40"
            />
          </div>

          {error && <p className="text-lg text-center text-red-500 dark:text-red-400">{error}</p>}
          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              // Note: This button will need its own onSubmit handler for email/password logic
              className="w-full py-3 rounded-lg font-semibold tracking-wide text-white bg-black dark:bg-white dark:text-black hover:scale-[1.02] transition-transform duration-200"
            >
              Enter the Dojo
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="grow border-t border-black/20 dark:border-white/20"></div>
          <span className="mx-4 text-xs font-bold text-gray-500 dark:text-gray-400">OR</span>
          <div className="grow border-t border-black/20 dark:border-white/20"></div>
        </div>

        {/* Google Sign-In Button */}
        <div className="flex justify-center">
          <button
            onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
            className="flex items-center justify-center w-full gap-3 py-3 font-semibold tracking-wide text-black transition-transform duration-200 bg-white dark:bg-white rounded-lg hover:scale-[1.02] border border-black/20 dark:border-white/20"
          >
            <GoogleIcon />
            Continue with Google
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          Already a member?{" "}
          <Link
            href="/login"
            className="underline underline-offset-4 hover:text-black dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}