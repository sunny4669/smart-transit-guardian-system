
import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface LocationProps {
  onRouteSelected: (start: string, end: string, amount: number) => void;
}

const MapLocation: React.FC<LocationProps> = ({ onRouteSelected }) => {
  const [startLocation, setStartLocation] = useState<string>("");
  const [endLocation, setEndLocation] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("Searching...");
  
  const locations = [
    "Tech Park Station", 
    "Central Avenue", 
    "Market Square", 
    "University Campus", 
    "Stadium Complex", 
    "Hospital Junction", 
    "Business District"
  ];
  
  // Calculate fare based on locations (simplified logic)
  const calculateFare = (start: string, end: string): number => {
    if (!start || !end) return 0;
    
    // Get indices to calculate distance
    const startIndex = locations.indexOf(start);
    const endIndex = locations.indexOf(end);
    
    if (startIndex === -1 || endIndex === -1) return 0;
    
    // Base fare + distance-based fare (₹10 base + ₹5 per stop)
    const stops = Math.abs(endIndex - startIndex);
    return 10 + (stops * 5);
  };
  
  // Simulate finding current location
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentLocation("Central Avenue");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRouteSelection = () => {
    if (startLocation && endLocation) {
      const fare = calculateFare(startLocation, endLocation);
      onRouteSelected(startLocation, endLocation, fare);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-3">
        <Navigation className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-sm font-medium">Current Location</p>
          <p className="text-base">
            {currentLocation === "Searching..." ? (
              <span className="flex items-center">
                <span className="animate-pulse bg-blue-200 rounded-full h-2 w-2 mr-2"></span>
                {currentLocation}
              </span>
            ) : (
              currentLocation
            )}
          </p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1">Starting Point</label>
          <Select value={startLocation} onValueChange={setStartLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select starting point" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={`start-${loc}`} value={loc}>
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-blue-500" />
                    {loc}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="text-sm font-medium block mb-1">Destination</label>
          <Select value={endLocation} onValueChange={setEndLocation}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select destination" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={`end-${loc}`} value={loc}>
                  <div className="flex items-center">
                    <MapPin className="h-3.5 w-3.5 mr-2 text-red-500" />
                    {loc}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {startLocation && endLocation && (
          <div className="text-sm bg-blue-50 p-2 rounded">
            <p className="font-medium">Route Summary</p>
            <p className="mt-1">From: {startLocation}</p>
            <p>To: {endLocation}</p>
            <p className="mt-1 font-medium">Fare: ₹{calculateFare(startLocation, endLocation)}</p>
          </div>
        )}
        
        <Button 
          onClick={handleRouteSelection} 
          disabled={!startLocation || !endLocation}
          className="w-full"
        >
          Confirm Route
        </Button>
      </div>
    </div>
  );
};

export default MapLocation;
