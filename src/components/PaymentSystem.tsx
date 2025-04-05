
import React, { useState } from 'react';
import { CreditCard, QrCode, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PaymentSystem = () => {
  const [paymentState, setPaymentState] = useState<'idle' | 'scanning' | 'success'>('idle');
  
  const simulatePayment = () => {
    setPaymentState('scanning');
    setTimeout(() => {
      setPaymentState('success');
      setTimeout(() => {
        setPaymentState('idle');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Phone Pay Status</span>
        </div>
        <span className="text-sm px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </div>

      <div className="border rounded-lg p-4 bg-slate-50">
        {paymentState === 'idle' && (
          <div className="text-center space-y-3">
            <QrCode className="h-16 w-16 mx-auto text-blue-600" />
            <p className="text-sm">Scan to pay with Phone Pay</p>
            <Button onClick={simulatePayment} size="sm" className="w-full">
              Simulate Payment
            </Button>
          </div>
        )}

        {paymentState === 'scanning' && (
          <div className="text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <div className="animate-pulse h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center">
                <QrCode className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-sm">Scanning payment...</p>
          </div>
        )}

        {paymentState === 'success' && (
          <div className="text-center space-y-3">
            <div className="h-16 flex items-center justify-center">
              <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-white" />
              </div>
            </div>
            <p className="text-sm font-medium text-green-700">Payment successful!</p>
            <p className="text-xs text-gray-500">Receipt #TX289043</p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium">Reverse Scan System</div>
        <p className="text-xs text-gray-500 mt-1">
          Track semi-destinations and past boarding locations for route optimization
        </p>
      </div>
    </div>
  );
};

export default PaymentSystem;
