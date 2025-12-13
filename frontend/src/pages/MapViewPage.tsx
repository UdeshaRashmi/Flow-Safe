import React, { useState, useMemo, useEffect } from 'react';
import { 
  MapPin, Droplets, AlertTriangle, CheckCircle, XCircle,
  ZoomIn, ZoomOut, Maximize2, Layers, Navigation, Filter,
  Info, TrendingUp, Thermometer, Wind, Battery, Signal,
  Clock, ChevronDown, Search, RefreshCw, Download,
  BarChart3, Activity, Settings, Bell, Eye, EyeOff,
  Play, Pause, Save, Share2, Printer, Calendar,
  MessageSquare, ExternalLink, Star, History,
  Grid, List, Map as MapIcon, Route
} from 'lucide-react';

interface Sensor {
  id: string;
  name: string;
  location: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  waterLevel: number;
  temperature: number;
  flowRate: number;
  battery: number;
  signal: number;
  lastUpdate: string;
  zone: string;
  coordinates: { x: number; y: number };
  history?: { time: string; value: number }[];
  maintenance: {
    last: string;
    next: string;
    status: 'good' | 'due' | 'overdue';
  };
}

interface Zone {
  id: string;
  name: string;
  sensors: number;
  alerts: number;
  avgLevel: number;
  color: string;
}

