import React, { useState } from 'react';
import { format, addDays, isSameDay } from 'date-fns';
import { Calendar as CalendarIcon, Clock, Plus, Edit, Trash2, Check, X } from 'lucide-react';
import { Calendar as CalendarComponent } from '../../components/ui/Calendar';
import { Button } from '../../components/ui/Button';

interface AvailabilitySlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  title: string;
}

interface MeetingRequest {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  sender: string;
  status: 'pending' | 'accepted' | 'declined';
}

export const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [slots, setSlots] = useState<AvailabilitySlot[]>([
    { id: '1', date: addDays(new Date(), 1), startTime: '10:00', endTime: '11:00', title: 'Available' },
    { id: '2', date: addDays(new Date(), 3), startTime: '14:00', endTime: '15:00', title: 'Available' },
    { id: '3', date: addDays(new Date(), 5), startTime: '09:00', endTime: '10:00', title: 'Available' },
  ]);
  
  const [requests, setRequests] = useState<MeetingRequest[]>([
    { 
      id: '1', 
      title: 'Business Discussion', 
      date: addDays(new Date(), 2), 
      startTime: '11:00', 
      endTime: '12:00', 
      sender: 'John Doe', 
      status: 'pending' 
    },
    { 
      id: '2', 
      title: 'Project Review', 
      date: addDays(new Date(), 4), 
      startTime: '15:00', 
      endTime: '16:00', 
      sender: 'Jane Smith', 
      status: 'accepted' 
    },
  ]);
  
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [newSlot, setNewSlot] = useState<Omit<AvailabilitySlot, 'id'>>({ 
    date: new Date(), 
    startTime: '09:00', 
    endTime: '10:00', 
    title: 'Available' 
  });

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
  };

  const handleAddSlot = () => {
    const slot: AvailabilitySlot = {
      ...newSlot,
      id: Date.now().toString(),
    };
    setSlots([...slots, slot]);
    setShowAddSlot(false);
    setNewSlot({ 
      date: new Date(), 
      startTime: '09:00', 
      endTime: '10:00', 
      title: 'Available' 
    });
  };

  const handleRemoveSlot = (id: string) => {
    setSlots(slots.filter(slot => slot.id !== id));
  };

  const handleAcceptRequest = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'accepted' } : req
    ));
  };

  const handleDeclineRequest = (id: string) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: 'declined' } : req
    ));
  };

  // Prepare events for calendar
  const calendarEvents = [
    ...slots.map(slot => ({
      date: slot.date,
      title: `${slot.startTime}-${slot.endTime} ${slot.title}`,
      type: 'available'
    })),
    ...requests
      .filter(req => req.status === 'accepted')
      .map(req => ({
        date: req.date,
        title: `${req.startTime}-${req.endTime} ${req.title}`,
        type: 'meeting'
      }))
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Meeting Scheduler</h1>
        <Button 
          variant="primary" 
          onClick={() => setShowAddSlot(true)}
          leftIcon={<Plus className="w-4 h-4" />}
        >
          Add Availability
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarComponent 
            date={currentDate} 
            onDateChange={handleDateChange}
            events={calendarEvents}
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Your Availability
            </h2>
            
            {slots.length === 0 ? (
              <p className="text-gray-500 text-sm">No availability slots added yet.</p>
            ) : (
              <div className="space-y-3">
                {slots.map(slot => (
                  <div 
                    key={slot.id} 
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                  >
                    <div>
                      <p className="font-medium">{slot.title}</p>
                      <p className="text-sm text-gray-600">
                        {format(slot.date, 'MMM d, yyyy')} • {slot.startTime} - {slot.endTime}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleRemoveSlot(slot.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2" />
              Meeting Requests
            </h2>
            
            {requests.length === 0 ? (
              <p className="text-gray-500 text-sm">No meeting requests.</p>
            ) : (
              <div className="space-y-3">
                {requests.map(request => (
                  <div 
                    key={request.id} 
                    className="p-3 border rounded-lg"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">{request.title}</p>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {request.sender} • {format(request.date, 'MMM d, yyyy')} • {request.startTime} - {request.endTime}
                    </p>
                    
                    {request.status === 'pending' && (
                      <div className="flex space-x-2 mt-2">
                        <button 
                          onClick={() => handleAcceptRequest(request.id)}
                          className="flex-1 bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded flex items-center justify-center"
                        >
                          <Check className="w-3 h-3 mr-1" /> Accept
                        </button>
                        <button 
                          onClick={() => handleDeclineRequest(request.id)}
                          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded flex items-center justify-center"
                        >
                          <X className="w-3 h-3 mr-1" /> Decline
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Availability Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Availability Slot</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={format(newSlot.date, 'yyyy-MM-dd')}
                    onChange={(e) => setNewSlot({...newSlot, date: new Date(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                    <input
                      type="time"
                      value={newSlot.startTime}
                      onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                    <input
                      type="time"
                      value={newSlot.endTime}
                      onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newSlot.title}
                    onChange={(e) => setNewSlot({...newSlot, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Available"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddSlot(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  onClick={handleAddSlot}
                >
                  Add Slot
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};