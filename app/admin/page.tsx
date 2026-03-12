import { auth } from "@/auth";
import { redirect } from "next/navigation";
import TextContainer from "@/components/TextContainer";
import UploadSection from "@/components/UploadSection";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="p-8 sm:p-16 min-h-screen">
      <TextContainer
        textSections={[{
          title: "Admin Dashboard",
          content: [`Welcome back, ${session.user?.name || session.user?.email}.`],
        }]}
      />

      {/* Upload Section */}
      <UploadSection />

      {/* Change Password Section */}
      <section className="mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl">
        <div className="bg-linear-to-b from-black/80 via-black/60 to-black/50 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-xl font-semibold text-white mb-6">Change Password</h2>
          <ChangePasswordForm />
        </div>
      </section>
    </main>
  );
}
