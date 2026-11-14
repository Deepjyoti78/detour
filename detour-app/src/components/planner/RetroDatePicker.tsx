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
import { localIsoDate } from '@/lib/pricing';

interface RetroDatePickerProps {
  pickup: string;
  returnDate: string;
  onSelect: (pickup: string, returnDate: string) => void;
  closedDay?: number;
  popoverClassName?: string;
}

function parseYmd(iso: string | undefined): Date | null {
  if (!iso || typeof iso !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(iso)) return null;
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(y, m - 1, d);
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

  // Two-step date range selection state
  const [selectingReturn, setSelectingReturn] = useState(false);
  const [pendingPickup, setPendingPickup] = useState<Date | null>(null);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  const [today] = useState<Date>(() => (typeof window !== 'undefined' ? startOfToday() : new Date(2026, 10, 12)));
  const [viewMonth, setViewMonth] = useState<Date>(() => {
    const parsed = parseYmd(pickup);
    return parsed || (typeof window !== 'undefined' ? startOfToday() : new Date(2026, 10, 1));
  });

  // Click outside to close and reset in-progress selection
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setSelectingReturn(false);
        setPendingPickup(null);
        setHoverDate(null);
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

  const pickupDate = parseYmd(pickup);
  const returnObj = parseYmd(returnDate);

  const monthStart = startOfMonth(viewMonth);
  const monthEnd = endOfMonth(monthStart);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Quick preset handlers
  const handlePreset = (type: 'this-weekend' | 'next-weekend' | '3-day') => {
    const base = today || new Date();
    let p = new Date(base);
    let r = new Date(base);

    if (type === 'this-weekend') {
      const daysUntilFri = ((5 - base.getDay() + 7) % 7) || 7;
      p = addDays(base, daysUntilFri);
      r = addDays(p, 2);
    } else if (type === 'next-weekend') {
      const daysUntilFri = (((5 - base.getDay() + 7) % 7) || 7) + 7;
      p = addDays(base, daysUntilFri);
      r = addDays(p, 2);
    } else {
      p = addDays(base, 1);
      r = addDays(p, 3);
    }

    setSelectingReturn(false);
    setPendingPickup(null);
    setHoverDate(null);
    onSelect(localIsoDate(p), localIsoDate(r));
    setIsOpen(false);
  };

  // Click date handler with true two-step selection:
  // 1st click = sets ONLY the pickup date (no automatic 2-3 extra days selected)
  // 2nd click = sets the return date
  const handleDayClick = (day: Date) => {
    if (isBefore(day, today)) return;
    if (closedDay !== undefined && day.getDay() === closedDay) return;

    if (!selectingReturn || !pendingPickup) {
      // Step 1: User chooses pick-up date
      setPendingPickup(day);
      setSelectingReturn(true);
      setHoverDate(null);
    } else {
      // Step 2: User chooses return date
      if (isBefore(day, pendingPickup)) {
        // If clicked an earlier date, switch to that as new pick-up date
        setPendingPickup(day);
        setHoverDate(null);
      } else if (isSameDay(day, pendingPickup)) {
        // If clicked same date, treat as 1-day rental (next day return)
        const nextDay = addDays(day, 1);
        onSelect(localIsoDate(day), localIsoDate(nextDay));
        setSelectingReturn(false);
        setPendingPickup(null);
        setHoverDate(null);
      } else {
        // Clicked later date: valid return date selected
        onSelect(localIsoDate(pendingPickup), localIsoDate(day));
        setSelectingReturn(false);
        setPendingPickup(null);
        setHoverDate(null);
      }
    }
  };

  const handleDone = () => {
    if (selectingReturn && pendingPickup) {
      // If user selected pickup and pressed Done before picking return, default return to next day
      onSelect(localIsoDate(pendingPickup), localIsoDate(addDays(pendingPickup, 1)));
      setSelectingReturn(false);
      setPendingPickup(null);
      setHoverDate(null);
    }
    setIsOpen(false);
  };

  const toggleOpen = () => {
    setSelectingReturn(false);
    setPendingPickup(null);
    setHoverDate(null);
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Clickable Date Field */}
      <button
        type="button"
        onClick={toggleOpen}
        className="w-full text-left bg-[#faf2db] border border-[#18274b] py-3 sm:py-3.5 px-3 sm:px-4 flex items-center justify-between text-[#18274b] hover:border-[#203a78] focus:outline-none focus:ring-2 focus:ring-[#203a78] cursor-pointer transition-colors"
      >
        <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
          <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#47516a] shrink-0" />
          {selectingReturn && pendingPickup ? (
            <span className="font-bold text-xs sm:text-base tracking-tight sm:tracking-wide text-[#18274b] truncate">
              {format(pendingPickup, 'EEE, MMM d')}
              {' → '}
              <span className="text-[#203a78] underline decoration-dashed">Select return date</span>
            </span>
          ) : (
            <span className="font-bold text-xs sm:text-base tracking-tight sm:tracking-wide text-[#18274b] truncate">
              {pickupDate ? format(pickupDate, 'EEE, MMM d') : 'Select pickup'}
              {' → '}
              {returnObj ? format(returnObj, 'EEE, MMM d, yyyy') : 'Select return'}
            </span>
          )}
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
          <div
            className="grid grid-cols-7 gap-0.5 sm:gap-1"
            onMouseLeave={() => setHoverDate(null)}
          >
            {Array.from({ length: monthStart.getDay() }).map((_, i) => (
              <div key={`empty-${i}`} className="h-7 sm:h-8" />
            ))}

            {daysInMonth.map((day) => {
              const isPast = isBefore(day, today);
              const isClosed = closedDay !== undefined && day.getDay() === closedDay;

              let dayClass = 'text-[#18274b] bg-[#faf2db] hover:bg-[#fce466]';

              if (isPast) {
                dayClass = 'text-[#a9aa9c] cursor-not-allowed opacity-40 bg-[#faf2db]';
              } else if (isClosed) {
                dayClass = 'text-red-900/50 line-through bg-red-100/40 cursor-not-allowed';
              } else if (selectingReturn && pendingPickup) {
                // In Step 2: Selecting return date
                const isSelectedPickup = isSameDay(day, pendingPickup);
                const isHoverReturn = hoverDate && isSameDay(day, hoverDate) && day > pendingPickup;
                const inHoverRange = hoverDate && hoverDate > pendingPickup && day > pendingPickup && day < hoverDate;

                if (isSelectedPickup) {
                  dayClass = 'bg-[#18274b] text-[#faf2db] font-bold shadow-[inset_0_0_0_2px_#fce466]';
                } else if (isHoverReturn) {
                  dayClass = 'bg-[#203a78] text-[#faf2db] font-bold';
                } else if (inHoverRange) {
                  dayClass = 'bg-[#fce466]/60 font-bold text-[#18274b]';
                } else {
                  dayClass = 'text-[#18274b] bg-[#faf2db] hover:bg-[#fce466]';
                }
              } else {
                // Normal view: Showing active confirmed range
                const isPickup = pickupDate && isSameDay(day, pickupDate);
                const isReturn = returnObj && isSameDay(day, returnObj);
                const inRange =
                  pickupDate &&
                  returnObj &&
                  day > pickupDate &&
                  day < returnObj;

                if (isPickup || isReturn) {
                  dayClass = 'bg-[#18274b] text-[#faf2db] font-bold';
                } else if (inRange) {
                  dayClass = 'bg-[#fce466] font-bold text-[#18274b]';
                }
              }

              return (
                <button
                  key={day.toISOString()}
                  type="button"
                  disabled={isPast || isClosed}
                  onClick={() => handleDayClick(day)}
                  onMouseEnter={() => {
                    if (selectingReturn) setHoverDate(day);
                  }}
                  className={`h-7 sm:h-8 text-[11px] sm:text-xs font-medium flex items-center justify-center transition-colors border border-transparent cursor-pointer ${dayClass}`}
                >
                  {format(day, 'd')}
                </button>
              );
            })}
          </div>

          {/* Legend & Status Footer */}
          <div className="mt-3 pt-2.5 border-t border-[#a9aa9c] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            {selectingReturn && pendingPickup ? (
              <div className="flex items-center justify-between sm:justify-start gap-2">
                <span className="flex items-center gap-1.5 font-bold text-[#18274b]">
                  <span className="w-2 h-2 rounded-full bg-[#fce466] border border-[#18274b] animate-pulse" />
                  Pickup: {format(pendingPickup, 'EEE, MMM d')} · Click return date
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectingReturn(false);
                    setPendingPickup(null);
                    setHoverDate(null);
                  }}
                  className="text-[11px] font-bold text-[#47516a] hover:text-[#18274b] underline cursor-pointer ml-1"
                >
                  Reset
                </button>
              </div>
            ) : (
              <span className="text-[#47516a] font-medium">
                {pickupDate && returnObj
                  ? `${format(pickupDate, 'EEE, MMM d')} → ${format(returnObj, 'EEE, MMM d')} (${Math.max(1, Math.round((returnObj.getTime() - pickupDate.getTime()) / 86400000))} days)`
                  : 'Click a date for pickup, then return'}
              </span>
            )}
            <button
              type="button"
              onClick={handleDone}
              className="font-bold text-xs uppercase px-3 py-1 bg-[#18274b] text-[#faf2db] hover:bg-[#203a78] border border-[#18274b] shadow-[2px_2px_0px_#18274b] cursor-pointer transition-colors self-end sm:self-auto"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
