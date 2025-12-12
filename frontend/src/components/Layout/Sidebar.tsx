import React from 'react';
import { 
  LayoutDashboard, 
  Monitor, 
  AlertTriangle, 
  Settings, 
  Map, 
  BarChart3,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const menuItems = [
    { path: '/', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', active: true },
    { path: '/monitoring', icon: <Monitor className="w-5 h-5" />, label: 'Monitoring' },
    { path: '/map', icon: <Map className="w-5 h-5" />, label: 'Map View' },
    { path: '/alerts', icon: <AlertTriangle className="w-5 h-5" />, label: 'Alerts' },
    { path: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Analytics' },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 z-40 overflow-y-auto">
      <div className="p-6">
        {/* System Status */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            System Status
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">All Systems</span>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Updated</span>
              <span className="text-sm text-gray-500">Just now</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Navigation
          </h3>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-colors
                    ${isActive || item.active
                      ? 'bg-blue-50 text-blue-600 border border-blue-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                  {item.active && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Links */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Critical Alerts</span>
              </div>
              <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">3</span>
            </button>
            <button className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Monitor className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">Add Sensor</span>
              </div>
            </button>
          </div>
        </div>

        {/* Help & Support */}
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Support
          </h3>
          <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Help & Documentation</span>
          </button>
        </div>

        {/* Logout */}
        <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-colors mt-8">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;