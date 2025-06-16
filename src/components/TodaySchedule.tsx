
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
        return 'border-blue-500 bg-blue-50 text-blue-700';
      case 'personal':
        return 'border-green-500 bg-green-50 text-green-700';
      case 'health':
        return 'border-purple-500 bg-purple-50 text-purple-700';
      default:
        return 'border-gray-500 bg-gray-50 text-gray-700';
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
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
              event.category === 'work' ? 'bg-blue-200 text-blue-800' :
              event.category === 'personal' ? 'bg-green-200 text-green-800' :
              event.category === 'health' ? 'bg-purple-200 text-purple-800' :
              'bg-gray-200 text-gray-800'
            }`}>
              {event.category}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
