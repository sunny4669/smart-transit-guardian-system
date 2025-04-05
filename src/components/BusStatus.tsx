
import React from 'react';
import { MapPin, Gauge, Clock } from 'lucide-react';

interface BusStatusProps {
  busState: {
    brakeStatus: string;
    tireStatus: string;
    smokingDetected: boolean;
    emergencyGateOpen: boolean;
    batteryLevel: number;
    speed: number;
    location: string;
    nextStop: string;
    estimatedArrival: string;
  };
}

const BusStatus: React.FC<BusStatusProps> = ({ busState }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Current Location</p>
          <p className="text-lg">{busState.location}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Gauge className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Current Speed</p>
          <p className="text-lg">{busState.speed} km/h</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Next Stop</p>
          <p className="text-lg">{busState.nextStop}</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Estimated Arrival</p>
          <p className="text-lg">{busState.estimatedArrival}</p>
        </div>
      </div>
      
      {busState.emergencyGateOpen && (
        <div className="mt-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-bold">ALERT: Emergency Gates Activated</p>
        </div>
      )}
    </div>
  );
};

export default BusStatus;
