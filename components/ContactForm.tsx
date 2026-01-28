"use client";

import { useActionState, useEffect, useState } from "react";
import { sendEmail } from "@/app/_actions/email";
import { Loader2, CheckCircle2, Send } from "lucide-react";

const initialState = {
  success: false,
  message: ""
};

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);
  const [showSuccess, setShowSuccess] = useState(false);

  // Trigger success animation when state changes to success
  useEffect(() => {
    if (state.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => setShowSuccess(false), 5000); // Hide after 5s
      return () => clearTimeout(timer);
    }
  }, [state.success]);

  return (
    <form action={formAction} className="space-y-4 mx-auto p-6 rounded-xl border border-white-800 bg-black/20">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="name" className="block mb-1 text-sm font-medium text-zinc-400">Name</label>
          <input 
            name="name" 
            id="name" 
            required 
            placeholder="John Doe"
            className="w-full border border-white-700 p-2 rounded-lg text-white bg-zinc-500/10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>

        <div className="flex-1">
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-zinc-400">Email</label>
          <input 
            name="email" 
            id="email" 
            type="email" 
            required 
            placeholder="john@example.com"
            className="w-full border border-white-700 p-2 rounded-lg text-white bg-zinc-500/10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block mb-1 text-sm font-medium text-zinc-400">Message</label>
        <textarea 
          name="message" 
          id="message" 
          required 
          rows={5}
          placeholder="How can I help you?"
          className="w-full border border-white-700 p-2 rounded-lg text-white bg-zinc-500/10 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
        />
      </div>

      <button 
        type="submit" 
        disabled={isPending || showSuccess}
        className="group relative w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition-all disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
      >
        {isPending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Sending...</span>
          </>
        ) : showSuccess ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-300" />
            <span>Sent!</span>
          </>
        ) : (
          <>
            <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            <span>Send Message</span>
          </>
        )}
      </button>

      {state.message && !showSuccess && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-2">
          {state.message}
        </p>
      )}
    </form>
  );
}