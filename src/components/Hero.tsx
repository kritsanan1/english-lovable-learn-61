
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Learn English Live with{" "}
              <span className="text-blue-600">Native Teachers</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Anytime, Anywhere! Join our live Zoom classes and speak English confidently in just 2 months.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                onClick={() => navigate("/pricing")}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg"
              >
                View Plans & Pricing
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate("/level-test")}
                className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
              >
                Take Level Test
              </Button>
            </div>
          </div>

          {/* Right content - Image placeholder */}
          <div className="mt-12 lg:mt-0 animate-fade-in">
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-100 to-orange-100 rounded-2xl p-8 h-96 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Live Zoom Classroom</h3>
                  <p className="text-gray-600">Interactive English lessons with native speakers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
