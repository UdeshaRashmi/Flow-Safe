import React from 'react';
import { Activity, Bell, Clock, Download, Droplets, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';

type IconComponent = React.ComponentType<any>;

interface StatsCardProps {
  icon: IconComponent;
  label: string;
  value: string | number;
  change?: number; // percent change (optional)
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, label, value, change, color = '' }) => (
  <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
    <div className="flex items-center justify-between mb-6">
      <div className={`p-4 rounded-2xl ${color}`}>
        <Icon className="w-7 h-7" />
      </div>
      {change && (
        <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${
          change > 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <div className="space-y-2">
      <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
      <p className="text-sm font-medium text-gray-500">{label}</p>
    </div>
  </div>
);

interface LiveIndicatorProps {
  id: string;
  location: string;
  level: number;
  status?: string;
  lastUpdate?: string;
}

const LiveIndicator: React.FC<LiveIndicatorProps> = ({ id, location, level, status, lastUpdate }) => {
  const getStatusColor = () => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStatusBg = () => {
    if (level >= 80) return 'bg-red-50 border-red-100';
    if (level >= 60) return 'bg-yellow-50 border-yellow-100';
    return 'bg-green-50 border-green-100';
  };

  return (
    <div className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${getStatusBg()}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getStatusColor()} animate-pulse`}></div>
          <span className="font-bold text-gray-900">{id}</span>
        </div>
        <span className="text-xs font-medium text-gray-500 bg-white px-3 py-1 rounded-full">{lastUpdate}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{location}</p>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-500">Water Level</span>
          <span className="text-lg font-bold text-gray-900">{level}%</span>
        </div>
        <div className="w-full h-3 bg-white/50 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getStatusColor()} transition-all duration-500`}
            style={{ width: `${level}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const sensors = [
    { id: 'S-103', location: 'Main Street Junction', level: 85, status: 'critical', lastUpdate: '2 min ago' },
    { id: 'S-087', location: 'Park Avenue Drain', level: 65, status: 'warning', lastUpdate: '5 min ago' },
    { id: 'S-045', location: 'Central Plaza', level: 32, status: 'normal', lastUpdate: '1 min ago' },
    { id: 'S-112', location: 'Harbor District', level: 45, status: 'normal', lastUpdate: '3 min ago' },
  ];

  const recentActivities = [
    { id: 1, action: 'Sensor S-103 flagged critical', time: '2 minutes ago', user: 'System' },
    { id: 2, action: 'Alert acknowledged by Admin', time: '15 minutes ago', user: 'John Doe' },
    { id: 3, action: 'New sensor added - S-120', time: '1 hour ago', user: 'Jane Smith' },
    { id: 4, action: 'System maintenance completed', time: '3 hours ago', user: 'System' },
    { id: 5, action: 'Threshold updated for Zone A', time: '5 hours ago', user: 'Admin' },
  ];

  const riskDistribution = {
    normal: 24,
    warning: 8,
    critical: 3,
    offline: 2
  };

  const totalSensors = 37;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Drain Monitoring Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Real-time monitoring of drainage systems and blockage detection
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center px-6 py-3.5 border-2 border-gray-200 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 font-medium">
              <Clock className="w-5 h-5 mr-2" />
              Last 24 hours
            </button>
            <button className="flex items-center px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 font-medium">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard 
            icon={Droplets} 
            label="Active Sensors" 
            value="35" 
            change={5.2}
            color="bg-sky-100 text-sky-600"
          />
          <StatsCard 
            icon={AlertTriangle} 
            label="Critical Alerts" 
            value="3" 
            change={-12}
            color="bg-red-100 text-red-600"
          />
          <StatsCard 
            icon={CheckCircle} 
            label="Resolved Today" 
            value="15" 
            change={8.3}
            color="bg-green-100 text-green-600"
          />
          <StatsCard 
            icon={Wifi} 
            label="System Uptime" 
            value="99.2%" 
            color="bg-purple-100 text-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Section - Live Indicators & Map */}
          <div className="xl:col-span-2 space-y-8">
            {/* Live Water Level Indicators */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Water Levels</h2>
                <p className="text-gray-500">Real-time monitoring of sensor readings</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sensors.map((sensor) => (
                  <LiveIndicator key={sensor.id} {...sensor} />
                ))}
              </div>
            </div>

            {/* Map View */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Drain Network Map</h2>
                  <p className="text-gray-500">Geographical overview of sensor locations</p>
                </div>
                <div className="px-5 py-2.5 bg-sky-100 text-sky-700 rounded-2xl font-semibold">
                  {totalSensors} Sensors
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl h-96 flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-gray-600 font-medium">Interactive Map View</p>
                  <p className="text-sm text-gray-400 mt-2">Map component placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Status & Activity */}
          <div className="space-y-8">
            {/* Risk Status Overview */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk Status</h2>
                  <p className="text-gray-500">Sensor distribution</p>
                </div>
                <Activity className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl border-2 border-green-100 hover:border-green-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">Normal</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-green-600">{riskDistribution.normal}</span>
                    <p className="text-sm text-gray-500 mt-1">{Math.round((riskDistribution.normal / totalSensors) * 100)}% total</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-100 hover:border-yellow-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">Warning</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-yellow-600">{riskDistribution.warning}</span>
                    <p className="text-sm text-gray-500 mt-1">{Math.round((riskDistribution.warning / totalSensors) * 100)}% total</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-red-50 rounded-2xl border-2 border-red-100 hover:border-red-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">Critical</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-red-600">{riskDistribution.critical}</span>
                    <p className="text-sm text-gray-500 mt-1">{Math.round((riskDistribution.critical / totalSensors) * 100)}% total</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-5 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-500 rounded-full"></div>
                    <span className="font-semibold text-gray-800">Offline</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-gray-600">{riskDistribution.offline}</span>
                    <p className="text-sm text-gray-500 mt-1">{Math.round((riskDistribution.offline / totalSensors) * 100)}% total</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t-2 border-gray-100">
                <div className="flex h-5 rounded-full overflow-hidden shadow-inner">
                  <div className="bg-green-500" style={{ width: `${(riskDistribution.normal / totalSensors) * 100}%` }}></div>
                  <div className="bg-yellow-500" style={{ width: `${(riskDistribution.warning / totalSensors) * 100}%` }}></div>
                  <div className="bg-red-500" style={{ width: `${(riskDistribution.critical / totalSensors) * 100}%` }}></div>
                  <div className="bg-gray-500" style={{ width: `${(riskDistribution.offline / totalSensors) * 100}%` }}></div>
                </div>
                <p className="text-center text-sm font-medium text-gray-500 mt-4">Overall System Health</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Recent Activity</h2>
                  <p className="text-gray-500">Latest system events</p>
                </div>
                <Bell className="w-6 h-6 text-blue-500" />
              </div>
              
              <div className="space-y-3">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer group">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-800 mb-2">{activity.action}</p>
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-xs text-gray-500 font-medium">{activity.time}</span>
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded-lg font-medium whitespace-nowrap">
                          {activity.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t-2 border-gray-100">
                <button className="w-full py-3 text-center text-blue-600 hover:text-blue-800 text-sm font-bold rounded-xl hover:bg-blue-50 transition-colors">
                  View All Activities →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">37</div>
              <div className="text-sm font-medium text-blue-100">Total Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24</div>
              <div className="text-sm font-medium text-blue-100">Operating Normally</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.2%</div>
              <div className="text-sm font-medium text-blue-100">System Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">15</div>
              <div className="text-sm font-medium text-blue-100">Resolved Today</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;