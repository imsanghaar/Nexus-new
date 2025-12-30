import React, { useRef, useEffect, useState } from 'react';

interface SignaturePadProps {
  onSignatureChange?: (signature: string) => void;
  width?: number;
  height?: number;
  className?: string;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ 
  onSignatureChange, 
  width = 400, 
  height = 200,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signature, setSignature] = useState<string>('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Set drawing styles
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.lineWidth = 2;
    context.strokeStyle = '#1e40af'; // primary-700
  }, [width, height]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    setIsDrawing(true);
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.nativeEvent.offsetX;
      clientY = e.nativeEvent.offsetY;
    }

    context.beginPath();
    context.moveTo(clientX, clientY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
      clientY = e.touches[0].clientY - canvas.getBoundingClientRect().top;
    } else {
      clientX = e.nativeEvent.offsetX;
      clientY = e.nativeEvent.offsetY;
    }

    context.lineTo(clientX, clientY);
    context.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.closePath();
    setIsDrawing(false);
    
    // Get the signature as data URL
    const signatureData = canvas.toDataURL('image/png');
    setSignature(signatureData);
    
    if (onSignatureChange) {
      onSignatureChange(signatureData);
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setSignature('');
    if (onSignatureChange) {
      onSignatureChange('');
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-full bg-white cursor-crosshair"
          style={{ width: `${width}px`, height: `${height}px` }}
        />
      </div>
      
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Draw your signature above
        </p>
        <button
          type="button"
          onClick={clearSignature}
          className="text-sm text-primary-600 hover:text-primary-800 font-medium"
        >
          Clear Signature
        </button>
      </div>
      
      {signature && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Signature Preview:</p>
          <img 
            src={signature} 
            alt="Signature preview" 
            className="border border-gray-200 rounded p-2 bg-white"
          />
        </div>
      )}
    </div>
  );
};