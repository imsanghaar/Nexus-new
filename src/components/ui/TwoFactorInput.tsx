import React, { useState, useRef, useEffect } from 'react';

interface TwoFactorInputProps {
  onCodeComplete: (code: string) => void;
  length?: number;
  label?: string;
}

export const TwoFactorInput: React.FC<TwoFactorInputProps> = ({ 
  onCodeComplete, 
  length = 6,
  label = 'Enter 6-digit code'
}) => {
  const [digits, setDigits] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const code = digits.join('');
    if (code.length === length) {
      onCodeComplete(code);
    }
  }, [digits, length, onCodeComplete]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value) || value === '') {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Move to next input if a digit is entered
      if (value && index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to previous input on backspace if current is empty
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    
    if (pastedData.length === length) {
      const newDigits = pastedData.split('').slice(0, length);
      setDigits(newDigits);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex space-x-3 justify-center">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            className="w-12 h-14 text-2xl text-center border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
          />
        ))}
      </div>
    </div>
  );
};