"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface TextSection {
    title: string;
    content: string[];
}

interface Props {
    textSections?: TextSection[];
    children?: React.ReactNode
    className?: string
}

export default function TextContainer({ textSections = [], children, className = '' }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [overflows, setOverflows] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkOverflow = () => {
            if (contentRef.current) {
                setOverflows(contentRef.current.scrollHeight > window.innerHeight * 0.85);
            }
        };
        checkOverflow();
        window.addEventListener('resize', checkOverflow);
        return () => window.removeEventListener('resize', checkOverflow);
    }, [textSections, children]);

    return (
        <section
            role="region"
            aria-label="Text content"
            className={`mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl ${className}`}
        >
            <div className="w-full bg-linear-to-b from-black/80 via-black/60 to-black/50 rounded-2xl p-6 sm:p-10 text-white shadow-xl relative">
                <div
                    ref={contentRef}
                    className={`transition-all duration-500 ease-in-out ${
                        !expanded && overflows ? 'max-h-[85vh] overflow-hidden' : ''
                    }`}
                >
                    <div className="space-y-8">
                        {textSections.map((section, i) => (
                            <article key={i} className="prose prose-invert max-w-none">
                                <h1 className="text-2xl sm:text-3xl font-semibold mb-2">{section.title}</h1>
                                <div className="space-y-3 text-base sm:text-lg leading-relaxed text-white/95">
                                    {section.content.map((paragraph, j) => (
                                        <p key={j}>{paragraph}</p>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>

                {/* Gradient fade + See More/Less button */}
                {overflows && (
                    <div className={`${!expanded ? 'absolute bottom-0 left-0 right-0 rounded-b-2xl' : 'mt-4'}`}>
                        {!expanded && (
                            <div className="h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none rounded-b-2xl" />
                        )}
                        <div className={`flex justify-center ${!expanded ? 'absolute bottom-4 left-0 right-0' : ''}`}>
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-colors backdrop-blur-sm"
                            >
                                {expanded ? (
                                    <>See Less <ChevronUp size={16} /></>
                                ) : (
                                    <>See More <ChevronDown size={16} /></>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}