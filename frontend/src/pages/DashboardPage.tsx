import React from 'react';
import StatsCards from '../components/Dashboard/StatsCards';
import LiveIndicators from '../components/Dashboard/LiveIndicators';
import AlertSummary from '../components/Dashboard/AlertSummary';
import MapView from '../components/Dashboard/MapView';
import { Activity, Bell, Clock, Download } from 'lucide-react';

const DashboardPage: React.FC = () => {
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

  const totalSensors = riskDistribution.normal + riskDistribution.warning + riskDistribution.critical + riskDistribution.offline;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drain Monitoring Dashboard</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring of drainage systems and blockage detection</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">
            <Clock className="w-4 h-4 mr-2" />
            Last 24 hours
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Live Indicators & Map */}
        <div className="lg:col-span-2 space-y-6">
          {/* Live Water Level Indicators */}
          <LiveIndicators />

          {/* Map View */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Drain Network Map</h2>
                <p className="text-gray-500 text-sm">Geographical overview of sensor locations</p>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {totalSensors} Total Sensors
                </span>
              </div>
            </div>
            <MapView />
          </div>
        </div>

        {/* Right Column - Risk Status & Activities */}
        <div className="space-y-6">
          {/* Risk Status Overview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Risk Status Overview</h2>
                <p className="text-gray-500 text-sm">Distribution of sensor status</p>
              </div>
              <Activity className="w-5 h-5 text-blue-500" />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-800">Normal</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{riskDistribution.normal}</span>
                  <p className="text-sm text-gray-500">{Math.round((riskDistribution.normal / totalSensors) * 100)}% of total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-800">Warning</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-yellow-600">{riskDistribution.warning}</span>
                  <p className="text-sm text-gray-500">{Math.round((riskDistribution.warning / totalSensors) * 100)}% of total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 rounded-xl border border-red-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-800">Critical</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-red-600">{riskDistribution.critical}</span>
                  <p className="text-sm text-gray-500">{Math.round((riskDistribution.critical / totalSensors) * 100)}% of total</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-500 rounded-full mr-3"></div>
                  <span className="font-medium text-gray-800">Offline</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-gray-600">{riskDistribution.offline}</span>
                  <p className="text-sm text-gray-500">{Math.round((riskDistribution.offline / totalSensors) * 100)}% of total</p>
                </div>
              </div>
            </div>

            {/* Status Chart */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex h-4 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500" 
                  style={{ width: `${(riskDistribution.normal / totalSensors) * 100}%` }}
                ></div>
                <div 
                  className="bg-yellow-500" 
                  style={{ width: `${(riskDistribution.warning / totalSensors) * 100}%` }}
                ></div>
                <div 
                  className="bg-red-500" 
                  style={{ width: `${(riskDistribution.critical / totalSensors) * 100}%` }}
                ></div>
                <div 
                  className="bg-gray-500" 
                  style={{ width: `${(riskDistribution.offline / totalSensors) * 100}%` }}
                ></div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-2">Overall system health</p>
            </div>
          </div>

          {/* Alert Summary */}
          <AlertSummary />

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <p className="text-gray-500 text-sm">Latest system events and actions</p>
              </div>
              <Bell className="w-5 h-5 text-blue-500" />
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-gray-500">{activity.time}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                        {activity.user}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <button className="w-full py-2 text-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Activities →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">37</div>
            <div className="text-sm text-gray-500">Total Sensors</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">24</div>
            <div className="text-sm text-gray-500">Operating Normally</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">99.2%</div>
            <div className="text-sm text-gray-500">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">15</div>
            <div className="text-sm text-gray-500">Resolved Today</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;