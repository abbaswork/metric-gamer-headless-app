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
    const borderWidth = 8;
    const sectionWidth = (width - borderWidth * 4) / 3;

    return (
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'block', maxWidth: '100%', height: 'auto' }}
        >
            {/* Define gradient for middle section */}
            <defs>
                <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#451870', stopOpacity: 1 }} />
                    <stop offset="50%" style={{ stopColor: '#351150', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#250a40', stopOpacity: 1 }} />
                </linearGradient>

                {/* Glow filter for question mark */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                {/* Clip paths for each section */}
                <clipPath id="leftClip">
                    <rect
                        x={borderWidth}
                        y={borderWidth}
                        width={sectionWidth}
                        height={height - borderWidth * 2}
                    />
                </clipPath>

                <clipPath id="rightClip">
                    <rect
                        x={borderWidth * 3 + sectionWidth * 2}
                        y={borderWidth}
                        width={sectionWidth}
                        height={height - borderWidth * 2}
                    />
                </clipPath>
            </defs>

            {/* Outer yellow border background */}
            <rect width={width} height={height} fill="#E8C547" />

            {/* Left section - game image */}
            <rect
                x={borderWidth}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                fill="#1a1a2e"
            />
            <foreignObject
                x={borderWidth}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                clipPath="url(#leftClip)"
            >
                <div className="w-full h-full relative">
                    <Image
                        src={sanitizeImageUrl(leftImage)}
                        alt="Left"
                        fill
                        className="object-cover"
                    />
                </div>
            </foreignObject>

            {/* Middle section - question mark with gradient */}
            <rect
                x={borderWidth * 2 + sectionWidth}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                fill="url(#purpleGradient)"
            />

            {/* Question mark with glow effect - centered */}
            <g filter="url(#glow)">
                <text
                    x={borderWidth * 2 + sectionWidth + sectionWidth / 2}
                    y={height / 2 + 10}
                    fontSize="420"
                    fontWeight="bold"
                    fontFamily="Arial, sans-serif"
                    fill="#E8C547"
                    textAnchor="middle"
                    dominantBaseline="central"
                >
                    ?
                </text>
            </g>

            {/* Right section - game image */}
            <rect
                x={borderWidth * 3 + sectionWidth * 2}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                fill="#1a1a2e"
            />
            <foreignObject
                x={borderWidth * 3 + sectionWidth * 2}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                clipPath="url(#rightClip)"
            >
                <div className="w-full h-full relative">
                    <Image
                        src={sanitizeImageUrl(rightImage)}
                        alt="Right"
                        fill
                        className="object-cover"
                    />
                </div>
            </foreignObject>
        </svg>
    );
}
