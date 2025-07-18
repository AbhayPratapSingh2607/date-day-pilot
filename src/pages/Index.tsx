import React, { useState } from 'react';
import { Calendar } from '@/components/Calendar';
import { EventForm } from '@/components/EventForm';
import { TodaySchedule } from '@/components/TodaySchedule';
import { EventList } from '@/components/EventList';
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarPlus, Calendar as CalendarIcon, List, Clock } from 'lucide-react';

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  description?: string;
  category: 'work' | 'personal' | 'health' | 'other';
}

const Index = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: new Date(),
      time: '10:00',
      description: 'Weekly team sync',
      category: 'work'
    },
    {
      id: '2',
      title: 'Gym Session',
      date: new Date(),
      time: '18:00',
      description: 'Upper body workout',
      category: 'health'
    }
  ]);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const userLocale = typeof navigator !== 'undefined' ? navigator.language : 'en-US';

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = {
      ...event,
      id: Date.now().toString()
    };
    setEvents([...events, newEvent]);
    setIsEventFormOpen(false);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const updateEvent = (eventId: string, updatedEvent: Partial<Event>) => {
    setEvents(events.map(event => 
      event.id === eventId ? { ...event, ...updatedEvent } : event
    ));
  };

  const handleEventFormSubmit = (updated: Event) => {
    updateEvent(updated.id, updated);
    setSelectedEvent(null);
  };

  const todayEvents = events.filter(event => 
    event.date.toDateString() === new Date().toDateString()
  );

  const selectedDateEvents = events.filter(event =>
    event.date.toDateString() === selectedDate.toDateString()
  );

  return (
    <div className="min-h-screen bg-background dark:bg-slate-900 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Header */}
        <div className="mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">Schedule Tracker</h1>
            <p className="text-muted-foreground">Stay organized and never miss an important event</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex justify-center mb-8">
          <Dialog open={isEventFormOpen} onOpenChange={setIsEventFormOpen}>
            <DialogTrigger asChild>
              <Button
                variant="default"
                size="lg"
                aria-label="Add New Event"
              >
                <CalendarPlus className="mr-2 h-5 w-5" aria-hidden="true" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent forceMount>
              <EventForm onSubmit={addEvent} initialDate={selectedDate} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Calendar Section */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="calendar" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="calendar" className="flex items-center gap-2" aria-label="Calendar View">
                  <CalendarIcon className="h-4 w-4" aria-hidden="true" />
                  Calendar View
                </TabsTrigger>
                <TabsTrigger value="list" className="flex items-center gap-2" aria-label="List View">
                  <List className="h-4 w-4" aria-hidden="true" />
                  List View
                </TabsTrigger>
              </TabsList>
              <TabsContent value="calendar">
                <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                  <Calendar
                    events={events}
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    onEventClick={setSelectedEvent}
                  />
                </div>
              </TabsContent>
              <TabsContent value="list">
                <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                  <EventList
                    events={events}
                    onEventDelete={deleteEvent}
                    onEventUpdate={updateEvent}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Today's Schedule */}
            <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
              </div>
              <TodaySchedule events={todayEvents} />
            </div>
            {/* Selected Date Events */}
            {selectedDate.toDateString() !== new Date().toDateString() && (
              <div className="bg-card rounded-xl shadow-lg p-6 border border-border">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {selectedDate.toLocaleDateString(userLocale, {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h3>
                <TodaySchedule events={selectedDateEvents} />
              </div>
            )}
          </div>
        </div>
        {/* Event Edit Dialog */}
        <Dialog open={!!selectedEvent} onOpenChange={open => !open && setSelectedEvent(null)}>
          <DialogContent forceMount>
            {selectedEvent && (
              <EventForm
                onSubmit={handleEventFormSubmit}
                initialDate={selectedEvent.date}
                initialEvent={selectedEvent}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;
