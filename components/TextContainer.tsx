import React from 'react';

interface Props {
    textSections?: Array<[string, Array<string>]>
    className?: string
}

export default function TextContainer({ textSections = [], className = '' }: Props) {
    return (
        <section
            role="region"
            aria-label="Text content"
            className={`mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl ${className}`}
        >
            <div className="w-full bg-gradient-to-b from-black/70 via-black/50 to-black/40 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
                <div className="space-y-8">
                    {textSections.map(([title, content], i) => (
                        <article key={i} className="prose prose-invert max-w-none">
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{title}</h2>
                            <div className="space-y-3 text-base sm:text-lg leading-relaxed text-white/95">
                                {content.map((line, j) => (
                                    <p key={j}>{line}</p>
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}