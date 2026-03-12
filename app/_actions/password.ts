"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { compare, hash } from "bcryptjs";

export async function changePassword(prevState: { success: boolean; message: string }, formData: FormData) {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, message: "Not authenticated." };
  }

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return { success: false, message: "All fields are required." };
  }

  if (newPassword.length < 8) {
    return { success: false, message: "New password must be at least 8 characters." };
  }

  if (newPassword !== confirmPassword) {
    return { success: false, message: "New passwords do not match." };
  }

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, session.user.email))
    .limit(1);

  if (!user) {
    return { success: false, message: "User not found." };
  }

  const isValid = await compare(currentPassword, user.password_hash);
  if (!isValid) {
    return { success: false, message: "Current password is incorrect." };
  }

  const newHash = await hash(newPassword, 12);
  await db.update(users).set({ password_hash: newHash }).where(eq(users.id, user.id));

  return { success: true, message: "Password changed successfully." };
}
