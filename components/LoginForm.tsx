"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm({ error, action }: { error?: string; action: (formData: FormData) => void }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md mt-10">
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <p className="text-zinc-400 mb-6 text-center">
          This area is restricted to authorized users.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
            Invalid email or password.
          </div>
        )}

        <form action={action} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium text-zinc-400">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 text-sm font-medium text-zinc-400">Password</label>
            <div className="relative">
              <input
                name="password"
                id="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full border border-zinc-700 p-3 pr-12 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
          >
            <Lock className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </form>
      </div>
    </div>
  );
}
