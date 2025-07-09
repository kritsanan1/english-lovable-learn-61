
import { BookOpen, Users, Clock, Award } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Live Zoom Classes",
      description: "Interactive classes with native English teachers in real-time",
    },
    {
      icon: BookOpen,
      title: "Free Materials",
      description: "Comprehensive learning materials and resources at no extra cost",
    },
    {
      icon: Clock,
      title: "24/7 Replay",
      description: "Access recorded classes anytime to review and practice",
    },
    {
      icon: Award,
      title: "Global Certificates",
      description: "Internationally recognized certificates upon course completion",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Kru English?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to master English effectively and confidently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-gray-50 hover:bg-blue-50 transition-all duration-300 hover:shadow-lg group animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-500 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
