import React, { useState } from 'react';
import { 
  AlertTriangle, Bell, CheckCircle, XCircle, Clock, Filter,
  Search, Download, RefreshCw, Eye, Trash2, Check, X,
  TrendingUp, MapPin, Droplets, Thermometer, Wind, Info,
  ChevronDown, Calendar, User, AlertCircle, Zap, Activity,
  ArrowUp, ArrowDown, MoreVertical, Archive, Share2, Flag
} from 'lucide-react';

interface Alert {
  id: string;
  sensorId: string;
  sensorLocation: string;
  type: 'critical' | 'warning' | 'info';
  category: 'water_level' | 'temperature' | 'flow_rate' | 'sensor_error' | 'battery' | 'maintenance';
  title: string;
  description: string;
  timestamp: string;
  status: 'active' | 'acknowledged' | 'resolved';
  priority: 'high' | 'medium' | 'low';
  value?: string;
  threshold?: string;
  assignedTo?: string;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
  resolvedBy?: string;
  resolvedAt?: string;
}

const AlertsPage: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'active' | 'acknowledged' | 'resolved'>('all');
  const [filterType, setFilterType] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');

  const alerts: Alert[] = [
    {
      id: 'ALT-001',
      sensorId: 'S-103',
      sensorLocation: 'Main Street Junction',
      type: 'critical',
      category: 'water_level',
      title: 'Critical Water Level Exceeded',
      description: 'Water level has exceeded 85% threshold. Immediate attention required to prevent overflow.',
      timestamp: '5 minutes ago',
      status: 'active',
      priority: 'high',
      value: '87%',
      threshold: '80%',
      assignedTo: 'John Doe'
    },
    {
      id: 'ALT-002',
      sensorId: 'S-087',
      sensorLocation: 'Park Avenue Drain',
      type: 'warning',
      category: 'flow_rate',
      title: 'Abnormal Flow Rate Detected',
      description: 'Flow rate has dropped below normal levels. Possible blockage detected.',
      timestamp: '15 minutes ago',
      status: 'acknowledged',
      priority: 'medium',
      value: '35 L/s',
      threshold: '50 L/s',
      assignedTo: 'Jane Smith',
      acknowledgedBy: 'Jane Smith',
      acknowledgedAt: '10 minutes ago'
    },
    {
      id: 'ALT-003',
      sensorId: 'S-045',
      sensorLocation: 'Central Plaza',
      type: 'warning',
      category: 'temperature',
      title: 'High Temperature Alert',
      description: 'Temperature reading above normal range. Monitor for equipment issues.',
      timestamp: '30 minutes ago',
      status: 'active',
      priority: 'medium',
      value: '28°C',
      threshold: '26°C'
    },
    {
      id: 'ALT-004',
      sensorId: 'S-112',
      sensorLocation: 'Harbor District',
      type: 'info',
      category: 'maintenance',
      title: 'Scheduled Maintenance Due',
      description: 'Routine maintenance scheduled for this sensor within 48 hours.',
      timestamp: '1 hour ago',
      status: 'active',
      priority: 'low',
      assignedTo: 'Maintenance Team'
    },
    {
      id: 'ALT-005',
      sensorId: 'S-120',
      sensorLocation: 'Shopping District',
      type: 'critical',
      category: 'sensor_error',
      title: 'Sensor Communication Lost',
      description: 'Unable to communicate with sensor. Check power and connectivity.',
      timestamp: '2 hours ago',
      status: 'acknowledged',
      priority: 'high',
      acknowledgedBy: 'Tech Team',
      acknowledgedAt: '1 hour ago'
    },
    {
      id: 'ALT-006',
      sensorId: 'S-078',
      sensorLocation: 'Residential Block 5',
      type: 'warning',
      category: 'battery',
      title: 'Low Battery Warning',
      description: 'Battery level below 20%. Schedule battery replacement soon.',
      timestamp: '3 hours ago',
      status: 'resolved',
      priority: 'medium',
      value: '18%',
      threshold: '20%',
      resolvedBy: 'John Doe',
      resolvedAt: '2 hours ago'
    }
  ];

  const filteredAlerts = alerts.filter(alert => {
    const matchesTab = selectedTab === 'all' || alert.status === selectedTab;
    const matchesType = filterType === 'all' || alert.type === filterType;
    const matchesPriority = filterPriority === 'all' || alert.priority === filterPriority;
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sensorId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.sensorLocation.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesTab && matchesType && matchesPriority && matchesSearch;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-500';
      case 'warning': return 'bg-yellow-500';
      case 'info': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeBg = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      case 'warning': return <AlertCircle className="w-5 h-5" />;
      case 'info': return <Info className="w-5 h-5" />;
      default: return <Bell className="w-5 h-5" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'water_level': return <Droplets className="w-4 h-4" />;
      case 'temperature': return <Thermometer className="w-4 h-4" />;
      case 'flow_rate': return <Wind className="w-4 h-4" />;
      case 'sensor_error': return <Zap className="w-4 h-4" />;
      case 'battery': return <Activity className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Active</span>;
      case 'acknowledged':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">Acknowledged</span>;
      case 'resolved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Resolved</span>;
      default:
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-bold">Unknown</span>;
    }
  };

  const stats = {
    total: alerts.length,
    active: alerts.filter(a => a.status === 'active').length,
    acknowledged: alerts.filter(a => a.status === 'acknowledged').length,
    resolved: alerts.filter(a => a.status === 'resolved').length,
    critical: alerts.filter(a => a.type === 'critical').length,
    warning: alerts.filter(a => a.type === 'warning').length
  };

  const toggleSelectAlert = (id: string) => {
    setSelectedAlerts(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const selectAllAlerts = () => {
    if (selectedAlerts.length === filteredAlerts.length) {
      setSelectedAlerts([]);
    } else {
      setSelectedAlerts(filteredAlerts.map(a => a.id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-sky-50 to-blue-50 p-8">
      <div className="max-w-[1800px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
              Alerts & Notifications
            </h1>
            <p className="text-lg text-gray-600">
              Monitor and manage system alerts in real-time
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button className="flex items-center px-6 py-3.5 border-2 border-gray-200 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 text-gray-700 font-medium">
              <RefreshCw className="w-5 h-5 mr-2" />
              Refresh
            </button>
            <button className="flex items-center px-6 py-3.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl hover:from-sky-600 hover:to-blue-700 shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40 transition-all duration-300 font-medium">
              <Download className="w-5 h-5 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Bell className="w-6 h-6 text-sky-500" />
              <span className="text-3xl font-bold text-gray-900">{stats.total}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Total Alerts</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <span className="text-3xl font-bold text-red-600">{stats.active}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Active</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Eye className="w-6 h-6 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-600">{stats.acknowledged}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Acknowledged</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <span className="text-3xl font-bold text-green-600">{stats.resolved}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Resolved</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <Zap className="w-6 h-6 text-red-500" />
              <span className="text-3xl font-bold text-red-600">{stats.critical}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Critical</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
              <span className="text-3xl font-bold text-yellow-600">{stats.warning}</span>
            </div>
            <p className="text-sm font-medium text-gray-600">Warnings</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-2">
          <div className="flex gap-2">
            {(['all', 'active', 'acknowledged', 'resolved'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`flex-1 py-4 px-6 rounded-2xl font-semibold text-base transition-all ${
                  selectedTab === tab
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alerts by sensor ID, location, or description..."
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
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="appearance-none px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                >
                  <option value="all">All Types</option>
                  <option value="critical">Critical</option>
                  <option value="warning">Warning</option>
                  <option value="info">Info</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="appearance-none px-6 py-4 pr-12 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent font-medium text-gray-700 bg-white cursor-pointer"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedAlerts.length > 0 && (
            <div className="mb-6 p-4 bg-sky-50 border-2 border-sky-200 rounded-2xl">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">
                  {selectedAlerts.length} alert{selectedAlerts.length > 1 ? 's' : ''} selected
                </span>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    Acknowledge
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Resolve
                  </button>
                  <button className="px-4 py-2 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={selectedAlerts.length === filteredAlerts.length && filteredAlerts.length > 0}
                onChange={selectAllAlerts}
                className="w-5 h-5 rounded border-2 border-gray-300 text-sky-600 focus:ring-sky-500"
              />
              <p className="text-gray-600 font-medium">
                Showing <span className="text-sky-600 font-bold">{filteredAlerts.length}</span> of {alerts.length} alerts
              </p>
            </div>
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('card')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'card' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewMode === 'list' 
                    ? 'bg-white text-sky-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                List View
              </button>
            </div>
          </div>

          {/* Alerts Display - Card View */}
          {viewMode === 'card' && filteredAlerts.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-6 rounded-2xl border-2 ${getTypeBg(alert.type)} hover:shadow-lg transition-all`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedAlerts.includes(alert.id)}
                      onChange={() => toggleSelectAlert(alert.id)}
                      className="mt-1 w-5 h-5 rounded border-2 border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                    />
                    
                    <div className={`p-3 rounded-xl ${getTypeColor(alert.type)} text-white flex-shrink-0`}>
                      {getTypeIcon(alert.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-3 gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{alert.title}</h3>
                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          {getStatusBadge(alert.status)}
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                            alert.priority === 'high' ? 'bg-red-100 text-red-700' :
                            alert.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {alert.priority.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="font-semibold">{alert.sensorId}</span>
                        <span>•</span>
                        <span>{alert.sensorLocation}</span>
                      </div>

                      <p className="text-sm text-gray-700 mb-4">{alert.description}</p>

                      {alert.value && (
                        <div className="flex items-center gap-4 mb-4 p-3 bg-white/70 rounded-xl">
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(alert.category)}
                            <span className="text-sm font-semibold text-gray-700">Current: {alert.value}</span>
                          </div>
                          {alert.threshold && (
                            <>
                              <span className="text-gray-400">|</span>
                              <span className="text-sm font-semibold text-gray-700">Threshold: {alert.threshold}</span>
                            </>
                          )}
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-3 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                        <div className="flex gap-2">
                          {alert.status === 'active' && (
                            <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                              <Check className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {(alert.acknowledgedBy || alert.resolvedBy) && (
                        <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 space-y-1">
                          {alert.acknowledgedBy && (
                            <p className="flex items-center gap-2">
                              <User className="w-3 h-3" />
                              Acknowledged by <span className="font-semibold">{alert.acknowledgedBy}</span> {alert.acknowledgedAt}
                            </p>
                          )}
                          {alert.resolvedBy && (
                            <p className="flex items-center gap-2">
                              <CheckCircle className="w-3 h-3" />
                              Resolved by <span className="font-semibold">{alert.resolvedBy}</span> {alert.resolvedAt}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Alerts Display - List View */}
          {viewMode === 'list' && filteredAlerts.length > 0 && (
            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center gap-4 p-4 bg-white border-2 border-gray-100 rounded-xl hover:shadow-md transition-all"
                >
                  <input
                    type="checkbox"
                    checked={selectedAlerts.includes(alert.id)}
                    onChange={() => toggleSelectAlert(alert.id)}
                    className="w-5 h-5 rounded border-2 border-gray-300 text-sky-600 focus:ring-sky-500 cursor-pointer"
                  />
                  
                  <div className={`p-2 rounded-lg ${getTypeColor(alert.type)} text-white flex-shrink-0`}>
                    {getTypeIcon(alert.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-gray-900 truncate">{alert.title}</h3>
                      {getStatusBadge(alert.status)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-semibold">{alert.sensorId}</span>
                      <span>•</span>
                      <span>{alert.sensorLocation}</span>
                    </div>
                  </div>

                  {alert.value && (
                    <div className="text-right flex-shrink-0">
                      <p className="text-lg font-bold text-gray-900">{alert.value}</p>
                      {alert.threshold && (
                        <p className="text-xs text-gray-500">Threshold: {alert.threshold}</p>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-sm text-gray-600 flex-shrink-0">
                    <Clock className="w-4 h-4" />
                    <span>{alert.timestamp}</span>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {alert.status === 'active' && (
                      <button className="p-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    <button className="p-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredAlerts.length === 0 && (
            <div className="text-center py-16">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Alerts Found</h3>
              <p className="text-gray-600">No alerts match your current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;