"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { memo, useState } from "react";

interface PerformanceImageProps {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export const PerformanceImage = memo(({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 33vw",
}: PerformanceImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <Skeleton className="absolute inset-0 h-full w-full" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={`object-cover transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        priority={priority}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

PerformanceImage.displayName = "PerformanceImage";

interface IntroImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const IntroImage = memo(({ src, alt, width = 0, height = 0 }: IntroImageProps) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden rounded-lg">
      {isLoading && (
        <Skeleton className="aspect-video w-full" />
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes="100vw"
        className={`h-auto w-full transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
});

IntroImage.displayName = "IntroImage";
