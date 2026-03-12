import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Lock } from "lucide-react";
import TextContainer from "@/components/TextContainer";
import { AuthError } from "next-auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await auth();

  if (session) {
    redirect("/upload");
  }

  const { error } = await searchParams;

  async function handleSignIn(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirectTo: "/upload",
      });
    } catch (error) {
      if (error instanceof AuthError) {
        return redirect("/login?error=invalid");
      }
      throw error;
    }
  }

  return (
    <main className="p-8 sm:p-16 min-h-[80vh] flex flex-col items-center justify-center">
      <TextContainer
        textSections={[{ 
          title: "Admin Access", 
          content: ["Please sign in to manage your portfolio assets."] 
        }]}
      />

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

          <form action={handleSignIn} className="space-y-4">
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
              <input
                name="password"
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full border border-zinc-700 p-3 rounded-xl text-white bg-black/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
              />
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
    </main>
  );
}