import React, { useState, useEffect, useRef } from 'react';
import { Send, Terminal as TerminalIcon, Lock, Unlock, Zap, Shield } from 'lucide-react';
import { getSecurityAdvice } from '../services/geminiService';
import { ChatMessage, ChatSender } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const AICoach: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: ChatSender.AI,
      text: 'VECTOR_SEC_OS ONLINE. WAITING FOR INPUT.',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSystemLocked, setIsSystemLocked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const checkAuth = async () => {
        try {
            // @ts-ignore
            if (window.aistudio && window.aistudio.hasSelectedApiKey) {
                // @ts-ignore
                const hasKey = await window.aistudio.hasSelectedApiKey();
                setIsSystemLocked(!hasKey);
            }
        } catch (e) { console.error(e); }
    };
    checkAuth();
  }, []);

  const handleUnlockSystem = async () => {
      try {
          // @ts-ignore
          if (window.aistudio && window.aistudio.openSelectKey) {
              // @ts-ignore
              await window.aistudio.openSelectKey();
              setIsSystemLocked(false);
          }
      } catch (e) { console.error(e); }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    if (isSystemLocked) { handleUnlockSystem(); return; }

    const userMsg: ChatMessage = { id: Date.now().toString(), sender: ChatSender.USER, text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getSecurityAdvice(input);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), sender: ChatSender.AI, text: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), sender: ChatSender.AI, text: "ERR: CONNECTION LOST", timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="vector-os" className="py-24 bg-black relative flex justify-center">
        <div className="container mx-auto px-6 max-w-5xl">
            <div className="border border-white/10 bg-black/80 backdrop-blur-md p-1 relative shadow-[0_0_30px_rgba(255,0,51,0.2)]">
                {/* Decorative Lines */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-green" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-green" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-neon-green" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-neon-green" />

                <div className="bg-white/5 p-4 flex items-center justify-between border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <Shield className="text-neon-green animate-pulse" size={18} />
                        <span className="font-mono text-sm tracking-widest text-white shadow-neon-green drop-shadow-[0_0_5px_rgba(255,0,51,0.5)]">SEC_OPS TERMINAL v4.2</span>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-white/50" />
                        <div className="w-3 h-3 rounded-full bg-neon-green/50" />
                    </div>
                </div>

                <div className="h-[400px] overflow-y-auto p-6 font-mono text-sm bg-black/90 relative custom-scrollbar">
                     <AnimatePresence>
                        {isSystemLocked && (
                            <div className="absolute inset-0 z-10 bg-black/90 flex flex-col items-center justify-center backdrop-blur-sm">
                                <Lock className="mb-4 text-neon-green" />
                                <button onClick={handleUnlockSystem} className="border border-neon-green text-neon-green px-6 py-2 hover:bg-neon-green hover:text-black transition-colors uppercase font-bold tracking-widest flex gap-2 items-center interactive shadow-[0_0_15px_rgba(255,0,51,0.3)]">
                                    <Unlock size={14} /> AUTHORIZE ACCESS
                                </button>
                            </div>
                        )}
                    </AnimatePresence>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`mb-4 ${msg.sender === ChatSender.USER ? 'text-right' : 'text-left'}`}>
                            <span className={`inline-block px-4 py-2 border ${
                                msg.sender === ChatSender.USER 
                                ? 'border-zinc-700 text-gray-300 bg-white/5' 
                                : 'border-neon-green/50 text-neon-green shadow-[0_0_10px_rgba(255,0,51,0.1)] bg-neon-green/5'
                            }`}>
                                {msg.sender === ChatSender.AI && <span className="mr-2 opacity-50">&gt;</span>}
                                {msg.text}
                            </span>
                        </div>
                    ))}
                    {isLoading && <div className="text-neon-green animate-pulse">&gt; ANALYZING THREATS...</div>}
                    <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-white/10 p-2 flex bg-black">
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="ENTER COMMAND OR QUERY..."
                        className="flex-1 bg-transparent text-white font-mono p-2 focus:outline-none placeholder-gray-700"
                    />
                    <button onClick={handleSend} className="px-4 text-neon-green hover:text-white transition-colors interactive">
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    </section>
  );
};