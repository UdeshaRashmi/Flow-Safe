import React, { useState } from 'react';
import { MapPin, ZoomIn, ZoomOut, Navigation, Filter } from 'lucide-react';

interface MapLocation {
  id: string;
  name: string;
  x: number;
  y: number;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  waterLevel: number;
}

const MapView: React.FC = () => {
  const [zoom, setZoom] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const locations: MapLocation[] = [
    { id: 'L1', name: 'Main Street', x: 30, y: 40, status: 'normal', waterLevel: 45 },
    { id: 'L2', name: 'Market Square', x: 60, y: 30, status: 'warning', waterLevel: 78 },
    { id: 'L3', name: 'Industrial Zone', x: 70, y: 70, status: 'critical', waterLevel: 92 },
    { id: 'L4', name: 'Residential Block', x: 20, y: 60, status: 'normal', waterLevel: 32 },
    { id: 'L5', name: 'Park Avenue', x: 50, y: 50, status: 'normal', waterLevel: 65 },
    { id: 'L6', name: 'Hospital Area', x: 80, y: 20, status: 'offline', waterLevel: 0 },
    { id: 'L7', name: 'School Zone', x: 40, y: 80, status: 'warning', waterLevel: 72 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBorder = (status: string) => {
    switch (status) {
      case 'normal': return 'border-green-500';
      case 'warning': return 'border-yellow-500';
      case 'critical': return 'border-red-500';
      case 'offline': return 'border-gray-500';
      default: return 'border-gray-300';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  return (
    <div className="h-[400px] relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl overflow-hidden border border-gray-200">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
          title="Zoom In"
        >
          <ZoomIn className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
          title="Zoom Out"
        >
          <ZoomOut className="w-5 h-5 text-gray-600" />
        </button>
        <button
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
          title="Recenter"
        >
          <Navigation className="w-5 h-5 text-gray-600" />
        </button>
        <button
          className="p-2 bg-white rounded-lg shadow-sm hover:bg-gray-50 border border-gray-200"
          title="Filter"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-2">Status Legend</h4>
        <div className="space-y-2">
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
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-sm">Offline</span>
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative w-full h-full">
        {/* Map Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{
            backgroundImage: `linear-gradient(to right, #cbd5e1 1px, transparent 1px),
                             linear-gradient(to bottom, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: `${50 * zoom}px ${50 * zoom}px`
          }}></div>
        </div>

        {/* Water Flow Lines */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 60,30 Q 70,40 50,50 T 30,60 T 20,80"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.4"
          />
          <path
            d="M 30,40 Q 40,45 60,30 T 80,20"
            stroke="#0ea5e9"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5,5"
            opacity="0.4"
          />
        </svg>

        {/* Drain Locations */}
        {locations.map((location) => (
          <div
            key={location.id}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ${
              selectedLocation === location.id ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`,
            }}
            onClick={() => setSelectedLocation(location.id === selectedLocation ? null : location.id)}
          >
            <div className="relative">
              <div className={`w-8 h-8 rounded-full ${getStatusColor(location.status)} border-2 ${getStatusBorder(location.status)} flex items-center justify-center`}>
                <MapPin className="w-4 h-4 text-white" />
              </div>
              
              {/* Water Level Indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-white rounded-full border border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold" style={{
                  color: location.waterLevel >= 80 ? '#ef4444' : 
                         location.waterLevel >= 60 ? '#f59e0b' : '#10b981'
                }}>
                  {location.waterLevel}%
                </span>
              </div>
            </div>

            {/* Tooltip */}
            {selectedLocation === location.id && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-20">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-800">{location.name}</h4>
                    <p className="text-sm text-gray-500">{location.id}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    location.status === 'normal' ? 'bg-green-100 text-green-800' :
                    location.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                    location.status === 'critical' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {location.status.toUpperCase()}
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Water Level:</span>
                    <span className="font-medium">{location.waterLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium">{location.status}</span>
                  </div>
                </div>
                <button className="w-full mt-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  View Details
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Map Labels */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 text-sm">
            <span className="text-gray-600">Drain Network Coverage: 85%</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-600">Active Sensors: {locations.filter(l => l.status !== 'offline').length}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;