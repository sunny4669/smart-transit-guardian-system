import React, { useState } from 'react';
import { Bus, AlertTriangle, Users, CreditCard, MapPin, Cigarette, Gauge, Circle, Bell, Accessibility, Trash2, ArrowLeftRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import SafetyAlertModal from './SafetyAlertModal';
import PassengerDistribution from './PassengerDistribution';
import PassengerDetectionSystem from './PassengerDetectionSystem';
import BusStatus from './BusStatus';
import EmergencySystem from './EmergencySystem';
import PaymentSystem from './PaymentSystem';
import MiniDustbinStatus from './MiniDustbinStatus';
import ReverseScanSystem from './ReverseScanSystem';
const Dashboard = () => {
  const {
    toast
  } = useToast();
  const [busState, setBusState] = useState({
    brakeStatus: 'Normal',
    tireStatus: 'Good',
    smokingDetected: false,
    emergencyGateOpen: false,
    batteryLevel: 85,
    speed: 45,
    location: 'Central Avenue',
    nextStop: 'Tech Park Station',
    estimatedArrival: '5 mins'
  });
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertType, setAlertType] = useState<'brake' | 'smoking' | 'tire' | null>(null);
  const triggerEmergency = (type: 'brake' | 'smoking' | 'tire') => {
    setAlertType(type);
    setIsAlertModalOpen(true);
    if (type === 'brake') {
      setBusState({
        ...busState,
        brakeStatus: 'Failure Detected',
        emergencyGateOpen: true
      });
      toast({
        title: "Emergency Alert!",
        description: "Brake failure detected. Emergency protocol activated.",
        variant: "destructive"
      });
    } else if (type === 'smoking') {
      setBusState({
        ...busState,
        smokingDetected: true
      });
      toast({
        title: "Smoking Detected!",
        description: "Unauthorized smoking detected on vehicle.",
        variant: "destructive"
      });
    } else if (type === 'tire') {
      setBusState({
        ...busState,
        tireStatus: 'Damaged'
      });
      toast({
        title: "Tire Damage Alert",
        description: "Replacement bus has been requested.",
        variant: "destructive"
      });
    }
  };
  const resetEmergency = () => {
    setIsAlertModalOpen(false);
    setBusState({
      ...busState,
      brakeStatus: 'Normal',
      tireStatus: 'Good',
      smokingDetected: false,
      emergencyGateOpen: false
    });
  };
  return <div className="container mx-auto p-4 max-w-7xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Smart Transit Guardian System</h1>
        <p className="text-gray-600">Next-Generation AI-Powered Public Transport Safety & Management</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bus Status Card */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Bus className="h-5 w-5 text-blue-600" />
              <span>Bus Status</span>
            </CardTitle>
            <CardDescription>Current operation metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <BusStatus busState={busState} />
          </CardContent>
        </Card>

        {/* Passenger Distribution */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span>Passenger Distribution</span>
            </CardTitle>
            <CardDescription>Seating allocation by category</CardDescription>
          </CardHeader>
          <CardContent className="mx-0 py-[16px] rounded-none">
            <PassengerDistribution />
          </CardContent>
        </Card>

        {/* Passenger Detection */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Accessibility className="h-5 w-5 text-blue-600" />
              <span>Passenger Detection</span>
            </CardTitle>
            <CardDescription>Real-time passenger monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <PassengerDetectionSystem />
          </CardContent>
        </Card>

        {/* Reverse Scan System */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <ArrowLeftRight className="h-5 w-5 text-blue-600" />
              <span>Reverse Scan</span>
            </CardTitle>
            <CardDescription>Route history and tracking</CardDescription>
          </CardHeader>
          <CardContent>
            <ReverseScanSystem />
          </CardContent>
        </Card>

        {/* Payment System */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-blue-600" />
              <span>Digital Payment</span>
            </CardTitle>
            <CardDescription>Multiple payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <PaymentSystem />
          </CardContent>
        </Card>

        {/* Mini Dustbin Status */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5 text-blue-600" />
              <span>Mini Dustbin Status</span>
            </CardTitle>
            <CardDescription>Cleanliness monitoring system</CardDescription>
          </CardHeader>
          <CardContent>
            <MiniDustbinStatus />
          </CardContent>
        </Card>

        {/* Emergency Systems */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <span>Emergency Systems</span>
            </CardTitle>
            <CardDescription>Safety monitoring and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <EmergencySystem busState={busState} triggerEmergency={triggerEmergency} />
          </CardContent>
        </Card>

        {/* System Health */}
        <Card className="col-span-1 md:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle>System Health</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Battery Level</span>
                  <span className="text-sm font-medium">{busState.batteryLevel}%</span>
                </div>
                <Progress value={busState.batteryLevel} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Network Connectivity</span>
                  <span className="text-sm font-medium">Strong</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Camera Systems</span>
                  <span className="text-sm font-medium">Operational</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isAlertModalOpen && <SafetyAlertModal isOpen={isAlertModalOpen} onClose={resetEmergency} alertType={alertType} />}
    </div>;
};
export default Dashboard;