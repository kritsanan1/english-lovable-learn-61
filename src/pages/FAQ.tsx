import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Clock, RefreshCw, Award } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "General",
      questions: [
        {
          question: "What is Kru English?",
          answer: "Kru English is an online English learning platform that offers live Zoom classes with native English teachers. We provide interactive lessons, free materials, 24/7 replay access, and globally recognized certificates."
        },
        {
          question: "Who can join Kru English classes?",
          answer: "Our classes are designed for learners aged 13 and above, from beginner (A1) to intermediate (B1) levels. We welcome students, working professionals, and anyone looking to improve their English skills."
        },
        {
          question: "What makes Kru English different?",
          answer: "We offer live interactive classes via Zoom with certified native teachers, comprehensive free materials, unlimited access to recorded sessions, and internationally recognized certificates - all at affordable prices starting from ฿390."
        }
      ]
    },
    {
      category: "Classes & Courses",
      questions: [
        {
          question: "What types of courses do you offer?",
          answer: "We offer three main programs: General English (฿390-4,000), CEFR Platinum English (฿590), and Combo packages (฿1,500). Each program is tailored to different learning goals and proficiency levels."
        },
        {
          question: "How long are the classes?",
          answer: "Each live class is 60 minutes long. We also provide 24/7 access to recorded sessions so you can review lessons at your own pace."
        },
        {
          question: "What is the class schedule?",
          answer: "Classes are available Monday to Friday, 7:00 PM - 10:00 PM (Thailand time), and weekends 2:00 PM - 8:00 PM. You can choose the time slots that work best for your schedule."
        },
        {
          question: "How many students are in each class?",
          answer: "We maintain small class sizes with maximum 8 students per session to ensure personalized attention and maximum speaking opportunities for everyone."
        }
      ]
    },
    {
      category: "Technology & Access",
      questions: [
        {
          question: "What do I need to join classes?",
          answer: "You need a computer, tablet, or smartphone with stable internet connection, and Zoom app installed. We recommend using a headset or earphones for better audio quality."
        },
        {
          question: "Can I access recorded classes?",
          answer: "Yes! All live classes are automatically recorded and available for 24/7 replay access. You can review lessons anytime through your student dashboard."
        },
        {
          question: "What if I miss a live class?",
          answer: "No problem! You can watch the recorded version at any time. All materials and assignments will also be available in your learning portal."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit cards, debit cards, bank transfers, and PayPal. All payments are processed securely through our payment partners."
        },
        {
          question: "Are there any discounts available?",
          answer: "Yes! We offer 10% discount for 3-month packages and 20% discount for 6-month packages. We also have special promotions during holidays."
        },
        {
          question: "Is there a money-back guarantee?",
          answer: "We offer a 7-day money-back guarantee. If you're not satisfied with your first week of classes, we'll provide a full refund, no questions asked."
        },
        {
          question: "Can I upgrade or change my plan?",
          answer: "Yes, you can upgrade your plan at any time. The price difference will be calculated and you can pay the additional amount to access higher-tier features."
        }
      ]
    },
    {
      category: "Certificates & Progress",
      questions: [
        {
          question: "Do you provide certificates?",
          answer: "Yes! Upon successful completion of your course, you'll receive a globally recognized certificate that shows your achievement and English proficiency level."
        },
        {
          question: "How is my progress tracked?",
          answer: "We provide regular assessments, homework feedback, and progress reports. You can track your improvement through our student dashboard and receive personalized recommendations."
        },
        {
          question: "Can I take a level test?",
          answer: "Absolutely! We offer a free online level test to help determine your current English proficiency and recommend the most suitable course for you."
        }
      ]
    }
  ];

  const policies = [
    {
      title: "Refund Policy",
      icon: RefreshCw,
      description: "7-day money-back guarantee for new students. Refunds processed within 5-7 business days.",
      details: [
        "Full refund available within 7 days of first class",
        "Partial refunds for unused classes (pro-rated)",
        "No refund for courses completed over 50%",
        "Medical emergency exceptions considered case-by-case"
      ]
    },
    {
      title: "Class Schedule Policy", 
      icon: Clock,
      description: "Flexible scheduling with options to reschedule or make up missed classes.",
      details: [
        "24-hour notice required for class rescheduling",
        "Maximum 2 reschedules per month",
        "Make-up classes available for technical issues",
        "Holiday schedule adjustments announced in advance"
      ]
    },
    {
      title: "Certificate Requirements",
      icon: Award,
      description: "Clear requirements for earning your English proficiency certificate.",
      details: [
        "Minimum 80% class attendance required",
        "Complete all assigned homework and assessments",
        "Pass final evaluation with 70% or higher",
        "Certificates issued within 2 weeks of completion"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Kru English courses, 
            pricing, and learning experience
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Policies & Guidelines
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Important information about our policies and requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {policies.map((policy, index) => (
              <Card key={index} className="h-full">
                <CardHeader className="text-center">
                  <policy.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle>{policy.title}</CardTitle>
                  <CardDescription>{policy.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {policy.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="text-sm text-gray-600 flex items-start">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Our friendly support team is here to help you get started
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-white text-blue-600 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;