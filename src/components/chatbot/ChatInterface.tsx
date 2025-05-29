
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Mic, RefreshCw, Image, Paperclip, Info, ThumbsUp, ThumbsDown, Lightbulb, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  hasWarning?: boolean;
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
      content: "Hello! I'm your personal finance AI assistant. How can I help you today? 🌟",
      sender: 'bot',
      timestamp: new Date(),
      reactions: { thumbsUp: false, thumbsDown: false, lightbulb: false }
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickReplies = [
    "What is SIP?",
    "Suggest a mutual fund",
    "How to start investing?",
    "Emergency fund tips",
    "Tax saving options"
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
        reactions: { thumbsUp: false, thumbsDown: false, lightbulb: false }
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const checkForRiskyQuery = (input: string): boolean => {
    const riskyKeywords = ['guaranteed returns', 'quick money', 'get rich quick', 'no risk', '100% profit'];
    return riskyKeywords.some(keyword => input.toLowerCase().includes(keyword));
  };

  const getBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('guaranteed returns') || lowercaseInput.includes('quick money')) {
      return "⚠️ I need to warn you about 'guaranteed returns' claims. No investment can guarantee returns - all investments carry some level of risk. Let me help you understand safe investment options instead.";
    } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hi there! 👋 I'm excited to help with your financial journey. What would you like to learn about today?";
    } else if (lowercaseInput.includes('sip')) {
      return "Great question! 📈 SIP (Systematic Investment Plan) is a disciplined way to invest in mutual funds. You invest a fixed amount regularly, which helps with rupee-cost averaging and builds wealth over time. Would you like me to explain how to start your first SIP?";
    } else if (lowercaseInput.includes('invest') || lowercaseInput.includes('stock')) {
      return "Investing is a wonderful way to grow your wealth! 🌱 I can help you understand different options like mutual funds, stocks, and bonds. What's your risk tolerance and investment timeline?";
    } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('save')) {
      return "Smart thinking! 💡 Budgeting is the foundation of financial success. I recommend the 50/30/20 rule: 50% needs, 30% wants, 20% savings. Want me to help create a personalized budget plan?";
    } else {
      return "That's an interesting question! 🤔 Could you provide more details so I can give you the most helpful financial guidance?";
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen max-h-screen w-full bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
      {/* Header */}
      <div className="glass-morphism border-b border-white/20 px-4 py-3 backdrop-blur-xl bg-white/70">
        <div className="flex items-center max-w-4xl mx-auto">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-finspire-400 to-finspire-600 flex items-center justify-center text-white shadow-lg">
              <Bot size={20} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-slate-800 text-lg">Finspire AI</h3>
            <p className="text-xs text-slate-600 flex items-center gap-1">
              <Sparkles size={12} className="text-finspire-500" />
              Your personal finance companion
            </p>
          </div>
          <Button variant="ghost" size="sm" className="rounded-full w-10 h-10 p-0 text-slate-600 hover:bg-white/50">
            <Info size={18} />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <ScrollArea className="flex-1 px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="group">
              {/* Warning Banner */}
              {message.hasWarning && (
                <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600 flex-shrink-0" />
                  <p className="text-sm text-amber-800">This advice might be risky. Please verify with certified financial advisors.</p>
                </div>
              )}
              
              <div className={cn(
                "flex items-end gap-3",
                message.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}>
                {/* Avatar */}
                <div className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm",
                  message.sender === 'user' 
                    ? "bg-gradient-to-r from-slate-400 to-slate-600 text-white" 
                    : "bg-gradient-to-r from-finspire-400 to-finspire-600 text-white"
                )}>
                  {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Content */}
                <div className={cn(
                  "max-w-[75%] sm:max-w-[60%]",
                  message.sender === 'user' ? "items-end" : "items-start"
                )}>
                  <div className={cn(
                    "px-4 py-3 rounded-2xl shadow-sm backdrop-blur-sm border transition-all duration-300 group-hover:shadow-md",
                    message.sender === 'user' 
                      ? "bg-gradient-to-r from-finspire-500 to-finspire-600 text-white rounded-tr-md border-finspire-200" 
                      : "bg-white/80 border-white/40 text-slate-800 rounded-tl-md"
                  )}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  
                  {/* Message Footer */}
                  <div className={cn(
                    "flex items-center gap-2 mt-1 px-1",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}>
                    <span className="text-xs text-slate-500">{formatTime(message.timestamp)}</span>
                    
                    {/* Reactions (only for bot messages) */}
                    {message.sender === 'bot' && message.reactions && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-6 h-6 p-0 rounded-full transition-colors",
                            message.reactions.thumbsUp 
                              ? "bg-green-100 text-green-600 hover:bg-green-200" 
                              : "hover:bg-slate-100 text-slate-400"
                          )}
                          onClick={() => handleReaction(message.id, 'thumbsUp')}
                        >
                          <ThumbsUp size={12} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-6 h-6 p-0 rounded-full transition-colors",
                            message.reactions.thumbsDown 
                              ? "bg-red-100 text-red-600 hover:bg-red-200" 
                              : "hover:bg-slate-100 text-slate-400"
                          )}
                          onClick={() => handleReaction(message.id, 'thumbsDown')}
                        >
                          <ThumbsDown size={12} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-6 h-6 p-0 rounded-full transition-colors",
                            message.reactions.lightbulb 
                              ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200" 
                              : "hover:bg-slate-100 text-slate-400"
                          )}
                          onClick={() => handleReaction(message.id, 'lightbulb')}
                        >
                          <Lightbulb size={12} />
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
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-finspire-400 to-finspire-600 flex items-center justify-center text-white shadow-sm">
                <Bot size={16} />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-white/80 border border-white/40 rounded-tl-md backdrop-blur-sm">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {/* Quick Replies */}
      <div className="px-4 py-3 border-t border-white/20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <ScrollArea className="w-full whitespace-nowrap">
            <div className="flex gap-2 pb-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSendMessage(reply)}
                  className="rounded-full bg-white/80 border-white/60 text-slate-700 hover:bg-white hover:border-finspire-300 hover:text-finspire-700 whitespace-nowrap backdrop-blur-sm transition-all duration-200 hover:shadow-sm"
                >
                  {reply}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
      
      {/* Input Area */}
      <div className="p-4 border-t border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-center gap-3">
            {/* Voice Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleMicClick}
              className={cn(
                "rounded-full w-12 h-12 p-0 transition-all duration-300 border-2 backdrop-blur-sm",
                isRecording 
                  ? "bg-red-500 text-white border-red-400 hover:bg-red-600 animate-pulse shadow-lg" 
                  : "bg-white/80 text-slate-600 border-white/60 hover:bg-finspire-50 hover:text-finspire-600 hover:border-finspire-300 shadow-sm"
              )}
            >
              <Mic size={18} />
            </Button>

            {/* Input Field */}
            <div className="flex-1 relative">
              <div className="glass-morphism rounded-2xl border border-white/40 focus-within:border-finspire-300 focus-within:ring-2 focus-within:ring-finspire-100 transition-all duration-200 bg-white/80 backdrop-blur-sm shadow-sm">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask me anything about finance... 💰"
                  className="w-full px-4 py-3 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-500 rounded-2xl"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-slate-400 hover:text-slate-600 rounded-full w-8 h-8 p-0 transition-colors"
                    type="button"
                  >
                    <Paperclip size={16} />
                  </Button>
                </div>
              </div>
            </div>

            {/* Send Button */}
            <Button 
              size="sm" 
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={cn(
                "rounded-full w-12 h-12 p-0 transition-all duration-300 shadow-sm",
                !inputValue.trim() 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200" 
                  : "bg-gradient-to-r from-finspire-500 to-finspire-600 text-white hover:from-finspire-600 hover:to-finspire-700 shadow-lg hover:shadow-xl transform hover:scale-105"
              )}
              type="button"
            >
              <Send size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
