import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Event } from '@/pages/Index';
import { useSettings } from '@/contexts/SettingsContext';
import { getWeekDays } from '@/lib/timeUtils';

interface CalendarProps {
  events: Event[];
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  onEventClick: (event: Event) => void;
}

export const Calendar: React.FC<CalendarProps> = ({
  events,
  selectedDate,
  onDateSelect,
  onEventClick
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { weekStartDay, dateFormat } = useSettings();

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    // Adjust for different week start days
    // If week starts on Monday (1), we need to shift Sunday (0) to position 6
    if (weekStartDay === 1) {
      return firstDay === 0 ? 6 : firstDay - 1;
    }
    return firstDay;
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    onDateSelect(today);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`p-2 min-h-[80px] border border-border cursor-pointer transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 ${
            isSelected ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-600' : ''
          } ${isToday ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-600' : ''}`}
          onClick={() => onDateSelect(date)}
        >
          <div className={`text-sm font-medium mb-1 ${
            isToday ? 'text-yellow-700 dark:text-yellow-300' : isSelected ? 'text-blue-700 dark:text-blue-300' : 'text-foreground'
          }`}>
            {day}
          </div>
          <div className="space-y-1">
            {dayEvents.slice(0, 2).map((event) => (
              <div
                key={event.id}
                className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${
                  event.category === 'work' ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' :
                  event.category === 'personal' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' :
                  event.category === 'health' ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200' :
                  'bg-muted text-muted-foreground'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  onEventClick(event);
                }}
              >
                {event.time} {event.title}
              </div>
            ))}
            {dayEvents.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{dayEvents.length - 2} more
              </div>
            )}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('prev')}
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateMonth('next')}
            className="hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Days of the week header */}
      <div className="grid grid-cols-7 gap-0 mb-2">
        {getWeekDays(weekStartDay).map((day) => (
          <div key={day} className="p-3 text-center font-semibold text-muted-foreground bg-muted">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-0 border border-border rounded-lg overflow-hidden">
        {renderCalendarDays()}
      </div>
    </div>
  );
};
