import React from 'react';
import Image from 'next/image';
import { sanitizeImageUrl } from '@/utils/sanitizeUrl';

export interface GameBlogHeaderProps {
    leftImage?: string;
    rightImage?: string;
    width?: number;
    height?: number;
}

export function GameBlogHeader({
    leftImage = 'http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg',
    rightImage = 'http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg',
    width = 1600,
    height = 900
}: GameBlogHeaderProps) {
    return (
        <div className="w-full h-full flex gap-1 md:gap-[6px] p-1 md:p-[6px] bg-[#E8C547]">
            {/* Left section - game image */}
            <div className="flex-1 relative overflow-hidden bg-[#1a1a2e]">
                <Image
                    src={sanitizeImageUrl(leftImage)}
                    alt="Left"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                />
            </div>

            {/* Middle section - purple gradient question mark */}
            <div className="flex-1 flex items-center justify-center relative bg-gradient-to-b from-[#451870] via-[#351150] to-[#250a40]">
                <span className="text-[#E8C547] text-6xl md:text-8xl font-black md:font-bold drop-shadow-[0_0_15px_rgba(232,197,71,0.6)] leading-none select-none">
                    ?
                </span>
            </div>

            {/* Right section - game image */}
            <div className="flex-1 relative overflow-hidden bg-[#1a1a2e]">
                <Image
                    src={sanitizeImageUrl(rightImage)}
                    alt="Right"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 33vw, 20vw"
                />
            </div>
        </div>
    );
}
