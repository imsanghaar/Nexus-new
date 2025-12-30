import React, { useState, useEffect } from 'react';
import { Walkthrough } from '../components/ui/Walkthrough';

interface WalkthroughProviderProps {
  children: React.ReactNode;
}

export const WalkthroughProvider: React.FC<WalkthroughProviderProps> = ({ children }) => {
  const [walkthroughOpen, setWalkthroughOpen] = useState(false);
  const [walkthroughSteps, setWalkthroughSteps] = useState<any[]>([]);
  const [walkthroughTitle, setWalkthroughTitle] = useState('');

  // Function to start a walkthrough
  const startWalkthrough = (steps: any[], title: string = 'Feature Walkthrough') => {
    setWalkthroughSteps(steps);
    setWalkthroughTitle(title);
    setWalkthroughOpen(true);
  };

  // Context value to provide to children
  const walkthroughContext = {
    startWalkthrough,
  };

  return (
    <div>
      {React.cloneElement(children as React.ReactElement, { walkthroughContext })}
      <Walkthrough 
        steps={walkthroughSteps} 
        isOpen={walkthroughOpen} 
        onClose={() => setWalkthroughOpen(false)} 
      />
    </div>
  );
};