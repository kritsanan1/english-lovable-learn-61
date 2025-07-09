import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          planName,
          price: parseInt(price),
          originalPrice: parseInt(originalPrice),
          duration,
        },
      });

      if (error) throw error;

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
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