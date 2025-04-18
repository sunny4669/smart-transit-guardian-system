import React, { useState } from 'react';
import { CreditCard, QrCode, Check, Coins, MapPin, Route } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MapLocation from './MapLocation';
const PaymentSystem = () => {
  const [paymentState, setPaymentState] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'cash'>('qr');
  const [cashReceived, setCashReceived] = useState<number | null>(null);
  const [routeSelected, setRouteSelected] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    start: string;
    end: string;
    amount: number;
  } | null>(null);
  const simulatePayment = () => {
    setPaymentState('scanning');
    setTimeout(() => {
      setPaymentState('success');
      setTimeout(() => {
        setPaymentState('idle');
        setCashReceived(null);
      }, 3000);
    }, 2000);
  };
  const handleCashPayment = (amount: number) => {
    setCashReceived(amount);
    simulatePayment();
  };
  const handleRouteSelected = (start: string, end: string, amount: number) => {
    setRouteSelected(true);
    setRouteInfo({
      start,
      end,
      amount
    });
  };
  const resetRoute = () => {
    setRouteSelected(false);
    setRouteInfo(null);
    setPaymentState('idle');
  };
  return <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <CreditCard className="h-5 w-5 text-blue-600 mr-2" />
          <span className="font-medium">Payment System</span>
        </div>
        <span className="text-sm px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
          Active
        </span>
      </div>

      {!routeSelected ? <div className="border rounded-lg p-4 bg-slate-50">
          <div className="flex items-center mb-3">
            <Route className="h-5 w-5 text-blue-600 mr-2" />
            <span className="font-medium">Select Your Route</span>
          </div>
          <MapLocation onRouteSelected={handleRouteSelected} />
        </div> : <>
          <div className="border rounded-lg p-3 bg-blue-50 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Route className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium">Route Selected</span>
              </div>
              <Button variant="ghost" size="sm" onClick={resetRoute}>
                Change
              </Button>
            </div>
            <div className="mt-2 text-sm">
              <div className="flex items-center">
                <MapPin className="h-3.5 w-3.5 text-blue-500 mr-1.5" />
                <span>From: {routeInfo?.start}</span>
              </div>
              <div className="flex items-center mt-1">
                <MapPin className="h-3.5 w-3.5 text-red-500 mr-1.5" />
                <span>To: {routeInfo?.end}</span>
              </div>
              <div className="mt-2 font-medium">
                Fare: ₹{routeInfo?.amount}
              </div>
            </div>
          </div>

          <Tabs defaultValue="qr" onValueChange={value => setPaymentMethod(value as 'qr' | 'cash')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="qr" className="flex items-center">
                <QrCode className="h-4 w-4 mr-2" />
                <span>QR Pay</span>
              </TabsTrigger>
              <TabsTrigger value="cash" className="flex items-center">
                <Coins className="h-4 w-4 mr-2" />
                <span>Cash</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="qr" className="mt-4">
              <div className="border rounded-lg p-4 bg-slate-50">
                {paymentState === 'idle' && <div className="text-center space-y-3">
                    <QrCode className="h-16 w-16 mx-auto text-blue-600" />
                    <p className="text-sm">Scan to pay ₹{routeInfo?.amount} with Phone Pay</p>
                    <Button onClick={simulatePayment} size="sm" className="w-full">
                      Simulate QR Payment
                    </Button>
                  </div>}

                {paymentState === 'scanning' && <div className="text-center space-y-3">
                    <div className="h-16 flex items-center justify-center">
                      <div className="animate-pulse h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <QrCode className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm">Scanning payment...</p>
                  </div>}

                {paymentState === 'success' && <div className="text-center space-y-3">
                    <div className="h-16 flex items-center justify-center">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-green-700">Payment successful!</p>
                    <p className="text-xs">Amount: ₹{routeInfo?.amount}</p>
                    <p className="text-xs text-gray-500">Receipt #TX289043</p>
                  </div>}
              </div>
            </TabsContent>
            
            <TabsContent value="cash" className="mt-4">
              <div className="border rounded-lg p-4 bg-slate-50">
                {paymentState === 'idle' && <div className="text-center space-y-3">
                    <Coins className="h-16 w-16 mx-auto text-blue-600" />
                    <p className="text-sm">Cash payment ₹{routeInfo?.amount}</p>
                    <div className="grid grid-cols-2 gap-2 my-2">
                      <Button onClick={() => handleCashPayment(20)} size="sm" variant="outline">₹20</Button>
                      <Button onClick={() => handleCashPayment(50)} size="sm" variant="outline">₹50</Button>
                      <Button onClick={() => handleCashPayment(100)} size="sm" variant="outline">₹100</Button>
                      <Button onClick={() => handleCashPayment(500)} size="sm" variant="outline">₹500</Button>
                    </div>
                    <Button onClick={() => simulatePayment()} size="sm" className="w-full">
                      Custom Amount
                    </Button>
                  </div>}

                {paymentState === 'scanning' && <div className="text-center space-y-3">
                    <div className="h-16 flex items-center justify-center">
                      <div className="animate-pulse h-10 w-10 bg-blue-400 rounded-full flex items-center justify-center">
                        <Coins className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm">Processing payment{cashReceived ? ` (₹${cashReceived})` : ''}...</p>
                  </div>}

                {paymentState === 'success' && <div className="text-center space-y-3">
                    <div className="h-16 flex items-center justify-center">
                      <div className="h-10 w-10 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <p className="text-sm font-medium text-green-700">Payment successful!</p>
                    {cashReceived && <p className="text-sm">Amount: ₹{cashReceived}</p>}
                    <p className="text-xs text-gray-500">Receipt #CX289043</p>
                  </div>}
              </div>
            </TabsContent>
          </Tabs>
        </>}

      <div className="mt-4">
        
        
      </div>
    </div>;
};
export default PaymentSystem;