import React, { useState } from 'react';
import { CreditCard, DollarSign, TrendingUp, TrendingDown, Wallet, Users, Send, Download } from 'lucide-react';
import { PaymentForm } from '../../components/ui/PaymentForm';
import { TransactionHistory } from '../../components/ui/TransactionHistory';
import { Button } from '../../components/ui/Button';

interface Transaction {
  id: string;
  amount: number;
  sender: string;
  receiver: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  date: Date;
  type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
  description?: string;
}

export const PaymentPage: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState<number>(5420.75);
  const [transactions, setTransactions] = useState<Transaction[]>([
    { 
      id: '1', 
      amount: 1250.00, 
      sender: 'John Doe', 
      receiver: 'Your Wallet', 
      status: 'completed', 
      date: new Date(Date.now() - 86400000), 
      type: 'deposit',
      description: 'Initial deposit'
    },
    { 
      id: '2', 
      amount: -450.50, 
      sender: 'Your Wallet', 
      receiver: 'Jane Smith', 
      status: 'completed', 
      date: new Date(Date.now() - 172800000), 
      type: 'transfer',
      description: 'Project payment'
    },
    { 
      id: '3', 
      amount: -120.00, 
      sender: 'Your Wallet', 
      receiver: 'Robert Johnson', 
      status: 'completed', 
      date: new Date(Date.now() - 259200000), 
      type: 'payment',
      description: 'Service fee'
    },
    { 
      id: '4', 
      amount: 800.00, 
      sender: 'Alice Brown', 
      receiver: 'Your Wallet', 
      status: 'completed', 
      date: new Date(Date.now() - 345600000), 
      type: 'payment',
      description: 'Investment return'
    },
  ]);
  
  const [activeTab, setActiveTab] = useState<'send' | 'receive' | 'history'>('send');
  const [recipients] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Robert Johnson' },
    { id: '4', name: 'Alice Brown' },
  ]);

  const handlePaymentSubmit = (paymentData: {
    amount: number;
    recipient: string;
    description: string;
    paymentMethod: string;
  }) => {
    const recipient = recipients.find(r => r.id === paymentData.recipient)?.name || 'Unknown';
    
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: -paymentData.amount,
      sender: 'Your Wallet',
      receiver: recipient,
      status: 'completed',
      date: new Date(),
      type: 'transfer',
      description: paymentData.description
    };
    
    setTransactions([newTransaction, ...transactions]);
    setWalletBalance(prev => prev - paymentData.amount);
    
    // Reset form
    setActiveTab('history');
  };

  const handleDeposit = (amount: number) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: amount,
      sender: 'External',
      receiver: 'Your Wallet',
      status: 'completed',
      date: new Date(),
      type: 'deposit',
      description: 'Deposit'
    };
    
    setTransactions([newTransaction, ...transactions]);
    setWalletBalance(prev => prev + amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payment System</h1>
        <Button variant="primary" leftIcon={<Download className="w-4 h-4" />}>
          Export Transactions
        </Button>
      </div>

      {/* Wallet Balance Card */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg shadow p-6 text-white">
          <div className="flex items-center">
            <Wallet className="h-8 w-8 mr-3" />
            <div>
              <p className="text-sm opacity-80">Wallet Balance</p>
              <p className="text-2xl font-bold">${walletBalance.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Received</p>
              <p className="text-2xl font-bold text-gray-900">
                ${transactions
                  .filter(t => t.amount > 0)
                  .reduce((sum, t) => sum + t.amount, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Total Sent</p>
              <p className="text-2xl font-bold text-gray-900">
                ${Math.abs(
                  transactions
                    .filter(t => t.amount < 0)
                    .reduce((sum, t) => sum + t.amount, 0)
                ).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow border">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Active Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {transactions.filter(t => t.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('send')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'send'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Send className="w-4 h-4 inline mr-2" />
              Send Payment
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'receive'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <DollarSign className="w-4 h-4 inline mr-2" />
              Receive Payment
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'history'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Transaction History
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'send' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Send Payment</h2>
                <PaymentForm 
                  onSubmit={handlePaymentSubmit}
                  recipients={recipients}
                />
              </div>
              
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Deposit Funds</h3>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        placeholder="Amount"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                      <Button 
                        variant="primary"
                        onClick={() => handleDeposit(500)}
                      >
                        Add $500
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-800 mb-2">Recent Recipients</h3>
                    <div className="space-y-2">
                      {recipients.slice(0, 3).map(recipient => (
                        <div key={recipient.id} className="flex justify-between items-center p-2 hover:bg-gray-100 rounded">
                          <span>{recipient.name}</span>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setActiveTab('send');
                              // In a real app, this would prefill the form
                            }}
                          >
                            Send
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'receive' && (
            <div className="text-center py-12">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Receive Payment</h2>
              <p className="text-gray-600 mb-6">Generate a payment request link to receive funds</p>
              
              <div className="max-w-md mx-auto bg-gray-50 p-6 rounded-lg">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Request Amount</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <input
                    type="text"
                    placeholder="Payment for services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <Button variant="primary" fullWidth>
                  Generate Payment Link
                </Button>
                
                <div className="mt-6 p-4 bg-white border rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Your Payment Link:</p>
                  <p className="font-mono text-sm bg-gray-100 p-2 rounded break-all">
                    https://nexus-pay.com/request/abc123
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" fullWidth>
                    Copy Link
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'history' && (
            <TransactionHistory transactions={transactions} />
          )}
        </div>
      </div>
    </div>
  );
};