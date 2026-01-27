"use client";

import { useRef, useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";
import { type PutBlobResult } from "@vercel/blob";
import TextContainer from "@/components/TextContainer";
import { Loader2, UploadCloud, CheckCircle2, AlertCircle } from "lucide-react";

export default function UploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video' | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Clean up preview URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    setBlob(null);
    const file = e.currentTarget.files?.[0] ?? null;

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev);
        return url;
      });

      if (file.type.startsWith("video/")) setPreviewType("video");
      else if (file.type.startsWith("image/")) setPreviewType("image");
      else setPreviewType(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!inputFileRef.current?.files || inputFileRef.current.files.length === 0) {
      setError("Please select a file first.");
      return;
    }

    const file = inputFileRef.current.files[0];
    setIsUploading(true);

    try {
      const newBlob = await upload(file.name, file, {
        access: "public",
        handleUploadUrl: "/api/avatar/upload",
        // This payload is sent to onUploadCompleted in route.ts
        clientPayload: JSON.stringify({
          size_bytes: file.size,
        }),
      });

      setBlob(newBlob);
      setPreview(null);
      if (inputFileRef.current) inputFileRef.current.value = "";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <main className="p-8 sm:p-16 min-h-screen bg-zinc-950">
      <TextContainer
        textSections={[{ title: "Media Manager", content: ["Upload assets directly to Vercel Blob and Neon Postgres."] }]}
      />

      <section className="mx-auto my-10 w-full max-w-4xl">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-xl p-10 bg-zinc-900/30 hover:bg-zinc-900/50 transition-colors group">
              <input
                name="file"
                ref={inputFileRef}
                type="file"
                accept="image/*,video/mp4"
                disabled={isUploading}
                required
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload" 
                className="cursor-pointer flex flex-col items-center gap-3 text-zinc-400 group-hover:text-zinc-200"
              >
                <UploadCloud className="w-12 h-12 mb-2" />
                <span className="font-medium text-lg">Click to select or drag and drop</span>
                <span className="text-xs text-zinc-500 uppercase">Images or MP4 (Max 4.5MB)</span>
              </label>
            </div>

            {/* Preview Section */}
            {preview && (
              <div className="flex justify-center bg-black/40 p-4 rounded-xl border border-zinc-800">
                {previewType === "image" ? (
                  <img src={preview} alt="Preview" className="max-h-64 rounded-lg shadow-lg" />
                ) : (
                  <video src={preview} controls className="max-h-64 rounded-lg shadow-lg" />
                )}
              </div>
            )}

            <button 
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20" 
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Processing Upload...</span>
                </>
              ) : (
                "Start Upload"
              )}
            </button>

            {/* Status Messages */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-lg border border-red-400/20">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {blob && (
              <div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-emerald-400">File successfully synced!</p>
                  <p className="text-xs text-zinc-500 truncate">{blob.url}</p>
                </div>
                <a 
                  href={blob.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md transition-colors"
                >
                  View File
                </a>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}