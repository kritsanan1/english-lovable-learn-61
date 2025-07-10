import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactInquirySchema, insertSubscriberSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact inquiries endpoint
  app.post("/api/contact-inquiries", async (req, res) => {
    try {
      const validatedData = insertContactInquirySchema.parse(req.body);
      const inquiry = await storage.createContactInquiry(validatedData);
      
      // Simulate email sending (replace with actual email service)
      console.log('New contact inquiry:', inquiry);
      
      res.json({ 
        success: true, 
        data: inquiry,
        message: 'Your inquiry has been submitted successfully!' 
      });
    } catch (error: any) {
      console.error('Contact inquiry error:', error);
      res.status(400).json({ error: error.message || 'Failed to save inquiry' });
    }
  });

  app.get("/api/contact-inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getContactInquiries();
      res.json({ data: inquiries });
    } catch (error: any) {
      console.error('Fetch inquiries error:', error);
      res.status(500).json({ error: 'Failed to fetch inquiries' });
    }
  });

  // Subscription management endpoint
  app.post("/api/check-subscription", async (req, res) => {
    try {
      // This would normally check Stripe subscription status
      // For now, return basic subscription info
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Email required' });
      }

      const subscriber = await storage.getSubscriberByEmail(email);
      
      res.json({
        subscribed: subscriber?.subscribed || false,
        subscription_tier: subscriber?.subscription_tier || null,
        subscription_end: subscriber?.subscription_end || null
      });
    } catch (error: any) {
      console.error('Check subscription error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Create checkout session endpoint (placeholder for Stripe integration)
  app.post("/api/create-checkout", async (req, res) => {
    try {
      const { planName, price, duration } = req.body;
      
      // This would normally create a Stripe checkout session
      // For now, return a mock success URL
      const mockCheckoutUrl = `/payment-success?plan=${encodeURIComponent(planName)}&price=${price}`;
      
      res.json({ url: mockCheckoutUrl });
    } catch (error: any) {
      console.error('Create checkout error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // YouTube videos endpoint (placeholder)
  app.post("/api/youtube-videos", async (req, res) => {
    try {
      // Mock YouTube videos response
      const mockVideos = [
        {
          id: "dQw4w9WgXcQ",
          title: "English Grammar Basics",
          description: "Learn fundamental English grammar rules",
          thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
          publishedAt: new Date().toISOString(),
          channelTitle: "KruEnglish"
        },
        {
          id: "jNQXAC9IVRw",
          title: "Conversation Practice",
          description: "Practice daily English conversations",
          thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg",
          publishedAt: new Date().toISOString(),
          channelTitle: "KruEnglish"
        }
      ];
      
      res.json({ videos: mockVideos });
    } catch (error: any) {
      console.error('YouTube videos error:', error);
      res.status(500).json({ error: error.message, videos: [] });
    }
  });

  // Zoom meetings endpoint (placeholder)
  app.post("/api/zoom-meetings", async (req, res) => {
    try {
      const { action = 'list' } = req.body;
      
      if (action === 'list') {
        // Mock Zoom meetings response
        const mockMeetings = [
          {
            id: "123456789",
            topic: "General English Class",
            startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            joinUrl: "https://zoom.us/j/123456789",
            status: "scheduled",
            type: 2
          },
          {
            id: "987654321",
            topic: "CEFR Platinum English",
            startTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            duration: 60,
            joinUrl: "https://zoom.us/j/987654321",
            status: "scheduled",
            type: 2
          }
        ];
        
        res.json({ meetings: mockMeetings });
      } else if (action === 'create') {
        // Mock create meeting response
        const { meetingData } = req.body;
        const mockMeeting = {
          id: Math.random().toString(),
          topic: meetingData?.topic || 'English Class',
          startTime: meetingData?.startTime || new Date().toISOString(),
          duration: meetingData?.duration || 60,
          joinUrl: `https://zoom.us/j/${Math.floor(Math.random() * 1000000000)}`,
          password: Math.random().toString(36).substring(7)
        };
        
        res.json({ meeting: mockMeeting });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } catch (error: any) {
      console.error('Zoom meetings error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Send email endpoint (placeholder)
  app.post("/api/send-email", async (req, res) => {
    try {
      const { name, email, inquiry_type, message: userMessage } = req.body;
      
      // Simulate email sending
      console.log('Email would be sent:', {
        to: email,
        subject: `Thank you for contacting KruEnglish, ${name}!`,
        template: 'confirmation'
      });
      
      console.log('Notification email would be sent:', {
        to: 'admin@kruenglish.com',
        subject: `New Contact Inquiry from ${name}`,
        template: 'notification'
      });
      
      res.json({ 
        success: true,
        message: 'Emails sent successfully',
        emails_sent: [
          { type: 'confirmation', to: email },
          { type: 'notification', to: 'admin@kruenglish.com' }
        ]
      });
    } catch (error: any) {
      console.error('Email error:', error);
      res.status(500).json({ error: 'Failed to send emails' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
