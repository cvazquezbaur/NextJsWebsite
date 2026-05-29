import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Avatar Upload",
  description: "Avatar upload and management page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AvatarLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
