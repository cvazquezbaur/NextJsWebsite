import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import TextContainer from "@/components/TextContainer";
import LoginForm from "@/components/LoginForm";
import { AuthError } from "next-auth";

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const session = await auth();

  if (session) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  async function handleSignIn(formData: FormData) {
    "use server";
    try {
      await signIn("credentials", {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        redirectTo: "/admin",
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
      <LoginForm error={error} action={handleSignIn} />
    </main>
  );
}