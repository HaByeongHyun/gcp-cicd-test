'use client';

import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { memo, useState } from 'react';

interface PerformanceImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export const PerformanceImage = memo(
  ({
    src,
    alt,
    priority = false,
    className = '',
    sizes = '(max-width: 1024px) 100vw, 33vw',
  }: PerformanceImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
      <div className="relative h-full w-full">
        {isLoading && !hasError && (
          <Skeleton className="absolute inset-0 h-full w-full" />
        )}
        {hasError ? (
          <div className="flex h-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">이미지를 불러올 수 없습니다</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className={`object-cover transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            } ${className}`}
            priority={priority}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
    );
  },
);

PerformanceImage.displayName = 'PerformanceImage';

interface IntroImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const IntroImage = memo(
  ({ src, alt, width = 600, height = 400 }: IntroImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
      <div className="relative overflow-hidden rounded-lg">
        {isLoading && !hasError && <Skeleton className="aspect-video w-full" />}
        {hasError ? (
          <div className="flex aspect-video w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">이미지를 불러올 수 없습니다</span>
          </div>
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="100vw"
            className={`h-auto w-full transition-opacity duration-300 ${
              isLoading ? 'opacity-0' : 'opacity-100'
            }`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}
      </div>
    );
  },
);

IntroImage.displayName = 'IntroImage';
