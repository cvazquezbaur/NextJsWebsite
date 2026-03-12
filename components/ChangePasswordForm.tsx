"use client";

import { useActionState, useState } from "react";
import { changePassword } from "@/app/_actions/password";
import { Eye, EyeOff, KeyRound, CheckCircle2, Loader2 } from "lucide-react";

const initialState = { success: false, message: "" };

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, initialState);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="currentPassword" className="block mb-1 text-sm font-medium text-zinc-400">
          Current Password
        </label>
        <div className="relative">
          <input
            name="currentPassword"
            id="currentPassword"
            type={showCurrent ? "text" : "password"}
            required
            placeholder="••••••••"
            className="w-full border border-zinc-700 p-3 pr-12 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowCurrent((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={showCurrent ? "Hide password" : "Show password"}
          >
            {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="newPassword" className="block mb-1 text-sm font-medium text-zinc-400">
          New Password
        </label>
        <div className="relative">
          <input
            name="newPassword"
            id="newPassword"
            type={showNew ? "text" : "password"}
            required
            minLength={8}
            placeholder="••••••••"
            className="w-full border border-zinc-700 p-3 pr-12 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowNew((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-zinc-400">
          Confirm New Password
        </label>
        <input
          name="confirmPassword"
          id="confirmPassword"
          type={showNew ? "text" : "password"}
          required
          minLength={8}
          placeholder="••••••••"
          className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" />
            <span>Updating...</span>
          </>
        ) : (
          <>
            <KeyRound className="w-4 h-4" />
            <span>Change Password</span>
          </>
        )}
      </button>

      {state.message && (
        <div className={`p-3 rounded-lg text-sm text-center ${
          state.success 
            ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
            : "bg-red-500/10 border border-red-500/20 text-red-400"
        }`}>
          {state.success && <CheckCircle2 className="w-4 h-4 inline mr-1" />}
          {state.message}
        </div>
      )}
    </form>
  );
}
