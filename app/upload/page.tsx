"use client";

import { useRef, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { type PutBlobResult } from "@vercel/blob";
import TextContainer from "@/components/TextContainer";

export default function UploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Added loading state

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <main style={{ padding: "4rem", minHeight: "60vh" }}>
      <TextContainer
        textSections={[["Upload", ["Upload and manage your files"]]]}
      />

      <section className="mx-auto my-6 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl">
        <div className="w-full bg-gradient-to-b from-black/70 via-black/50 to-black/40 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
          <form
            className="flex items-center gap-3 flex-wrap"
            onSubmit={async (event) => {
              event.preventDefault();
              setError(null);

              if (!inputFileRef.current?.files) {
                setError("No file selected");
                return;
              }

              const file = inputFileRef.current.files[0];
              setIsUploading(true); // Start loading

              try {
                const newBlob = await upload(file.name, file, {
                  access: "public",
                  handleUploadUrl: "/api/avatar/upload", // Double check this matches your file path!
                });

                setBlob(newBlob);
                setPreview(null); // Clear preview on success
              } catch (err) {
                setError((err as Error)?.message ?? String(err));
              } finally {
                setIsUploading(false); // Stop loading
              }
            }}
          >
            <input
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/*,video/mp4"
              disabled={isUploading}
              required
              onChange={(e) => {
                setError(null);
                const f = e.currentTarget.files?.[0] ?? null;
                if (f) {
                  const url = URL.createObjectURL(f);
                  setPreview((prev) => {
                    if (prev) URL.revokeObjectURL(prev);
                    return url;
                  });
                  if (f.type.startsWith("video/")) setPreviewType("video");
                  else if (f.type.startsWith("image/")) setPreviewType("image");
                  else setPreviewType(null);
                }
              }}
              className="bg-zinc-900 text-white rounded px-3 py-2 disabled:opacity-50"
            />

            <button 
              className="bg-green-800 hover:bg-green-900 text-white rounded px-4 py-2 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </button>

            {error && <p className="w-full text-red-400 mt-3">{error}</p>}

            {preview && previewType === "image" && (
              <img src={preview} alt="preview" className="mt-3 w-28 h-28 object-cover rounded-full border-2 border-white/20" />
            )}

            {preview && previewType === "video" && (
              <video src={preview} className="mt-3 w-48 h-28 object-cover rounded-lg border-2 border-white/20" />
            )}

            {blob && (
              <div className="w-full mt-3 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-sm">
                <p className="font-bold text-green-400">Success! Saved to Neon DB.</p>
                <a href={blob.url} target="_blank" className="underline break-all">{blob.url}</a>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}