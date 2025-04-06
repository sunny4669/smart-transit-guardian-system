
import React from 'react';
import { AlertTriangle, Cigarette, Gauge, Circle } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EmergencySystemProps {
  busState: {
    brakeStatus: string;
    tireStatus: string;
    smokingDetected: boolean;
  };
  triggerEmergency: (type: 'brake' | 'smoking' | 'tire') => void;
}

const EmergencySystem: React.FC<EmergencySystemProps> = ({ 
  busState, 
  triggerEmergency 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className={`p-4 rounded-lg border ${busState.brakeStatus === 'Normal' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold flex items-center">
            <Gauge className="h-5 w-5 mr-2 text-blue-600" />
            Brake System
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            busState.brakeStatus === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {busState.brakeStatus}
          </span>
        </div>
        <p className="text-sm mb-4">
          {busState.brakeStatus === 'Normal' 
            ? 'Brake system functioning normally with no detected issues.' 
            : 'Brake failure detected! Emergency protocol activated.'}
        </p>
        <Button 
          variant={busState.brakeStatus === 'Normal' ? "destructive" : "outline"} 
          size="sm" 
          onClick={() => triggerEmergency('brake')}
          disabled={busState.brakeStatus !== 'Normal'}
          className="w-full"
        >
          {busState.brakeStatus === 'Normal' ? 'Simulate Brake Failure' : 'Alert Sent'}
        </Button>
      </div>

      <div className={`p-4 rounded-lg border ${!busState.smokingDetected ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold flex items-center">
            <Cigarette className="h-5 w-5 mr-2 text-blue-600" />
            Smoking Detection
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            !busState.smokingDetected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {busState.smokingDetected ? 'Detected' : 'Clear'}
          </span>
        </div>
        <p className="text-sm mb-4">
          {!busState.smokingDetected 
            ? 'Air quality sensors show no signs of smoking in the vehicle.' 
            : 'Smoking detected! Alarm and camera system activated.'}
        </p>
        <Button 
          variant={!busState.smokingDetected ? "destructive" : "outline"} 
          size="sm" 
          onClick={() => triggerEmergency('smoking')}
          disabled={busState.smokingDetected}
          className="w-full"
        >
          {!busState.smokingDetected ? 'Simulate Smoking Detection' : 'Alert Sent'}
        </Button>
      </div>

      <div className={`p-4 rounded-lg border ${busState.tireStatus === 'Good' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold flex items-center">
            <Circle className="h-5 w-5 mr-2 text-blue-600" />
            Tire Status
          </h3>
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
            busState.tireStatus === 'Good' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {busState.tireStatus}
          </span>
        </div>
        <p className="text-sm mb-4">
          {busState.tireStatus === 'Good' 
            ? 'All tires are in good condition with proper pressure levels.' 
            : 'Tire damage detected! Replacement bus has been requested.'}
        </p>
        <Button 
          variant={busState.tireStatus === 'Good' ? "destructive" : "outline"} 
          size="sm" 
          onClick={() => triggerEmergency('tire')}
          disabled={busState.tireStatus !== 'Good'}
          className="w-full"
        >
          {busState.tireStatus === 'Good' ? 'Simulate Tire Damage' : 'Replacement Requested'}
        </Button>
      </div>
    </div>
  );
};

export default EmergencySystem;
