import { Expert, PricingPlan, OperationsLog, Testimonial, ToolItem, ShopItem } from './types';

export const EXPERTS: Expert[] = [
  {
    name: "Alex 'ZeroDay'",
    specialty: "Offensive Security",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    bio: "Ex-Intel Cyber Operative. Specializes in finding vulnerabilities in 'secure' systems."
  },
  {
    name: "Sarah 'Cipher'",
    specialty: "Cryptography",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
    bio: "Network Architect. Ensures your data remains mathematically impossible to breach."
  },
  {
    name: "Marcus 'Wall'",
    specialty: "Perimeter Defense",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    bio: "DDoS Mitigation Specialist. No packet enters without his authorization."
  },
  {
    name: "Elena 'Ghost'",
    specialty: "Social Engineering",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2071&auto=format&fit=crop",
    bio: "Human Element Specialist. Tests your team against phishing and insider threats."
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "SENTRY",
    price: "15 000 ₽",
    features: ["Basic Vuln Scan", "VPN Configuration", "Endpoint Protection", "8/5 Monitoring"],
    recommended: false
  },
  {
    name: "VANGUARD",
    price: "45 000 ₽",
    features: ["24/7 SOC Monitoring", "DDoS Shield", "Monthly Pentest", "Zero-Knowledge Encryption", "Incident Response"],
    recommended: true
  },
  {
    name: "SPECTRE",
    price: "120 000 ₽",
    features: ["Full Red Teaming", "OSINT Deep Dive", "Brand Protection", "Counter-Surveillance", "Threat Hunting"],
    recommended: false
  }
];

export const OPERATIONS_LOG: OperationsLog[] = [
  {
    date: "LIVE FEED",
    sessions: [
      { id: '1', time: '08:00', name: 'Botnet Takedown', lead: 'Auto-Bot', category: 'blue-team', duration: 15 },
      { id: '2', time: '09:45', name: 'Zero-Day Patching', lead: "Alex 'ZeroDay'", category: 'red-team', duration: 120 },
      { id: '3', time: '13:00', name: 'Quantum Decryption', lead: "Sarah 'Cipher'", category: 'crypto', duration: 60 },
    ]
  },
  {
    date: "ARCHIVE 01",
    sessions: [
      { id: '4', time: '02:00', name: 'DDoS Mitigation', lead: "Marcus 'Wall'", category: 'blue-team', duration: 240 },
      { id: '5', time: '14:00', name: 'Phishing Sim', lead: "Elena 'Ghost'", category: 'intel', duration: 45 },
    ]
  },
  {
    date: "SCHEDULED",
    sessions: [
      { id: '7', time: '10:00', name: 'Perimeter Stress Test', lead: "Alex 'ZeroDay'", category: 'red-team', duration: 360 },
      { id: '8', time: '18:00', name: 'Key Rotation', lead: "Sarah 'Cipher'", category: 'crypto', duration: 30 },
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
    {
        id: '1',
        name: 'Victor K.',
        role: 'CEO FinTech Corp',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1887&auto=format&fit=crop',
        quote: "We lost millions in a breach. Crimson Vector secured our network in 4 hours and patched the leak.",
        stats: [{ label: 'SEC', value: 99 }, { label: 'UPTIME', value: 100 }],
        result: "0 Incidents"
    },
    {
        id: '2',
        name: 'Alice V.',
        role: 'CTO StartUp',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888&auto=format&fit=crop',
        quote: "Their Red Teaming is brutal but necessary. They found vulnerabilities other auditors missed.",
        stats: [{ label: 'SPD', value: 95 }, { label: 'COV', value: 98 }],
        result: "Verified"
    },
    {
        id: '3',
        name: 'Dmitry T.',
        role: 'Bank Security',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
        quote: "The only firm I trust with our encryption keys. Special forces level expertise.",
        stats: [{ label: 'TRUST', value: 100 }, { label: 'ENC', value: 256 }],
        result: "Secure"
    }
];

export const TOOL_ITEMS: ToolItem[] = [
    {
        id: '1',
        name: "CRIMSON VPN",
        description: "Military-grade traffic tunneling. Complete anonymity and zero logs.",
        price: "450 ₽/mo",
        image: "https://images.unsplash.com/photo-1558494949-ef526b0042a0?q=80&w=2072&auto=format&fit=crop",
        tags: ["PRIVACY", "NO-LOGS"],
        power: "AES-256"
    },
    {
        id: '2',
        name: "VECTOR ENDPOINT",
        description: "Heuristic threat analysis. Blocks 0-day attacks before execution.",
        price: "600 ₽/mo",
        image: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2070&auto=format&fit=crop",
        tags: ["AI-DRIVEN", "DEFENSE"],
        power: "Heuristic"
    },
    {
        id: '3',
        name: "HARDWARE KEY",
        description: "FIDO2 Physical Security Key. Phishing-proof authentication.",
        price: "4 500 ₽",
        image: "https://images.unsplash.com/photo-1629196914375-f7e48f477b6d?q=80&w=2056&auto=format&fit=crop",
        tags: ["HARDWARE", "AUTH"],
        power: "FIDO2"
    }
];

export const SHOP_ITEMS: ShopItem[] = [
    {
        id: '1',
        name: "SIGNAL JAMMER",
        category: "Hardware",
        price: "2 500 ₽",
        image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=2070&auto=format&fit=crop",
        perks: ["Faraday Cage", "GPS/NFC Block"]
    },
    {
        id: '2',
        name: "ARASAKA HOODIE",
        category: "Uniform",
        price: "9 900 ₽",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1887&auto=format&fit=crop",
        perks: ["Anti-Face Rec", "Hidden Pockets"]
    },
    {
        id: '3',
        name: "ENCRYPTED SSD",
        category: "Storage",
        price: "15 500 ₽",
        image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=2070&auto=format&fit=crop",
        perks: ["Self-Destruct", "Pin-Pad Access"]
    }
];