import React, { useState, useRef, useEffect } from 'react';

interface VideoCallProps {
  onCallEnd: () => void;
  participantName?: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({ onCallEnd, participantName = 'Participant' }) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isConnected, setIsConnected] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // Simulate connection after 2 seconds
  useEffect(() => {
    const connectTimer = setTimeout(() => {
      setIsConnected(true);
    }, 2000);
    
    return () => clearTimeout(connectTimer);
  }, []);
  
  // Simulate call duration timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isConnected) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isConnected]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };
  
  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
  };
  
  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
  };
  
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-96 bg-gray-800 flex items-center justify-center">
        {/* Remote video (simulated) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-700 w-full h-full flex items-center justify-center">
            {isConnected ? (
              <div className="text-center">
                <div className="bg-gray-600 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-2" />
                <p className="text-white text-lg">{participantName}</p>
                {!isVideoOn && <p className="text-gray-400 text-sm mt-2">Video is off</p>}
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Connecting to {participantName}...</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Local video (simulated) */}
        <div className="absolute bottom-4 right-4 w-40 h-32 bg-gray-600 rounded-lg border-2 border-white flex items-center justify-center">
          <div className="text-center">
            <div className="bg-gray-500 border-2 border-dashed rounded-xl w-12 h-12 mx-auto mb-1" />
            <p className="text-white text-xs">You</p>
            {!isVideoOn && <p className="text-gray-300 text-xs mt-1">Your video is off</p>}
          </div>
        </div>
        
        {/* Call duration */}
        {isConnected && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
            {formatTime(callDuration)}
          </div>
        )}
      </div>
      
      {/* Call controls */}
      <div className="bg-gray-800 p-4">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleAudio}
            className={`p-3 rounded-full ${
              isAudioOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
            title={isAudioOn ? 'Mute' : 'Unmute'}
          >
            {isAudioOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={toggleVideo}
            className={`p-3 rounded-full ${
              isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white transition-colors`}
            title={isVideoOn ? 'Stop Video' : 'Start Video'}
          >
            {isVideoOn ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
            )}
          </button>
          
          <button
            onClick={toggleScreenShare}
            className={`p-3 rounded-full ${
              isScreenSharing ? 'bg-primary-600' : 'bg-gray-600 hover:bg-gray-700'
            } text-white transition-colors`}
            title={isScreenSharing ? 'Stop Screen Share' : 'Start Screen Share'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </button>
          
          <button
            onClick={onCallEnd}
            className="p-4 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
            title="End Call"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};