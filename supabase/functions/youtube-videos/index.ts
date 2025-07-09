import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { channelId = 'UCJ8cRnp3i1e8KMaO19q-dzA', maxResults = 10 } = await req.json();
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');

    if (!apiKey) {
      throw new Error('YouTube API key not configured');
    }

    console.log('Fetching YouTube videos for channel:', channelId);

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('YouTube API error:', errorData);
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('YouTube API response:', data);

    const videos = data.items?.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle
    })) || [];

    return new Response(JSON.stringify({ videos }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in youtube-videos function:', error);
    return new Response(
      JSON.stringify({ error: error.message, videos: [] }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});