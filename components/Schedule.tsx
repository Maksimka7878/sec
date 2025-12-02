import React, { useState } from 'react';
import { OPERATIONS_LOG } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronRight, Terminal, Activity, Lock, Globe } from 'lucide-react';

export const Schedule: React.FC = () => {
    const activeSchedule = OPERATIONS_LOG.find(d => d.date === OPERATIONS_LOG[0].date); 
    const [activeDay, setActiveDay] = useState<string>(OPERATIONS_LOG[0].date);

    const currentSchedule = OPERATIONS_LOG.find(d => d.date === activeDay);

    return (
        <div className="w-full border-t-2 border-white">
            {/* Days Nav */}
            <div className="flex overflow-x-auto no-scrollbar border-b border-white/20">
                {OPERATIONS_LOG.map((day) => (
                    <button
                        key={day.date}
                        onClick={() => setActiveDay(day.date)}
                        className={`px-8 py-6 font-tech text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 relative interactive ${
                            activeDay === day.date
                            ? 'text-neon-green bg-white/5 text-shadow-neon'
                            : 'text-gray-500 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {day.date}
                        {activeDay === day.date && (
                            <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-green shadow-[0_0_10px_#ff0033]" />
                        )}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="min-h-[400px]">
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={activeDay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {currentSchedule?.sessions.map((session, idx) => (
                            <motion.div 
                                key={session.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative border-b border-white/10 hover:border-neon-green transition-colors duration-300 py-8 px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 items-center gap-4 interactive hover:bg-white/5"
                            >
                                <div className="md:col-span-2 font-mono text-xl md:text-2xl text-gray-500 group-hover:text-neon-green transition-colors group-hover:drop-shadow-[0_0_5px_rgba(255,0,51,0.8)] flex items-center gap-2">
                                    <Globe size={16} className="hidden md:block opacity-50 animate-pulse" />
                                    {session.time} UTC
                                </div>
                                
                                <div className="md:col-span-6">
                                    <h4 className="text-3xl md:text-5xl font-display font-bold uppercase text-white mb-2 group-hover:pl-4 transition-all duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-neon-green group-hover:to-white">
                                        {session.name}
                                    </h4>
                                    <div className="flex gap-4 text-xs font-mono text-gray-500 uppercase group-hover:text-gray-300">
                                        <span>// HANDLER: {session.lead}</span>
                                        <span>// T_MINUS: {session.duration}m</span>
                                        <span className="text-neon-green">[{session.category}]</span>
                                    </div>
                                </div>

                                <div className="md:col-span-4 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-10 group-hover:translate-x-0">
                                     <button className="flex items-center gap-4 text-neon-green font-bold uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(255,0,51,0.3)] bg-neon-green/10 px-4 py-2 border border-neon-green/50 hover:bg-neon-green hover:text-black transition-all">
                                         TRACE_PACKET <Activity size={16} />
                                     </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};