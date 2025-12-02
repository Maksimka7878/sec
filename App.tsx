import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, ArrowUpRight, Shield, Zap, Play, Hexagon, Circle, Crosshair, Cpu, Box, Sparkles, Target, Lock, Skull, Check, Star, ChevronRight, Activity, TrendingUp, Wifi, Server, Database, Eye, Terminal, Radio } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { AICoach } from './components/AICoach';
import { Schedule } from './components/Schedule';
import { EXPERTS, PRICING_PLANS, SHOP_ITEMS, TESTIMONIALS, TOOL_ITEMS } from './constants';

// --- Custom Cursor ---
const CustomCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            mouseX.set(e.clientX - 10);
            mouseY.set(e.clientY - 10);
            
            const target = e.target as HTMLElement;
            setIsHovered(!!target.closest('button') || !!target.closest('a') || !!target.closest('.interactive'));
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-5 h-5 bg-neon-green mix-blend-difference pointer-events-none z-[9999] rounded-sm blur-[1px]"
                style={{ x: mouseX, y: mouseY }}
                animate={{ 
                    scale: isHovered ? 4 : 1,
                    backgroundColor: isHovered ? "#ffffff" : "#ff0033",
                    skewX: isHovered ? -20 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <motion.div 
                className="fixed top-0 left-0 w-5 h-5 border border-white pointer-events-none z-[9999]"
                style={{ x: mouseX, y: mouseY }}
                animate={{ 
                    scale: isHovered ? 0 : 1.5,
                    rotate: isHovered ? 90 : 45,
                    borderColor: isHovered ? "#ff0033" : "#ffffff",
                }}
                transition={{ duration: 0.2 }}
            />
        </>
    );
};

// --- Components ---

