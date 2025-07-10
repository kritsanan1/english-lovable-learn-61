import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RotateCcw, Shuffle, Eye, EyeOff, ArrowLeft, ArrowRight } from "lucide-react";

interface Flashcard {
  id: string;
  front: string;
  back: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

const sampleFlashcards: Flashcard[] = [
  {
    id: "1",
    front: "Serendipity",
    back: "The occurrence of events by chance in a happy or beneficial way",
    category: "Advanced Vocabulary",
    difficulty: "hard"
  },
  {
    id: "2",
    front: "Ubiquitous", 
    back: "Present, appearing, or found everywhere",
    category: "Advanced Vocabulary",
    difficulty: "medium"
  },
  {
    id: "3",
    front: "Ephemeral",
    back: "Lasting for a very short time",
    category: "Advanced Vocabulary", 
    difficulty: "medium"
  },
  {
    id: "4",
    front: "Circumvent",
    back: "To find a way around an obstacle or problem",
    category: "Advanced Vocabulary",
    difficulty: "hard"
  },
  {
    id: "5",
    front: "Eloquent",
    back: "Fluent or persuasive in speaking or writing",
    category: "Advanced Vocabulary",
    difficulty: "easy"
  }
];

export const FlashcardDeck = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());
  const [shuffled, setShuffled] = useState(false);
  const [cards, setCards] = useState(sampleFlashcards);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      setStudiedCards(prev => new Set([...prev, cards[currentCard].id]));
    }
  };

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleShuffle = () => {
    const shuffledCards = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setCurrentCard(0);
    setIsFlipped(false);
    setShuffled(!shuffled);
  };

  const handleReset = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
    setCards(sampleFlashcards);
    setShuffled(false);
  };

  const progress = ((studiedCards.size) / cards.length) * 100;
  const card = cards[currentCard];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Vocabulary Flashcards</CardTitle>
              <CardDescription>
                {studiedCards.size} of {cards.length} cards studied
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleShuffle}>
                <Shuffle className="w-4 h-4 mr-2" />
                Shuffle
              </Button>
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          <Progress value={progress} className="mt-4" />
        </CardHeader>
      </Card>

      <div className="relative">
        <Card className="min-h-[300px] cursor-pointer transition-transform hover:scale-[1.02]" onClick={handleFlip}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="outline">
                {currentCard + 1} / {cards.length}
              </Badge>
              <Badge className={getDifficultyColor(card.difficulty)}>
                {card.difficulty}
              </Badge>
            </div>
            <CardDescription>{card.category}</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              {!isFlipped ? (
                <div>
                  <h3 className="text-2xl font-bold mb-4">{card.front}</h3>
                  <p className="text-muted-foreground flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4" />
                    Click to reveal definition
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold mb-2">{card.front}</h3>
                  <p className="text-lg leading-relaxed">{card.back}</p>
                  <p className="text-muted-foreground flex items-center justify-center gap-2 mt-4">
                    <EyeOff className="w-4 h-4" />
                    Click to hide definition
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {studiedCards.has(card.id) && (
          <div className="absolute top-4 right-4">
            <Badge variant="secondary">✓ Studied</Badge>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentCard === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button onClick={handleFlip} variant="outline">
          {isFlipped ? <EyeOff className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
          {isFlipped ? 'Hide' : 'Reveal'}
        </Button>

        <Button 
          variant="outline"
          onClick={handleNext}
          disabled={currentCard === cards.length - 1}
        >
          Next
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};