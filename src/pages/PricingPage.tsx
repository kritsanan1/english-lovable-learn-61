
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import PaymentButton from "@/components/PaymentButton";

const PricingPage = () => {
  const plans = [
    {
      name: "General English",
      price: "390",
      originalPrice: "590",
      duration: "/month",
      discount: "34% OFF",
      description: "Perfect for beginners starting their English journey",
      features: [
        "4 Live Zoom Classes per month",
        "Free learning materials",
        "24/7 access to recordings",
        "Basic email support",
        "Mobile app access",
        "Progress tracking",
      ],
      highlighted: false,
      color: "orange",
    },
    {
      name: "CEFR Platinum English",
      price: "590",
      originalPrice: "890",
      duration: "/month",
      discount: "34% OFF",
      description: "Comprehensive program for serious learners",
      features: [
        "8 Live Zoom Classes per month",
        "Premium learning materials",
        "24/7 access to recordings",
        "Priority support",
        "CEFR level certification",
        "Speaking practice sessions",
        "Grammar workshops",
        "Pronunciation training",
      ],
      highlighted: true,
      color: "blue",
    },
    {
      name: "English Combo",
      price: "1,500",
      originalPrice: "2,000",
      duration: "/3 months",
      discount: "25% OFF",
      description: "Best value for committed learners",
      features: [
        "24 Live Zoom Classes (3 months)",
        "All premium materials",
        "24/7 access to recordings",
        "VIP support",
        "Global certificate",
        "One-on-one sessions",
        "Lifetime access to materials",
        "Free level assessment",
        "Custom study plan",
      ],
      highlighted: false,
      color: "green",
    },
  ];

  const additionalDiscounts = [
    { duration: "3 months", discount: "10%" },
    { duration: "6 months", discount: "15%" },
    { duration: "12 months", discount: "20%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Choose Your Learning Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Start your English learning journey today! Special promotional prices with additional discounts for longer commitments.
          </p>
          <div className="bg-orange-100 border border-orange-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-orange-800 font-semibold">
              🎉 Limited Time Offer: Save up to 34% on all plans!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="absolute top-4 right-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {plan.discount}
                  </span>
                </div>

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
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

                <PaymentButton
                  planName={plan.name}
                  price={plan.price}
                  originalPrice={plan.originalPrice}
                  duration={plan.duration}
                  highlighted={plan.highlighted}
                  color={plan.color}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Discounts */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Additional Discounts for Longer Commitments
            </h2>
            <p className="text-xl text-gray-600">
              The longer you commit, the more you save!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {additionalDiscounts.map((discount, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {discount.discount} OFF
                </div>
                <div className="text-gray-600">
                  For {discount.duration} commitment
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              Have questions about our pricing?
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PricingPage;
