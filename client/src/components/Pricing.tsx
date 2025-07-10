
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "General English",
      price: "390",
      originalPrice: "590",
      duration: "/month",
      description: "Perfect for beginners starting their English journey",
      features: [
        "4 Live Zoom Classes per month",
        "Free learning materials",
        "24/7 access to recordings",
        "Basic support",
      ],
      highlighted: false,
    },
    {
      name: "CEFR Platinum English",
      price: "590",
      originalPrice: "890",
      duration: "/month",
      description: "Comprehensive program for serious learners",
      features: [
        "8 Live Zoom Classes per month",
        "Premium learning materials",
        "24/7 access to recordings",
        "Priority support",
        "CEFR level certification",
        "Speaking practice sessions",
      ],
      highlighted: true,
    },
    {
      name: "English Combo",
      price: "1,500",
      originalPrice: "2,000",
      duration: "/3 months",
      description: "Best value for committed learners",
      features: [
        "24 Live Zoom Classes (3 months)",
        "All premium materials",
        "24/7 access to recordings",
        "VIP support",
        "Global certificate",
        "One-on-one sessions",
        "Lifetime access to materials",
      ],
      highlighted: false,
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Learning Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start from just ฿390! Special discounts for 3+ month commitments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl animate-fade-in ${
                plan.highlighted
                  ? "ring-2 ring-blue-600 transform scale-105"
                  : "hover:scale-105"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 line-through text-lg mr-2">
                    ฿{plan.originalPrice}
                  </span>
                  <span className="text-4xl font-bold text-blue-600">
                    ฿{plan.price}
                  </span>
                  <span className="text-gray-600 ml-1">{plan.duration}</span>
                </div>
                <div className="text-sm text-green-600 font-semibold">
                  Save ฿{parseInt(plan.originalPrice) - parseInt(plan.price)}!
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-gray-700"
                  >
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full py-3 text-lg font-semibold ${
                  plan.highlighted
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-orange-500 hover:bg-orange-600"
                } text-white`}
                onClick={() => navigate("/pricing")}
              >
                Buy Now
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Not sure which plan is right for you?
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => navigate("/level-test")}
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Take Our Free Level Test
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
