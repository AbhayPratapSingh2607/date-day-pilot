import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { Event } from '@/pages/Index';

interface TodayScheduleProps {
  events: Event[];
}

export const TodaySchedule: React.FC<TodayScheduleProps> = ({ events }) => {
  const sortedEvents = events.sort((a, b) => a.time.localeCompare(b.time));

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'work':
        return 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300';
      case 'personal':
        return 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300';
      case 'health':
        return 'border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300';
      default:
        return 'border-muted-foreground bg-muted text-muted-foreground';
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
        <p>No events scheduled</p>
        <p className="text-sm">Enjoy your free time!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className={`p-3 rounded-lg border-l-4 transition-all duration-200 hover:shadow-md ${getCategoryColor(event.category)}`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-medium text-sm">{event.title}</h3>
              <div className="flex items-center gap-1 mt-1 text-xs opacity-75">
                <Clock className="h-3 w-3" />
                <span>{event.time}</span>
              </div>
              {event.description && (
                <p className="text-xs mt-2 opacity-75">{event.description}</p>
              )}
            </div>
            <div className={`text-xs px-2 py-1 rounded-full ${
              event.category === 'work' ? 'bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200' :
              event.category === 'personal' ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' :
              event.category === 'health' ? 'bg-purple-200 dark:bg-purple-800 text-purple-800 dark:text-purple-200' :
              'bg-muted text-muted-foreground'
            }`}>
              {event.category}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
