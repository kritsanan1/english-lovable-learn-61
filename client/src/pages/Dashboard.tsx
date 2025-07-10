import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar, Video, User, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Dashboard() {
  const { user, subscribed, subscriptionTier, subscriptionEnd, signOut, checkSubscription } = useAuth();
  const { toast } = useToast();

  const handleRefreshSubscription = async () => {
    await checkSubscription();
    toast({
      title: "Subscription refreshed",
      description: "Your subscription status has been updated.",
    });
  };

  const handleManageSubscription = async () => {
    toast({
      title: "Feature coming soon",
      description: "Subscription management will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.user_metadata?.full_name || user?.email}!
          </h1>
          <p className="text-muted-foreground">
            Manage your English learning journey from your dashboard.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subscription Status */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Subscription Status
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefreshSubscription}
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={subscribed ? "default" : "secondary"}>
                    {subscribed ? "Active" : "No Active Subscription"}
                  </Badge>
                  {subscriptionTier && (
                    <Badge variant="outline">{subscriptionTier}</Badge>
                  )}
                </div>
                
                {subscribed ? (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      Your subscription is active and includes access to all your enrolled classes.
                    </p>
                    {subscriptionEnd && (
                      <p className="text-sm text-muted-foreground">
                        Next billing: {new Date(subscriptionEnd).toLocaleDateString()}
                      </p>
                    )}
                    <Button onClick={handleManageSubscription} className="mt-4">
                      Manage Subscription
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      You don't have an active subscription. Choose a plan to start learning!
                    </p>
                    <Button asChild className="mt-4">
                      <a href="/pricing">View Plans</a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                View Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Video className="h-4 w-4 mr-2" />
                Join Class
              </Button>
              <Button
                onClick={signOut}
                variant="outline"
                className="w-full justify-start"
              >
                Sign Out
              </Button>
            </CardContent>
          </Card>

          {/* My Classes */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>My Classes</CardTitle>
              <CardDescription>
                {subscribed 
                  ? "Your upcoming English classes and recordings"
                  : "Subscribe to a plan to see your classes here"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscribed ? (
                <div className="text-center py-8">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Your class schedule will appear here once your instructor sets up the sessions.
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Subscribe to a plan to access live Zoom classes with expert instructors.
                  </p>
                  <Button asChild>
                    <a href="/pricing">Choose Your Plan</a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}