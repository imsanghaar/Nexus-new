import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { Button } from './Button';

interface Step {
  target: string;
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

interface WalkthroughProps {
  steps: Step[];
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export const Walkthrough: React.FC<WalkthroughProps> = ({ 
  steps, 
  isOpen, 
  onClose, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const goToPrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
    if (onComplete) {
      onComplete();
    }
  };

  if (!isOpen || !isMounted) {
    return null;
  }

  const current = steps[currentStep];
  const totalSteps = steps.length;

  // Find the target element to position the tooltip
  const targetElement = document.querySelector(current.target) as HTMLElement;
  let positionStyle: React.CSSProperties = {};

  if (targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    switch (current.placement) {
      case 'top':
        positionStyle = {
          top: `${rect.top + scrollTop - 200}px`,
          left: `${rect.left + scrollLeft + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
        break;
      case 'bottom':
        positionStyle = {
          top: `${rect.bottom + scrollTop + 20}px`,
          left: `${rect.left + scrollLeft + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
        break;
      case 'left':
        positionStyle = {
          top: `${rect.top + scrollTop + rect.height / 2}px`,
          left: `${rect.left + scrollLeft - 320}px`,
          transform: 'translateY(-50%)',
        };
        break;
      case 'right':
        positionStyle = {
          top: `${rect.top + scrollTop + rect.height / 2}px`,
          left: `${rect.right + scrollLeft + 20}px`,
          transform: 'translateY(-50%)',
        };
        break;
      default:
        positionStyle = {
          top: `${rect.top + scrollTop - 200}px`,
          left: `${rect.left + scrollLeft + rect.width / 2}px`,
          transform: 'translateX(-50%)',
        };
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={handleClose}
      />
      
      {/* Tooltip */}
      <div 
        className="absolute bg-white rounded-lg shadow-xl p-6 max-w-md w-full border border-gray-200"
        style={positionStyle}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{current.title}</h3>
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{current.content}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {totalSteps}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={goToPrev}
              disabled={currentStep === 0}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
            >
              Back
            </Button>
            
            <Button 
              variant="primary" 
              size="sm"
              onClick={goToNext}
              rightIcon={
                currentStep === totalSteps - 1 ? null : <ArrowRight className="w-4 h-4" />
              }
            >
              {currentStep === totalSteps - 1 ? 'Finish' : 'Next'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};