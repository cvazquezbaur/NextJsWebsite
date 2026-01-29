import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/schema";
import { auth } from "@/auth"; // Import your auth config

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // // 1. Check if the user is logged in
        // const session = await auth();
        // if (!session) {
        //   throw new Error("Unauthenticated. Please log in to upload.");
        // }

        // // 2. Optional: Check if the user is YOU (the admin)
        // if (session.user?.email !== "cvazquezbaur@gmail.com") {
        //   throw new Error("Unauthorized access.");
        // }
        const { size_bytes } = JSON.parse(clientPayload || "{}");
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
          callbackUrl: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/avatar/upload`,
          tokenPayload: JSON.stringify({ 
            // userId: session.user.id,
            fileSize: size_bytes
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("Upload completed, syncing to Neon...", blob.url);
        const {fileSize} = JSON.parse(tokenPayload || "{}");
        try {
          // 1. Parse the payload we sent from onBeforeGenerateToken
          const { userId } = JSON.parse(tokenPayload || "{}");

          // 2. Insert into Neon
          // Ensure 'db' is imported from '@/lib/db' and 'mediaFiles' from '@/lib/schema'
          await db.insert(mediaFiles).values({
            file_name: blob.pathname,
            url: blob.url,
            content_type: blob.contentType,
            size_bytes: fileSize || 0, // Use the fileSize from tokenPayload
            // created_at is handled by defaultNow() in your schema
          });

          console.log("Successfully inserted into Neon!");
        } catch (error) {
          // This will show up in your terminal, not the browser console!
          console.error("NEON INSERT ERROR:", error);
          throw error; // Re-throw so Vercel knows the sync failed
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