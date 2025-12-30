import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  PieChart,
  Filter,
  Search,
  PlusCircle,
  Calendar,
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
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import { EntrepreneurCard } from '../../components/entrepreneur/EntrepreneurCard';
import { useAuth } from '../../context/AuthContext';
import { Entrepreneur } from '../../types';
import { entrepreneurs } from '../../data/users';
import { getRequestsFromInvestor } from '../../data/collaborationRequests';

export const InvestorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  if (!user) return null;

  // Get collaboration requests sent by this investor
  const sentRequests = getRequestsFromInvestor(user.id);
  const requestedEntrepreneurIds = sentRequests.map(req => req.entrepreneurId);

  // Filter entrepreneurs based on search and industry filters
  const filteredEntrepreneurs = entrepreneurs.filter(entrepreneur => {
    // Search filter
    const matchesSearch = searchQuery === '' ||
      entrepreneur.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.startupName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entrepreneur.pitchSummary.toLowerCase().includes(searchQuery.toLowerCase());

    // Industry filter
    const matchesIndustry = selectedIndustries.length === 0 ||
      selectedIndustries.includes(entrepreneur.industry);

    return matchesSearch && matchesIndustry;
  });

  // Get unique industries for filter
  const industries = Array.from(new Set(entrepreneurs.map(e => e.industry)));

  // Toggle industry selection
  const toggleIndustry = (industry: string) => {
    setSelectedIndustries(prevSelected =>
      prevSelected.includes(industry)
        ? prevSelected.filter(i => i !== industry)
        : [...prevSelected, industry]
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discover Startups</h1>
          <p className="text-gray-600">Find and connect with promising entrepreneurs</p>
        </div>

        <Link to="/entrepreneurs">
          <Button
            leftIcon={<PlusCircle size={18} />}
          >
            View All Startups
          </Button>
        </Link>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search startups, industries, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            startAdornment={<Search size={18} />}
          />
        </div>

        <div className="w-full md:w-1/3">
          <div className="flex items-center space-x-2">
            <Filter size={18} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by:</span>

            <div className="flex flex-wrap gap-2">
              {industries.map(industry => (
                <Badge
                  key={industry}
                  variant={selectedIndustries.includes(industry) ? 'primary' : 'gray'}
                  className="cursor-pointer"
                  onClick={() => toggleIndustry(industry)}
                >
                  {industry}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Card className="bg-primary-50 border border-primary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-primary-100 rounded-full mr-4">
                <Users size={20} className="text-primary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-primary-700">Total Startups</p>
                <h3 className="text-xl font-semibold text-primary-900">{entrepreneurs.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary-50 border border-secondary-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-secondary-100 rounded-full mr-4">
                <PieChart size={20} className="text-secondary-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-secondary-700">Industries</p>
                <h3 className="text-xl font-semibold text-secondary-900">{industries.length}</h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-accent-50 border border-accent-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-accent-100 rounded-full mr-4">
                <Users size={20} className="text-accent-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-accent-700">Your Connections</p>
                <h3 className="text-xl font-semibold text-accent-900">
                  {sentRequests.filter(req => req.status === 'accepted').length}
                </h3>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-success-50 border border-success-100">
          <CardBody>
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full mr-4">
                <Calendar size={20} className="text-success-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-success-700">Upcoming Meetings</p>
                <h3 className="text-xl font-semibold text-success-900">3</h3>
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
                <p className="text-sm font-medium text-warning-700">Pending Deals</p>
                <h3 className="text-xl font-semibold text-warning-900">2</h3>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entrepreneurs grid */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Featured Startups</h2>
            </CardHeader>

            <CardBody>
              {filteredEntrepreneurs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredEntrepreneurs.map(entrepreneur => (
                    <EntrepreneurCard
                      key={entrepreneur.id}
                      entrepreneur={entrepreneur}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600">No startups match your filters</p>
                  <Button
                    variant="outline"
                    className="mt-2"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedIndustries([]);
                    }}
                  >
                    Clear filters
                  </Button>
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

        {/* Sidebar with additional information */}
        <div className="space-y-4">
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
                    <p className="text-xs text-gray-500">with TechStart on Jan 16, 2:00 PM</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-green-100 rounded-full mr-3">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Deal approved</p>
                    <p className="text-xs text-gray-500">Investment agreement signed</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="p-2 bg-purple-100 rounded-full mr-3">
                    <CreditCard size={16} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Payment processed</p>
                    <p className="text-xs text-gray-500">$50,000 investment sent</p>
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
                  <span className="text-xs text-gray-500">Today, 10:30 AM</span>
                </div>
                <Link to="/security">
                  <Button variant="outline" fullWidth className="mt-2">
                    Review Security
                  </Button>
                </Link>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-medium text-gray-900">Upcoming Meetings</h2>
            </CardHeader>

            <CardBody>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">TechStart Pitch</p>
                    <p className="text-xs text-gray-500">Jan 16, 2:00 PM</p>
                  </div>
                  <Badge variant="primary">Scheduled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Innovation Labs</p>
                    <p className="text-xs text-gray-500">Jan 18, 10:00 AM</p>
                  </div>
                  <Badge variant="primary">Scheduled</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">GreenTech Solutions</p>
                    <p className="text-xs text-gray-500">Jan 20, 11:30 AM</p>
                  </div>
                  <Badge variant="primary">Scheduled</Badge>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};