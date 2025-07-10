import { useState } from 'react';
import { Button } from '@/components/ui/button';

import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLocation } from 'wouter';

interface PaymentButtonProps {
  planName: string;
  price: string;
  originalPrice: string;
  duration: string;
  highlighted?: boolean;
  color?: string;
}

export default function PaymentButton({ 
  planName, 
  price, 
  originalPrice,
  duration,
  highlighted,
  color 
}: PaymentButtonProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handlePayment = async () => {
    if (!user) {
      setLocation('/login');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planName,
          price: parseInt(price),
          originalPrice: parseInt(originalPrice),
          duration,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to create checkout');



      if (data?.url) {
        // Redirect to checkout success page
        setLocation(data.url);
      }
    } catch (error: any) {
      toast({
        title: "Payment Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getButtonClasses = () => {
    if (highlighted) {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    }
    if (color === "green") {
      return "bg-green-600 hover:bg-green-700 text-white";
    }
    return "bg-orange-500 hover:bg-orange-600 text-white";
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={loading}
      className={`w-full py-3 text-lg font-semibold ${getButtonClasses()}`}
    >
      {loading ? "Processing..." : user ? "Choose This Plan" : "Login to Purchase"}
    </Button>
  );
}