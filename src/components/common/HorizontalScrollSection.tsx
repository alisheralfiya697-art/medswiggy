import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HorizontalScrollSectionProps<T> {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  icon?: React.ReactNode;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  onViewAll?: () => void;
  viewAllLabel?: string;
  itemWidthClass?: string;
}

export function HorizontalScrollSection<T>({
  id,
  title,
  subtitle,
  badge,
  icon,
  data,
  renderItem,
  keyExtractor,
  onViewAll,
  viewAllLabel = 'View All',
}: HorizontalScrollSectionProps<T>) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const checkScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, data]);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.75, 280);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id={id} className="py-4 md:py-6 relative">
      {/* Section Header */}
      <div className="flex items-end justify-between px-4 md:px-6 mb-3 md:mb-4">
        <div>
          <div className="flex items-center gap-2">
            {icon && <span className="text-emerald-600">{icon}</span>}
            <h2 className="text-lg md:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {title}
              {badge && (
                <span className="text-[10px] md:text-xs font-semibold px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 uppercase tracking-wide border border-orange-200">
                  {badge}
                </span>
              )}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs md:text-sm text-slate-500 mt-0.5 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {/* View All & Desktop Navigation Arrows */}
        <div className="flex items-center gap-2">
          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="group inline-flex items-center gap-1 text-xs md:text-sm font-semibold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer shadow-xs active:scale-95"
            >
              <span>{viewAllLabel}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

          {/* Desktop Left/Right Scroll Arrows (Swiggy Web Style) */}
          <div className="hidden sm:flex items-center gap-1.5 ml-2">
            <button
              type="button"
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                canScrollLeft
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer active:scale-95'
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                canScrollRight
                  ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50 shadow-xs cursor-pointer active:scale-95'
                  : 'bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed opacity-50'
              }`}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal FlatList-Style Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar scroll-smooth px-4 md:px-6 pb-2 snap-x snap-mandatory focus:outline-none"
        tabIndex={0}
        role="region"
        aria-label={`${title} carousel`}
      >
        {data.map((item, index) => (
          <div key={keyExtractor(item, index)} className="shrink-0 snap-start">
            {renderItem(item, index)}
          </div>
        ))}
      </div>

      {/* Subtle Scroll Progress Indicator */}
      <div className="px-4 md:px-6 mt-1 flex items-center justify-between">
        <div className="w-20 md:w-28 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-emerald-500 rounded-full transition-all duration-200"
            style={{ width: `${Math.max(15, scrollProgress)}%` }}
          />
        </div>
        <span className="text-[10px] text-slate-600 font-medium sm:hidden">
          Swipe horizontally →
        </span>
      </div>
    </section>
  );
}
