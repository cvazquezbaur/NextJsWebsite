import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { Github } from "lucide-react";
import TextContainer from "@/components/TextContainer";

export default async function LoginPage() {
  const session = await auth();

  // If already logged in, send them to the upload manager
  if (session) {
    redirect("/upload");
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
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md text-center">
          <p className="text-zinc-400 mb-8">
            This area is restricted. Sign in with an authorized GitHub account to continue.
          </p>

          <form
            action={async () => {
              "use server";
              await signIn("github", { redirectTo: "/upload" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-zinc-200 text-black font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
            >
              <Github className="w-5 h-5" />
              <span>Sign in with GitHub</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}