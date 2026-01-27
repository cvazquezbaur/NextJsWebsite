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
      onBeforeGenerateToken: async () => {
        // 1. Check if the user is logged in
        const session = await auth();
        if (!session) {
          throw new Error("Unauthenticated. Please log in to upload.");
        }

        // 2. Optional: Check if the user is YOU (the admin)
        if (session.user?.email !== "your-email@example.com") {
          throw new Error("Unauthorized access.");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
          tokenPayload: JSON.stringify({ userId: session.user.id }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          // Note: Vercel Blob doesn't provide the file size in the 'blob' object here
          // If size_bytes is required, you may need to pass it in tokenPayload from the client
          await db.insert(mediaFiles).values({
            url: blob.url,
            file_name: blob.pathname,
            content_type: blob.contentType,
            size_bytes: 0, // Placeholder
          });
        } catch (error) {
          console.error("Database insert failed:", error);
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