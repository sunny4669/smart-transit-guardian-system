
import React, { useState } from 'react';
import { Users, Accessibility, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const PassengerDetectionSystem = () => {
  const [detectionStatus, setDetectionStatus] = useState({
    womenCount: 21,
    menCount: 18,
    handicappedCount: 6,
    pregnantCount: 6,
    seniorCount: 9,
    totalCapacity: 60,
    lastScan: '2 mins ago'
  });

  const occupancyPercentage = Math.round(
    ((detectionStatus.womenCount + detectionStatus.menCount + 
      detectionStatus.handicappedCount + detectionStatus.pregnantCount + 
      detectionStatus.seniorCount) / detectionStatus.totalCapacity) * 100
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Passenger Detection</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="h-4 w-4 mr-1" />
          <span>Last scan: {detectionStatus.lastScan}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="border rounded-lg p-3 bg-blue-50">
          <div className="text-sm font-medium mb-1">Men</div>
          <div className="text-lg font-semibold">{detectionStatus.menCount}</div>
        </div>
        <div className="border rounded-lg p-3 bg-purple-50">
          <div className="text-sm font-medium mb-1">Women</div>
          <div className="text-lg font-semibold">{detectionStatus.womenCount}</div>
        </div>
        <div className="border rounded-lg p-3 bg-pink-50">
          <div className="flex items-center text-sm font-medium mb-1">
            <Accessibility className="h-4 w-4 mr-1 text-pink-600" />
            <span>Handicapped</span>
          </div>
          <div className="text-lg font-semibold">{detectionStatus.handicappedCount}</div>
        </div>
        <div className="border rounded-lg p-3 bg-green-50">
          <div className="text-sm font-medium mb-1">Senior Citizens</div>
          <div className="text-lg font-semibold">{detectionStatus.seniorCount}</div>
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium">Total Occupancy</span>
          <span className="text-sm font-medium">{occupancyPercentage}%</span>
        </div>
        <Progress value={occupancyPercentage} className="h-2" />
      </div>
    </div>
  );
};

export default PassengerDetectionSystem;
