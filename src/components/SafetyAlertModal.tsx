
import React from 'react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Cigarette, Gauge, Tire, Camera, MapPin, Bell } from 'lucide-react';

interface SafetyAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  alertType: 'brake' | 'smoking' | 'tire' | null;
}

const SafetyAlertModal: React.FC<SafetyAlertModalProps> = ({ 
  isOpen, 
  onClose, 
  alertType 
}) => {
  const getAlertContent = () => {
    switch (alertType) {
      case 'brake':
        return {
          icon: <Gauge className="h-10 w-10 text-red-600 mx-auto mb-4" />,
          title: 'Emergency Brake Failure',
          description: 'Automatic emergency protocols activated. Emergency gate has been opened. Passengers are being safely evacuated. Maintenance team and backup transport have been dispatched.',
          actions: [
            { label: 'Contact Nearby Stations', variant: 'outline' },
            { label: 'Acknowledge Alert', variant: 'destructive' }
          ]
        };
      case 'smoking':
        return {
          icon: <>
            <Cigarette className="h-10 w-10 text-red-600 mx-auto mb-2" />
            <Camera className="h-6 w-6 text-blue-600 mx-auto mb-4" />
          </>,
          title: 'Smoking Detected',
          description: 'Smoking has been detected on the bus. The automated camera system has identified the individual and their image is being displayed on the bus screens. An announcement is being made.',
          actions: [
            { label: 'View Camera Feed', variant: 'outline' },
            { label: 'Acknowledge Alert', variant: 'destructive' }
          ]
        };
      case 'tire':
        return {
          icon: <>
            <Tire className="h-10 w-10 text-red-600 mx-auto mb-2" />
            <MapPin className="h-6 w-6 text-blue-600 mx-auto mb-4" />
          </>,
          title: 'Tire Damage Detected',
          description: 'Tire pressure sensors have detected damage. A replacement bus has been automatically requested from the nearest station. Please maintain reduced speed until replacement arrives.',
          actions: [
            { label: 'Track Replacement Bus', variant: 'outline' },
            { label: 'Acknowledge Alert', variant: 'destructive' }
          ]
        };
      default:
        return {
          icon: <Bell className="h-10 w-10 text-red-600 mx-auto mb-4" />,
          title: 'System Alert',
          description: 'An alert has been triggered in the system.',
          actions: [
            { label: 'Acknowledge', variant: 'destructive' }
          ]
        };
    }
  };

  const alertContent = getAlertContent();

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="text-center">
            {alertContent.icon}
            <AlertDialogTitle className="text-xl text-red-700">{alertContent.title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-center">
            {alertContent.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col space-y-2 sm:space-y-0 sm:flex-row">
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={onClose}>Reset Simulation</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SafetyAlertModal;
