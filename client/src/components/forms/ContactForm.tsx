import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Send, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiry_type: z.enum(["general", "course_info", "pricing", "technical", "appointment"]),
  preferred_contact: z.enum(["email", "phone", "line", "whatsapp"]),
  appointment_date: z.date().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

interface ContactFormProps {
  onSuccess?: () => void;
}

export const ContactForm = ({ onSuccess }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      inquiry_type: "general",
      preferred_contact: "email",
    },
  });

  const watchInquiryType = form.watch("inquiry_type");

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { data: result, error } = await supabase.functions.invoke('contact-inquiries', {
        body: {
          ...data,
          appointment_date: data.appointment_date?.toISOString(),
        }
      });

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
        variant: "default",
      });

      // Auto-response based on inquiry type
      setTimeout(() => {
        switch (data.inquiry_type) {
          case 'course_info':
            toast({
              title: "Course Information",
              description: "We've sent you detailed course information to your email.",
            });
            break;
          case 'appointment':
            toast({
              title: "Appointment Scheduled",
              description: "Your appointment request has been received. We'll confirm the time shortly.",
            });
            break;
          default:
            break;
        }
      }, 2000);

      form.reset();
      onSuccess?.();

    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitStatus('error');
      toast({
        title: "Failed to Send Message",
        description: "Please try again or contact us directly via LINE @kruenglish",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSubmitButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Sending...
        </>
      );
    }
    
    if (submitStatus === 'success') {
      return (
        <>
          <CheckCircle className="w-4 h-4" />
          Sent Successfully!
        </>
      );
    }
    
    if (submitStatus === 'error') {
      return (
        <>
          <AlertCircle className="w-4 h-4" />
          Try Again
        </>
      );
    }
    
    return (
      <>
        <Send className="w-4 h-4" />
        Send Message
      </>
    );
  };

  const getButtonVariant = () => {
    if (submitStatus === 'success') return 'default';
    if (submitStatus === 'error') return 'destructive';
    return 'default';
  };

  return (
    <div className="bg-card rounded-2xl shadow-lg p-8 border">
      <h2 className="text-3xl font-bold text-foreground mb-8">
        Send us a Message
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="Enter your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inquiry_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inquiry Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Information</SelectItem>
                      <SelectItem value="course_info">Course Information</SelectItem>
                      <SelectItem value="pricing">Pricing & Plans</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="appointment">Schedule Appointment</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="preferred_contact"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Preferred Contact Method *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-wrap gap-6"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="email" id="email" />
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="phone" id="phone" />
                      <Label htmlFor="phone">Phone Call</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="line" id="line" />
                      <Label htmlFor="line">LINE</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="whatsapp" id="whatsapp" />
                      <Label htmlFor="whatsapp">WhatsApp</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchInquiryType === "appointment" && (
            <FormField
              control={form.control}
              name="appointment_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Preferred Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full pl-3 text-left font-normal"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px] resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full py-3 text-lg font-semibold"
            disabled={isSubmitting}
            variant={getButtonVariant()}
          >
            {getSubmitButtonContent()}
          </Button>

          {submitStatus === 'success' && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <CheckCircle className="w-5 h-5" />
                <p className="font-medium">Message sent successfully!</p>
              </div>
              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                We'll respond within 24 hours. Check your email for confirmation.
              </p>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
};