
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Mic, MicOff, Volume2, VolumeX, Heart, TrendingUp, AlertTriangle, Sparkles, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  hasWarning?: boolean;
  category?: 'education' | 'suggestion' | 'warning' | 'general';
  reactions?: {
    thumbsUp: boolean;
    thumbsDown: boolean;
    lightbulb: boolean;
  };
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Finspire AI, your personal finance wellness companion! 🌟 I'm here to help you build healthy financial habits, understand investments, and protect you from financial scams. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
      category: 'general',
      reactions: { thumbsUp: false, thumbsDown: false, lightbulb: false }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    { text: "What is SIP?", icon: "📈", category: "education" },
    { text: "Best mutual funds for beginners", icon: "🎯", category: "suggestion" },
    { text: "Emergency fund tips", icon: "🛡️", category: "education" },
    { text: "How to avoid financial scams?", icon: "⚠️", category: "warning" },
    { text: "Tax saving investments", icon: "💰", category: "suggestion" },
    { text: "Budget planning guide", icon: "📊", category: "education" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
        hasWarning: checkForRiskyQuery(text),
        category: getMessageCategory(text),
        reactions: { thumbsUp: false, thumbsDown: false, lightbulb: false }
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const checkForRiskyQuery = (input: string): boolean => {
    const riskyKeywords = ['guaranteed returns', 'quick money', 'get rich quick', 'no risk', '100% profit', 'double money', 'sure shot'];
    return riskyKeywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  const getMessageCategory = (input: string): 'education' | 'suggestion' | 'warning' | 'general' => {
    const lowercaseInput = input.toLowerCase();
    
    if (checkForRiskyQuery(input)) return 'warning';
    if (lowercaseInput.includes('suggest') || lowercaseInput.includes('recommend') || lowercaseInput.includes('best')) return 'suggestion';
    if (lowercaseInput.includes('what') || lowercaseInput.includes('how') || lowercaseInput.includes('explain')) return 'education';
    return 'general';
  };

  const getBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (checkForRiskyQuery(input)) {
      return "🚨 Financial Wellness Alert! I'm concerned about terms like 'guaranteed returns' or 'quick money.' Remember: All legitimate investments carry some risk. Let me help you understand safe, regulated investment options that align with your financial goals. Would you like to learn about systematic investing approaches?";
    } else if (lowercaseInput.includes('sip')) {
      return "Excellent question! 📈 SIP (Systematic Investment Plan) is like a financial fitness routine - small, consistent investments that build wealth over time through the power of compounding and rupee-cost averaging. Think of it as 'paying yourself first' every month. Would you like me to explain how to start your first SIP or calculate potential returns?";
    } else if (lowercaseInput.includes('mutual fund') || lowercaseInput.includes('invest')) {
      return "Smart thinking! 🎯 Mutual funds are professionally managed investment pools that spread risk across multiple assets. For beginners, I recommend starting with diversified equity funds or balanced funds. Your risk tolerance and investment timeline are key factors. Shall I help you understand different fund categories or suggest some beginner-friendly options?";
    } else if (lowercaseInput.includes('emergency fund')) {
      return "🛡️ Emergency funds are your financial safety net! Aim for 6-12 months of expenses in a liquid savings account. Think of it as insurance against life's uncertainties - job loss, medical emergencies, or unexpected repairs. Start small if needed, even ₹500/month builds up over time. Want tips on where to park your emergency fund for better returns?";
    } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('save')) {
      return "💡 Budgeting is the foundation of financial wellness! Try the 50/30/20 rule: 50% for needs (rent, food), 30% for wants (entertainment), and 20% for savings/investments. Track expenses for a week to see where your money actually goes - you might be surprised! Would you like me to help create a personalized budget plan?";
    } else if (lowercaseInput.includes('scam') || lowercaseInput.includes('fraud')) {
      return "⚠️ Great question! Financial scams are unfortunately common. Red flags include: unrealistic returns, pressure to invest immediately, unregistered investment advisors, and schemes promising 'risk-free' high returns. Always verify through SEBI, check company credentials, and remember - if it sounds too good to be true, it probably is. Want me to share more specific warning signs?";
    } else if (lowercaseInput.includes('tax') || lowercaseInput.includes('80c')) {
      return "💰 Tax planning is wealth building! Section 80C allows ₹1.5L deduction through ELSS mutual funds, PPF, NSC, and more. ELSS funds offer equity growth potential with tax benefits and just 3-year lock-in. Don't just save tax - invest strategically for long-term wealth creation. Shall I explain different tax-saving investment options?";
    } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hello there! 👋 I'm excited to be your financial wellness companion today. Whether you want to learn about investing, need personalized suggestions, or want to improve your money habits, I'm here to help. What's on your financial mind today?";
    } else {
      return "That's a thoughtful question! 🤔 I want to make sure I give you the most helpful and accurate financial guidance. Could you provide a bit more context about what specific aspect of personal finance you're curious about? I'm here to help with investments, savings, budgeting, or any other money matters!";
    }
  };

  const handleReaction = (messageId: string, reactionType: 'thumbsUp' | 'thumbsDown' | 'lightbulb') => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId && msg.reactions) {
        return {
          ...msg,
          reactions: {
            ...msg.reactions,
            [reactionType]: !msg.reactions[reactionType]
          }
        };
      }
      return msg;
    }));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    // TODO: Implement voice recording functionality
  };

  const handleSpeakerClick = () => {
    setIsSpeaking(!isSpeaking);
    // TODO: Implement text-to-speech functionality
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'education': return <TrendingUp size={14} className="text-blue-500" />;
      case 'suggestion': return <Zap size={14} className="text-purple-500" />;
      case 'warning': return <Shield size={14} className="text-orange-500" />;
      default: return <Heart size={14} className="text-green-500" />;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'education': return 'from-blue-400 to-blue-600';
      case 'suggestion': return 'from-purple-400 to-purple-600';
      case 'warning': return 'from-orange-400 to-orange-600';
      default: return 'from-green-400 to-green-600';
    }
  };

  return (
    <div className="flex flex-col h-screen max-h-screen w-full bg-gradient-to-br from-blue-50 via-green-50 to-purple-50 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-200/30 to-green-200/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 glass-morphism border-b border-white/20 px-4 py-4 backdrop-blur-xl">
        <div className="flex items-center max-w-4xl mx-auto">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
              <Bot size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white animate-pulse shadow-sm"></div>
          </div>
          <div className="ml-4 flex-1">
            <h3 className="font-bold text-slate-800 text-xl flex items-center gap-2">
              Finspire AI 
              <Sparkles size={18} className="text-yellow-500" />
            </h3>
            <p className="text-sm text-slate-600 flex items-center gap-1">
              <TrendingUp size={14} className="text-green-500" />
              Your Financial Wellness Companion
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleSpeakerClick}
              className={cn(
                "rounded-full w-10 h-10 p-0 transition-all duration-300",
                isSpeaking 
                  ? "bg-green-100 text-green-600 hover:bg-green-200" 
                  : "text-slate-600 hover:bg-white/50"
              )}
            >
              {isSpeaking ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="group">
              {/* Warning Banner */}
              {message.hasWarning && (
                <div className="mb-4 p-4 rounded-2xl bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200/50 flex items-center gap-3 backdrop-blur-sm">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center text-white shadow-md">
                    <AlertTriangle size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-orange-800 text-sm">Financial Wellness Alert</p>
                    <p className="text-xs text-orange-700">This query contains potentially risky financial concepts. Please verify with certified advisors.</p>
                  </div>
                </div>
              )}
              
              <div className={cn(
                "flex items-end gap-3",
                message.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                {/* Avatar */}
                <div className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg",
                  message.sender === 'user' 
                    ? "bg-gradient-to-r from-slate-400 to-slate-600 text-white" 
                    : `bg-gradient-to-r ${getCategoryColor(message.category)} text-white`
                )}>
                  {message.sender === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>

                {/* Message Content */}
                <div className={cn(
                  "max-w-[75%] sm:max-w-[65%]",
                  message.sender === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-5 py-4 rounded-3xl shadow-md backdrop-blur-sm border transition-all duration-300 group-hover:shadow-lg relative overflow-hidden",
                    message.sender === 'user' 
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-tr-lg border-blue-200/50" 
                      : "bg-white/90 border-white/60 text-slate-800 rounded-tl-lg"
                  )}>
                    {/* Category indicator for bot messages */}
                    {message.sender === 'bot' && message.category && (
                      <div className="flex items-center gap-2 mb-2 opacity-70">
                        {getCategoryIcon(message.category)}
                        <span className="text-xs font-medium capitalize">{message.category}</span>
                      </div>
                    )}
                    
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Subtle shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 transform translate-x-full group-hover:translate-x-[-200%]"></div>
                  </div>
                  
                  {/* Message Footer */}
                  <div className={cn(
                    "flex items-center gap-3 mt-2 px-2",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}>
                    <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                    
                    {/* Reactions (only for bot messages) */}
                    {message.sender === 'bot' && message.reactions && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-8 h-8 p-0 rounded-full transition-all duration-200 hover:scale-110",
                            message.reactions.thumbsUp 
                              ? "bg-green-100 text-green-600 hover:bg-green-200 shadow-sm" 
                              : "hover:bg-slate-100 text-slate-400 hover:text-green-500"
                          )}
                          onClick={() => handleReaction(message.id, 'thumbsUp')}
                        >
                          👍
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-8 h-8 p-0 rounded-full transition-all duration-200 hover:scale-110",
                            message.reactions.thumbsDown 
                              ? "bg-red-100 text-red-600 hover:bg-red-200 shadow-sm" 
                              : "hover:bg-slate-100 text-slate-400 hover:text-red-500"
                          )}
                          onClick={() => handleReaction(message.id, 'thumbsDown')}
                        >
                          👎
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-8 h-8 p-0 rounded-full transition-all duration-200 hover:scale-110",
                            message.reactions.lightbulb 
                              ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 shadow-sm" 
                              : "hover:bg-slate-100 text-slate-400 hover:text-yellow-500"
                          )}
                          onClick={() => handleReaction(message.id, 'lightbulb')}
                        >
                          💡
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center text-white shadow-lg">
                <Bot size={18} />
              </div>
              <div className="px-5 py-4 rounded-3xl bg-white/90 border border-white/60 rounded-tl-lg backdrop-blur-sm shadow-md">
                <div className="typing-indicator">
                  <span className="bg-slate-400"></span>
                  <span className="bg-slate-400"></span>
                  <span className="bg-slate-400"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Quick Replies */}
      <div className="relative z-10 px-4 py-4 border-t border-white/20 bg-white/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-3 pb-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(reply.text)}
                  className="rounded-full bg-white/90 border-white/70 text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:border-blue-300 hover:text-blue-700 whitespace-nowrap backdrop-blur-sm transition-all duration-300 hover:shadow-md hover:scale-105 flex items-center gap-2"
                >
                  <span className="text-sm">{reply.icon}</span>
                  {reply.text}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="relative z-10 p-4 border-t border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-4">
            {/* Voice Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMicClick}
              className={cn(
                "rounded-full w-14 h-14 p-0 transition-all duration-300 border-2 backdrop-blur-sm shadow-lg hover:scale-105",
                isRecording 
                  ? "bg-gradient-to-r from-red-400 to-red-600 text-white border-red-300 hover:from-red-500 hover:to-red-700 animate-pulse" 
                  : "bg-white/90 text-slate-600 border-white/70 hover:bg-gradient-to-r hover:from-blue-50 hover:to-green-50 hover:text-blue-600 hover:border-blue-300"
              )}
            >
              {isRecording ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>

            {/* Input Field */}
            <div className="flex-1 relative">
              <div className="glass-morphism rounded-3xl border border-white/50 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-lg">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me about investments, savings, or financial wellness... 💰✨"
                  className="w-full px-6 py-4 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-500 rounded-3xl text-sm"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            {/* Send Button */}
            <Button 
              size="sm" 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={cn(
                "rounded-full w-14 h-14 p-0 transition-all duration-300 shadow-lg",
                !inputValue.trim() 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200" 
                  : "bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 hover:shadow-xl transform hover:scale-105"
              )}
              type="button"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
