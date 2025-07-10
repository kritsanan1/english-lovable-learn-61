import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Video } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface Meeting {
  id: string;
  topic: string;
  startTime: string;
  duration: number;
  joinUrl: string;
  status: string;
}

interface LearningCalendarProps {
  meetings?: Meeting[]; // Make it optional since we'll fetch our own data
  onJoinMeeting: (url: string) => void;
}

export const LearningCalendar = ({ onJoinMeeting }: LearningCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const { toast } = useToast();

  // Fetch meetings data
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        // Mock data for demonstration - replace with actual API call
        const mockMeetings = [
          {
            id: "1",
            topic: "General English Conversation",
            startTime: new Date(Date.now() + 3600000).toISOString(),
            duration: 60,
            joinUrl: "https://zoom.us/j/demo",
            status: "waiting"
          },
          {
            id: "2", 
            topic: "CEFR Platinum Session",
            startTime: new Date(Date.now() + 7200000).toISOString(),
            duration: 90,
            joinUrl: "https://zoom.us/j/demo2",
            status: "waiting"
          }
        ];
        
        setMeetings(mockMeetings);
      } catch (error) {
        console.error('Error fetching meetings for calendar:', error);
        // Don't show toast error here as it might be redundant with LiveClasses component
      }
    };

    fetchMeetings();
  }, []);

  const selectedDateMeetings = meetings.filter(meeting => {
    const meetingDate = new Date(meeting.startTime);
    const selected = selectedDate || new Date();
    return meetingDate.toDateString() === selected.toDateString();
  });

  const meetingDates = meetings.map(meeting => new Date(meeting.startTime));

  const isLive = (startTime: string, duration: number) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60000);
    return now >= start && now <= end;
  };

  const isUpcoming = (startTime: string) => {
    return new Date(startTime) > new Date();
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Class Schedule</CardTitle>
          <CardDescription>Select a date to view scheduled classes</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              meeting: meetingDates
            }}
            modifiersStyles={{
              meeting: {
                backgroundColor: 'hsl(var(--primary))',
                color: 'hsl(var(--primary-foreground))',
                borderRadius: '8px'
              }
            }}
            className="rounded-md border"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate ? 
              `Classes on ${selectedDate.toLocaleDateString()}` : 
              'Select a date'
            }
          </CardTitle>
          <CardDescription>
            {selectedDateMeetings.length} scheduled class{selectedDateMeetings.length !== 1 ? 'es' : ''}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {selectedDateMeetings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No classes scheduled for this date</p>
          ) : (
            selectedDateMeetings.map((meeting) => (
              <div key={meeting.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {meeting.topic}
                    </h4>
                    <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                      <Clock className="w-4 h-4" />
                      {new Date(meeting.startTime).toLocaleTimeString()} • {meeting.duration} min
                    </p>
                  </div>
                  <Badge variant={isLive(meeting.startTime, meeting.duration) ? "destructive" : 
                                 isUpcoming(meeting.startTime) ? "default" : "secondary"}>
                    {isLive(meeting.startTime, meeting.duration) ? "🔴 Live" : 
                     isUpcoming(meeting.startTime) ? "⏰ Upcoming" : "📹 Ended"}
                  </Badge>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={() => onJoinMeeting(meeting.joinUrl)}
                  disabled={!isLive(meeting.startTime, meeting.duration) && !isUpcoming(meeting.startTime)}
                >
                  <Video className="w-4 h-4 mr-2" />
                  {isLive(meeting.startTime, meeting.duration) ? "Join Now" : 
                   isUpcoming(meeting.startTime) ? "Join Class" : "Class Ended"}
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};