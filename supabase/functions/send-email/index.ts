import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    const { 
      to, 
      subject, 
      html, 
      text, 
      name, 
      email, 
      inquiry_type,
      message: userMessage 
    } = await req.json()

    // Email service integration (you can integrate with SendGrid, Resend, etc.)
    // For now, we'll simulate sending an email and return success
    
    const emailTemplates = {
      confirmation: {
        subject: `Thank you for contacting KruEnglish, ${name}!`,
        html: `
          <h2>Thank you for your inquiry!</h2>
          <p>Dear ${name},</p>
          <p>We have received your message and will respond within 24 hours.</p>
          <h3>Your inquiry details:</h3>
          <ul>
            <li><strong>Type:</strong> ${inquiry_type}</li>
            <li><strong>Message:</strong> ${userMessage}</li>
          </ul>
          <p>For immediate assistance, contact us via LINE @kruenglish</p>
          <p>Best regards,<br>KruEnglish Team</p>
        `
      },
      notification: {
        subject: `New Contact Inquiry from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Inquiry Type:</strong> ${inquiry_type}</p>
          <p><strong>Message:</strong></p>
          <p>${userMessage}</p>
          <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
        `
      }
    }

    // In a real implementation, you would use an email service like:
    // - SendGrid API
    // - Resend API
    // - AWS SES
    // - Nodemailer with SMTP
    
    console.log('Email would be sent:', {
      to: email,
      subject: emailTemplates.confirmation.subject,
      html: emailTemplates.confirmation.html
    })

    console.log('Notification email would be sent:', {
      to: 'admin@kruenglish.com',
      subject: emailTemplates.notification.subject,
      html: emailTemplates.notification.html
    })

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Emails sent successfully',
        emails_sent: [
          { type: 'confirmation', to: email },
          { type: 'notification', to: 'admin@kruenglish.com' }
        ]
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )

  } catch (error) {
    console.error('Email function error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to send emails' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})