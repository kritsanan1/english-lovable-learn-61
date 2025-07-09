import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, RotateCcw, Trophy } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizResult {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    question: "What is the past tense of 'go'?",
    options: ["goed", "went", "gone", "going"],
    correctAnswer: 1,
    explanation: "'Went' is the correct past tense form of the irregular verb 'go'."
  },
  {
    id: "2", 
    question: "Which article should be used before 'university'?",
    options: ["a", "an", "the", "no article"],
    correctAnswer: 0,
    explanation: "We use 'a' before 'university' because it starts with a consonant sound (/j/)."
  },
  {
    id: "3",
    question: "Choose the correct sentence:",
    options: [
      "I have been studying English since 5 years.",
      "I have been studying English for 5 years.", 
      "I am studying English since 5 years.",
      "I study English since 5 years."
    ],
    correctAnswer: 1,
    explanation: "We use 'for' with a period of time and present perfect continuous for ongoing actions."
  }
];

export const InteractiveQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return;

    const result: QuizResult = {
      questionId: sampleQuestions[currentQuestion].id,
      selectedAnswer,
      isCorrect: selectedAnswer === sampleQuestions[currentQuestion].correctAnswer
    };

    setQuizResults([...quizResults, result]);
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestion < sampleQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizResults([]);
    setQuizCompleted(false);
  };

  const correctAnswers = quizResults.filter(result => result.isCorrect).length;
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / sampleQuestions.length) * 100;

  if (quizCompleted) {
    const percentage = Math.round((correctAnswers / sampleQuestions.length) * 100);
    
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <CardTitle>Quiz Completed!</CardTitle>
          <CardDescription>Here are your results</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {correctAnswers}/{sampleQuestions.length}
            </div>
            <p className="text-muted-foreground">
              You scored {percentage}%
            </p>
          </div>

          <div className="space-y-3">
            {sampleQuestions.map((question, index) => {
              const result = quizResults[index];
              return (
                <div key={question.id} className="flex items-center gap-3 p-3 border rounded-lg">
                  {result.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                  <div className="flex-1">
                    <p className="font-medium">{question.question}</p>
                    {!result.isCorrect && (
                      <p className="text-sm text-muted-foreground">
                        Correct answer: {question.options[question.correctAnswer]}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Button onClick={resetQuiz} className="w-full">
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  const question = sampleQuestions[currentQuestion];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Grammar Quiz</CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} / {sampleQuestions.length}
          </Badge>
        </div>
        <CardDescription>Test your English grammar knowledge</CardDescription>
        <Progress value={progress} className="mt-4" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showResult}
                className={`w-full p-4 text-left border rounded-lg transition-colors ${
                  selectedAnswer === index 
                    ? showResult
                      ? index === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-red-500 bg-red-50 text-red-700'
                      : 'border-primary bg-primary/5'
                    : showResult && index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                    selectedAnswer === index 
                      ? showResult
                        ? index === question.correctAnswer
                          ? 'border-green-500 bg-green-500 text-white'
                          : 'border-red-500 bg-red-500 text-white'
                        : 'border-primary bg-primary text-primary-foreground'
                      : showResult && index === question.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-muted-foreground'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  {option}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && question.explanation && (
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Explanation:</h4>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        <Button 
          onClick={handleNextQuestion}
          disabled={selectedAnswer === null || showResult}
          className="w-full"
        >
          {currentQuestion === sampleQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
        </Button>
      </CardContent>
    </Card>
  );
};