const Marquee: React.FC<{ text: string; reverse?: boolean; className?: string }> = ({ text, reverse, className }) => {
    return (
        <div className={`w-full overflow-hidden flex whitespace-nowrap bg-neon-green text-black relative z-10 ${className}`}>
            <motion.div 
                className="flex py-2"
                animate={{ x: reverse ? "0%" : "-50%" }}
                initial={{ x: reverse ? "-50%" : "0%" }}
                transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
            >
                {Array(20).fill(text).map((t, i) => (
                    <span key={i} className="text-3xl md:text-5xl font-sport font-bold italic uppercase px-4 flex items-center gap-4">
                        {t} <span className="text-white opacity-50">///</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
}

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Corner Navigation */}
            <motion.header className="fixed inset-0 z-50 pointer-events-none text-white p-6 md:p-12">
                {/* Top Left - Logo */}
                <div className="absolute top-6 left-6 md:top-10 md:left-10 pointer-events-auto mix-blend-difference">
                    <a href="#" className="flex items-center gap-3 group leading-none">
                        <div className="flex flex-col">
                            <span className="font-sport font-bold italic text-5xl md:text-6xl tracking-tight group-hover:text-neon-green transition-colors drop-shadow-[0_0_10px_rgba(255,0,51,0.5)] flex items-center gap-2">
                                <span className="text-neon-green -skew-x-12">///</span> CRIMSON
                            </span>
                            <span className="font-sport font-bold text-xl tracking-[0.2em] ml-1 text-white uppercase -mt-1 opacity-80">
                                VECTOR SEC
                            </span>
                        </div>
                    </a>
                </div>

                {/* Top Right - Menu Trigger */}
                <div className="absolute top-6 right-6 md:top-10 md:right-10 pointer-events-auto mix-blend-difference">
                    <button 
                        onClick={() => setIsOpen(true)} 
                        className="group flex flex-col items-end gap-1 interactive"
                    >
                        <span className="font-sport text-xl text-neon-green tracking-widest italic uppercase">[MENU]</span>
                        <div className="flex gap-1">
                            <div className="w-8 h-2 bg-white skew-x-12 group-hover:w-4 transition-all duration-300 group-hover:bg-neon-green" />
                            <div className="w-2 h-2 bg-neon-green skew-x-12 shadow-[0_0_10px_#ff0033]" />
                        </div>
                        <div className="w-6 h-2 bg-white skew-x-12 group-hover:w-8 transition-all duration-300 group-hover:bg-neon-green" />
                    </button>
                </div>

                {/* Bottom Left - System Info */}
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 font-mono text-xs hidden md:block opacity-60 mix-blend-difference border-l-2 border-neon-green pl-2">
                    <div>SYS.STATUS: <span className="text-neon-green animate-pulse font-bold">ARMED</span></div>
                    <div>SECTOR: 7G (FIREWALL)</div>
                </div>

                {/* Bottom Right - Time */}
                <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 font-sport text-2xl text-right hidden md:block mix-blend-difference">
                     <div>{time.toLocaleTimeString()}</div>
                     <div className="text-neon-green text-sm font-mono tracking-widest">{time.toLocaleDateString()}</div>
                </div>
            </motion.header>

            {/* Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
                        animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                        exit={{ clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" }}
                        transition={{ duration: 0.5, ease: "circInOut" }}
                        className="fixed inset-0 bg-black z-[100] flex flex-col justify-center items-center overflow-hidden"
                    >
                        {/* Background Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,51,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,51,0.05)_1px,transparent_1px)] bg-[size:100px_100px]" />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-neon-green/5 pointer-events-none" />

                        <button 
                            onClick={() => setIsOpen(false)}
                            className="absolute top-10 right-10 w-12 h-12 flex items-center justify-center hover:rotate-90 transition-transform duration-500 interactive text-neon-green"
                        >
                            <X size={32} />
                        </button>
                        
                        <nav className="flex flex-col -space-y-4 md:-space-y-6 relative z-10 text-center">
                            {['MAIN', 'OPERATIVES', 'THREAT_FEED', 'DEBRIEFS', 'SEC_AI', 'ARSENAL', 'CONTACT'].map((item, i) => (
                                <motion.div
                                    key={item}
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                >
                                    <a
                                        href={`#${item.toLowerCase().replace('_', '-')}`}
                                        onClick={() => setIsOpen(false)}
                                        className="block text-7xl md:text-[9vw] font-sport font-bold italic uppercase text-transparent text-outline hover:text-white hover:text-outline-none transition-all duration-300 interactive leading-none tracking-tighter hover:translate-x-10 hover:text-neon-green skew-x-[-10deg]"
                                    >
                                        {item.replace('_', ' ')}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>
                        
                        <div className="absolute bottom-0 w-full p-4 bg-neon-green text-black font-sport font-bold text-lg flex justify-between uppercase tracking-widest">
                           <span>/// CRIMSON NAVIGATION ///</span>
                           <span>ESC TO ABORT</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

const Hero: React.FC = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 400]);
    const scaleText = useTransform(scrollY, [0, 500], [1, 1.2]);
    const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

    return (
        <section id="main" className="relative h-[120vh] w-full bg-black overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-10" />
                <div className="absolute inset-0 bg-neon-green/5 mix-blend-overlay z-10" />
                <video 
                    autoPlay loop muted playsInline 
                    className="w-full h-full object-cover grayscale contrast-125 scale-105 opacity-40"
                >
                    {/* Data Stream / Server Room */}
                    <source src="https://videos.pexels.com/video-files/5473806/5473806-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Kinetic Typography */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-center pointer-events-none px-4">
                <motion.h1 
                    style={{ scale: scaleText, opacity: opacityText }}
                    className="text-[20vw] leading-[0.75] font-sport font-bold italic text-white uppercase text-center tracking-tighter mix-blend-difference skew-x-[-5deg]"
                >
                    <div className="flex items-center justify-center gap-4 md:gap-12">
                        <span className="block drop-shadow-[0_0_30px_rgba(255,0,51,0.3)] bg-gradient-to-b from-white via-neon-green to-white bg-clip-text text-transparent animate-pulse">OFFENSIVE</span>
                    </div>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-green via-white to-neon-green">SECURITY</span>
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="font-sport text-2xl md:text-4xl text-white uppercase tracking-[0.5em] mt-8 bg-black/50 backdrop-blur-sm px-8 py-2 border border-white/20"
                >
                    Active Cyber Warfare Defense
                </motion.p>
            </div>

            {/* Floating Data Elements */}
            <motion.div style={{ y: y1 }} className="absolute bottom-[25vh] left-6 md:left-20 z-20 text-white mix-blend-difference max-w-sm">
                <div className="h-2 w-20 bg-neon-green mb-6 shadow-[0_0_10px_#ff0033] skew-x-[-20deg]" />
                <p className="font-sport text-xl leading-none uppercase text-gray-300">
                    / EST. 2024<br/>
                    / SECURITY OPERATIONS CENTER<br/>
                    / NO UNAUTHORIZED ACCESS
                </p>
            </motion.div>

            <motion.div 
                style={{ y: useTransform(scrollY, [0, 1000], [0, -200]) }}
                className="absolute bottom-10 right-6 md:right-20 z-20"
            >
                <a href="#contracts" className="group block w-40 h-40 border-2 border-white/20 backdrop-blur-md relative overflow-hidden interactive hover:border-neon-green transition-colors bg-black/30 skew-x-[-5deg]">
                    <div className="absolute inset-0 flex flex-col items-center justify-center group-hover:-translate-y-full transition-transform duration-500 ease-in-out text-white">
                        <Shield size={42} className="text-neon-green" />
                        <span className="font-sport font-bold text-2xl mt-2 text-gray-300 uppercase">AUDIT NOW</span>
                    </div>
                    <div className="absolute inset-0 bg-neon-green flex flex-col items-center justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out text-black">
                        <span className="font-sport font-bold text-4xl uppercase italic">SECURE</span>
                    </div>
                </a>
            </motion.div>
        </section>
    );
};

const MissionStatement: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section className="py-32 bg-black overflow-hidden relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-green/5 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                 <div className="flex flex-col md:flex-row items-start gap-12 mb-24">
                     <div className="w-16 h-16 bg-neon-green flex items-center justify-center text-black shadow-[0_0_20px_#ff0033] skew-x-[-10deg]">
                         <Radio size={32} />
                     </div>
                     <div className="max-w-3xl">
                         <h2 className="text-5xl md:text-8xl font-sport font-bold italic uppercase leading-[0.9] text-white mb-8">
                             Info is <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-white">Ammunition</span>.<br/>Defend the perimeter.
                         </h2>
                         <p className="text-gray-400 font-sans text-lg leading-relaxed border-l-4 border-neon-green pl-6">
                             Crimson Vector is a restricted access cybersecurity firm. We do not do "antivirus". We engineer digital survival, offensive countermeasures, and network invincibility. Welcome to the future of data protection.
                         </p>
                     </div>
                 </div>
            </div>
            
            {/* Sliding Text */}
            <div ref={containerRef} className="w-full border-y border-white/10 py-12 bg-neon-grey/50 overflow-hidden relative backdrop-blur-sm">
                <motion.div style={{ x }} className="whitespace-nowrap flex gap-12 items-center">
                    <span className="text-[12vw] font-sport font-bold italic text-white/10 uppercase skew-x-[-10deg]">Intercept</span>
                    <span className="text-[12vw] font-sport font-bold italic text-outline uppercase skew-x-[-10deg]">Decrypt</span>
                    <span className="text-[12vw] font-sport font-bold italic text-neon-green uppercase drop-shadow-[0_0_15px_rgba(255,0,51,0.5)] skew-x-[-10deg]">Neutralize</span>
                    <span className="text-[12vw] font-sport font-bold italic text-white/10 uppercase skew-x-[-10deg]">Secure</span>
                    <span className="text-[12vw] font-sport font-bold italic text-outline uppercase skew-x-[-10deg]">Counter</span>
                </motion.div>
            </div>
        </section>
    )
}

