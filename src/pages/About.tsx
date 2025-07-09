
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Users, Target, Award, Globe } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Vision",
      description: "We help you speak English confidently and achieve your dreams through effective online learning.",
    },
    {
      icon: Users,
      title: "Expert Teachers",
      description: "Learn from certified native English speakers with years of teaching experience.",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Over 5,000 students have improved their English skills and achieved their goals with us.",
    },
    {
      icon: Globe,
      title: "Global Recognition",
      description: "Our certificates are internationally recognized and accepted worldwide.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About Kru English
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are passionate about helping Thai learners master English through innovative online education. 
            Our mission is to make quality English education accessible to everyone, anywhere, anytime.
          </p>
        </div>
      </div>
    </section>

    {/* Company History & Mission */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Story
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 2020 with a mission to make quality English education accessible to everyone in Thailand
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Journey</h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">2020 - The Beginning</h4>
                <p className="text-gray-600">
                  Kru English was founded by a team of passionate educators who saw the need for 
                  affordable, high-quality English education in Thailand. We started with just 
                  2 native teachers and a vision to transform language learning.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">2021 - Digital Innovation</h4>
                <p className="text-gray-600">
                  We pioneered live Zoom classroom experiences in Thailand, making it possible 
                  for students to learn from certified native speakers without geographical limitations.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">2022 - Certification Partnership</h4>
                <p className="text-gray-600">
                  Partnered with international certification bodies to offer globally recognized 
                  English proficiency certificates, helping our students achieve their academic 
                  and career goals.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-blue-600 mb-2">2024 - Growing Community</h4>
                <p className="text-gray-600">
                  Today, we proudly serve over 5,000 students with a team of 15+ certified 
                  native English teachers from USA, UK, Canada, and Australia.
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission & Vision</h3>
            <div className="bg-blue-50 p-6 rounded-xl mb-6">
              <h4 className="text-lg font-semibold text-blue-900 mb-3">Mission</h4>
              <p className="text-blue-800">
                "To provide affordable, accessible, and effective English education that empowers 
                Thai learners to communicate confidently in English and achieve their personal 
                and professional goals."
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-xl mb-6">
              <h4 className="text-lg font-semibold text-orange-900 mb-3">Vision</h4>
              <p className="text-orange-800">
                "To become Thailand's leading online English learning platform, breaking down 
                language barriers and creating opportunities for Thai people to connect with 
                the global community."
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-green-900 mb-3">Values</h4>
              <ul className="text-green-800 space-y-2">
                <li>• Excellence in teaching and learning</li>
                <li>• Accessibility and affordability</li>
                <li>• Innovation in education technology</li>
                <li>• Student-centered approach</li>
                <li>• Cultural sensitivity and understanding</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Teaching Methodology */}
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our Teaching Methodology
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We use proven teaching methods combined with modern technology to ensure effective learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Learning</h3>
            <p className="text-gray-600 mb-4">
              Our live Zoom classes feature interactive activities, group discussions, and real-time feedback 
              to keep students engaged and motivated.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Live conversation practice</li>
              <li>• Interactive games and activities</li>
              <li>• Real-time pronunciation correction</li>
              <li>• Group collaboration exercises</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Structured Curriculum</h3>
            <p className="text-gray-600 mb-4">
              Our courses follow international standards (CEFR) with clear learning objectives 
              and measurable progress milestones.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• CEFR-aligned curriculum</li>
              <li>• Progressive skill building</li>
              <li>• Regular assessments</li>
              <li>• Personalized learning paths</li>
            </ul>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Flexible Schedule</h3>
            <p className="text-gray-600 mb-4">
              Learn at your own pace with flexible scheduling options and 24/7 access to 
              recorded classes and materials.
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Multiple time slots available</li>
              <li>• 24/7 replay access</li>
              <li>• Mobile-friendly platform</li>
              <li>• Makeup classes available</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Values Section */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe in providing the best learning experience through innovation, expertise, and dedication.
          </p>
        </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in providing the best learning experience through innovation, expertise, and dedication.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 hover:bg-orange-500 transition-colors duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Happy Students</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Expert Teachers</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold mb-2">95%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
