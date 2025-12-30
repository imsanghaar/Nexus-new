import React, { useState } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Monitor, User } from 'lucide-react';
import { VideoCall } from '../../components/ui/VideoCall';
import { Button } from '../../components/ui/Button';

export const VideoCallPage: React.FC = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [callHistory, setCallHistory] = useState([
    { id: '1', participant: 'John Doe', date: new Date(Date.now() - 86400000), duration: '24:15', type: 'outgoing' },
    { id: '2', participant: 'Jane Smith', date: new Date(Date.now() - 172800000), duration: '15:30', type: 'incoming' },
    { id: '3', participant: 'Robert Johnson', date: new Date(Date.now() - 259200000), duration: '45:20', type: 'outgoing' },
  ]);

  const handleStartCall = () => {
    setIsCallActive(true);
  };

  const handleEndCall = () => {
    setIsCallActive(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Video Calling</h1>
        {!isCallActive && (
          <Button 
            variant="primary" 
            onClick={handleStartCall}
            leftIcon={<Phone className="w-4 h-4" />}
          >
            Start Call
          </Button>
        )}
      </div>

      {isCallActive ? (
        <div className="space-y-6">
          <VideoCall 
            onCallEnd={handleEndCall} 
            participantName="John Doe" 
          />
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Call Controls</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary">
                <Mic className="w-4 h-4 mr-2" />
                Mute Audio
              </Button>
              <Button variant="secondary">
                <Video className="w-4 h-4 mr-2" />
                Stop Video
              </Button>
              <Button variant="secondary">
                <Monitor className="w-4 h-4 mr-2" />
                Share Screen
              </Button>
              <Button 
                variant="error" 
                onClick={handleEndCall}
                leftIcon={<PhoneOff className="w-4 h-4" />}
              >
                End Call
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Start a New Call</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Enter Participant Name</label>
                  <input
                    type="text"
                    placeholder="Enter name or email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Call Type</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input type="radio" name="call-type" value="audio" className="mr-2" defaultChecked />
                        <span>Audio Call</span>
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="call-type" value="video" className="mr-2" />
                        <span>Video Call</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-6">
                    <Button variant="primary" onClick={handleStartCall}>
                      <Phone className="w-4 h-4 mr-2" />
                      Start Call
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Calls</h2>
              
              <div className="space-y-3">
                {callHistory.map(call => (
                  <div key={call.id} className="flex items-center p-3 border rounded-lg hover:bg-gray-50">
                    <div className={`p-2 rounded-full mr-3 ${
                      call.type === 'outgoing' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                    }`}>
                      {call.type === 'outgoing' ? <Phone className="w-4 h-4" /> : <Phone className="w-4 h-4 rotate-180" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{call.participant}</p>
                      <p className="text-sm text-gray-500">
                        {call.date.toLocaleDateString()} • {call.duration}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow mt-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Participants</h2>
              
              <div className="space-y-3">
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-3" />
                  <div>
                    <p className="font-medium">Jane Smith</p>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};