const OperativesReveal: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const containerRef = useRef(null);
    
    return (
        <section id="operatives" ref={containerRef} className="py-40 bg-black relative border-t border-white/5">
            {/* Background Text Texture */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none writing-v-lr h-full font-sport font-bold italic text-[12vw] text-white leading-none whitespace-nowrap overflow-hidden">
                NETSEC /// OPS /// INTEL
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 flex items-end justify-between border-b-2 border-white/20 pb-6">
                    <h2 className="text-7xl md:text-[10rem] font-sport font-bold italic uppercase text-white tracking-tighter leading-none">
                        ELITE OPS
                    </h2>
                    <span className="font-sport font-bold text-neon-green text-xl mb-4 animate-pulse uppercase tracking-widest">[ CLEARANCE REQUIRED ]</span>
                </div>

                <div className="flex flex-col">
                    {EXPERTS.map((expert, index) => (
                        <div 
                            key={index}
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                            className="group relative border-b border-white/10 hover:border-neon-green transition-colors duration-300 py-12 md:py-16 cursor-none interactive"
                        >
                            <div className="flex flex-col md:flex-row md:items-baseline justify-between relative z-20 pointer-events-none">
                                <div className="flex items-center gap-8">
                                    <span className="font-sport font-bold text-4xl text-gray-600 group-hover:text-neon-green transition-colors italic">0{index + 1}</span>
                                    <h3 className="text-6xl md:text-9xl font-sport font-bold italic uppercase text-white group-hover:text-transparent group-hover:text-outline-hover transition-all duration-300 skew-x-[-5deg]">
                                        {expert.name}
                                    </h3>
                                </div>
                                <span className="font-sport font-bold text-xl md:text-2xl text-gray-500 mt-4 md:mt-0 tracking-widest group-hover:text-white transition-colors uppercase">
                                    /// {expert.specialty}
                                </span>
                            </div>
                            
                            {/* Lens Reveal */}
                            <motion.div 
                                className="fixed top-1/2 left-1/2 w-[400px] h-[500px] z-30 pointer-events-none overflow-hidden bg-neon-grey border-2 border-neon-green"
                                initial={{ opacity: 0, scale: 0.8, x: "-50%", y: "-50%" }}
                                animate={{ 
                                    opacity: activeIndex === index ? 1 : 0,
                                    scale: activeIndex === index ? 1 : 0.8,
                                    rotate: activeIndex === index ? -2 : 0,
                                    skewX: -5
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                <img 
                                    src={expert.image} 
                                    alt={expert.name} 
                                    className="w-full h-full object-cover grayscale contrast-125 mix-blend-luminosity" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-green/30 to-transparent mix-blend-overlay" />
                                <div className="absolute bottom-0 left-0 w-full p-6 bg-black/90 backdrop-blur-sm border-t-2 border-neon-green">
                                    <p className="font-sport text-xl text-neon-green mb-1 flex items-center gap-2 uppercase font-bold"><Sparkles size={16} /> CLASSIFIED_DATA</p>
                                    <p className="text-sm text-white leading-tight font-sans">{expert.bio}</p>
                                </div>
                                {/* Crosshairs */}
                                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-neon-green" />
                                <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-neon-green" />
                                <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-neon-green" />
                                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-neon-green" />
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const MissionDebriefs: React.FC = () => {
    return (
        <section id="debriefs" className="py-32 bg-black text-white relative overflow-hidden">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col items-center mb-20">
                     <div className="flex items-center gap-2 mb-4">
                        <TrendingUp className="text-neon-green animate-pulse" />
                        <span className="font-sport font-bold text-xl text-neon-green tracking-widest uppercase">CASE_FILES</span>
                     </div>
                     <h2 className="text-7xl md:text-9xl font-sport font-bold italic uppercase text-center leading-[0.8]">MISSION <br/> DEBRIEFS</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {TESTIMONIALS.map((t, i) => (
                        <div key={i} className="bg-neon-grey/40 backdrop-blur-sm border border-white/10 p-8 relative group hover:border-white transition-colors duration-500 skew-x-[-2deg] hover:skew-x-0">
                             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                                 <Shield size={64} className="text-white" />
                             </div>
                             
                             <div className="flex items-center gap-4 mb-6">
                                 <div className="w-20 h-20 grayscale group-hover:grayscale-0 transition-all duration-500 overflow-hidden clip-corner border-2 border-white/20 group-hover:border-neon-green">
                                     <img src={t.image} className="w-full h-full object-cover" alt={t.name} />
                                 </div>
                                 <div>
                                     <h4 className="font-bold font-sport italic uppercase text-3xl leading-none group-hover:text-neon-green transition-colors">{t.name}</h4>
                                     <span className="text-sm font-mono text-gray-500">{t.role}</span>
                                 </div>
                             </div>
                             
                             <p className="font-sans text-sm text-gray-400 mb-6 leading-relaxed italic border-l-2 border-white/20 pl-4">
                                 "{t.quote}"
                             </p>
                             
                             <div className="space-y-3 mb-6 border-t border-white/10 pt-4">
                                 {t.stats.map((stat, idx) => (
                                     <div key={idx} className="flex items-center gap-2 text-sm font-mono">
                                         <span className="w-12 text-gray-500 font-bold">{stat.label}</span>
                                         <div className="flex-1 h-2 bg-white/10 skew-x-[-12deg]">
                                             <div className="h-full bg-white group-hover:bg-neon-green transition-all duration-500" style={{ width: `${stat.value}%` }} />
                                         </div>
                                         <span className="text-neon-green font-bold">{stat.value}</span>
                                     </div>
                                 ))}
                             </div>

                             <div className="inline-block bg-white/10 px-4 py-2 text-white font-sport font-bold text-xl uppercase tracking-widest border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                                 STATUS: <span className="text-neon-green">{t.result}</span>
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const CyberArsenal: React.FC = () => {
    return (
        <section id="arsenal" className="py-24 bg-neon-green text-black">
             <div className="container mx-auto px-6">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                     <div>
                         <h2 className="text-8xl md:text-[12rem] font-sport font-bold italic uppercase mb-8 leading-[0.8] tracking-tighter skew-x-[-5deg]">
                             CYBER<br/>ARSENAL
                         </h2>
                         <p className="font-sans text-xl max-w-md border-l-4 border-black pl-6 mb-12 font-bold opacity-80">
                             Software and Hardware tools for field operatives. Tactical defense and penetration utilities.
                         </p>
                         <div className="flex gap-4">
                             <div className="w-32 h-32 border-4 border-black flex items-center justify-center font-sport font-bold text-4xl italic animate-spin-slow">
                                 <Wifi size={48} />
                             </div>
                             <div className="w-32 h-32 border-4 border-black bg-black text-neon-green flex items-center justify-center font-sport font-bold text-4xl italic">
                                 24/7
                             </div>
                         </div>
                     </div>

                     <div className="space-y-6">
                         {TOOL_ITEMS.map((item, i) => (
                             <div key={i} className="group border-b-2 border-black/20 pb-6 hover:pl-6 transition-all duration-300 cursor-pointer">
                                 <div className="flex justify-between items-baseline mb-2">
                                     <h3 className="text-4xl font-sport font-bold italic uppercase group-hover:text-white transition-colors">{item.name}</h3>
                                     <span className="font-sport font-bold text-2xl">{item.price}</span>
                                 </div>
                                 <p className="font-sans text-base opacity-70 mb-3 font-semibold">{item.description}</p>
                                 <div className="flex gap-2">
                                     {item.tags.map(tag => (
                                         <span key={tag} className="text-xs font-bold font-mono border border-black px-2 py-1 uppercase">{tag}</span>
                                     ))}
                                     <span className="text-xs font-bold font-mono bg-black text-neon-green px-2 py-1">ENCR: {item.power}</span>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
             </div>
        </section>
    )
}

const FieldEquipment: React.FC = () => {
    return (
        <section id="equipment" className="py-32 bg-black text-white relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-[50vw] h-[50vw] bg-white/5 rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex justify-between items-end mb-20 border-b-2 border-white/10 pb-6">
                    <h2 className="text-6xl md:text-9xl font-sport font-bold italic uppercase">FIELD <span className="text-outline">EQUIPMENT</span></h2>
                    <a href="#" className="hidden md:flex items-center gap-2 font-sport font-bold text-xl text-neon-green interactive hover:underline uppercase tracking-widest shadow-[0_0_10px_#ff0033] px-6 py-3 border border-neon-green/30 hover:bg-neon-green/10 transition-colors">
                        ACCESS ARMORY <ArrowRight size={20} />
                    </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {SHOP_ITEMS.map((item, idx) => (
                        <div key={idx} className="group relative bg-neon-grey/30 overflow-hidden interactive border border-transparent hover:border-neon-green/50 transition-colors backdrop-blur-sm skew-x-[-2deg]">
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={item.name} />
                                <div className="absolute inset-0 bg-neon-green/20 opacity-0 group-hover:opacity-100 transition-opacity mix-blend-color" />
                                <div className="absolute top-4 right-4 bg-black text-neon-green font-sport font-bold text-xl px-3 py-1 uppercase">
                                    IN_STOCK
                                </div>
                            </div>
                            
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-3xl font-sport font-bold italic uppercase">{item.name}</h4>
                                    <span className="text-neon-green font-sport font-bold text-2xl shadow-[0_0_10px_#ff0033] shadow-neon-green/50 bg-neon-green/10 px-2">{item.price}</span>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {item.perks.map((p, i) => (
                                        <span key={i} className="text-[10px] font-mono bg-white/5 px-2 py-1 text-gray-300 border border-white/10 uppercase font-bold">{p}</span>
                                    ))}
                                </div>
                                <button className="w-full py-4 bg-white text-black font-sport font-bold uppercase text-xl hover:bg-neon-green transition-colors tracking-widest flex justify-between px-6 items-center group-hover:pl-8 italic">
                                    <span>REQUISITION</span>
                                    <Box size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const SecurityClearance: React.FC = () => {
    const [activePlan, setActivePlan] = useState<number>(1); // Default to middle (1)

    return (
        <section id="contracts" className="py-24 bg-black relative overflow-hidden min-h-screen flex flex-col justify-center">
            {/* Background Title */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none opacity-20 z-0">
                 <h2 className="text-[25vw] font-sport font-bold italic text-transparent text-outline leading-none uppercase tracking-tighter">
                     CLEARANCE
                 </h2>
            </div>

            <div className="container mx-auto px-4 relative z-10 h-full">
                <div className="flex flex-col lg:flex-row gap-4 h-[80vh] items-stretch">
                    {PRICING_PLANS.map((plan, idx) => {
                        const isActive = activePlan === idx;
                        return (
                            <motion.div
                                key={idx}
                                onMouseEnter={() => setActivePlan(idx)}
                                className={`relative border-2 border-white/10 overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] skew-x-[-2deg] ${isActive ? 'flex-[3] border-neon-green shadow-[0_0_30px_rgba(255,0,51,0.2)]' : 'flex-[1] hover:flex-[1.5]'}`}
                            >
                                {/* Background Image/Gradient */}
                                <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                    <div className={`absolute inset-0 bg-gradient-to-b ${
                                        idx === 1 ? 'from-neon-green/20 via-black/80 to-black' : 
                                        idx === 2 ? 'from-white/20 via-black/80 to-black' : 
                                        'from-gray-800/20 via-black/80 to-black'
                                    }`} />
                                </div>

                                {/* Content Container */}
                                <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`transform transition-all duration-500 ${isActive ? 'translate-x-0' : '-translate-x-4 opacity-50'}`}>
                                            <h3 className={`font-sport font-bold italic text-5xl md:text-7xl uppercase leading-none mb-2 ${
                                                idx === 1 ? 'text-neon-green' : 'text-white'
                                            }`}>
                                                {plan.name}
                                            </h3>
                                            {plan.recommended && isActive && (
                                                <span className="bg-neon-green text-black text-sm font-sport font-bold italic px-3 py-1 uppercase tracking-widest inline-block skew-x-[-10deg]">
                                                    BEST VALUE
                                                </span>
                                            )}
                                        </div>
                                        <div className="font-sport font-bold text-3xl text-gray-500 opacity-50">
                                            0{idx + 1}
                                        </div>
                                    </div>

                                    {/* Middle: Features (Only visible when active) */}
                                    <div className={`space-y-4 transition-all duration-500 delay-100 ${isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden md:block'}`}>
                                        {isActive && plan.features.map((feature, i) => (
                                            <div key={i} className="flex items-center gap-4">
                                                <div className={`w-2 h-2 skew-x-[-10deg] ${idx === 1 ? 'bg-neon-green' : 'bg-white'}`} />
                                                <span className="font-sport font-bold text-2xl text-gray-200 uppercase tracking-wide">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Bottom: Price & CTA */}
                                    <div>
                                        <div className={`font-sport font-bold italic text-7xl md:text-8xl mb-6 transition-all duration-500 ${isActive ? 'text-white scale-100' : 'text-gray-600 scale-75 origin-bottom-left'}`}>
                                            {plan.price}
                                        </div>
                                        
                                        <button className={`w-full py-5 uppercase font-sport font-bold italic text-2xl tracking-widest border-2 transition-all duration-300 group overflow-hidden relative ${
                                            isActive 
                                                ? idx === 1 ? 'bg-neon-green text-black border-neon-green hover:bg-white hover:text-black' : 'bg-white text-black border-white hover:bg-gray-200'
                                                : 'border-white/20 text-transparent hover:border-white/40'
                                        }`}>
                                            <span className={`relative z-10 flex items-center justify-center gap-3 ${!isActive && 'hidden'}`}>
                                                {idx === 1 ? 'INITIATE PROTOCOL' : 'SELECT TIER'} <ArrowRight size={24} />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Vertical Text for Inactive State */}
                                {!isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                        <span className="[writing-mode:vertical-lr] font-sport font-bold italic text-6xl text-gray-800 uppercase tracking-widest rotate-180">
                                            {plan.name}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    );
};

const FooterRaw: React.FC = () => {
    return (
        <footer className="bg-black pt-20 pb-10 px-6 border-t border-white/5 relative overflow-hidden">
             {/* Giant Footer Text */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none opacity-5">
                <h1 className="text-[25vw] font-sport font-bold italic text-white whitespace-nowrap translate-y-[20%] skew-x-[-10deg]">
                    CYBER
                </h1>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
                    <div className="md:col-span-1">
                        <a href="#" className="font-sport font-bold italic text-5xl text-white tracking-tighter block mb-6">CRIMSON<span className="text-neon-green drop-shadow-[0_0_10px_#ff0033]">.</span></a>
                        <p className="text-gray-500 font-sans text-sm font-semibold">
                            Offensive Security Operations Center.<br/>
                            Restricted Area. Sector 7G.
                        </p>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <h4 className="text-white font-bold font-sport italic uppercase text-xl mb-4 text-neon-green">Sitemap</h4>
                        {['Ops', 'Protocol', 'Arsenal', 'Contracts'].map(i => (
                            <a key={i} href="#" className="text-gray-400 hover:text-white font-sport font-bold text-xl uppercase transition-colors">{i}</a>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2">
                        <h4 className="text-white font-bold font-sport italic uppercase text-xl mb-4 text-neon-green">Secure Link</h4>
                        {['Tor Address', 'PGP Keys', 'Signal'].map(i => (
                            <a key={i} href="#" className="text-gray-400 hover:text-white font-sport font-bold text-xl uppercase transition-colors">{i}</a>
                        ))}
                    </div>

                    <div>
                        <h4 className="text-white font-bold font-sport italic uppercase text-xl mb-4 text-neon-green">Intel Briefing</h4>
                        <div className="flex border-b-2 border-white/20 pb-2 group focus-within:border-neon-green transition-colors">
                            <input type="email" placeholder="SECURE EMAIL" className="bg-transparent border-none outline-none text-white font-mono text-sm flex-1 placeholder-gray-700" />
                            <ArrowRight size={20} className="text-gray-700 group-focus-within:text-neon-green" />
                        </div>
                    </div>
                </div>
                
                <div className="flex justify-between items-end text-xs text-zinc-600 font-mono uppercase">
                    <div className="flex gap-4 font-bold">
                        <span>© 2024 CRIMSON VECTOR.</span>
                        <span>SECURE SYSTEMS.</span>
                    </div>
                    <div className="text-right font-bold">
                        SYSTEM_VER: 9.0.1 (SEC-CORE)<br/>
                        ENCRYPTION: ENABLED
                    </div>
                </div>
            </div>
        </footer>
    )
}

const App: React.FC = () => {
  return (
    <div className="bg-black min-h-screen text-gray-100 font-sans selection:bg-neon-green selection:text-white relative overflow-x-hidden">
      <CustomCursor />
      
      {/* Noise Grain */}
      <div className="bg-noise" />
      
      <Navbar />
      
      <Hero />
      
      <Marquee text="UNAUTHORIZED ACCESS PROHIBITED /// SECURE FACILITY /// DATA ENCRYPTION" className="rotate-1 scale-105 border-y-2 border-black" />
      
      <MissionStatement />
      
      <OperativesReveal />
      
      <CyberArsenal />
      
      <section id="threat-feed" className="py-32 bg-black text-white relative">
          {/* Decorative Grid */}
          <div className="absolute top-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute bottom-10 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          <div className="container mx-auto px-6">
              <div className="flex justify-between items-end mb-16 border-b-4 border-white pb-4">
                   <h2 className="text-7xl md:text-9xl font-sport font-bold italic uppercase tracking-tighter">THREAT <br/><span className="text-outline">MONITORING</span></h2>
                   <div className="hidden md:block font-mono text-xs text-right opacity-70">
                       /// SERVER TIME: UTC<br/>
                       /// NET_TRAFFIC: CRITICAL
                   </div>
              </div>
              <Schedule />
          </div>
      </section>
      
      <MissionDebriefs />

      <AICoach />
      
      <FieldEquipment />
      
      <SecurityClearance />
      
      <Marquee text="JOIN THE RESISTANCE /// SECURE YOUR FUTURE" reverse className="-rotate-1 scale-105 border-y-2 border-black" />
      
      <FooterRaw />
    </div>
  );
};

export default App;