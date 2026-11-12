'use client';

import { useState, useEffect, useRef } from 'react';
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isBefore,
  startOfToday,
  addMonths,
  subMonths,
} from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, ChevronDown } from 'lucide-react';
import { localIsoDate, parseIsoDate } from '@/lib/pricing';

interface RetroDatePickerProps {
  pickup: string;
  returnDate: string;
  onSelect: (pickup: string, returnDate: string) => void;
  closedDay?: number;
  popoverClassName?: string;
}

export default function RetroDatePicker({
  pickup,
  returnDate,
  onSelect,
  closedDay,
  popoverClassName,
}: RetroDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [today] = useState<Date>(() => (typeof window !== 'undefined' ? startOfToday() : new Date(2026, 10, 12)));
  const [viewMonth, setViewMonth] = useState<Date>(() =>
    pickup ? new Date(parseIsoDate(pickup)) : (typeof window !== 'undefined' ? startOfToday() : new Date(2026, 10, 1))
  );

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const pickupDate = pickup ? new Date(parseIsoDate(pickup)) : null;
  const returnObj = returnDate ? new Date(parseIsoDate(returnDate)) : null;

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Quick preset handlers
  const handlePreset = (type: 'this-weekend' | 'next-weekend' | '3-day') => {
    const now = new Date();
    let p = new Date(now);
    let r = new Date(now);

    if (type === 'this-weekend') {
      const daysUntilFri = ((5 - now.getDay() + 7) % 7) || 7;
      p = addDays(now, daysUntilFri);
      r = addDays(p, 2);
    } else if (type === 'next-weekend') {
      const daysUntilFri = (((5 - now.getDay() + 7) % 7) || 7) + 7;
      p = addDays(now, daysUntilFri);
      r = addDays(p, 2);
    } else {
      p = addDays(now, 1);
      r = addDays(p, 3);
    }

    onSelect(localIsoDate(p), localIsoDate(r));
    setIsOpen(false);
  };

  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;

    if (!pickupDate || (pickupDate && returnObj) || isBefore(day, pickupDate)) {
      onSelect(localIsoDate(day), localIsoDate(addDays(day, 2)));
    } else {
      if (isSameDay(day, pickupDate)) {
        onSelect(localIsoDate(day), localIsoDate(addDays(day, 1)));
      } else {
        onSelect(localIsoDate(pickupDate), localIsoDate(day));
        setIsOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Clickable Date Field (Change button removed - entire box is interactive) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-[#faf2db] border border-[#18274b] py-3 sm:py-3.5 px-3 sm:px-4 flex items-center justify-between text-[#18274b] hover:border-[#203a78] focus:outline-none focus:ring-2 focus:ring-[#203a78] cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#47516a] shrink-0" />
          <span className="font-bold text-xs sm:text-base tracking-tight sm:tracking-wide text-[#18274b] truncate">
            {pickupDate ? format(pickupDate, 'EEE, MMM d') : 'Select pickup'}
            {' → '}
            {returnObj ? format(returnObj, 'EEE, MMM d, yyyy') : 'Select return'}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 sm:w-5 sm:h-5 text-[#47516a] shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Popover Ledger - Opens upward above the rental dates field */}
      {isOpen && (
        <div
          className={`absolute bottom-full mb-2 z-50 bg-[#faf2db] border-2 border-[#18274b] shadow-2xl shadow-black/70 p-3 sm:p-4 ${
            popoverClassName || 'left-0 right-0'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#a9aa9c] pb-2 sm:pb-2.5 mb-2.5 sm:mb-3">
            <span className="font-['Anton',sans-serif] text-lg sm:text-xl tracking-wider text-[#18274b]">
              {format(viewMonth, 'MMMM yyyy').toUpperCase()}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setViewMonth(subMonths(viewMonth, 1))}
                className="p-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] transition-colors cursor-pointer"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4 text-[#18274b]" />
              </button>
              <button
                type="button"
                onClick={() => setViewMonth(addMonths(viewMonth, 1))}
                className="p-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] transition-colors cursor-pointer"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4 text-[#18274b]" />
              </button>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2.5 sm:mb-3 pb-2 sm:pb-2.5 border-b border-[#a9aa9c]/60">
            <button
              type="button"
              onClick={() => handlePreset('this-weekend')}
              className="text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] transition-colors cursor-pointer"
            >
              This Weekend
            </button>
            <button
              type="button"
              onClick={() => handlePreset('next-weekend')}
              className="text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] transition-colors cursor-pointer"
            >
              Next Weekend
            </button>
            <button
              type="button"
              onClick={() => handlePreset('3-day')}
              className="text-[11px] sm:text-xs font-bold px-2 sm:px-2.5 py-1 border border-[#18274b] bg-[#faf2db] hover:bg-[#fce466] transition-colors cursor-pointer"
            >
              3-Day Getaway
            </button>
          </div>

          {/* Day of Week Headers */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1 text-center font-bold text-[11px] sm:text-xs text-[#47516a] mb-1.5 sm:mb-2">
            <span>Su</span>
            <span>Mo</span>
            <span>Tu</span>
            <span>We</span>
            <span>Th</span>
            <span>Fr</span>
            <span>Sa</span>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7 sm:h-8" />
            ))}

            {daysInMonth.map((day) => {
              const isPast = isBefore(day, today);
              const isPickup = pickupDate && isSameDay(day, pickupDate);
              const isReturn = returnObj && isSameDay(day, returnObj);
              const inRange =
                pickupDate &&
                returnObj &&
                day > pickupDate &&
                day < returnObj;
              const isClosed = closedDay !== undefined && day.getDay() === closedDay;

              let dayClass = 'text-[#18274b] bg-[#faf2db] hover:bg-[#fce466]';
              if (isPast) {
                dayClass = 'text-[#a9aa9c] cursor-not-allowed opacity-40 bg-[#faf2db]';
              } else if (isPickup || isReturn) {
                dayClass = 'bg-[#203a78] text-[#faf2db] font-bold';
              } else if (inRange) {
                dayClass = 'bg-[#fce466] font-bold text-[#18274b]';
              } else if (isClosed) {
                dayClass = 'text-red-900/50 line-through bg-red-100/40';
              }

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleDayClick(day)}
                  className={`h-7 sm:h-8 text-[11px] sm:text-xs font-medium flex items-center justify-center transition-colors border border-transparent cursor-pointer ${dayClass}`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Legend & Close */}
          <div className="mt-3 pt-2.5 border-t border-[#a9aa9c] flex items-center justify-between text-xs text-[#47516a]">
            <span>Click pickup, then return date</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="font-bold text-xs uppercase px-3 py-1 bg-[#18274b] text-[#faf2db] hover:bg-[#203a78] border border-[#18274b] shadow-[2px_2px_0px_#18274b] cursor-pointer transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
