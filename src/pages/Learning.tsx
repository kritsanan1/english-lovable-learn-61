import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Calendar, Clock, FileText, Video, Users, Loader2, BookOpen, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LearningCalendar } from "@/components/learning/LearningCalendar";
import { InteractiveQuiz } from "@/components/learning/InteractiveQuiz";
import { FlashcardDeck } from "@/components/learning/FlashcardDeck";
import { MaterialsManager } from "@/components/learning/MaterialsManager";

const Learning = () => {
  const [activeTab, setActiveTab] = useState("live");
  const [meetings, setMeetings] = useState([]);
  const [recordings, setRecordings] = useState([]);
  const [loadingMeetings, setLoadingMeetings] = useState(false);
  const [loadingRecordings, setLoadingRecordings] = useState(false);
  const { toast } = useToast();

  // Fetch Zoom meetings
  const fetchMeetings = async () => {
    setLoadingMeetings(true);
    try {
      const { data, error } = await supabase.functions.invoke('zoom-meetings', {
        body: { action: 'list' }
      });

      if (error) throw error;
      
      setMeetings(data.meetings || []);
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

  // Fetch YouTube recordings
  const fetchRecordings = async () => {
    setLoadingRecordings(true);
    try {
      const { data, error } = await supabase.functions.invoke('youtube-videos', {
        body: { 
          channelId: 'UCJ8cRnp3i1e8KMaO19q-dzA', // Replace with your channel ID
          maxResults: 10 
        }
      });

      if (error) throw error;
      
      const formattedRecordings = data.videos?.map((video: any) => ({
        id: video.id,
        title: video.title,
        duration: "Video", // YouTube API doesn't provide duration in search
        date: new Date(video.publishedAt).toLocaleDateString(),
        youtubeId: video.id,
        thumbnail: video.thumbnail
      })) || [];
      
      setRecordings(formattedRecordings);
    } catch (error) {
      console.error('Error fetching recordings:', error);
      toast({
        title: "Error", 
        description: "Failed to load YouTube recordings",
        variant: "destructive"
      });
    } finally {
      setLoadingRecordings(false);
    }
  };

  useEffect(() => {
    fetchMeetings();
    fetchRecordings();
  }, []);


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Your Learning Dashboard
            </h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Access your live classes, recorded sessions, and learning materials all in one place
            </p>
          </div>
        </div>
      </section>

      {/* Learning Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="live">Live Classes</TabsTrigger>
              <TabsTrigger value="recordings">Recordings</TabsTrigger>
              <TabsTrigger value="materials">Materials</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
              <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="mt-8">
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
                  meetings.map((meeting: any) => (
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
            </TabsContent>

            <TabsContent value="recordings" className="mt-8">
              <div className="grid gap-6 md:grid-cols-2">
                {loadingRecordings ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i}>
                      <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="aspect-video rounded-lg mb-4" />
                        <Skeleton className="h-10 w-full" />
                      </CardContent>
                    </Card>
                  ))
                ) : recordings.length > 0 ? (
                  recordings.map((recording: any) => (
                    <Card key={recording.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Play className="w-5 h-5" />
                          {recording.title}
                        </CardTitle>
                        <CardDescription>
                          {recording.duration} • {recording.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${recording.youtubeId}`}
                            title={recording.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg"
                          ></iframe>
                        </div>
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => window.open(`https://www.youtube.com/watch?v=${recording.youtubeId}`, '_blank')}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Watch on YouTube
                        </Button>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="md:col-span-2">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Video className="w-12 h-12 text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">No recordings found</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={fetchRecordings}
                        disabled={loadingRecordings}
                      >
                        {loadingRecordings && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Refresh
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="materials" className="mt-8">
              <MaterialsManager />
            </TabsContent>

            <TabsContent value="calendar" className="mt-8">
              <LearningCalendar 
                meetings={meetings}
                onJoinMeeting={(url) => window.open(url, '_blank')}
              />
            </TabsContent>

            <TabsContent value="quiz" className="mt-8">
              <div className="max-w-2xl mx-auto">
                <InteractiveQuiz />
              </div>
            </TabsContent>

            <TabsContent value="flashcards" className="mt-8">
              <div className="max-w-2xl mx-auto">
                <FlashcardDeck />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Learning;