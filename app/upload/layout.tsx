import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Upload",
  description: "Portfolio media upload page.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function UploadLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
