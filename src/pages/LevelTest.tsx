
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LevelTest = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [testCompleted, setTestCompleted] = useState(false);
  const [level, setLevel] = useState("");

  const questions = [
    {
      question: "What is your name?",
      options: ["My name is John", "I am John", "John is my name", "All of the above"],
      correct: 3
    },
    {
      question: "Choose the correct sentence:",
      options: ["She go to school every day", "She goes to school every day", "She going to school every day", "She gone to school every day"],
      correct: 1
    },
    {
      question: "What time _____ you usually wake up?",
      options: ["do", "does", "are", "is"],
      correct: 0
    },
    {
      question: "I _____ watching TV when he called.",
      options: ["am", "was", "is", "were"],
      correct: 1
    },
    {
      question: "If I _____ rich, I would travel the world.",
      options: ["am", "was", "were", "be"],
      correct: 2
    },
    {
      question: "She has been living here _____ 2010.",
      options: ["since", "for", "from", "at"],
      correct: 0
    },
    {
      question: "The report _____ by tomorrow.",
      options: ["must finish", "must be finished", "must finishing", "must to finish"],
      correct: 1
    },
    {
      question: "I wish I _____ speak English fluently.",
      options: ["can", "could", "will", "would"],
      correct: 1
    }
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex.toString()];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate level based on correct answers
      let correctCount = 0;
      newAnswers.forEach((answer, index) => {
        if (parseInt(answer) === questions[index].correct) {
          correctCount++;
        }
      });

      let calculatedLevel = "";
      if (correctCount <= 3) calculatedLevel = "A1 - Beginner";
      else if (correctCount <= 5) calculatedLevel = "A2 - Elementary";
      else if (correctCount <= 7) calculatedLevel = "B1 - Intermediate";
      else calculatedLevel = "B2 - Upper Intermediate";

      setLevel(calculatedLevel);
      setTestCompleted(true);
    }
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setTestCompleted(false);
    setLevel("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {!testCompleted ? (
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                English Level Test
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Discover your English level with our quick assessment test (A1-B2)
              </p>
              <div className="bg-white rounded-lg p-4 max-w-md mx-auto shadow-lg">
                <div className="text-sm text-gray-600 mb-2">
                  Question {currentQuestion + 1} of {questions.length}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                {questions[currentQuestion].question}
              </h2>
              
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="p-6 text-left h-auto hover:bg-blue-50 hover:border-blue-600 transition-all duration-200"
                    onClick={() => handleAnswer(index)}
                  >
                    <span className="font-semibold text-blue-600 mr-4">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    {option}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-20 bg-gradient-to-b from-green-50 to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-12 animate-fade-in">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              </div>
              
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Test Completed!
              </h1>
              
              <div className="bg-blue-50 rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Your English Level:
                </h2>
                <div className="text-3xl font-bold text-blue-600">
                  {level}
                </div>
              </div>

              <p className="text-xl text-gray-600 mb-8">
                Great job! Based on your results, we recommend our courses to help you improve your English skills.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg"
                  onClick={() => navigate("/pricing")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                >
                  View Recommended Plans
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={resetTest}
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                >
                  Retake Test
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default LevelTest;
