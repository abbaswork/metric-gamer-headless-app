import Image from 'next/image';
import './score-card.scss';
import { RatingIcons } from '../rating-icons/RatingIcons';
import { RatingIconsTypes } from '../rating-icons/types';

export interface ScoreCardProps {
  src: string;
  alt: string;
  gameTitle?: string;
  gameMetrics?: {
    metricTitle: string;
    metricScore: number;
  }[];
  gameThumbnail?: {
    node: {
      altText: string;
      sourceUrl: string;
    };
  };
  href?: string;
  description?: string;
  postCard?: true;
}

export const ScoreCard = ({ gameTitle, src, alt }: ScoreCardProps) => {


  return (
    <div className='score-card'>

      {/* Use Next.js Image for background Image and optimized loading */}
      <Image
        src={src}
        alt={alt}
        layout="fill" // Makes the image fill the parent container
        objectFit="cover" // Ensures the image covers the container
        className="card-background-image"
        priority
      />

      <h3 className='card-title'>{gameTitle}</h3>
      <p className='card-score'>{}</p>

      {/* Metric Rankings */}
      <div className='card-rankings'>
        <div className='card-ranking-row'>
          <span className='metric-text'>Story:</span>
          <RatingIcons rank={5} icon={RatingIconsTypes.star}></RatingIcons>
        </div>

        <div className='card-ranking-row'>
          <span className='metric-text'>Story:</span>
          <RatingIcons rank={1} icon={RatingIconsTypes.star}></RatingIcons>
        </div>

        <div className='card-ranking-row'>
          <span className='metric-text'>Story:</span>
          <RatingIcons rank={2} icon={RatingIconsTypes.star}></RatingIcons>
        </div>

        <div className='card-ranking-row'>
          <span className='metric-text'>Story:</span>
          <RatingIcons rank={3} icon={RatingIconsTypes.star}></RatingIcons>
        </div>

        <div className='card-ranking-row'>
          <span className='metric-text'>Story:</span>
          <RatingIcons rank={4} icon={RatingIconsTypes.star}></RatingIcons>
        </div>
      </div>

      {/* Link Image as transparent background for card with black overlay */}
      <div className='card-overlay'></div>
    </div>
  )
}