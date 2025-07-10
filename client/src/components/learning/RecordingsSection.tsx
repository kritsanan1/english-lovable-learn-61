import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Video, Loader2 } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

interface Recording {
  id: string;
  title: string;
  duration: string;
  date: string;
  youtubeId: string;
  thumbnail: string;
}

export const RecordingsSection = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loadingRecordings, setLoadingRecordings] = useState(false);
  const { toast } = useToast();

  // Fetch YouTube recordings
  const fetchRecordings = async () => {
    setLoadingRecordings(true);
    try {
      // Mock data for demonstration - replace with actual API call
      const mockRecordings = [
        {
          id: "1",
          title: "English Conversation Practice - Beginner Level",
          duration: "45:30",
          date: new Date().toLocaleDateString(),
          youtubeId: "dQw4w9WgXcQ", // Demo video ID
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
        },
        {
          id: "2", 
          title: "Grammar Fundamentals - Present Tense",
          duration: "32:15",
          date: new Date(Date.now() - 86400000).toLocaleDateString(),
          youtubeId: "dQw4w9WgXcQ",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
        }
      ];
      
      setRecordings(mockRecordings);
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
    fetchRecordings();
  }, []);

  return (
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
        recordings.map((recording: Recording) => (
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
  );
};