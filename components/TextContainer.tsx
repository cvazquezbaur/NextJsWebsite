import React from 'react';

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
    return (
        <section
            role="region"
            aria-label="Text content"
            className={`mx-auto my-8 w-full max-w-3xl sm:max-w-4xl md:max-w-5xl ${className}`}
        >
            <div className="w-full bg-linear-to-b from-black/80 via-black/60 to-black/50 rounded-2xl p-6 sm:p-10 text-white shadow-xl">
                <div className="space-y-8">
                    {textSections.map((section, i) => (
                        <article key={i} className="prose prose-invert max-w-none">
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{section.title}</h2>
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
        </section>
    )
}