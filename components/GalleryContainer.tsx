"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface MediaItem {
  id: number;
  url: string;
  file_name: string;
  content_type: string | null;
}

export default function Gallery({ items = [] }: { items: MediaItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  
  // Refs for swipe logic
  const touchStart = useRef<number | null>(null);
  const touchEnd = useRef<number | null>(null);

  // Minimum distance to trigger a swipe
  const minSwipeDistance = 50;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  // --- SWIPE LOGIC ---
  const onTouchStart = (e: React.TouchEvent) => {
    touchEnd.current = null;
    touchStart.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStart.current || !touchEnd.current) return;
    const distance = touchStart.current - touchEnd.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) nextSlide();
    if (isRightSwipe) prevSlide();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 w-full max-w-4xl mx-auto border-2 rounded-2xl border-white/10 p-6 bg-zinc-900/50 shadow-2xl">
      <div className="space-y-1 mb-6 text-center">
        <h2 className="text-2xl font-semibold text-white">Gallery</h2>
        <p className="text-zinc-400 text-sm italic">Swipe or use arrows to navigate</p>
      </div>

      <div 
        className="relative group overflow-hidden rounded-xl border border-white/5 bg-black/20"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ touchAction: 'pan-y' }} // Prevents swipe from breaking scroll
      >
        {/* Main Display Strip */}
        <div 
          className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item) => (
            <div key={item.id} className="w-full flex-shrink-0 aspect-video relative">
              {item.content_type?.startsWith('video/') ? (
                <video src={item.url} className="w-full h-full object-cover" preload="metadata" />
              ) : (
                <img src={item.url} alt={item.file_name} className="w-full h-full object-cover" />
              )}
              
              <button 
                onClick={() => setSelectedItem(item)}
                className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              >
                <div className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 scale-90 group-hover:scale-100 transition-transform">
                  <Maximize2 className="text-white w-6 h-6" />
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Desktop Arrows - Hidden on small touch devices */}
        <button 
          onClick={prevSlide}
          className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={nextSlide}
          className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-all border border-white/10 opacity-0 group-hover:opacity-100"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white w-6" : "bg-white/20 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox remains same as previous step */}
      {selectedItem && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
          onClick={() => setSelectedItem(null)}
        >
          <button className="absolute top-6 right-6 text-white/70"><X size={40} /></button>
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
             {selectedItem.content_type?.startsWith('video/') ? (
               <video src={selectedItem.url} controls autoPlay className="max-w-full max-h-[85vh] mx-auto rounded-lg" />
             ) : (
               <img src={selectedItem.url} alt={selectedItem.file_name} className="max-w-full max-h-[85vh] mx-auto object-contain rounded-lg" />
             )}
          </div>
        </div>
      )}
    </section>
  );
}