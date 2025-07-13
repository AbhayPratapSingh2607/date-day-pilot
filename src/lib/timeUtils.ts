/**
 * Converts a 24-hour time string to 12-hour format with AM/PM or keeps 24-hour format
 * @param time - Time string in HH:MM format (e.g., "14:30")
 * @param format - Either '12h' for 12-hour format or '24h' for 24-hour format
 * @returns Formatted time string
 */
export function formatTime(time: string, format: '12h' | '24h'): string {
  if (format === '24h') {
    return time;
  }

  const [hours, minutes] = time.split(':').map(Number);
  
  if (hours === 0) {
    return `12:${minutes.toString().padStart(2, '0')} AM`;
  } else if (hours < 12) {
    return `${hours}:${minutes.toString().padStart(2, '0')} AM`;
  } else if (hours === 12) {
    return `12:${minutes.toString().padStart(2, '0')} PM`;
  } else {
    return `${hours - 12}:${minutes.toString().padStart(2, '0')} PM`;
  }
}

/**
 * Formats a date according to user preference and locale
 * @param date - Date object to format
 * @param format - Format string ('MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy-MM-dd')
 * @param locale - Optional locale string (defaults to 'en-US')
 * @returns Formatted date string
 */
export function formatDate(date: Date, format: string, locale: string = 'en-US'): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  switch (format) {
    case 'MM/dd/yyyy':
      return `${month}/${day}/${year}`;
    case 'dd/MM/yyyy':
      return `${day}/${month}/${year}`;
    case 'yyyy-MM-dd':
      return `${year}-${month}-${day}`;
    default:
      // Fallback to locale-specific formatting
      return date.toLocaleDateString(locale);
  }
}

/**
 * Returns an array of weekday names starting from the specified day
 * @param startDay - 0 for Sunday start, 1 for Monday start
 * @returns Array of weekday abbreviations
 */
export function getWeekDays(startDay: 0 | 1): string[] {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  if (startDay === 1) {
    // Monday start: move Sunday to the end
    return [...days.slice(1), days[0]];
  }
  
  // Sunday start: return as is
  return days;
}

/**
 * Converts a time string to minutes since midnight for sorting purposes
 * @param time - Time string in HH:MM format
 * @returns Number of minutes since midnight
 */
export function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}