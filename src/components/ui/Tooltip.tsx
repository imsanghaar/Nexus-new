import React, { useState, useEffect, useRef } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  show?: boolean;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({ 
  children, 
  content, 
  position = 'top',
  show: propShow,
  delay = 0
}) => {
  const [show, setShow] = useState(false);
  const [internalShow, setInternalShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (propShow !== undefined) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (propShow) {
        timeoutRef.current = setTimeout(() => {
          setInternalShow(true);
          setShow(true);
        }, delay);
      } else {
        timeoutRef.current = setTimeout(() => {
          setShow(false);
          setTimeout(() => setInternalShow(false), 150); // Allow for fade out
        }, 150);
      }
    }
  }, [propShow, delay]);

  const handleMouseEnter = () => {
    if (propShow === undefined) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setInternalShow(true);
      setShow(true);
    }
  };

  const handleMouseLeave = () => {
    if (propShow === undefined) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setShow(false);
        setTimeout(() => setInternalShow(false), 150);
      }, 150);
    }
  };

  // Position classes
  const positionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div 
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {(show || internalShow) && (
        <div 
          className={`
            absolute z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-lg
            transition-opacity duration-150 ${positionClasses[position]}
            ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}
        >
          {content}
          <div className={`
            absolute w-0 h-0 border-8 border-transparent
            ${position === 'top' ? 'top-full left-1/2 transform -translate-x-1/2 border-t-gray-900' : ''}
            ${position === 'bottom' ? 'bottom-full left-1/2 transform -translate-x-1/2 border-b-gray-900' : ''}
            ${position === 'left' ? 'right-full top-1/2 transform -translate-y-1/2 border-l-gray-900' : ''}
            ${position === 'right' ? 'left-full top-1/2 transform -translate-y-1/2 border-r-gray-900' : ''}
          `}></div>
        </div>
      )}
    </div>
  );
};