import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Bell,
  Calendar,
  TrendingUp,
  AlertCircle,
  PlusCircle,
  Video,
  FileText,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CollaborationRequestCard } from '../../components/collaboration/CollaborationRequestCard';
import { InvestorCard } from '../../components/investor/InvestorCard';
import { useAuth } from '../../context/AuthContext';
import { CollaborationRequest } from '../../types';
import { getRequestsForEntrepreneur } from '../../data/collaborationRequests';
import { investors } from '../../data/users';

export const EntrepreneurDashboard: React.FC = () => {
  const { user } = useAuth();
  const [collaborationRequests, setCollaborationRequests] = useState<CollaborationRequest[]>([]);
  const [recommendedInvestors, setRecommendedInvestors] = useState(investors.slice(0, 3));
  const [upcomingMeetings, setUpcomingMeetings] = useState(2);
  const [pendingDocuments, setPendingDocuments] = useState(3);
  const [walletBalance, setWalletBalance] = useState(5420.75);

  useEffect(() => {
    if (user) {
      // Load collaboration requests
      const requests = getRequestsForEntrepreneur(user.id);
      setCollaborationRequests(requests);
    }
  }, [user]);

  const handleRequestStatusUpdate = (requestId: string, status: 'accepted' | 'rejected') => {
    setCollaborationRequests(prevRequests =>
      prevRequests.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  if (!user) return null;

  const pendingRequests = collaborationRequests.filter(req => req.status === 'pending');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}</h1>
          <p className="text-gray-600">Here's what's happening with your startup today</p>
        </div>

        <Link to="/investors">
          <Button
            leftIcon={<PlusCircle size={18} />}
          >
            Find Investors
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Bell size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Pending Requests</p>
                <h3 className="text-xl font-semibold text-primary-900">{pendingRequests.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <Users size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Total Connections</p>
                <h3 className="text-xl font-semibold text-secondary-900">
                  {collaborationRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Calendar size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Upcoming Meetings</p>
                <h3 className="text-xl font-semibold text-accent-900">{upcomingMeetings}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <TrendingUp size={20} className="text-success-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">Wallet Balance</p>
                <h3 className="text-xl font-semibold text-success-900">${walletBalance.toFixed(2)}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-warning-50 border border-warning-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full mr-4">
                <FileText size={20} className="text-warning-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-warning-700">Pending Documents</p>
                <h3 className="text-xl font-semibold text-warning-900">{pendingDocuments}</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collaboration requests */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Collaboration Requests</h2>
              <Badge variant="primary">{pendingRequests.length} pending</Badge>
            </CardHeader>

            <CardBody>
              {collaborationRequests.length > 0 ? (
                <div className="space-y-4">
                  {collaborationRequests.map(request => (
                    <CollaborationRequestCard
                      key={request.id}
                      request={request}
                      onStatusUpdate={handleRequestStatusUpdate}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <AlertCircle size={24} className="text-gray-500" />
                  </div>
                  <p className="text-gray-600">No collaboration requests yet</p>
                  <p className="text-sm text-gray-500 mt-1">When investors are interested in your startup, their requests will appear here</p>
                </div>
              )}
            </CardBody>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Quick Actions</h2>
            </CardHeader>

            <CardBody>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/calendar">
                  <Button variant="outline" fullWidth leftIcon={<Calendar size={16} />}>
                    Schedule Meeting
                  </Button>
                </Link>
                <Link to="/videocall">
                  <Button variant="outline" fullWidth leftIcon={<Video size={16} />}>
                    Start Video Call
                  </Button>
                </Link>
                <Link to="/document-chamber">
                  <Button variant="outline" fullWidth leftIcon={<FileText size={16} />}>
                    Process Documents
                  </Button>
                </Link>
                <Link to="/payment">
                  <Button variant="outline" fullWidth leftIcon={<CreditCard size={16} />}>
                    Process Payment
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Recommended investors and other features */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Recommended Investors</h2>
              <Link to="/investors" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all
              </Link>
            </CardHeader>

            <CardBody className="space-y-4">
              {recommendedInvestors.map(investor => (
                <InvestorCard
                  key={investor.id}
                  investor={investor}
                  showActions={false}
                />
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            </CardHeader>

            <CardBody>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="p-2 bg-blue-100 rounded-full mr-3">
                    <Calendar size={16} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Meeting scheduled</p>
                    <p className="text-xs text-gray-500">with John Smith on Jan 15, 10:00 AM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Document signed</p>
                    <p className="text-xs text-gray-500">Investment agreement completed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <CreditCard size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500">$1,250.00 from Jane Doe</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-yellow-100 rounded-full mr-3">
                    <Shield size={16} className="text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Security updated</p>
                    <p className="text-xs text-gray-500">Two-factor authentication enabled</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Security Status</h2>
            </CardHeader>

            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Password Strength</span>
                  <Badge variant="success">Strong</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Two-Factor Auth</span>
                  <Badge variant="success">Enabled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Last Login</span>
                  <span className="text-xs text-gray-500">Today, 09:15 AM</span>
                </div>
                <Link to="/security">
                  <Button variant="outline" fullWidth className="mt-2">
                    Review Security
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};