import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Globe, Award, Clock } from "lucide-react";

const Instructors = () => {
  const instructors = [
    {
      id: 1,
      name: "Sarah Johnson",
      nationality: "USA",
      experience: "8 years",
      rating: 4.9,
      students: 1200,
      specialties: ["General English", "Business English", "IELTS"],
      education: "Master's in TESOL, University of California",
      certifications: ["CELTA", "TESOL", "IELTS Examiner"],
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5bb?w=300&h=300&fit=crop&crop=face",
      description: "Passionate English teacher with extensive experience in helping students achieve their language goals."
    },
    {
      id: 2,
      name: "Michael Thompson",
      nationality: "UK",
      experience: "12 years",
      rating: 4.8,
      students: 1500,
      specialties: ["CEFR Preparation", "Grammar", "Pronunciation"],
      education: "BA in English Literature, Oxford University",
      certifications: ["CELTA", "DELTA", "Cambridge Examiner"],
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Experienced educator specializing in Cambridge certifications and accent training."
    },
    {
      id: 3,
      name: "Emma Wilson",
      nationality: "Australia",
      experience: "6 years",
      rating: 4.9,
      students: 800,
      specialties: ["Conversational English", "Kids English", "TOEFL"],
      education: "Bachelor of Education, University of Melbourne",
      certifications: ["TESOL", "TEFL", "Child Education Specialist"],
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Energetic teacher who makes learning English fun and engaging for students of all ages."
    },
    {
      id: 4,
      name: "David Brown",
      nationality: "Canada",
      experience: "10 years",
      rating: 4.7,
      students: 1100,
      specialties: ["Academic English", "Writing Skills", "TOEIC"],
      education: "MA in Applied Linguistics, University of Toronto",
      certifications: ["CELTA", "TESOL", "Academic Writing Specialist"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Academic writing expert with a focus on helping students excel in university-level English."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Expert Instructors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn from certified native English teachers with years of experience 
            helping students achieve their language learning goals
          </p>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {instructors.map((instructor) => (
              <Card key={instructor.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="md:flex">
                    {/* Instructor Image */}
                    <div className="md:w-1/3">
                      <img
                        src={instructor.image}
                        alt={instructor.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    
                    {/* Instructor Info */}
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm font-medium">{instructor.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-1" />
                          {instructor.nationality}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {instructor.experience}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                        {instructor.description}
                      </p>
                      
                      {/* Specialties */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties:</h4>
                        <div className="flex flex-wrap gap-1">
                          {instructor.specialties.map((specialty, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Education & Certifications */}
                      <div className="space-y-2 text-xs text-gray-600">
                        <div>
                          <span className="font-medium">Education:</span> {instructor.education}
                        </div>
                        <div>
                          <span className="font-medium">Certifications:</span> {instructor.certifications.join(", ")}
                        </div>
                        <div>
                          <span className="font-medium">Students Taught:</span> {instructor.students}+
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Instructor Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Teaching Standards
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every Kru English instructor meets our strict quality requirements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Certified Teachers</h3>
              <p className="text-gray-600">
                All instructors hold recognized TESOL, CELTA, or equivalent certifications
              </p>
            </div>
            
            <div className="text-center">
              <Globe className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Native Speakers</h3>
              <p className="text-gray-600">
                Learn from native English speakers from USA, UK, Canada, and Australia
              </p>
            </div>
            
            <div className="text-center">
              <Clock className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Experienced</h3>
              <p className="text-gray-600">
                Minimum 5+ years of English teaching experience required
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Instructors;