import React from 'react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addDays } from 'date-fns';

interface CalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
  events?: { date: Date; title: string; type?: string }[];
  minDate?: Date;
  maxDate?: Date;
}

export const Calendar: React.FC<CalendarProps> = ({ 
  date, 
  onDateChange, 
  events = [],
  minDate,
  maxDate
}) => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Get the first day of the month (Sunday) and the last day of the month (Saturday)
  const firstDayOfMonth = startOfMonth(date);
  const lastDayOfMonth = endOfMonth(date);
  const startDay = new Date(firstDayOfMonth);
  startDay.setDate(startDay.getDate() - firstDayOfMonth.getDay()); // Start from Sunday
  
  const endDay = new Date(lastDayOfMonth);
  endDay.setDate(endDay.getDate() + (6 - lastDayOfMonth.getDay())); // End on Saturday
  
  const allDays = eachDayOfInterval({ start: startDay, end: endDay });

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => onDateChange(subMonths(date, 1))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>
        
        <h2 className="text-lg font-semibold text-gray-800">
          {format(date, 'MMMM yyyy')}
        </h2>
        
        <button 
          onClick={() => onDateChange(addMonths(date, 1))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {allDays.map((day, index) => {
          const dayEvents = getEventsForDate(day);
          const isCurrentMonth = isSameMonth(day, date);
          const isToday = isSameDay(day, new Date());
          const disabled = isDateDisabled(day);
          
          return (
            <div 
              key={index}
              className={`
                min-h-20 p-1 border rounded
                ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
                ${isToday ? 'border-primary-500' : 'border-gray-200'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50'}
              `}
              onClick={() => !disabled && onDateChange(day)}
            >
              <div className="text-right">
                <span className={`
                  inline-flex items-center justify-center h-7 w-7 text-sm rounded-full
                  ${isToday ? 'bg-primary-500 text-white' : ''}
                  ${disabled ? 'cursor-not-allowed' : 'hover:bg-primary-100'}
                `}>
                  {format(day, 'd')}
                </span>
              </div>
              <div className="mt-1 space-y-1 max-h-16 overflow-y-auto">
                {dayEvents.slice(0, 2).map((event, idx) => (
                  <div 
                    key={idx}
                    className={`
                      text-xs px-1 py-0.5 rounded truncate
                      ${event.type === 'meeting' ? 'bg-blue-100 text-blue-800' : 
                        event.type === 'available' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'}
                    `}
                  >
                    {event.title}
                  </div>
                ))}
                {dayEvents.length > 2 && (
                  <div className="text-xs text-gray-500">+{dayEvents.length - 2} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};