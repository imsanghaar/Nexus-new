import React, { useState } from 'react';
import { Shield, Key, Lock, Eye, EyeOff, Smartphone, Mail, User, CheckCircle, AlertCircle } from 'lucide-react';
import { PasswordStrengthMeter } from '../../components/ui/PasswordStrengthMeter';
import { TwoFactorInput } from '../../components/ui/TwoFactorInput';
import { Button } from '../../components/ui/Button';

export const SecurityPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [backupCodes, setBackupCodes] = useState<string[]>([]);
  const [showBackupCodes, setShowBackupCodes] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([
    { id: '1', question: 'What was your first pet\'s name?', answer: '' },
    { id: '2', question: 'What city were you born in?', answer: '' },
    { id: '3', question: 'What is your mother\'s maiden name?', answer: '' },
  ]);
  const [loginHistory, setLoginHistory] = useState([
    { id: '1', date: new Date(Date.now() - 3600000), ip: '192.168.1.100', device: 'Chrome on Windows', location: 'New York, US', status: 'success' },
    { id: '2', date: new Date(Date.now() - 86400000), ip: '104.28.29.100', device: 'Safari on iPhone', location: 'London, UK', status: 'success' },
    { id: '3', date: new Date(Date.now() - 172800000), ip: '203.0.113.45', device: 'Firefox on Linux', location: 'Tokyo, Japan', status: 'failed' },
  ]);

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('New password and confirmation do not match');
      return;
    }
    
    if (newPassword.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    // In a real app, this would send the data to the server
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleEnableTwoFactor = () => {
    setTwoFactorEnabled(true);
    // Generate backup codes
    const codes = Array.from({ length: 10 }, () => 
      Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')
    );
    setBackupCodes(codes);
  };

  const handleDisableTwoFactor = () => {
    setTwoFactorEnabled(false);
    setBackupCodes([]);
  };

  const handleSecurityQuestionChange = (id: string, answer: string) => {
    setSecurityQuestions(securityQuestions.map(q => 
      q.id === id ? { ...q, answer } : q
    ));
  };

  const handleSaveSecurityQuestions = () => {
    // In a real app, this would save the questions to the server
    alert('Security questions saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Security Settings</h1>
        <div className="flex items-center text-green-600">
          <Shield className="w-5 h-5 mr-1" />
          <span className="text-sm">Account Secured</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Change Password */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2" />
              Change Password
            </h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
                <PasswordStrengthMeter password={newPassword} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                  </button>
                </div>
              </div>
              
              <Button type="submit" variant="primary" className="mt-4">
                Update Password
              </Button>
            </form>
          </div>

          {/* Two-Factor Authentication */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                  <Smartphone className="w-5 h-5 mr-2" />
                  Two-Factor Authentication
                </h2>
                <p className="text-sm text-gray-600">
                  Add an extra layer of security to your account
                </p>
              </div>
              <Button 
                variant={twoFactorEnabled ? "error" : "primary"} 
                onClick={twoFactorEnabled ? handleDisableTwoFactor : handleEnableTwoFactor}
              >
                {twoFactorEnabled ? 'Disable' : 'Enable'}
              </Button>
            </div>
            
            {twoFactorEnabled ? (
              <div className="mt-4 space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-800 mb-2">Authentication App Setup</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Scan the QR code below with your authenticator app (Google Authenticator, Authy, etc.)
                  </p>
                  <div className="flex justify-center mb-3">
                    <div className="bg-white p-2 rounded border-2 border-dashed border-gray-300 w-48 h-48 flex items-center justify-center">
                      <div className="text-center">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 mx-auto mb-2" />
                        <p className="text-xs text-gray-500">QR Code Placeholder</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 text-center">
                    Secret Key: ABCD EFGH IJKL MNOP QRST UVWX YZ12 3456
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Verify Setup</label>
                  <TwoFactorInput 
                    onCodeComplete={(code) => console.log('Verification code:', code)}
                    label="Enter the 6-digit code from your authenticator app"
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">Backup Codes</h3>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowBackupCodes(!showBackupCodes)}
                    >
                      {showBackupCodes ? 'Hide' : 'Show'} Codes
                    </Button>
                  </div>
                  {showBackupCodes && (
                    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-600 mb-2">
                        Store these backup codes securely. You can use them to access your account if you lose your phone.
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {backupCodes.map((code, index) => (
                          <div key={index} className="font-mono text-sm bg-white p-2 rounded border text-center">
                            {code}
                          </div>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-3"
                        onClick={() => {
                          // In a real app, this would download the codes
                          alert('Backup codes copied to clipboard!');
                        }}
                      >
                        Copy to Clipboard
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  Two-factor authentication adds an extra layer of security to your account by requiring a second form of verification in addition to your password.
                </p>
              </div>
            )}
          </div>

          {/* Security Questions */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Key className="w-5 h-5 mr-2" />
              Security Questions
            </h2>
            
            <div className="space-y-4">
              {securityQuestions.map((question) => (
                <div key={question.id}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{question.question}</label>
                  <input
                    type="text"
                    value={question.answer}
                    onChange={(e) => handleSecurityQuestionChange(question.id, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Your answer"
                  />
                </div>
              ))}
              
              <Button 
                variant="primary" 
                onClick={handleSaveSecurityQuestions}
                className="mt-2"
              >
                Save Security Questions
              </Button>
            </div>
          </div>
        </div>

        {/* Login History and Account Activity */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2" />
              Recent Login Activity
            </h2>
            
            <div className="space-y-3">
              {loginHistory.map((login) => (
                <div key={login.id} className="p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">
                      {login.date.toLocaleDateString()} • {login.date.toLocaleTimeString()}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      login.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {login.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{login.device}</p>
                  <p className="text-xs text-gray-600">{login.location} • {login.ip}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Security Tips
            </h2>
            
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Use a unique, strong password for your account</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Enable two-factor authentication</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Don't share your account credentials</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Review your login activity regularly</span>
              </li>
              <li className="flex items-start">
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Update your recovery options</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};