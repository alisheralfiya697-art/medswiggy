import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, Copy, Check, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from 'lucide-react';
import { PromoBanner } from '../../types';
import { RemoteImage } from '../common/RemoteImage';

interface PromoBannerCarouselProps {
  banners: PromoBanner[];
  onBookPromo: (banner: PromoBanner) => void;
}

export const PromoBannerCarousel: React.FC<PromoBannerCarouselProps> = ({
  banners,
  onBookPromo,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 42, seconds: 18 });

  // Countdown timer simulation for Swiggy flash-deal urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto carousel rotation
  useEffect(() => {
    const autoTimer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(autoTimer);
  }, [banners.length]);

  const currentBanner = banners[currentIndex];

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  return (
    <div className="px-4 sm:px-6 pt-3 pb-2 max-w-7xl mx-auto">
      <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-orange-200/50 bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 text-white">
        {/* Background Ambient Glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-stretch">
          {/* Left Text & Offer Content */}
          <div className="p-5 sm:p-6 md:p-8 flex-1 flex flex-col justify-between z-10">
            {/* Top Badge & Timer */}
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-xs tracking-wider uppercase">
                  <Sparkles className="w-3 h-3" />
                  {currentBanner.badge}
                </span>

                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-black/40 text-amber-300 border border-amber-500/30">
                  <Clock className="w-3 h-3 text-amber-400 animate-pulse" />
                  <span>
                    Ends in {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
                  </span>
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-1.5">
                {currentBanner.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-normal mb-3">
                {currentBanner.subtitle}
              </p>

              {/* Highlights Pill Badges */}
              <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-1.5 mb-4">
                {currentBanner.includedHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md"
                  >
                    <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Price, Coupon, CTA */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 mt-2">
              {/* Pricing */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black text-amber-400">
                  ₹{currentBanner.dealPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹{currentBanner.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-orange-400 bg-orange-950/60 border border-orange-500/40 px-1.5 py-0.5 rounded">
                  {currentBanner.discountHighlight}
                </span>
              </div>

              {/* Coupon Code Pill */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => handleCopyCode(currentBanner.couponCode, e)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-dashed border-amber-400/60 text-xs font-mono font-bold text-amber-300 transition-colors cursor-pointer"
                  title="Click to copy coupon code"
                >
                  <span>CODE: {currentBanner.couponCode}</span>
                  {copiedCode === currentBanner.couponCode ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-amber-300" />
                  )}
                </button>

                {/* Primary CTA */}
                <button
                  type="button"
                  onClick={() => onBookPromo(currentBanner)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-orange-500/25 transition-all cursor-pointer active:scale-95"
                >
                  <span>Book Package</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Image Container with Gradient Overlay */}
          <div className="relative md:w-5/12 h-44 sm:h-52 md:h-auto overflow-hidden">
            <RemoteImage
              src={currentBanner.imageUrl}
              alt={currentBanner.title}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-700 hover:scale-110"
              fallbackText="Health Checkup Promo"
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white/90 border border-white/20 font-medium">
              Home Sample Pickup in 30 Mins
            </div>
          </div>
        </div>

        {/* Carousel Indicator Dots & Prev/Next Mini Buttons */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
          <button
            type="button"
            onClick={prevBanner}
            aria-label="Previous promo banner"
            className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-1 px-1">
            {banners.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-5 bg-orange-400' : 'w-1.5 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={nextBanner}
            aria-label="Next promo banner"
            className="w-6 h-6 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
