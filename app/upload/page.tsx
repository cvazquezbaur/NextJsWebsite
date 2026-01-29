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
    <main className="p-8 sm:p-16 min-h-screen">
      <TextContainer
        textSections={[{ 
          title: "Media Manager", 
          content: ["Upload assets directly to Vercel Blob and Neon Postgres."] 
        }]}
      />

      {/* Reduced max-width to match TextContainer's default sm:max-w-3xl */}
      <section className="mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl">
        <div className="bg-linear-to-b from-black/80 via-black/60 to-black/50 border border-white/10 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl p-8 bg-black/20 hover:bg-black/40 transition-colors group">
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
                className="cursor-pointer flex flex-col items-center gap-3 text-zinc-500 group-hover:text-zinc-300"
              >
                <UploadCloud className="w-10 h-10 mb-1" />
                <span className="font-medium text-base">Click to select or drag and drop</span>
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Images or MP4</span>
              </label>
            </div>

            {/* Preview Section */}
            {preview && (
              <div className="flex justify-center bg-black/40 p-2 rounded-xl border border-white/5">
                {previewType === "image" ? (
                  <img src={preview} alt="Preview" className="max-h-48 rounded-lg shadow-lg" />
                ) : (
                  <video src={preview} controls className="max-h-48 rounded-lg shadow-lg" />
                )}
              </div>
            )}

            <button 
              className="w-full flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200 font-bold py-3 px-6 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed" 
              type="submit"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  <span>Processing...</span>
                </>
              ) : (
                "Upload Asset"
              )}
            </button>

            {/* Status Messages */}
            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/5 p-4 rounded-lg border border-red-400/20">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {blob && (
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-white text-sm">Sync Complete</p>
                  <p className="text-[10px] text-zinc-500 truncate">{blob.url}</p>
                </div>
                <a 
                  href={blob.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-1.5 rounded-md transition-colors"
                >
                  View
                </a>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}