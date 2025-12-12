import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorIndicator {
  id: string;
  name: string;
  location: string;
  waterLevel: number;
  flowRate: number;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

const LiveIndicators: React.FC = () => {
  const indicators: SensorIndicator[] = [
    { id: 'S-101', name: 'Main Street Drain', location: 'Zone A', waterLevel: 45, flowRate: 2.1, status: 'normal', trend: 'stable' },
    { id: 'S-102', name: 'Market Square', location: 'Zone B', waterLevel: 78, flowRate: 0.8, status: 'warning', trend: 'up' },
    { id: 'S-103', name: 'Industrial Area', location: 'Zone C', waterLevel: 92, flowRate: 0.3, status: 'critical', trend: 'up' },
    { id: 'S-104', name: 'Residential Block', location: 'Zone D', waterLevel: 32, flowRate: 1.9, status: 'normal', trend: 'down' },
    { id: 'S-105', name: 'Park Avenue', location: 'Zone A', waterLevel: 65, flowRate: 1.2, status: 'normal', trend: 'stable' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-red-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-green-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getWaterLevelColor = (level: number) => {
    if (level >= 80) return 'bg-red-500';
    if (level >= 60) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Live Water Level Indicators</h2>
          <p className="text-gray-500 text-sm">Real-time monitoring of all active sensors</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Normal</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <span className="text-sm">Warning</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <span className="text-sm">Critical</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {indicators.map((indicator) => (
          <div
            key={indicator.id}
            className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full ${getWaterLevelColor(indicator.waterLevel)} bg-opacity-20 flex items-center justify-center`}>
                    <span className={`text-sm font-semibold ${getWaterLevelColor(indicator.waterLevel).replace('bg-', 'text-')}`}>
                      {indicator.waterLevel}%
                    </span>
                  </div>
                </div>
                <div className="absolute -bottom-1 -right-1">
                  {getTrendIcon(indicator.trend)}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800">{indicator.name}</h3>
                <div className="flex items-center space-x-3 mt-1">
                  <span className="text-sm text-gray-500">{indicator.id}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">{indicator.location}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Flow: {indicator.flowRate} m/s</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-32">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getWaterLevelColor(indicator.waterLevel)}`}
                    style={{ width: `${indicator.waterLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(indicator.status)}`}>
                {indicator.status.toUpperCase()}
              </span>
              
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Updated every 30 seconds</span>
          <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
            View All Sensors →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveIndicators;