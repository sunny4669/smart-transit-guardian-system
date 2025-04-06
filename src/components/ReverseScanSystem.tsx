
import React, { useState } from 'react';
import { Map, ArrowLeftRight, History } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';

const ReverseScanSystem = () => {
  const { toast } = useToast();
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [pastLocations, setPastLocations] = useState([
    { id: 1, location: 'Tech Park Station', time: '09:15 AM', passengers: 12 },
    { id: 2, location: 'Central Avenue', time: '09:32 AM', passengers: 8 },
    { id: 3, location: 'City Mall', time: '09:48 AM', passengers: 15 },
  ]);

  const startReverseScan = () => {
    setScanning(true);
    setScanProgress(0);
    
    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setScanning(false);
          
          // Add a new location after scan completes
          const newLocation = { 
            id: pastLocations.length + 1, 
            location: 'University Junction', 
            time: '10:05 AM', 
            passengers: 10 
          };
          
          setPastLocations(prev => [...prev, newLocation]);
          
          toast({
            title: "Reverse Scan Complete",
            description: "Added University Junction to route history",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeftRight className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Reverse Scan System</span>
        </div>
        <Button 
          size="sm" 
          onClick={startReverseScan}
          disabled={scanning}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {scanning ? 'Scanning...' : 'Start Scan'}
        </Button>
      </div>
      
      {scanning && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Scanning route history...</span>
            <span>{scanProgress}%</span>
          </div>
          <Progress value={scanProgress} className="h-2" />
        </div>
      )}
      
      <div className="border rounded-lg p-3 bg-slate-50">
        <div className="flex items-center mb-2">
          <History className="h-4 w-4 text-blue-600 mr-1" />
          <span className="text-sm font-medium">Past Boarding Locations</span>
        </div>
        <div className="space-y-2 max-h-[120px] overflow-y-auto">
          {pastLocations.map(item => (
            <div key={item.id} className="flex items-center justify-between text-sm border-b border-gray-100 pb-1">
              <div className="flex items-center">
                <Map className="h-3 w-3 text-gray-500 mr-1" />
                <span>{item.location}</span>
              </div>
              <div className="flex space-x-3 text-xs text-gray-500">
                <span>{item.time}</span>
                <span>{item.passengers} passengers</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="text-xs text-gray-500">
        Track semi-destinations and past boarding locations for route optimization. Run a reverse scan to automatically update the route history.
      </div>
    </div>
  );
};

export default ReverseScanSystem;
