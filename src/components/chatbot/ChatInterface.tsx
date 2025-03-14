
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Mic, RefreshCw, Image, Paperclip, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your personal finance AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
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
        content: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    
    if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hi there! How can I help with your financial questions today?";
    } else if (lowercaseInput.includes('invest') || lowercaseInput.includes('stock')) {
      return "Investing is a great way to build wealth over time. Would you like to learn about different investment options, or do you have specific questions about stocks?";
    } else if (lowercaseInput.includes('budget') || lowercaseInput.includes('save')) {
      return "Creating a budget is the first step to financial success. I recommend the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Would you like me to help you create a personalized budget plan?";
    } else if (lowercaseInput.includes('mutual fund') || lowercaseInput.includes('sip')) {
      return "Mutual funds pool money from many investors to buy securities. SIPs (Systematic Investment Plans) let you invest regularly in mutual funds. They're great for building wealth over time with rupee-cost averaging. Would you like to know more about how to choose the right mutual fund?";
    } else {
      return "That's an interesting question about finance. Could you provide more details so I can give you a more specific answer?";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] w-full max-w-3xl mx-auto rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-md">
      {/* Chat header */}
      <div className="border-b border-slate-200 px-6 py-4 bg-white">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-finspire-100 flex items-center justify-center text-finspire-600 mr-4">
            <Bot size={20} />
          </div>
          <div>
            <h3 className="font-medium text-slate-900">Financial Assistant</h3>
            <p className="text-xs text-slate-500">Powered by AI</p>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            className="ml-auto rounded-full w-8 h-8 p-0 text-slate-500"
          >
            <Info size={16} />
          </Button>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
        <div className="space-y-6">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={cn(
                "flex",
                message.sender === 'user' ? "justify-end" : "justify-start"
              )}
            >
              <div className="flex items-end gap-2 max-w-[80%]">
                {message.sender === 'bot' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-finspire-100 flex items-center justify-center text-finspire-600">
                    <Bot size={16} />
                  </div>
                )}
                <div 
                  className={cn(
                    "px-4 py-3 rounded-2xl animate-chat-bubble",
                    message.sender === 'user' 
                      ? "bg-finspire-500 text-white rounded-tr-none" 
                      : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <User size={16} />
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end gap-2 max-w-[80%]">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-finspire-100 flex items-center justify-center text-finspire-600">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 rounded-tl-none">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input area */}
      <div className="p-4 border-t border-slate-200 bg-white">
        <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200 focus-within:border-finspire-300 focus-within:ring-2 focus-within:ring-finspire-100 transition-all" onClick={handleFocus}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask anything about finance..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 placeholder:text-slate-400"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-slate-600 rounded-full w-8 h-8 p-0"
              type="button"
            >
              <Paperclip size={16} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-slate-400 hover:text-slate-600 rounded-full w-8 h-8 p-0"
              type="button"
            >
              <Mic size={16} />
            </Button>
            <Button 
              size="sm" 
              className={cn(
                "rounded-full w-8 h-8 p-0 ml-1",
                !inputValue.trim() 
                  ? "bg-slate-200 text-slate-400 cursor-not-allowed hover:bg-slate-200" 
                  : "bg-finspire-500 text-white hover:bg-finspire-600"
              )}
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              type="button"
            >
              <Send size={14} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
