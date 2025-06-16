
import React, { useState } from 'react';
import { Edit, Trash2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { EventForm } from './EventForm';
import { Event } from '@/pages/Index';

interface EventListProps {
  events: Event[];
  onEventDelete: (eventId: string) => void;
  onEventUpdate: (eventId: string, updatedEvent: Partial<Event>) => void;
}

export const EventList: React.FC<EventListProps> = ({
  events,
  onEventDelete,
  onEventUpdate
}) => {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const sortedEvents = events.sort((a, b) => {
    const dateComparison = a.date.getTime() - b.date.getTime();
    if (dateComparison !== 0) return dateComparison;
    return a.time.localeCompare(b.time);
  });

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditDialogOpen(true);
  };

  const handleUpdateEvent = (updatedEvent: Omit<Event, 'id'>) => {
    if (editingEvent) {
      onEventUpdate(editingEvent.id, updatedEvent);
      setIsEditDialogOpen(false);
      setEditingEvent(null);
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'health':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (events.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-medium mb-2">No events yet</h3>
        <p>Create your first event to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">All Events</h2>
      
      {sortedEvents.map((event) => (
        <div
          key={event.id}
          className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-gray-800">{event.title}</h3>
                <span className={`px-2 py-1 text-xs rounded-full border ${getCategoryColor(event.category)}`}>
                  {event.category}
                </span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                <Calendar className="h-4 w-4" />
                <span>{event.date.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>
              
              <div className="flex items-center gap-1 text-sm text-gray-600 mb-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              
              {event.description && (
                <p className="text-sm text-gray-600 mt-2">{event.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditEvent(event)}
                className="hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEventDelete(event.id)}
                className="hover:bg-red-50 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          {editingEvent && (
            <EventForm
              onSubmit={handleUpdateEvent}
              initialEvent={editingEvent}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
