import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/schema";
import { auth } from "@/auth";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // 1. Check if the user is logged in
        const session = await auth();
        if (!session) {
          throw new Error("Unauthenticated. Please log in to upload.");
        }

        // 2. Check if the user is the admin
        if (session.user?.email !== "cvazquezbaur@gmail.com") {
          throw new Error("Unauthorized access.");
        }

        const { size_bytes, category } = JSON.parse(clientPayload || "{}");
        const host = request.headers.get("host") || "localhost:3000";
        const protocol = host?.includes('localhost') ? 'http' : 'https';
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
          callbackUrl: `${protocol}://${host}/api/avatar/upload`,
          tokenPayload: JSON.stringify({ 
            userId: session.user?.id,
            fileSize: size_bytes,
            category: category || "uncategorized",
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Upload completed, syncing to Neon...", blob.url);
        const { fileSize, category } = JSON.parse(tokenPayload || "{}");
        try {
          await db.insert(mediaFiles).values({
            file_name: blob.pathname,
            url: blob.url,
            content_type: blob.contentType,
            size_bytes: fileSize || 0,
            category: category || "uncategorized",
          });

          console.log("Successfully inserted into Neon!");
        } catch (error) {
          console.error("NEON INSERT ERROR:", error);
          throw error;
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}