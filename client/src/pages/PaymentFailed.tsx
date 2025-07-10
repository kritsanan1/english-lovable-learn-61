import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { XCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';

export default function PaymentFailed() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <CardTitle className="text-2xl text-red-600">
              Payment Failed
            </CardTitle>
            <CardDescription>
              We couldn't process your payment. Please try again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Don't worry! You can try again or contact our support team if you continue to experience issues.
            </p>
            
            <div className="pt-4 space-y-2">
              <Button onClick={() => navigate('/pricing')} className="w-full">
                Try Again
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/contact')}
                className="w-full"
              >
                Contact Support
              </Button>
              <Button
                variant="ghost"
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