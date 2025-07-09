import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningCalendar } from "@/components/learning/LearningCalendar";
import { InteractiveQuiz } from "@/components/learning/InteractiveQuiz";
import { FlashcardDeck } from "@/components/learning/FlashcardDeck";
import { MaterialsManager } from "@/components/learning/MaterialsManager";
import { LiveClasses } from "@/components/learning/LiveClasses";
import { RecordingsSection } from "@/components/learning/RecordingsSection";

const Learning = () => {
  const [activeTab, setActiveTab] = useState("live");

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
              <LiveClasses />
            </TabsContent>

            <TabsContent value="recordings" className="mt-8">
              <RecordingsSection />
            </TabsContent>

            <TabsContent value="materials" className="mt-8">
              <MaterialsManager />
            </TabsContent>

            <TabsContent value="calendar" className="mt-8">
              <LearningCalendar 
                meetings={[]} // LiveClasses component now handles its own state
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