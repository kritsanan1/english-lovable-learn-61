import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Generate JWT token for Zoom API using proper HMAC-SHA256
async function generateZoomToken() {
  const apiKey = Deno.env.get('ZOOM_API_KEY');
  const apiSecret = Deno.env.get('ZOOM_API_SECRET');
  
  if (!apiKey || !apiSecret) {
    throw new Error('Zoom API credentials not configured');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  
  const payload = {
    iss: apiKey,
    exp: now + 3600 // 1 hour expiration
  };

  const headerB64 = btoa(JSON.stringify(header)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const data = `${headerB64}.${payloadB64}`;
  
  const encoder = new TextEncoder();
  const keyData = encoder.encode(apiSecret);
  const messageData = encoder.encode(data);
  
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageData);
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  return `${data}.${signatureB64}`;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action = 'list', meetingData } = await req.json();
    const token = await generateZoomToken();

    console.log('Zoom API action:', action);

    let response;
    let result;

    switch (action) {
      case 'list':
        // List scheduled meetings
        response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`Zoom API error: ${response.status}`);
        }
        
        result = await response.json();
        
        const meetings = result.meetings?.map((meeting: any) => ({
          id: meeting.id,
          topic: meeting.topic,
          startTime: meeting.start_time,
          duration: meeting.duration,
          joinUrl: meeting.join_url,
          status: meeting.status,
          type: meeting.type
        })) || [];

        return new Response(JSON.stringify({ meetings }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      case 'create':
        // Create a new meeting
        if (!meetingData) {
          throw new Error('Meeting data required for creation');
        }

        response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            topic: meetingData.topic || 'English Class',
            type: 2, // Scheduled meeting
            start_time: meetingData.startTime,
            duration: meetingData.duration || 60,
            settings: {
              host_video: true,
              participant_video: true,
              join_before_host: false,
              mute_upon_entry: true,
              watermark: false,
              use_pmi: false,
              approval_type: 0,
              audio: 'both',
              auto_recording: 'none'
            }
          }),
        });

        if (!response.ok) {
          const errorData = await response.text();
          console.error('Zoom API create error:', errorData);
          throw new Error(`Failed to create meeting: ${response.status}`);
        }

        result = await response.json();
        
        return new Response(JSON.stringify({
          meeting: {
            id: result.id,
            topic: result.topic,
            startTime: result.start_time,
            duration: result.duration,
            joinUrl: result.join_url,
            password: result.password
          }
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

      default:
        throw new Error('Invalid action');
    }

  } catch (error) {
    console.error('Error in zoom-meetings function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});