import React, { useState, useEffect } from 'react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  const [score, setScore] = useState<number>(0);
  const [strength, setStrength] = useState<string>('');

  useEffect(() => {
    calculatePasswordStrength(password);
  }, [password]);

  const calculatePasswordStrength = (password: string) => {
    let score = 0;

    // Criteria for password strength
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    setScore(score);

    // Determine strength level
    if (score <= 1) {
      setStrength('Very Weak');
    } else if (score === 2) {
      setStrength('Weak');
    } else if (score === 3) {
      setStrength('Medium');
    } else if (score === 4) {
      setStrength('Strong');
    } else if (score >= 5) {
      setStrength('Very Strong');
    }
  };

  const getStrengthColor = () => {
    if (score <= 1) return 'bg-red-500';
    if (score === 2) return 'bg-orange-500';
    if (score === 3) return 'bg-yellow-500';
    if (score === 4) return 'bg-green-500';
    return 'bg-green-600';
  };

  const getStrengthWidth = () => {
    if (score === 0) return '0%';
    if (score === 1) return '20%';
    if (score === 2) return '40%';
    if (score === 3) return '60%';
    if (score === 4) return '80%';
    return '100%';
  };

  return (
    <div className="space-y-2">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
          style={{ width: getStrengthWidth() }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <span>Very Weak</span>
        <span>Very Strong</span>
      </div>
      <p className={`text-sm font-medium ${
        score <= 1 ? 'text-red-600' :
        score === 2 ? 'text-orange-600' :
        score === 3 ? 'text-yellow-600' :
        'text-green-600'
      }`}>
        Password Strength: {strength}
      </p>
    </div>
  );
};