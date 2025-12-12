import React from 'react';
import { Activity, AlertTriangle, Battery, Droplets } from 'lucide-react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      title: 'Active Sensors',
      value: '35',
      change: '+2',
      icon: <Activity className="w-6 h-6" />,
      color: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Critical Alerts',
      value: '3',
      change: '-1',
      icon: <AlertTriangle className="w-6 h-6" />,
      color: 'bg-red-500',
      textColor: 'text-red-500',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Avg. Water Level',
      value: '42%',
      change: '-5%',
      icon: <Droplets className="w-6 h-6" />,
      color: 'bg-cyan-500',
      textColor: 'text-cyan-500',
      bgColor: 'bg-cyan-50'
    },
    {
      title: 'Battery Health',
      value: '89%',
      change: '+2%',
      icon: <Battery className="w-6 h-6" />,
      color: 'bg-green-500',
      textColor: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} rounded-2xl p-6 shadow-sm border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl ${stat.color} bg-opacity-10`}>
              <div className={stat.textColor}>{stat.icon}</div>
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${stat.textColor} ${stat.bgColor}`}>
              {stat.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</h3>
          <p className="text-gray-600">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;