const MapViewPage: React.FC = () => {
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [mapLayer, setMapLayer] = useState<'default' | 'satellite' | 'terrain'>('default');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [showFlowLines, setShowFlowLines] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('map');
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d'>('24h');
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<'level' | 'flow' | 'temp'>('level');

  const zones: Zone[] = [
    { id: 'zone-a', name: 'Zone A: Downtown', sensors: 4, alerts: 2, avgLevel: 58, color: '#3b82f6' },
    { id: 'zone-b', name: 'Zone B: Industrial', sensors: 3, alerts: 1, avgLevel: 72, color: '#10b981' },
    { id: 'zone-c', name: 'Zone C: Residential', sensors: 3, alerts: 0, avgLevel: 36, color: '#8b5cf6' },
  ];

  const sensors: Sensor[] = useMemo(() => [
    { 
      id: 'S-001', 
      name: 'Main Street Junction', 
      location: 'Intersection at 5th Ave', 
      status: 'critical', 
      waterLevel: 85, 
      temperature: 24, 
      flowRate: 120, 
      battery: 85, 
      signal: 95, 
      lastUpdate: '2 min ago', 
      zone: 'zone-a', 
      coordinates: { x: 25, y: 30 },
      history: [
        { time: '08:00', value: 45 },
        { time: '10:00', value: 58 },
        { time: '12:00', value: 72 },
        { time: '14:00', value: 85 },
        { time: '16:00', value: 79 },
      ],
      maintenance: { last: '2024-01-10', next: '2024-02-10', status: 'due' }
    },
    { 
      id: 'S-002', 
      name: 'Park Avenue Drain', 
      location: 'Near Central Park', 
      status: 'warning', 
      waterLevel: 65, 
      temperature: 22, 
      flowRate: 85, 
      battery: 72, 
      signal: 88, 
      lastUpdate: '5 min ago', 
      zone: 'zone-a', 
      coordinates: { x: 45, y: 25 },
      history: [
        { time: '08:00', value: 32 },
        { time: '10:00', value: 45 },
        { time: '12:00', value: 58 },
        { time: '14:00', value: 65 },
        { time: '16:00', value: 62 },
      ],
      maintenance: { last: '2024-01-15', next: '2024-02-15', status: 'good' }
    },
    { 
      id: 'S-003', 
      name: 'Central Plaza', 
      location: 'Main square fountain', 
      status: 'normal', 
      waterLevel: 32, 
      temperature: 23, 
      flowRate: 45, 
      battery: 90, 
      signal: 92, 
      lastUpdate: '1 min ago', 
      zone: 'zone-b', 
      coordinates: { x: 50, y: 50 },
      maintenance: { last: '2024-01-05', next: '2024-02-05', status: 'good' }
    },
    { 
      id: 'S-004', 
      name: 'Harbor District', 
      location: 'Port area drainage', 
      status: 'normal', 
      waterLevel: 45, 
      temperature: 21, 
      flowRate: 60, 
      battery: 88, 
      signal: 85, 
      lastUpdate: '3 min ago', 
      zone: 'zone-b', 
      coordinates: { x: 70, y: 60 },
      maintenance: { last: '2024-01-12', next: '2024-02-12', status: 'good' }
    },
    { 
      id: 'S-005', 
      name: 'Industrial Area', 
      location: 'Factory zone outlet', 
      status: 'warning', 
      waterLevel: 68, 
      temperature: 25, 
      flowRate: 95, 
      battery: 65, 
      signal: 78, 
      lastUpdate: '4 min ago', 
      zone: 'zone-c', 
      coordinates: { x: 35, y: 65 },
      maintenance: { last: '2024-01-08', next: '2024-02-08', status: 'overdue' }
    },
    { 
      id: 'S-006', 
      name: 'Residential Block 5', 
      location: 'Housing complex', 
      status: 'normal', 
      waterLevel: 28, 
      temperature: 22, 
      flowRate: 40, 
      battery: 92, 
      signal: 90, 
      lastUpdate: '2 min ago', 
      zone: 'zone-c', 
      coordinates: { x: 60, y: 35 },
      maintenance: { last: '2024-01-20', next: '2024-02-20', status: 'good' }
    },
    { 
      id: 'S-007', 
      name: 'Shopping District', 
      location: 'Mall drainage system', 
      status: 'offline', 
      waterLevel: 0, 
      temperature: 0, 
      flowRate: 0, 
      battery: 15, 
      signal: 0, 
      lastUpdate: '45 min ago', 
      zone: 'zone-a', 
      coordinates: { x: 80, y: 45 },
      maintenance: { last: '2024-01-03', next: '2024-02-03', status: 'due' }
    },
    { 
      id: 'S-008', 
      name: 'Tech Park Entrance', 
      location: 'Tech hub main drain', 
      status: 'normal', 
      waterLevel: 38, 
      temperature: 23, 
      flowRate: 52, 
      battery: 86, 
      signal: 94, 
      lastUpdate: '1 min ago', 
      zone: 'zone-b', 
      coordinates: { x: 40, y: 75 },
      maintenance: { last: '2024-01-18', next: '2024-02-18', status: 'good' }
    },
    { 
      id: 'S-009', 
      name: 'Downtown Core', 
      location: 'City center main line', 
      status: 'warning', 
      waterLevel: 72, 
      temperature: 24, 
      flowRate: 88, 
      battery: 78, 
      signal: 89, 
      lastUpdate: '3 min ago', 
      zone: 'zone-a', 
      coordinates: { x: 55, y: 40 },
      maintenance: { last: '2024-01-14', next: '2024-02-14', status: 'good' }
    },
    { 
      id: 'S-010', 
      name: 'East Gate', 
      location: 'Eastern entry point', 
      status: 'normal', 
      waterLevel: 35, 
      temperature: 21, 
      flowRate: 48, 
      battery: 91, 
      signal: 93, 
      lastUpdate: '2 min ago', 
      zone: 'zone-c', 
      coordinates: { x: 75, y: 70 },
      maintenance: { last: '2024-01-22', next: '2024-02-22', status: 'good' }
    },
  ], []);

  const filteredSensors = useMemo(() => 
    sensors.filter(sensor => {
      const statusMatch = filterStatus === 'all' || sensor.status === filterStatus;
      const zoneMatch = selectedZone === 'all' || sensor.zone === selectedZone;
      return statusMatch && zoneMatch;
    }), 
    [sensors, filterStatus, selectedZone]
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'normal': return '#10b981';
      case 'offline': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'offline': return <XCircle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getMaintenanceColor = (status: string) => {
    switch (status) {
      case 'good': return 'bg-green-100 text-green-800';
      case 'due': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Simulated real-time updates
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      // In a real app, this would fetch new data
      console.log('Refreshing map data...');
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const getMetricValue = (sensor: Sensor, metric: string) => {
    switch (metric) {
      case 'level': return sensor.waterLevel;
      case 'flow': return sensor.flowRate;
      case 'temp': return sensor.temperature;
      default: return sensor.waterLevel;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 p-8">
      <div className={`max-w-[2000px] mx-auto space-y-8 ${isFullscreen ? 'p-4' : ''}`}>
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-200">
                <MapIcon className="w-6 h-6 text-sky-600" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
                Smart Drainage Network Map
              </h1>
              <span className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium">
                Live
              </span>
            </div>
            <p className="text-gray-600 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Real-time monitoring of 10 sensors across 3 zones
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sensors or zones..."
                className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
              />
            </div>
            <button className="flex items-center px-5 py-3 border-2 border-gray-200 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 font-medium">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </button>
            <button className="flex items-center px-5 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 font-medium">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </button>
          </div>
        </div>

        {/* Enhanced Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{sensors.filter(s => s.status === 'normal').length}</span>
                <p className="text-xs text-green-600 font-medium">Active</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Normal</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{sensors.filter(s => s.status === 'warning').length}</span>
                <p className="text-xs text-yellow-600 font-medium">Monitor</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Warning</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{sensors.filter(s => s.status === 'critical').length}</span>
                <p className="text-xs text-red-600 font-medium">Urgent</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Critical</p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-gray-500" />
              <div className="text-right">
                <span className="text-3xl font-bold text-gray-900">{sensors.filter(s => s.status === 'offline').length}</span>
                <p className="text-xs text-gray-600 font-medium">Inactive</p>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-600">Offline</p>
          </div>
          <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 shadow-lg text-white">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8" />
              <div className="text-right">
                <span className="text-3xl font-bold">98.5%</span>
                <p className="text-xs text-sky-100">Uptime</p>
              </div>
            </div>
            <p className="text-sm font-medium text-sky-100">System Health</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Map Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Advanced Map Controls */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <select
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                      className="appearance-none px-5 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                    >
                      <option value="all">All Zones</option>
                      {zones.map(zone => (
                        <option key={zone.id} value={zone.id}>{zone.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="relative">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="appearance-none px-5 py-3 pr-10 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="normal">Normal Only</option>
                      <option value="warning">Warning Only</option>
                      <option value="critical">Critical Only</option>
                      <option value="offline">Offline Only</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('map')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'map' 
                          ? 'bg-white shadow text-sky-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <MapIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'grid' 
                          ? 'bg-white shadow text-sky-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Grid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        viewMode === 'list' 
                          ? 'bg-white shadow text-sky-600' 
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setAutoRefresh(!autoRefresh)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      autoRefresh 
                        ? 'bg-sky-500 text-white shadow-lg' 
                        : 'border-2 border-gray-200 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {autoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {autoRefresh ? 'Pause' : 'Live'}
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <Maximize2 className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowHeatmap(!showHeatmap)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      showHeatmap 
                        ? 'bg-sky-100 text-sky-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {showHeatmap ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    Heatmap
                  </button>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      showGrid 
                        ? 'bg-sky-100 text-sky-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                    Grid
                  </button>
                  <button
                    onClick={() => setShowFlowLines(!showFlowLines)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                      showFlowLines 
                        ? 'bg-sky-100 text-sky-700' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Route className="w-4 h-4" />
                    Flow Lines
                  </button>
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm text-gray-600">Zoom:</span>
                  <button
                    onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}
                    className="p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-700" />
                  </button>
                  <div className="px-3 py-2 border-2 border-gray-200 rounded-lg font-bold text-gray-700 min-w-16 text-center">
                    {zoomLevel}%
                  </div>
                  <button
                    onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}
                    className="p-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Map with Enhanced Features */}
            <div className={`bg-white rounded-3xl shadow-sm border border-gray-100 ${isFullscreen ? 'p-4' : 'p-8'}`}>
              <div 
                className="relative bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 rounded-2xl overflow-hidden border-2 border-gray-200"
                style={{ 
                  height: isFullscreen ? 'calc(100vh - 200px)' : '700px',
                  backgroundImage: showGrid 
                    ? `radial-gradient(circle at 1px 1px, #e0e7ff 1px, transparent 0)` 
                    : 'none',
                  backgroundSize: '40px 40px'
                }}
              >
                {/* Layer Overlay */}
                {mapLayer === 'satellite' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-green-200/30 via-blue-200/30 to-gray-200/30"></div>
                )}

                {mapLayer === 'terrain' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/40 via-amber-100/40 to-stone-100/40"></div>
                )}

                {/* Enhanced Heatmap */}
                {showHeatmap && (
                  <div className="absolute inset-0 pointer-events-none">
                    {filteredSensors.map((sensor) => (
                      <div
                        key={`heatmap-${sensor.id}`}
                        className="absolute rounded-full blur-3xl opacity-30 animate-pulse"
                        style={{
                          left: `${sensor.coordinates.x}%`,
                          top: `${sensor.coordinates.y}%`,
                          width: '300px',
                          height: '300px',
                          background: `radial-gradient(circle, ${getStatusColor(sensor.status)}80, transparent)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Flow Lines */}
                {showFlowLines && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {filteredSensors.slice(0, 3).map((sensor, index) => (
                      <path
                        key={`flow-${index}`}
                        d={`M ${sensor.coordinates.x},${sensor.coordinates.y} C ${sensor.coordinates.x + 10},${sensor.coordinates.y - 15} ${sensor.coordinates.x + 25},${sensor.coordinates.y} ${sensor.coordinates.x + 40},${sensor.coordinates.y + 20}`}
                        stroke="#3b82f6"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="5,5"
                        opacity="0.6"
                      />
                    ))}
                  </svg>
                )}

                {/* Zone Boundaries */}
                {zones.map(zone => (
                  <div
                    key={zone.id}
                    className={`absolute border-2 border-dashed opacity-30 rounded-3xl`}
                    style={{
                      left: '10%',
                      top: '10%',
                      width: '80%',
                      height: '80%',
                      borderColor: zone.color,
                      display: selectedZone === 'all' || selectedZone === zone.id ? 'block' : 'none'
                    }}
                  ></div>
                ))}

                {/* Sensor Markers */}
                {filteredSensors.map((sensor) => {
                  const zone = zones.find(z => z.id === sensor.zone);
                  return (
                    <div
                      key={sensor.id}
                      className="absolute cursor-pointer group"
                      style={{
                        left: `${sensor.coordinates.x}%`,
                        top: `${sensor.coordinates.y}%`,
                        transform: `translate(-50%, -50%) scale(${zoomLevel / 100})`,
                        transition: 'transform 0.3s ease'
                      }}
                      onClick={() => setSelectedSensor(sensor)}
                    >
                      {/* Zone indicator */}
                      {zone && (
                        <div
                          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg"
                          style={{ backgroundColor: zone.color }}
                        >
                          {zone.name.split(' ')[1].charAt(0)}
                        </div>
                      )}

                      {/* Pulse animation */}
                      {(sensor.status === 'critical' || sensor.status === 'warning') && (
                        <div
                          className="absolute inset-0 rounded-full animate-ping"
                          style={{
                            backgroundColor: getStatusColor(sensor.status),
                            opacity: 0.3,
                            width: '56px',
                            height: '56px',
                            transform: 'translate(-50%, -50%)',
                            left: '50%',
                            top: '50%'
                          }}
                        />
                      )}

                      {/* Sensor marker */}
                      <div
                        className="relative w-14 h-14 rounded-2xl shadow-lg border-4 border-white flex items-center justify-center text-white font-bold transform group-hover:scale-125 transition-all duration-300 hover:shadow-2xl"
                        style={{ 
                          backgroundColor: getStatusColor(sensor.status),
                          boxShadow: `0 8px 32px ${getStatusColor(sensor.status)}40`
                        }}
                      >
                        {getStatusIcon(sensor.status)}
                        
                        {/* Metric badge */}
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg px-2 py-1 shadow-md border">
                          <span className="text-xs font-bold" style={{ color: getStatusColor(sensor.status) }}>
                            {getMetricValue(sensor, selectedMetric)}{selectedMetric === 'level' ? '%' : ''}
                          </span>
                        </div>
                      </div>

                      {/* Enhanced Tooltip */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                        <div className="bg-gray-900 text-white p-4 rounded-xl shadow-2xl min-w-64">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <p className="font-bold text-sm">{sensor.name}</p>
                              <p className="text-xs text-gray-300">{sensor.id} • {sensor.zone.toUpperCase()}</p>
                            </div>
                            <span 
                              className="px-2 py-1 rounded text-xs font-bold"
                              style={{ backgroundColor: getStatusColor(sensor.status) }}
                            >
                              {sensor.status.toUpperCase()}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                            <div className="flex items-center gap-1">
                              <Droplets className="w-3 h-3" />
                              <span>{sensor.waterLevel}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Wind className="w-3 h-3" />
                              <span>{sensor.flowRate} L/s</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Battery className="w-3 h-3" />
                              <span>{sensor.battery}%</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{sensor.lastUpdate}</span>
                            </div>
                          </div>
                          <button className="w-full mt-2 py-1 bg-sky-600 text-white text-xs rounded-lg hover:bg-sky-700 transition-colors">
                            View Details →
                          </button>
                        </div>
                        <div className="w-3 h-3 bg-gray-900 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"></div>
                      </div>

                      {/* Selected indicator */}
                      {selectedSensor?.id === sensor.id && (
                        <>
                          <div className="absolute inset-0 rounded-full border-4 border-sky-500 animate-pulse" 
                            style={{ width: '64px', height: '64px', transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}>
                          </div>
                          <div className="absolute -inset-4 rounded-full border-2 border-sky-300 animate-ping"></div>
                        </>
                      )}
                    </div>
                  );
                })}

                {/* Enhanced Map Controls */}
                <div className="absolute bottom-6 left-6 space-y-3">
                  <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Visualization</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium text-gray-700">Normal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-xs font-medium text-gray-700">Warning</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-xs font-medium text-gray-700">Critical</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                        <span className="text-xs font-medium text-gray-700">Offline</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg p-4 border-2 border-gray-100">
                    <h3 className="font-bold text-gray-900 mb-3 text-sm">Display Metric</h3>
                    <div className="flex flex-col gap-2">
                      {(['level', 'flow', 'temp'] as const).map(metric => (
                        <button
                          key={metric}
                          onClick={() => setSelectedMetric(metric)}
                          className={`text-xs px-3 py-2 rounded-lg transition-all ${
                            selectedMetric === metric 
                              ? 'bg-sky-100 text-sky-700 font-medium' 
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {metric === 'level' ? 'Water Level' : 
                           metric === 'flow' ? 'Flow Rate' : 'Temperature'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Compass and Scale */}
                <div className="absolute top-6 right-6 flex flex-col gap-3">
                  <div className="bg-white rounded-full shadow-lg p-3 border-2 border-gray-100">
                    <Navigation className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="bg-white rounded-xl shadow-lg p-3 border-2 border-gray-100">
                    <div className="w-24 h-1 bg-gray-800 mb-1"></div>
                    <p className="text-xs text-gray-600 text-center">100m</p>
                  </div>
                </div>

                {/* Time Range Selector */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex bg-white rounded-xl shadow-lg border-2 border-gray-100 overflow-hidden">
                    {(['24h', '7d', '30d'] as const).map(range => (
                      <button
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 text-sm font-medium transition-all ${
                          timeRange === range 
                            ? 'bg-sky-500 text-white' 
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Panel */}
          <div className="space-y-6">
            {/* Sensor Details Panel */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Sensor Details</h2>
                  <p className="text-sm text-gray-500">Select a sensor for detailed information</p>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Star className="w-5 h-5 text-gray-500" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Settings className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {selectedSensor ? (
                <div className="space-y-6">
                  {/* Sensor Header with Zone */}
                  <div className="pb-6 border-b-2 border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedSensor.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                          <MapPin className="w-4 h-4" />
                          {selectedSensor.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span 
                          className="px-3 py-1.5 rounded-xl text-sm font-bold text-white"
                          style={{ backgroundColor: getStatusColor(selectedSensor.status) }}
                        >
                          {selectedSensor.status.toUpperCase()}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs ${getMaintenanceColor(selectedSensor.maintenance.status)}`}>
                          {selectedSensor.maintenance.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-gray-500">{selectedSensor.id}</span>
                        <span className="text-gray-500">•</span>
                        <span className="font-medium text-gray-700">
                          Zone {zones.find(z => z.id === selectedSensor.zone)?.name.split(':')[0]}
                        </span>
                      </div>
                      <p className="text-gray-500 flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        Updated {selectedSensor.lastUpdate}
                      </p>
                    </div>
                  </div>

                  {/* Enhanced Metrics */}
                  <div className="space-y-4">
                    {/* Water Level with History */}
                    <div className="bg-sky-50 rounded-2xl p-5 border-2 border-sky-100">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Droplets className="w-5 h-5 text-sky-600" />
                          <span className="text-sm font-semibold text-gray-700">Water Level</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-bold text-sky-600">{selectedSensor.waterLevel}</span>
                          <span className="text-sky-600 font-medium">%</span>
                          {selectedSensor.history && (
                            <span className={`text-xs font-medium ${
                              selectedSensor.waterLevel > 70 ? 'text-red-500' : 
                              selectedSensor.waterLevel > 50 ? 'text-yellow-500' : 'text-green-500'
                            }`}>
                              <TrendingUp className="inline w-3 h-3 mr-1" />
                              +{selectedSensor.history[selectedSensor.history.length - 1].value - selectedSensor.history[0].value}%
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-full h-3 bg-white/70 rounded-full overflow-hidden mb-2">
                        <div 
                          className="h-full bg-gradient-to-r from-sky-400 to-sky-600 transition-all duration-500"
                          style={{ width: `${selectedSensor.waterLevel}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                      </div>
                      
                      {/* Mini History Chart */}
                      {selectedSensor.history && (
                        <div className="mt-4 pt-4 border-t border-sky-100">
                          <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                            <span>Today's trend</span>
                            <span className="text-sky-600 font-medium">View full history →</span>
                          </div>
                          <div className="flex items-end h-8 gap-1">
                            {selectedSensor.history.map((point, index) => (
                              <div
                                key={index}
                                className="flex-1 bg-sky-200 rounded-t"
                                style={{ height: `${(point.value / 100) * 100}%` }}
                                title={`${point.time}: ${point.value}%`}
                              >
                                <div className="w-full h-full bg-gradient-to-t from-sky-400 to-sky-300 rounded-t"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Other Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border-2 border-orange-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Thermometer className="w-5 h-5 text-orange-600" />
                          <span className="text-xs font-semibold text-gray-700">Temperature</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold text-orange-600">{selectedSensor.temperature}</p>
                          <span className="text-orange-600 font-medium">°C</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Normal range: 18-26°C</p>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border-2 border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="w-5 h-5 text-blue-600" />
                          <span className="text-xs font-semibold text-gray-700">Flow Rate</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold text-blue-600">{selectedSensor.flowRate}</p>
                          <span className="text-blue-600 font-medium">L/s</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Optimal: 40-80 L/s</p>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 border-2 border-green-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Battery className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-semibold text-gray-700">Battery</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold text-green-600">{selectedSensor.battery}</p>
                          <span className="text-green-600 font-medium">%</span>
                        </div>
                        <div className="w-full h-2 bg-green-200 rounded-full mt-2 overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-600"
                            style={{ width: `${selectedSensor.battery}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-4 border-2 border-purple-100">
                        <div className="flex items-center gap-2 mb-2">
                          <Signal className="w-5 h-5 text-purple-600" />
                          <span className="text-xs font-semibold text-gray-700">Signal</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                          <p className="text-2xl font-bold text-purple-600">{selectedSensor.signal}</p>
                          <span className="text-purple-600 font-medium">%</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Excellent: &gt;85%</p>
                      </div>
                    </div>

                    {/* Maintenance Info */}
                    <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-gray-700">Maintenance Schedule</h4>
                        <History className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-xs text-gray-500">Last Maintenance</p>
                          <p className="font-medium text-gray-900">{selectedSensor.maintenance.last}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Next Due</p>
                          <p className="font-medium text-gray-900">{selectedSensor.maintenance.next}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-6 border-t-2 border-gray-100 space-y-3">
                    <button className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Full History & Analytics
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Report Issue
                      </button>
                      <button className="py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                        <Printer className="w-4 h-4" />
                        Print Report
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-sky-100 to-blue-100 flex items-center justify-center">
                    <MapPin className="w-10 h-10 text-sky-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Sensor Selected</h3>
                  <p className="text-gray-500">Click on any sensor marker to view detailed information</p>
                  <p className="text-sm text-gray-400 mt-1">Real-time data will appear here</p>
                </div>
              )}
            </div>

            {/* Zones Overview */}
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl shadow-xl p-8 text-white">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Zones Overview</h3>
                <BarChart3 className="w-6 h-6 text-sky-200" />
              </div>
              
              <div className="space-y-6">
                {zones.map(zone => (
                  <div key={zone.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: zone.color }}
                        ></div>
                        <span className="font-medium text-sky-100">{zone.name.split(':')[0]}</span>
                      </div>
                      <span className="text-2xl font-bold">{zone.sensors} sensors</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-sky-200">{zone.alerts} active alerts</span>
                      <span className="font-bold">Avg: {zone.avgLevel}%</span>
                    </div>
                    <div className="w-full h-2 bg-sky-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-sky-300 to-white"
                        style={{ width: `${zone.avgLevel}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                
                <div className="pt-6 border-t border-sky-400/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sky-100">Total Coverage</span>
                    <span className="text-xl font-bold">12.5 km²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sky-100">Network Health</span>
                    <span className="text-xl font-bold">94.7%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-sky-100">Avg Response</span>
                    <span className="text-xl font-bold">98.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors flex flex-col items-center justify-center gap-2">
                  <Bell className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-medium text-gray-700">Alerts</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors flex flex-col items-center justify-center gap-2">
                  <Calendar className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-medium text-gray-700">Schedule</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors flex flex-col items-center justify-center gap-2">
                  <Save className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-medium text-gray-700">Save View</span>
                </button>
                <button className="p-4 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors flex flex-col items-center justify-center gap-2">
                  <Filter className="w-5 h-5 text-sky-600" />
                  <span className="text-sm font-medium text-gray-700">Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapViewPage;