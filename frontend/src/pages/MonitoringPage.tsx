import React, { useState } from 'react';
import { 
  Search, Filter, Download, RefreshCw, MapPin, Activity, 
  TrendingUp, AlertCircle, Clock, Thermometer, Droplets,
  Wind, Battery, Signal, ChevronDown, Calendar, Eye,
  BarChart3, Settings
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Sensor {
  id: string;
  location: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  waterLevel: number;
  temperature: number;
  flowRate: number;
  battery: number;
  signal: number;
  lastUpdate: string;
  zone: string;
}

const MonitoringPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterZone, setFilterZone] = useState('all');
  const [selectedSensor, setSelectedSensor] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Mock sensor data
  const sensors: Sensor[] = [
    { id: 'S-001', location: 'Main Street Junction', status: 'critical', waterLevel: 85, temperature: 24, flowRate: 120, battery: 85, signal: 95, lastUpdate: '2 min ago', zone: 'Zone A' },
    { id: 'S-002', location: 'Park Avenue Drain', status: 'warning', waterLevel: 65, temperature: 22, flowRate: 85, battery: 72, signal: 88, lastUpdate: '5 min ago', zone: 'Zone A' },
    { id: 'S-003', location: 'Central Plaza', status: 'normal', waterLevel: 32, temperature: 23, flowRate: 45, battery: 90, signal: 92, lastUpdate: '1 min ago', zone: 'Zone B' },
    { id: 'S-004', location: 'Harbor District', status: 'normal', waterLevel: 45, temperature: 21, flowRate: 60, battery: 88, signal: 85, lastUpdate: '3 min ago', zone: 'Zone C' },
    { id: 'S-005', location: 'Industrial Area', status: 'warning', waterLevel: 68, temperature: 25, flowRate: 95, battery: 65, signal: 78, lastUpdate: '4 min ago', zone: 'Zone B' },
    { id: 'S-006', location: 'Residential Block 5', status: 'normal', waterLevel: 28, temperature: 22, flowRate: 40, battery: 92, signal: 90, lastUpdate: '2 min ago', zone: 'Zone A' },
    { id: 'S-007', location: 'Shopping District', status: 'offline', waterLevel: 0, temperature: 0, flowRate: 0, battery: 15, signal: 0, lastUpdate: '45 min ago', zone: 'Zone C' },
    { id: 'S-008', location: 'Tech Park Entrance', status: 'normal', waterLevel: 38, temperature: 23, flowRate: 52, battery: 86, signal: 94, lastUpdate: '1 min ago', zone: 'Zone B' },
  ];

  // Historical data for charts
  const historicalData = [
    { time: '00:00', level: 35, flow: 45, temp: 21 },
    { time: '04:00', level: 42, flow: 58, temp: 22 },
    { time: '08:00', level: 65, flow: 85, temp: 23 },
    { time: '12:00', level: 78, flow: 98, temp: 25 },
    { time: '16:00', level: 68, flow: 88, temp: 24 },
    { time: '20:00', level: 52, flow: 72, temp: 23 },
  ];

  const zoneData = [
    { zone: 'Zone A', normal: 8, warning: 3, critical: 1, offline: 0 },
    { zone: 'Zone B', normal: 10, warning: 2, critical: 1, offline: 1 },
    { zone: 'Zone C', normal: 6, warning: 3, critical: 1, offline: 1 },
  ];

  // Filter sensors
  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch = sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         sensor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || sensor.status === filterStatus;
    const matchesZone = filterZone === 'all' || sensor.zone === filterZone;
    return matchesSearch && matchesStatus && matchesZone;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'normal': return 'bg-green-100 text-green-700 border-green-200';
      case 'offline': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Real-Time Monitoring
            </h1>
            <p className="text-lg text-gray-600">
              Comprehensive sensor monitoring and analytics dashboard
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center px-6 py-3.5 border-2 border-gray-200 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 font-medium">
              <RefreshCw className="w-5 h-5 mr-2" />
              Auto-refresh: ON
            </button>
            <button className="flex items-center px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 font-medium">
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-sky-100 text-sky-600">
                <Activity className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-green-50 text-green-700">
                Active
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{sensors.filter(s => s.status !== 'offline').length}</h3>
            <p className="text-sm font-medium text-gray-500">Active Sensors</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-red-100 text-red-600">
                <AlertCircle className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-red-50 text-red-700">
                Urgent
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{sensors.filter(s => s.status === 'critical').length}</h3>
            <p className="text-sm font-medium text-gray-500">Critical Alerts</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-yellow-100 text-yellow-600">
                <TrendingUp className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-yellow-50 text-yellow-700">
                Watch
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">{sensors.filter(s => s.status === 'warning').length}</h3>
            <p className="text-sm font-medium text-gray-500">Warnings</p>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="p-4 rounded-2xl bg-purple-100 text-purple-600">
                <Clock className="w-7 h-7" />
              </div>
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-sky-50 text-sky-700">
                Live
              </span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900 mb-2">98.5%</h3>
            <p className="text-sm font-medium text-gray-500">Avg Response Time</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Water Level Trends */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Level Trends</h2>
                <p className="text-gray-500">24-hour historical data</p>
              </div>
              <Activity className="w-6 h-6 text-sky-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={historicalData}>
                <defs>
                  <linearGradient id="colorLevel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Area type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorLevel)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Zone Distribution */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Zone Status Distribution</h2>
                <p className="text-gray-500">Sensor status by zone</p>
              </div>
              <BarChart3 className="w-6 h-6 text-sky-500" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={zoneData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="zone" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="normal" fill="#10b981" radius={[8, 8, 0, 0]} />
                <Bar dataKey="warning" fill="#f59e0b" radius={[8, 8, 0, 0]} />
                <Bar dataKey="critical" fill="#ef4444" radius={[8, 8, 0, 0]} />
                <Bar dataKey="offline" fill="#6b7280" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Flow Rate & Temperature */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Multi-Parameter Analysis</h2>
              <p className="text-gray-500">Flow rate and temperature correlation</p>
            </div>
            <Settings className="w-6 h-6 text-sky-500" />
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={historicalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="flow" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
              <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by sensor ID or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="normal">Normal</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                  <option value="offline">Offline</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="appearance-none px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                >
                  <option value="all">All Zones</option>
                  <option value="Zone A">Zone A</option>
                  <option value="Zone B">Zone B</option>
                  <option value="Zone C">Zone C</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <button className="px-6 py-4 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-all font-medium text-gray-700 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                More Filters
              </button>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-sky-600 font-bold">{filteredSensors.length}</span> of {sensors.length} sensors
            </p>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'table' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'grid' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Grid View
              </button>
            </div>
          </div>

          {/* Table View */}
          {viewMode === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Sensor ID</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Location</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Water Level</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Temperature</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Flow Rate</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Battery</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Signal</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Last Update</th>
                    <th className="text-left py-4 px-4 font-bold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSensors.map((sensor) => (
                    <tr key={sensor.id} className="border-b border-gray-100 hover:bg-sky-50/50 transition-colors">
                      <td className="py-4 px-4">
                        <span className="font-bold text-gray-900">{sensor.id}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{sensor.location}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 ${getStatusColor(sensor.status)} flex items-center gap-2 w-fit`}>
                          <div className={`w-2 h-2 rounded-full ${getStatusDot(sensor.status)} animate-pulse`}></div>
                          {sensor.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-4 h-4 text-sky-500" />
                          <span className="font-semibold text-gray-900">{sensor.waterLevel}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Thermometer className="w-4 h-4 text-orange-500" />
                          <span className="font-semibold text-gray-900">{sensor.temperature}°C</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Wind className="w-4 h-4 text-blue-500" />
                          <span className="font-semibold text-gray-900">{sensor.flowRate} L/s</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Battery className="w-4 h-4 text-green-500" />
                          <span className="font-semibold text-gray-900">{sensor.battery}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <Signal className="w-4 h-4 text-purple-500" />
                          <span className="font-semibold text-gray-900">{sensor.signal}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-gray-500">{sensor.lastUpdate}</span>
                      </td>
                      <td className="py-4 px-4">
                        <button 
                          onClick={() => setSelectedSensor(sensor.id)}
                          className="p-2 hover:bg-sky-100 rounded-xl transition-colors"
                        >
                          <Eye className="w-5 h-5 text-sky-600" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSensors.map((sensor) => (
                <div key={sensor.id} className="bg-gradient-to-br from-white to-sky-50/30 rounded-2xl p-6 border-2 border-gray-100 hover:border-sky-200 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-xl text-gray-900">{sensor.id}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getStatusColor(sensor.status)} flex items-center gap-1.5`}>
                      <div className={`w-2 h-2 rounded-full ${getStatusDot(sensor.status)} animate-pulse`}></div>
                      {sensor.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-gray-600 mb-4 pb-4 border-b border-gray-200">
                    <MapPin className="w-4 h-4" />
                    <p className="text-sm font-medium">{sensor.location}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Droplets className="w-4 h-4 text-sky-500" />
                        <span className="text-sm">Water Level</span>
                      </div>
                      <span className="font-bold text-gray-900">{sensor.waterLevel}%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Thermometer className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Temperature</span>
                      </div>
                      <span className="font-bold text-gray-900">{sensor.temperature}°C</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Wind className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Flow Rate</span>
                      </div>
                      <span className="font-bold text-gray-900">{sensor.flowRate} L/s</span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Battery className="w-4 h-4 text-green-500" />
                          <span className="text-xs font-semibold text-gray-700">{sensor.battery}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Signal className="w-4 h-4 text-purple-500" />
                          <span className="text-xs font-semibold text-gray-700">{sensor.signal}%</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setSelectedSensor(sensor.id)}
                        className="p-2 hover:bg-sky-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-sky-600" />
                      </button>
                    </div>

                    <p className="text-xs text-gray-500 text-center pt-2">{sensor.lastUpdate}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Stats */}
        <div className="bg-gradient-to-r from-sky-600 to-blue-600 rounded-3xl shadow-xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{sensors.length}</div>
              <div className="text-sm font-medium text-sky-100">Total Sensors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{sensors.filter(s => s.status === 'normal').length}</div>
              <div className="text-sm font-medium text-sky-100">Normal Status</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">3</div>
              <div className="text-sm font-medium text-sky-100">Active Zones</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-sm font-medium text-sky-100">Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.8%</div>
              <div className="text-sm font-medium text-sky-100">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringPage;