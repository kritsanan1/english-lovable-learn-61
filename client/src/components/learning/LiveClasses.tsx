import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Users, Video, Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface Meeting {
  id: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  status: string;
  type: number;
}

export const LiveClasses = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const { toast } = useToast();

  // Fetch Zoom meetings
  const fetchMeetings = async () => {
    setLoadingMeetings(true);
    try {
      // Mock data for demonstration - replace with actual API call  
      const mockMeetings = [
        {
          id: "1",
          topic: "General English Conversation",
          startTime: new Date(Date.now() + 3600000).toISOString(), // 1 hour from now
          duration: 60,
          joinUrl: "https://zoom.us/j/demo",
          status: "waiting",
          type: 2
        },
        {
          id: "2",
          topic: "CEFR Platinum Session",
          startTime: new Date(Date.now() + 7200000).toISOString(), // 2 hours from now
          duration: 90,
          joinUrl: "https://zoom.us/j/demo2", 
          status: "waiting",
          type: 2
        }
      ];
      
      setMeetings(mockMeetings);
    } catch (error) {
      console.error('Error fetching meetings:', error);
      toast({
        title: "Error",
        description: "Failed to load Zoom meetings",
        variant: "destructive"
      });
    } finally {
      setLoadingMeetings(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div className="grid gap-6">
      {loadingMeetings ? (
        Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="border-l-4 border-l-primary">
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        ))
      ) : meetings.length > 0 ? (
        meetings.map((meeting: Meeting) => (
          <Card key={meeting.id} className="border-l-4 border-l-primary">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    {meeting.topic}
                  </CardTitle>
                  <CardDescription>
                    {new Date(meeting.startTime).toLocaleDateString()} at{' '}
                    {new Date(meeting.startTime).toLocaleTimeString()} • Duration: {meeting.duration} min
                  </CardDescription>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  new Date(meeting.startTime) <= new Date() 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {new Date(meeting.startTime) <= new Date() ? '🔴 Live Now' : '⏰ Upcoming'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full sm:w-auto"
                onClick={() => window.open(meeting.joinUrl, '_blank')}
              >
                <Video className="w-4 h-4 mr-2" />
                Join Zoom Class
              </Button>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No scheduled meetings found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={fetchMeetings}
              disabled={loadingMeetings}
            >
              {loadingMeetings && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Refresh
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};