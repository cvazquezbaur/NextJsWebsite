"use client";

import { useRef, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { type PutBlobResult } from "@vercel/blob";
import TextContainer from "@/components/TextContainer";

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <main style={{ padding: "4rem", minHeight: "60vh" }}>
      <TextContainer
        textSections={[["Avatar Upload", ["Upload and manage your avatar"]]]}
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

              try {
                const newBlob = await upload(file.name, file, {
                  access: "public",
                  handleUploadUrl: "/api/avatar/upload",
                });

                setBlob(newBlob);
              } catch (err) {
                setError((err as Error)?.message ?? String(err));
              }
            }}
          >
            <input
              name="file"
              ref={inputFileRef}
              type="file"
              accept="image/*,video/mp4"
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
                } else {
                  setPreview(null);
                  setPreviewType(null);
                }
              }}
              className="bg-indigo-900 text-white rounded px-3 py-2"
            />

            <button className="text-white rounded-lg bg-green-900 hover:bg-green-950 rounded px-4 py-2" type="submit">Upload</button>

            {error && <p className="w-full text-red-400 mt-3">{error}</p>}

            {preview && previewType === "image" && (
              <img src={preview} alt="preview" className="mt-3 w-28 h-28 object-cover rounded-full" />
            )}

            {preview && previewType === "video" && (
              <video src={preview} controls className="mt-3 w-48 h-28 object-cover rounded-lg" />
            )}

            {blob && (
              <div className="w-full mt-3">
                Blob url: <a href={blob.url}>{blob.url}</a>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
