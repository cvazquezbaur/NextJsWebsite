import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { mediaFiles } from "@/lib/schema";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // This is the "Handshake" - it must return this object
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"],
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        try {
          await db.insert(mediaFiles).values({
            url: blob.url,
            file_name: blob.pathname,
            content_type: blob.contentType,
            size_bytes: 0, // Neon might fail if this is null and column is NOT NULL
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