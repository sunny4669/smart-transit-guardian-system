
import React, { useState } from 'react';
import { Trash2, RotateCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const MiniDustbinStatus = () => {
  const [dustbins, setDustbins] = useState([
    { id: 1, location: 'Front Section', fillLevel: 65 },
    { id: 2, location: 'Middle Section', fillLevel: 45 },
    { id: 3, location: 'Rear Section', fillLevel: 80 },
    { id: 4, location: 'Handicapped Area', fillLevel: 30 },
  ]);

  const resetDustbins = () => {
    setDustbins(dustbins.map(bin => ({ ...bin, fillLevel: 0 })));
  };

  const getFillLevelColor = (level: number) => {
    if (level < 40) return 'bg-green-500';
    if (level < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Trash2 className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Mini Dustbin Status</span>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={resetDustbins}
          className="flex items-center text-xs"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-3">
        {dustbins.map(bin => (
          <div key={bin.id} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span>{bin.location}</span>
              <span className={`font-medium ${bin.fillLevel > 70 ? 'text-red-600' : ''}`}>
                {bin.fillLevel}% Full
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getFillLevelColor(bin.fillLevel)}`}
                style={{ width: `${bin.fillLevel}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniDustbinStatus;
