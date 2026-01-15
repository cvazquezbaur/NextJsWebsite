import Link from 'next/link';
import React from 'react';

interface ButtonContainerProps {
    buttons?: Array<[string, string]>;
    className?: string;
}

export default function ButtonContainer({
    buttons = [['This Button', '/']],
    className = '',
}: ButtonContainerProps) {
    return (
        <div className={`flex flex-col sm:flex-row justify-center gap-3 ${className}`.trim()}>
            {buttons.map(([label, href], i) => (
                <Link
                    key={`${label}-${i}`}
                    href={href}
                    className="w-full sm:w-auto inline-block px-4 py-2 text-sm font-semibold text-white rounded-lg bg-[#0b6b3a] hover:bg-[#064b2a] transform transition-all duration-150 ease-in-out hover:-translate-y-1 shadow-md text-center"
                >
                    {label}
                </Link>
            ))}
        </div>
    );
}