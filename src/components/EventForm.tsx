import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Event } from '@/pages/Index';
import { useSettings } from '@/contexts/SettingsContext';

interface EventFormProps {
  onSubmit: (event: Omit<Event, 'id'> | Event) => void;
  initialDate?: Date;
  initialEvent?: Event;
}

export const EventForm: React.FC<EventFormProps> = ({ 
  onSubmit, 
  initialDate = new Date(),
  initialEvent 
}) => {
  const { defaultEventCategory, timeFormat } = useSettings();
  
  // Helper function to get default time based on current time
  const getDefaultTime = (): string => {
    const now = new Date();
    const currentHour = now.getHours();
    const nextHour = currentHour + 1;
    return `${nextHour.toString().padStart(2, '0')}:00`;
  };

  const [title, setTitle] = useState(initialEvent?.title || '');
  const [date, setDate] = useState(
    initialEvent?.date.toISOString().split('T')[0] || 
    initialDate.toISOString().split('T')[0]
  );
  const [time, setTime] = useState(initialEvent?.time || getDefaultTime());
  const [description, setDescription] = useState(initialEvent?.description || '');
  const [category, setCategory] = useState<Event['category']>(initialEvent?.category || defaultEventCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const eventData = {
      ...(initialEvent ? { id: initialEvent.id } : {}),
      title: title.trim(),
      date: new Date(date),
      time,
      description: description.trim(),
      category
    };
    onSubmit(eventData);

    // Reset form if not editing
    if (!initialEvent) {
      setTitle('');
      setDescription('');
      setTime(getDefaultTime());
      setCategory(defaultEventCategory);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {initialEvent ? 'Edit Event' : 'Create New Event'}
        </DialogTitle>
      </DialogHeader>
      
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <Label htmlFor="title">Event Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter event title"
            required
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="time">
              Time
              <span className="text-xs text-muted-foreground ml-1">
                ({timeFormat === '24h' ? '24-hour format' : '12-hour format'})
              </span>
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={(value: Event['category']) => setCategory(value)}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add event description"
            className="mt-1"
            rows={3}
          />
        </div>

        <Button type="submit" className="w-full">
          {initialEvent ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </>
  );
};
