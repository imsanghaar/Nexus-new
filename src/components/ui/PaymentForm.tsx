import React, { useState } from 'react';
import { Button } from './Button';

interface PaymentFormProps {
  onSubmit: (paymentData: {
    amount: number;
    recipient: string;
    description: string;
    paymentMethod: string;
  }) => void;
  recipients?: { id: string; name: string }[];
  defaultAmount?: number;
  defaultRecipient?: string;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ 
  onSubmit, 
  recipients = [],
  defaultAmount = 0,
  defaultRecipient = ''
}) => {
  const [amount, setAmount] = useState<string>(defaultAmount.toString());
  const [recipient, setRecipient] = useState<string>(defaultRecipient);
  const [description, setDescription] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    } else if (isNaN(parseFloat(amount))) {
      newErrors.amount = 'Amount must be a valid number';
    }
    
    if (!recipient) {
      newErrors.recipient = 'Recipient is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        amount: parseFloat(amount),
        recipient,
        description,
        paymentMethod
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
          Amount ($)
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
            errors.amount ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="0.00"
          min="0.01"
          step="0.01"
        />
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      <div>
        <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-1">
          Recipient
        </label>
        <select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
            errors.recipient ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Select a recipient</option>
          {recipients.map(recipient => (
            <option key={recipient.id} value={recipient.id}>
              {recipient.name}
            </option>
          ))}
        </select>
        {errors.recipient && <p className="mt-1 text-sm text-red-600">{errors.recipient}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Enter payment description"
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Payment Method
        </label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setPaymentMethod('card')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              paymentMethod === 'card' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod('bank')}
            className={`flex items-center justify-center p-3 border rounded-md ${
              paymentMethod === 'bank' 
                ? 'border-primary-500 bg-primary-50' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Bank Transfer
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Button type="submit" variant="primary" fullWidth>
          Process Payment
        </Button>
      </div>
    </form>
  );
};