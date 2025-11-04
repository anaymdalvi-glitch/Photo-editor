
import React from 'react';

const WandIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 5h.01M5 20h.01M9 4h.01M4 9h.01M4 4l1.5 1.5M19 19l-1.5-1.5" />
    </svg>
);


export const Header: React.FC = () => {
    return (
        <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
            <div className="container mx-auto px-4 lg:px-6 py-4 flex items-center gap-4">
                <WandIcon />
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">Gemini Photo Editor</h1>
                    <p className="text-sm text-gray-400">Edit images with the power of AI and simple text prompts.</p>
                </div>
            </div>
        </header>
    );
};
