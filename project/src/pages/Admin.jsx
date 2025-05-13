import React, { useState, useEffect } from 'react';
import { BarChart, Users, Package, Settings, MessageSquare, LogOut, Edit, Trash2, Plus, Menu, X } from 'lucide-react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPredictions: 0,
    recentUsers: [],
    recentPredictions: [],
    adminDetails: null
  });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is logged in and is admin
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    
    // Redirect to login page
    navigate('/login');
  };

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      // Fetch total users and recent users
      const usersResponse = await fetch('http://localhost:3001/api/admin/users');
      const usersData = await usersResponse.json();

      // Fetch total predictions and recent predictions
      const predictionsResponse = await fetch('http://localhost:3001/api/admin/predictions');
      const predictionsData = await predictionsResponse.json();

      // Fetch admin details
      const adminResponse = await fetch('http://localhost:3001/api/admin/details');
      const adminData = await adminResponse.json();

      if (usersData.success && predictionsData.success && adminData.success) {
        setStats({
          totalUsers: usersData.totalUsers,
          totalPredictions: predictionsData.totalPredictions,
          recentUsers: usersData.recentUsers || [],
          recentPredictions: predictionsData.recentPredictions || [],
          adminDetails: adminData.admin
        });
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderSidebar = () => (
    <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition duration-200 ease-in-out z-30 lg:static lg:inset-auto lg:transform-none w-64 bg-white shadow-lg flex flex-col h-screen`}>
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-blue-800">BuildRight Admin</h1>
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
        >
          <X size={24} />
        </button>
      </div>
      <nav className="mt-5 px-2 flex-grow">
        <button
          onClick={() => {
            setActiveTab('dashboard');
            setIsMobileMenuOpen(false);
          }}
          className={`group flex items-center px-2 py-2 text-base font-medium rounded-md w-full ${
            activeTab === 'dashboard'
              ? 'bg-blue-100 text-blue-800'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <BarChart className="mr-4 h-6 w-6" />
          Dashboard
        </button>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="group flex items-center px-2 py-2 text-base font-medium rounded-md w-full text-red-600 hover:bg-red-50"
        >
          <LogOut className="mr-4 h-6 w-6" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="h-16 flex items-center justify-between px-4">
          <h1 className="text-xl font-bold text-blue-800">BuildRight Admin</h1>
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <div className="flex pt-16 lg:pt-0">
        {renderSidebar()}

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-8">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Admin Profile Card */}
                {stats.adminDetails && (
                  <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4 mb-4 lg:mb-0">
                        <Users size={24} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-gray-900">Admin Profile</h2>
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Name</p>
                            <p className="text-sm font-medium text-gray-900">
                              {stats.adminDetails.firstName} {stats.adminDetails.lastName}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="text-sm font-medium text-gray-900">{stats.adminDetails.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Company</p>
                            <p className="text-sm font-medium text-gray-900">{stats.adminDetails.company}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Role</p>
                            <p className="text-sm font-medium text-gray-900">{stats.adminDetails.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-blue-100 text-blue-800 mr-4">
                        <Users size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow p-4 lg:p-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                        <Package size={24} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Total Predictions</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalPredictions}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                  {/* Recent Users Table */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 lg:p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Company
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Job Title
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Joined
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stats.recentUsers && stats.recentUsers.length > 0 ? (
                            stats.recentUsers.map((user) => (
                              <tr key={user.id}>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                                  <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{user.company}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{user.jobTitle}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="px-4 lg:px-6 py-4 text-center text-sm text-gray-500">
                                No users found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Recent Predictions Table */}
                  <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="p-4 lg:p-6 border-b border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900">Recent Predictions</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              User
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Project Type
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Budget
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Area Size
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Material
                            </th>
                            <th scope="col" className="px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {stats.recentPredictions && stats.recentPredictions.length > 0 ? (
                            stats.recentPredictions.map((prediction) => (
                              <tr key={prediction.id}>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {prediction.firstName && prediction.lastName 
                                      ? `${prediction.firstName} ${prediction.lastName}`
                                      : 'Unknown User'}
                                  </div>
                                  {prediction.email && (
                                    <div className="text-sm text-gray-500">{prediction.email}</div>
                                  )}
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{prediction.project_type}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">₹{prediction.budget.toLocaleString()}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{prediction.area_size} m²</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">{prediction.predicted_material}</div>
                                </td>
                                <td className="px-4 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {new Date(prediction.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6" className="px-4 lg:px-6 py-4 text-center text-sm text-gray-500">
                                No predictions found
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 