import React, { useState } from 'react';
import { ImageOff, RefreshCw, Activity } from 'lucide-react';

interface RemoteImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: React.ReactNode;
  fallbackText?: string;
  containerClassName?: string;
}

export const RemoteImage: React.FC<RemoteImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  fallbackIcon,
  fallbackText,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [retryKey, setRetryKey] = useState<number>(0);

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);
    setHasError(false);
    setRetryKey((prev) => prev + 1);
  };

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}>
      {/* Loading Shimmer Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-200 animate-pulse">
          <Activity className="w-6 h-6 text-slate-400 animate-spin opacity-50 mb-1" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
        </div>
      )}

      {/* Fallback Error State */}
      {hasError ? (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 p-3 text-center">
          {fallbackIcon || <ImageOff className="w-8 h-8 text-slate-400 mb-1" />}
          <span className="text-xs font-medium text-slate-600 line-clamp-1">
            {fallbackText || alt || 'Image unavailable'}
          </span>
          <button
            type="button"
            onClick={handleRetry}
            className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-2 py-0.5 rounded-full transition-colors"
          >
            <RefreshCw className="w-3 h-3" /> Retry
          </button>
        </div>
      ) : (
        /* Actual Remote Image */
        <img
          key={retryKey}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-300 ${
            isLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'
          } ${className}`}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
};
