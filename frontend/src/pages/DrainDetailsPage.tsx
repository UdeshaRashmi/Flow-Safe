import React, { useState } from 'react';
import { 
  ArrowLeft, MapPin, Activity, Droplets, Thermometer, Wind, Battery,
  Signal, Clock, Calendar, TrendingUp, TrendingDown, AlertTriangle,
  CheckCircle, Download, Share2, Settings, Bell, Eye, BarChart3,
  Zap, Waves, CloudRain, Sun, Moon, RefreshCw, FileText, Camera,
  Edit, Trash2, Plus, ChevronRight, Info, Award, Target, Shield
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Event {
  id: number;
  type: 'alert' | 'maintenance' | 'inspection' | 'cleaning';
  title: string;
  description: string;
  timestamp: string;
  severity?: 'low' | 'medium' | 'high';
  user: string;
}

const DrainDetailsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'history' | 'maintenance'>('overview');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');

  // Mock sensor data
  const sensorData = {
    id: 'S-103',
    name: 'Main Street Junction Drain',
    location: 'Main Street & 5th Avenue, Downtown District',
    zone: 'Zone A',
    coordinates: { lat: 6.9271, lng: 79.8612 },
    status: 'warning',
    installDate: '2023-03-15',
    lastMaintenance: '2024-11-20',
    nextMaintenance: '2025-01-15',
    
    // Current readings
    waterLevel: 68,
    temperature: 24,
    flowRate: 95,
    battery: 78,
    signal: 92,
    pressure: 1.2,
    turbidity: 45,
    pH: 7.2,
    
    // Status
    operational: true,
    lastUpdate: '2 minutes ago',
    uptime: 99.4,
    totalAlerts: 15,
    resolvedAlerts: 13,
  };

  // Historical data for charts
  const waterLevelData = [
    { time: 'Mon', level: 35, threshold: 60 },
    { time: 'Tue', level: 42, threshold: 60 },
    { time: 'Wed', level: 58, threshold: 60 },
    { time: 'Thu', level: 68, threshold: 60 },
    { time: 'Fri', level: 65, threshold: 60 },
    { time: 'Sat', level: 52, threshold: 60 },
    { time: 'Sun', level: 68, threshold: 60 },
  ];

  const flowRateData = [
    { time: '00:00', flow: 45 },
    { time: '04:00', flow: 38 },
    { time: '08:00', flow: 72 },
    { time: '12:00', flow: 95 },
    { time: '16:00', flow: 88 },
    { time: '20:00', flow: 62 },
  ];

  const temperatureData = [
    { time: '00:00', temp: 21 },
    { time: '04:00', temp: 20 },
    { time: '08:00', temp: 22 },
    { time: '12:00', temp: 25 },
    { time: '16:00', temp: 24 },
    { time: '20:00', temp: 23 },
  ];

  const alertsByType = [
    { type: 'High Level', count: 8, color: '#ef4444' },
    { type: 'Blockage', count: 4, color: '#f59e0b' },
    { type: 'Flow Issue', count: 2, color: '#0ea5e9' },
    { type: 'Sensor Error', count: 1, color: '#6b7280' },
  ];

  const events: Event[] = [
    { id: 1, type: 'alert', title: 'Water Level Critical', description: 'Water level exceeded 80% threshold', timestamp: '2 hours ago', severity: 'high', user: 'System' },
    { id: 2, type: 'maintenance', title: 'Routine Inspection', description: 'Quarterly inspection completed successfully', timestamp: '2 days ago', severity: 'low', user: 'John Doe' },
    { id: 3, type: 'cleaning', title: 'Drain Cleaning', description: 'Debris removed from drainage system', timestamp: '5 days ago', severity: 'medium', user: 'Maintenance Team' },
    { id: 4, type: 'inspection', title: 'Sensor Calibration', description: 'All sensors calibrated and tested', timestamp: '1 week ago', severity: 'low', user: 'Tech Team' },
    { id: 5, type: 'alert', title: 'Low Battery Warning', description: 'Battery level dropped below 20%', timestamp: '1 week ago', severity: 'medium', user: 'System' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'normal': return 'bg-green-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5" />;
      case 'maintenance': return <Settings className="w-5 h-5" />;
      case 'inspection': return <Eye className="w-5 h-5" />;
      case 'cleaning': return <Droplets className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'alert': return 'bg-red-50 text-red-700 border-red-200';
      case 'maintenance': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'inspection': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'cleaning': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-4">
          <button className="p-3 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
            <ArrowLeft className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
                {sensorData.id}
              </h1>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl ${getStatusColor(sensorData.status)} animate-pulse`}>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white font-bold text-sm uppercase">{sensorData.status}</span>
              </div>
            </div>
            <p className="text-lg text-gray-600">{sensorData.name}</p>
          </div>
          <div className="flex gap-3">
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-all">
              <Bell className="w-5 h-5 text-gray-700" />
            </button>
            <button className="flex items-center px-6 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 font-medium">
              <Download className="w-5 h-5 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Location Info Bar */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-sky-100 rounded-xl">
                <MapPin className="w-6 h-6 text-sky-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="text-base font-bold text-gray-900">{sensorData.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Zone</p>
                <p className="text-base font-bold text-gray-900">{sensorData.zone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Maintenance</p>
                <p className="text-base font-bold text-gray-900">{sensorData.lastMaintenance}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Last Update</p>
                <p className="text-base font-bold text-gray-900">{sensorData.lastUpdate}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Droplets className="w-7 h-7" />
              </div>
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-sky-100 mb-2">Water Level</p>
            <p className="text-5xl font-bold mb-2">{sensorData.waterLevel}%</p>
            <div className="w-full h-2 bg-white/30 rounded-full overflow-hidden">
              <div className="h-full bg-white" style={{ width: `${sensorData.waterLevel}%` }}></div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Thermometer className="w-7 h-7" />
              </div>
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-orange-100 mb-2">Temperature</p>
            <p className="text-5xl font-bold mb-2">{sensorData.temperature}°C</p>
            <p className="text-sm text-orange-100">Normal range</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Wind className="w-7 h-7" />
              </div>
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-purple-100 mb-2">Flow Rate</p>
            <p className="text-5xl font-bold mb-2">{sensorData.flowRate}</p>
            <p className="text-sm text-purple-100">Liters/second</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 shadow-xl text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <Activity className="w-7 h-7" />
              </div>
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-green-100 mb-2">System Uptime</p>
            <p className="text-5xl font-bold mb-2">{sensorData.uptime}%</p>
            <p className="text-sm text-green-100">Last 30 days</p>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
          <div className="flex gap-2">
            {['overview', 'analytics', 'history', 'maintenance'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-base transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Real-time Metrics */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Readings */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Real-Time Readings</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-6 bg-sky-50 rounded-2xl border-2 border-sky-100">
                    <Droplets className="w-8 h-8 text-sky-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">{sensorData.waterLevel}%</p>
                    <p className="text-sm font-medium text-gray-600">Water Level</p>
                  </div>
                  <div className="text-center p-6 bg-orange-50 rounded-2xl border-2 border-orange-100">
                    <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">{sensorData.temperature}°C</p>
                    <p className="text-sm font-medium text-gray-600">Temperature</p>
                  </div>
                  <div className="text-center p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
                    <Wind className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">{sensorData.flowRate}</p>
                    <p className="text-sm font-medium text-gray-600">Flow Rate L/s</p>
                  </div>
                  <div className="text-center p-6 bg-purple-50 rounded-2xl border-2 border-purple-100">
                    <Waves className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                    <p className="text-3xl font-bold text-gray-900 mb-1">{sensorData.pressure}</p>
                    <p className="text-sm font-medium text-gray-600">Pressure Bar</p>
                  </div>
                </div>
              </div>

              {/* Water Level Trend */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Water Level Trend</h2>
                    <p className="text-gray-500">7-day historical data</p>
                  </div>
                  <div className="flex gap-2">
                    {['24h', '7d', '30d', '90d'].map((range) => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range as any)}
                        className={`px-4 py-2 rounded-xl font-medium transition-all ${
                          timeRange === range
                            ? 'bg-sky-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                  <AreaChart data={waterLevelData}>
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
                    <Legend />
                    <Area type="monotone" dataKey="level" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorLevel)" name="Water Level %" />
                    <Line type="monotone" dataKey="threshold" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Threshold" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Flow Rate Chart */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Flow Rate Analysis</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={flowRateData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="time" stroke="#6b7280" />
                    <YAxis stroke="#6b7280" />
                    <Tooltip />
                    <Bar dataKey="flow" fill="#0ea5e9" radius={[8, 8, 0, 0]} name="Flow Rate (L/s)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* System Health */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">System Health</h2>
                  <Shield className="w-6 h-6 text-sky-500" />
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Battery className="w-5 h-5 text-green-500" />
                        <span className="font-semibold text-gray-700">Battery</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{sensorData.battery}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: `${sensorData.battery}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Signal className="w-5 h-5 text-purple-500" />
                        <span className="font-semibold text-gray-700">Signal</span>
                      </div>
                      <span className="text-xl font-bold text-gray-900">{sensorData.signal}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${sensorData.signal}%` }}></div>
                    </div>
                  </div>

                  <div className="pt-6 border-t-2 border-gray-100">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-100">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="font-semibold text-gray-700">Operational</span>
                      </div>
                      <span className="text-green-600 font-bold">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alert Summary */}
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">Alerts</h2>
                  <AlertTriangle className="w-6 h-6 text-yellow-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-5 bg-red-50 rounded-2xl border-2 border-red-100">
                    <span className="font-semibold text-gray-700">Critical</span>
                    <span className="text-2xl font-bold text-red-600">2</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-100">
                    <span className="font-semibold text-gray-700">Warning</span>
                    <span className="text-2xl font-bold text-yellow-600">5</span>
                  </div>
                  <div className="flex items-center justify-between p-5 bg-green-50 rounded-2xl border-2 border-green-100">
                    <span className="font-semibold text-gray-700">Resolved</span>
                    <span className="text-2xl font-bold text-green-600">{sensorData.resolvedAlerts}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5" />
                    Refresh Data
                  </button>
                  <button className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <Camera className="w-5 h-5" />
                    View Photos
                  </button>
                  <button className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <FileText className="w-5 h-5" />
                    Generate Report
                  </button>
                  <button className="w-full py-4 bg-white/20 backdrop-blur-sm rounded-xl font-semibold hover:bg-white/30 transition-all flex items-center justify-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Temperature Trends</h2>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="time" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} name="Temperature (°C)" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Alerts by Type</h2>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={alertsByType}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="type" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Event History</h2>
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className={`p-6 rounded-2xl border-2 ${getEventColor(event.type)} hover:shadow-md transition-all`}>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white rounded-xl">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        </div>
                        {event.severity && (
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            event.severity === 'high' ? 'bg-red-100 text-red-700' :
                            event.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {event.severity.toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{event.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>•</span>
                          <span>{event.user}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Maintenance Schedule</h2>
              <div className="space-y-6">
                <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Last Maintenance</h3>
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">{sensorData.lastMaintenance}</p>
                  <p className="text-sm text-gray-600">Routine inspection completed</p>
                </div>

                <div className="p-6 bg-sky-50 rounded-2xl border-2 border-sky-100">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">Next Scheduled</h3>
                    <Calendar className="w-6 h-6 text-sky-600" />
                  </div>
                  <p className="text-3xl font-bold text-sky-600 mb-2">{sensorData.nextMaintenance}</p>
                  <p className="text-sm text-gray-600">Quarterly maintenance due</p>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-semibold hover:from-sky-600 hover:to-blue-700 shadow-lg transition-all flex items-center justify-center gap-2">
                  <Plus className="w-5 h-5" />
                  Schedule Maintenance
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Maintenance History</h2>
              <div className="space-y-4">
                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Settings className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Routine Inspection</p>
                        <p className="text-sm text-gray-600">Nov 20, 2024</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Droplets className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Drain Cleaning</p>
                        <p className="text-sm text-gray-600">Nov 10, 2024</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Sensor Calibration</p>
                        <p className="text-sm text-gray-600">Oct 25, 2024</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>

                <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Battery className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-semibold text-gray-900">Battery Replacement</p>
                        <p className="text-sm text-gray-600">Oct 15, 2024</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DrainDetailsPage;