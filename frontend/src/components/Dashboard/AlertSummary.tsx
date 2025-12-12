import React from 'react';
import { AlertTriangle, Bell, CheckCircle, Clock } from 'lucide-react';

const AlertSummary: React.FC = () => {
  const alerts = [
    { id: 1, sensor: 'S-103', location: 'Industrial Area', type: 'Blockage Detected', time: '10 min ago', priority: 'high', status: 'unread' },
    { id: 2, sensor: 'S-102', location: 'Market Square', type: 'Water Level High', time: '25 min ago', priority: 'medium', status: 'read' },
    { id: 3, sensor: 'S-107', location: 'River Side', type: 'Low Flow Rate', time: '1 hour ago', priority: 'medium', status: 'read' },
    { id: 4, sensor: 'S-115', location: 'Hospital Zone', type: 'Sensor Offline', time: '2 hours ago', priority: 'low', status: 'read' },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <Bell className="w-4 h-4" />;
      case 'low': return <Clock className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Recent Alerts Summary</h2>
          <p className="text-gray-500 text-sm">Unresolved issues requiring attention</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">3 Active</span>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <CheckCircle className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`flex items-center justify-between p-4 border rounded-xl ${alert.status === 'unread' ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getPriorityColor(alert.priority)}`}>
                {getPriorityIcon(alert.priority)}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium text-gray-800">{alert.type}</h3>
                  {alert.status === 'unread' && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  )}
                </div>
                <div className="flex items-center space-x-3 mt-1 text-sm">
                  <span className="text-gray-600">{alert.sensor}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">{alert.location}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{alert.time}</span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(alert.priority)}`}>
                {alert.priority.toUpperCase()}
              </span>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Acknowledge
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">High Priority</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm text-gray-600">Low</span>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Alerts →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertSummary;