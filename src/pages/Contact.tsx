
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/forms/ContactForm";
import { LiveChat } from "@/components/contact/LiveChat";
import { Mail, Phone, MessageCircle, MapPin, Clock, HeadphonesIcon, Smartphone } from "lucide-react";

const Contact = () => {

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about our courses? Need help choosing the right plan? 
            We're here to help you start your English learning journey!
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg">
              <HeadphonesIcon className="w-4 h-4 text-primary" />
              <span className="text-sm">Live Chat</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg">
              <Smartphone className="w-4 h-4 text-primary" />
              <span className="text-sm">WhatsApp/LINE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="animate-fade-in">
              <h2 className="text-3xl font-bold text-foreground mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-center group hover:bg-muted p-4 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">LINE Official</h3>
                    <p className="text-muted-foreground">@kruenglish</p>
                    <p className="text-xs text-muted-foreground mt-1">Fastest response time</p>
                  </div>
                </div>

                <div className="flex items-center group hover:bg-muted p-4 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">info@kruenglish.com</p>
                    <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center group hover:bg-muted p-4 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">+66 2 123 4567</p>
                    <p className="text-xs text-muted-foreground mt-1">Available during office hours</p>
                  </div>
                </div>

                <div className="flex items-center group hover:bg-muted p-4 rounded-lg transition-colors">
                  <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Office Hours</h3>
                    <p className="text-muted-foreground">Mon-Fri: 9:00 AM - 6:00 PM</p>
                    <p className="text-xs text-muted-foreground mt-1">Thailand timezone (UTC+7)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-xl">
                <h3 className="font-semibold text-primary mb-2">Quick Response Promise</h3>
                <p className="text-primary/80 text-sm">
                  For the fastest response, contact us via LINE @kruenglish. 
                  We typically respond within 30 minutes during business hours.
                  After hours inquiries are answered first thing the next business day.
                </p>
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">WhatsApp & LINE Integration</h4>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Connect with us on your preferred messaging platform for instant support and course updates.
                </p>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <ContactForm 
                onSuccess={() => {
                  console.log('Contact form submitted successfully');
                }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Live Chat Component */}
      <LiveChat />

      <Footer />
    </div>
  );
};

export default Contact;
