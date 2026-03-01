import React from 'react';

export interface GameBlogHeaderProps {
    leftImage?: string;
    rightImage?: string;
    width?: number;
    height?: number;
}

export function GameBlogHeader({
    leftImage = 'https://images.unsplash.com/photo-1573306522308-82ff5dd4abe4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFja21hbmlhJTIwcmFjaW5nJTIwZ2FtZXxlbnwxfHx8fDE3NzE3NTE1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    rightImage = 'https://images.unsplash.com/photo-1660300734218-bcfa7a23e6f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3BoYWx0JTIwOSUyMGxlZ2VuZHMlMjByYWNpbmd8ZW58MXx8fHwxNzcxNzUxNTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
            <image
                href={leftImage}
                x={borderWidth}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#leftClip)"
            />

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
            <image
                href={rightImage}
                x={borderWidth * 3 + sectionWidth * 2}
                y={borderWidth}
                width={sectionWidth}
                height={height - borderWidth * 2}
                preserveAspectRatio="xMidYMid slice"
                clipPath="url(#rightClip)"
            />
        </svg>
    );
}
