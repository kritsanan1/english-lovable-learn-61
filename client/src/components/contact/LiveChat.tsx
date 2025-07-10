import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, X, User, Bot, Minimize2, Maximize2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot' | 'agent';
  timestamp: Date;
  status?: 'sending' | 'sent' | 'delivered';
}

interface LiveChatProps {
  className?: string;
}

export const LiveChat = ({ className }: LiveChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! Welcome to KruEnglish. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineAgents, setOnlineAgents] = useState(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate agent responses
  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Our courses start from ฿1,500/month. Would you like me to send you our detailed pricing information?";
    }
    
    if (lowerMessage.includes('course') || lowerMessage.includes('class')) {
      return "We offer various English courses including Conversation, Business English, IELTS preparation, and more. What level are you interested in?";
    }
    
    if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      return "Our classes are available 7 days a week from 8 AM to 10 PM. Would you like to schedule a free trial class?";
    }
    
    if (lowerMessage.includes('trial') || lowerMessage.includes('free')) {
      return "Great! We offer a free 30-minute trial class. Would you like me to connect you with our booking team?";
    }
    
    return "Thank you for your message! Let me connect you with one of our English learning specialists who can provide more detailed information.";
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate message sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
        )
      );
    }, 500);

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const connectToAgent = () => {
    const agentMessage: Message = {
      id: Date.now().toString(),
      text: "I'm connecting you with one of our English learning specialists. Please wait a moment...",
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, agentMessage]);
    
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Hi! I'm Sarah from KruEnglish. I'd be happy to help you with your English learning journey. What specific information can I provide for you?",
        sender: 'agent',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, welcomeMessage]);
      toast({
        title: "Connected to Agent",
        description: "You're now chatting with Sarah from our support team.",
      });
    }, 3000);
  };

  if (!isOpen) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        <Badge 
          variant="destructive" 
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center"
        >
          {onlineAgents}
        </Badge>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      <Card className="w-80 h-96 shadow-xl border-2">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Live Chat</CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Badge variant="secondary" className="text-xs">
                {onlineAgents} online
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="w-8 h-8 p-0"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="flex flex-col h-80 p-0">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : message.sender === 'agent' ? (
                        <div className="w-4 h-4 bg-green-500 rounded-full" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : message.sender === 'agent'
                        ? 'bg-green-100 dark:bg-green-900 border border-green-200 dark:border-green-800'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                        {message.status && message.sender === 'user' && (
                          <span className="ml-1">
                            {message.status === 'sending' && '⏳'}
                            {message.status === 'sent' && '✓'}
                            {message.status === 'delivered' && '✓✓'}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={connectToAgent}
                  className="text-xs"
                >
                  Connect to Agent
                </Button>
              </div>
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};