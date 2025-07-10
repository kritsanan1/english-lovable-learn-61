import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccess() {
  const { checkSubscription } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Refresh subscription status after successful payment
    checkSubscription();
  }, [checkSubscription]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-600">
              Payment Successful!
            </CardTitle>
            <CardDescription>
              Welcome to Kru English! Your subscription is now active.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              You now have access to your English learning dashboard where you can:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Access live Zoom classes</li>
              <li>• View your class schedule</li>
              <li>• Download learning materials</li>
              <li>• Track your progress</li>
            </ul>
            
            <div className="pt-4 space-y-2">
              <Button onClick={() => navigate('/dashboard')} className="w-full">
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Back to Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}