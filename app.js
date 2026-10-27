const { useState, useEffect } = React;

const LANGUAGES = ["English", "Español", "Français", "Deutsch", "中文", "日本語", "한국어", "Português", "Русский", "العربية", "Italiano", "Türkçe", "Nederlands", "Polski", "Svenska", "Norsk", "Dansk", "Suomi", "Ελληνικά", "Čeština", "Українська", "Română", "Magyar", "български", "עברית", "हिन्दी", "বাংলা", "Tiếng Việt", "ไทย", "Bahasa Indonesia", "Bahasa Melayu", "Filipino", "Kiswahili", "Afrikaans", "Amharic", "Zulu", "Yoruba", "Igbo", "Hausa", "Somali", "Persian", "Urdu", "Tamil", "Telugu", "Marathi", "Gujarati", "Punjabi", "Malayalam", "Kannada", "Sinhala"];

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Apple Store', cat: 'Shopping', amount: -1299.00, date: 'Oct 24, 2026', icon: 'CreditCard' },
  { id: 2, name: 'Whole Foods Market', cat: 'Groceries', amount: -156.42, date: 'Oct 23, 2026', icon: 'Home' },
  { id: 3, name: 'Direct Deposit - TechCorp', cat: 'Income', amount: 4250.00, date: 'Oct 22, 2026', icon: 'Wallet' },
  { id: 4, name: 'Uber', cat: 'Transport', amount: -24.50, date: 'Oct 21, 2026', icon: 'Send' },
  { id: 5, name: 'Starbucks', cat: 'Dining', amount: -8.75, date: 'Oct 20, 2026', icon: 'Home' },
  { id: 6, name: 'Amazon.com', cat: 'Shopping', amount: -112.30, date: 'Oct 19, 2026', icon: 'CreditCard' },
];

const MOCK_PAYEES = [
  { id: 1, name: 'Con Edison', due: 'Oct 28', amount: 145.00, status: 'Pending' },
  { id: 2, name: 'Verizon Fios', due: 'Nov 02', amount: 89.99, status: 'Scheduled' },
  { id: 3, name: 'Geico Auto', due: 'Nov 15', amount: 120.50, status: 'Scheduled' },
];

const MARKET_NEWS = [
  { title: "Fed signals potential rate cut in Q4", source: "Bloomberg", time: "2h ago" },
  { title: "Tech stocks rally as AI sector surges", source: "CNBC", time: "4h ago" },
  { title: "Oil prices steady amid global supply shifts", source: "Reuters", time: "5h ago" }
];

const MUSEUMS = [
  { name: "The Metropolitan Museum of Art", location: "New York, NY" },
  { name: "Art Institute of Chicago", location: "Chicago, IL" },
  { name: "J. Paul Getty Museum", location: "Los Angeles, CA" }
];

const SLIDER_IMAGES = [
  "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80"
];

const Icon = ({ name, size = 20, className = "" }) => {
  const paths = {
    Logo: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>,
    Home: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10"/>,
    CreditCard: <g><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></g>,
    Send: <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>,
    PieChart: <path d="M21.21 15.89A10 10 0 1 1 8 2.83M22 12A10 10 0 0 0 12 2v10z"/>,
    Wallet: <g><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4M3 5v14a2 2 0 0 0 2 2h16v-5"/><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"/></g>,
    Settings: <g><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></g>,
    Bell: <g><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></g>,
    Globe: <g><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></g>,
    ChevronDown: <polyline points="6 9 12 15 18 9"/>,
    ArrowUpRight: <path d="M7 17L17 7M7 7h10v10"/>,
    ArrowDownLeft: <path d="M17 7L7 17M17 17H7V7"/>,
    Menu: <path d="M3 12h18M3 6h18M3 18h18"/>,
    Lock: <g><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></g>,
    Unlock: <g><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></g>,
    Check: <polyline points="20 6 9 17 4 12"/>,
    Briefcase: <g><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></g>,
    Shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>,
    LogOut: <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/>,
    FileText: <g><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></g>,
    Building: <g><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></g>,
    Download: <g><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></g>,
    BookOpen: <g><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></g>,
    TrendingUp: <g><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></g>,
    Award: <g><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></g>,
    Landmark: <g><line x1="3" y1="22" x2="21" y2="22"/><line x1="6" y1="18" x2="6" y2="11"/><line x1="10" y1="18" x2="10" y2="11"/><line x1="14" y1="18" x2="14" y2="11"/><line x1="18" y1="18" x2="18" y2="11"/><polygon points="12 2 20 7 4 7"/></g>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>{paths[name] || <circle cx="12" cy="12" r="10"/>}</svg>;
};

const ActionModal = ({ type, data, onClose }) => {
  const [amount, setAmount] = useState('');
  const [success, setSuccess] = useState(false);
  if (!type) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(amount) {
      setSuccess(true);
      setTimeout(() => { onClose(); setSuccess(false); }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex items-center justify-center p-4 fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative border border-sky-100">
        <button onClick={onClose} className="absolute top-5 right-5 text-slate-400 hover:text-slate-800"><Icon name="Menu" size={24} className="rotate-45"/></button>
        {success ? (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-savi-green/10 rounded-full mx-auto flex items-center justify-center mb-4"><Icon name="Check" size={40} className="text-savi-green"/></div>
            <h3 className="text-2xl font-bold text-savi-navy">Success!</h3>
            <p className="text-savi-grey mt-2">Your {type} was processed successfully.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-savi-navy mb-6">{type}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {type === 'Wire Transfer' && (
                <>
                  <input type="text" placeholder="Routing Number" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required />
                  <input type="text" placeholder="Account Number" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required />
                </>
              )}
              {type === 'Pay Bill' && data && (
                 <div className="mb-4">
                   <p className="text-sm font-bold text-savi-grey">Paying:</p>
                   <p className="text-lg font-bold text-savi-navy">{data.name}</p>
                 </div>
              )}
              <div>
                <label className="text-sm font-bold text-savi-grey mb-1 block">Amount ($)</label>
                <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-lg font-bold text-savi-navy focus:outline-none focus:border-savi-bright" required placeholder="0.00"/>
              </div>
              <button type="submit" className="w-full grad-blue text-white font-bold py-3 rounded-xl shadow-lg mt-4">Confirm Transaction</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const SmartAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi! I'm Savi Smart, your AI financial assistant. How can I help you today?", isBot: true }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, isBot: false }];
    setMessages(newMessages);
    setInput('');

    setTimeout(() => {
      let botResponse = "I can help you check your balance, transfer money, view recent transactions, or calculate loan payments. What would you like to do?";
      const lowerInput = input.toLowerCase();

      if (lowerInput.includes('balance') || lowerInput.includes('money')) {
        botResponse = "Your total net worth is currently $12,450.75. Your checking account is looking healthy!";
      } else if (lowerInput.includes('transfer') || lowerInput.includes('send')) {
        botResponse = "You can initiate a transfer by clicking the 'Send' button on your dashboard. Would you like me to open that for you?";
      } else if (lowerInput.includes('bill') || lowerInput.includes('pay')) {
        botResponse = "You have 3 upcoming bills, including Con Edison for $145.00 due on Oct 28th. Would you like to review them?";
      } else if (lowerInput.includes('loan') || lowerInput.includes('calculator')) {
        botResponse = "You can access our loan calculators by navigating to the Tools section in your dashboard.";
      }
      setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 md:w-96 rounded-2xl shadow-2xl border border-sky-100 mb-4 overflow-hidden fade-in flex flex-col" style={{ height: '400px' }}>
          <div className="grad-blue p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">S</div>
              <div><p className="font-bold text-sm">Savi Smart</p><p className="text-[10px] text-white/80">Online</p></div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white"><Icon name="Menu" size={20} className="rotate-45"/></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto bg-sky-50 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.isBot ? 'bg-white border border-sky-100 text-savi-navy rounded-tl-sm' : 'bg-savi-bright text-white rounded-tr-sm'}`}>{msg.text}</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-sky-100 flex gap-2">
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask Savi..." className="flex-1 bg-sky-50 border border-sky-100 rounded-xl px-4 py-2 text-sm text-savi-navy focus:outline-none focus:border-savi-bright"/>
            <button type="submit" className="bg-savi-bright text-white p-2 rounded-xl hover:bg-blue-600 transition-colors"><Icon name="Send" size={18}/></button>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="bg-savi-bright text-white w-14 h-14 rounded-full shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center hover:scale-105 transition-transform">
        <Icon name={isOpen ? "Menu" : "Bell"} size={24} className={isOpen ? "rotate-45" : ""}/>
      </button>
    </div>
  );
};

const LandingPage = ({ onNavigate }) => {
  const [langOpen, setLangOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState('English');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState('physical');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-savi-navy font-sans overflow-x-hidden">
      
      <nav className="absolute top-0 w-full z-50 px-6 py-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center"><Icon name="Logo" size={18}/></div>
          <span className="text-xl font-extrabold tracking-tight">Savi</span>
        </div>
        <div className="hidden md:flex gap-6 items-center">
          <button onClick={() => onNavigate('login')} className="text-sm font-bold hover:text-gray-200">Sign In</button>
          <button onClick={() => onNavigate('signup')} className="bg-white text-slate-900 px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors">Open Account</button>
        </div>
      </nav>

      <section className="relative h-[85vh] w-full overflow-hidden bg-slate-900 flex items-center justify-center">
        {SLIDER_IMAGES.map((img, index) => (
          <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-sky-900/60 z-10"></div>
            <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="relative z-20 text-center px-4 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">Life, meets savings</h1>
          <p className="text-lg md:text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Grow your money with up to 4% AER interest on Instant Access Savings, paid every day. Bold banking for a sustainable future.
          </p>
          <button onClick={() => onNavigate('signup')} className="bg-white text-savi-bright px-8 py-3.5 rounded-full font-bold text-lg hover:bg-sky-50 transition-colors shadow-lg">
            Explore Savings
          </button>
        </div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-32 w-64 h-40 glass-dark rounded-2xl p-4 shadow-2xl z-30 flex flex-col justify-between pointer-events-none">
          <div>
            <p className="text-slate-500 text-xs tracking-widest mb-1">NEW ADVENTURE</p>
            <p className="text-savi-navy text-3xl font-bold">£1,326</p>
          </div>
          <button className="bg-sky-100 text-savi-bright px-3 py-1 rounded text-xs self-start font-bold">Account</button>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-30">
          {['Adventure', 'Wedding', 'Moving'].map(pill => (
            <button key={pill} className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-full text-sm hover:bg-white/30 transition-colors font-medium">
              {pill}
            </button>
          ))}
        </div>
      </section>

      <section className="bg-sky-500 py-24 px-6 relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-12 relative z-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Elevate your spend</h2>
          <p className="text-sky-50 text-lg max-w-2xl mx-auto mb-8">
            Earn points on your purchases with one of our debit cards. Then redeem them for Airline Miles and other rewards.
          </p>
          <button className="bg-white text-sky-600 px-8 py-3 rounded-full font-bold hover:bg-sky-50 transition-colors shadow-lg">
            Start earning
          </button>
        </div>

        <div className="relative h-[400px] w-full max-w-5xl mx-auto flex items-center justify-center perspective-[1000px]">
          {[0, 1, 2, 3].map((card, i) => {
             const isPhysical = activeCardTab === 'physical';
             const cardColors = isPhysical 
               ? ['bg-gradient-to-br from-sky-400 to-blue-500', 'bg-white', 'bg-sky-200', 'bg-slate-100']
               : ['bg-blue-500', 'bg-indigo-500', 'bg-teal-400', 'bg-cyan-500'];
             
             const translateX = (i - 1.5) * 120;
             const translateY = Math.abs(i - 1.5) * 20;
             const rotateY = isPhysical ? (i - 1.5) * 15 : (i - 1.5) * 5;
             const zIndex = 10 - i;
             const scale = 1 - (Math.abs(i - 1.5) * 0.1);
             
             // Text color hack for the white card
             const textColor = (!isPhysical && i === 0) || (isPhysical && i === 1) ? 'text-sky-900' : 'text-white';
             const textMuted = (!isPhysical && i === 0) || (isPhysical && i === 1) ? 'text-sky-600' : 'text-white/60';

             return (
                <div 
                  key={i}
                  className={`absolute w-72 h-44 rounded-2xl shadow-2xl border border-white/20 transition-all duration-700 ease-in-out flex flex-col justify-between p-6 ${cardColors[i]}`}
                  style={{ transform: `translateX(${translateX}px) translateY(${translateY}px) rotateY(${rotateY}deg) scale(${scale})`, zIndex: zIndex }}
                >
                   <div className="flex justify-between items-center">
                      <span className={`${textColor} font-bold italic text-xl`}>VISA</span>
                   </div>
                   <div>
                     <p className={`${textMuted} text-xs tracking-widest mb-1`}>CARD NUMBER</p>
                     <p className={`text-lg tracking-widest font-mono ${textColor}`}>•••• •••• •••• 4821</p>
                   </div>
                </div>
             )
          })}

          <div className="absolute bottom-[-50px] w-[800px] h-[200px] bg-gradient-to-t from-sky-300 to-sky-100 rounded-t-[100px] shadow-[0_-20px_50px_rgba(14,165,233,0.3)] z-20 border-t border-white/50" style={{ transform: 'rotateX(60deg)' }}></div>
        </div>

        <div className="flex justify-center gap-4 mt-8 relative z-30">
          <button onClick={() => setActiveCardTab('physical')} className={`px-8 py-2.5 rounded-full font-bold transition-colors border ${activeCardTab === 'physical' ? 'bg-white text-sky-600 border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}>Physical cards</button>
          <button onClick={() => setActiveCardTab('virtual')} className={`px-8 py-2.5 rounded-full font-bold transition-colors border ${activeCardTab === 'virtual' ? 'bg-white text-sky-600 border-white' : 'bg-transparent text-white border-white/50 hover:bg-white/10'}`}>Virtual cards</button>
        </div>
      </section>

      <section className="bg-sky-900 py-24 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ask, and AIR makes it happen</h2>
        <p className="text-sky-200 text-lg max-w-2xl mx-auto mb-8">AI by Savi, is your 24/7 personal assistant. Just open your app, swipe, and ask away.</p>
        <button onClick={() => onNavigate('login')} className="bg-savi-bright text-white px-8 py-3 rounded-full font-bold hover:bg-sky-400 transition-colors mb-12 shadow-[0_0_15px_rgba(14,165,233,0.5)]">Learn more</button>
        
        <div className="w-64 h-[400px] mx-auto border-8 border-sky-800 rounded-[3rem] bg-sky-950 relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-sky-800 rounded-b-2xl z-20"></div>
           <div className="p-6 pt-12 h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4"><Icon name="Logo" size={32} className="text-white"/></div>
              <p className="text-white font-bold text-xl">£3,126<span className="text-sm text-sky-400">.39</span></p>
              <p className="text-sky-400 text-xs mt-1">Personal · GBP</p>
           </div>
        </div>
      </section>

      <div className="bg-sky-50 py-12 border-t border-sky-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-8 h-8 grad-blue rounded-lg flex items-center justify-center text-white"><Icon name="Logo" size={18}/></div>
            <span className="text-xl font-bold tracking-tight text-savi-navy">Savi Bank</span>
          </div>
          <div className="flex gap-6 items-center">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-savi-navy transition-colors">
                <Icon name="Globe" size={16} /> {selectedLang} <Icon name="ChevronDown" size={14} />
              </button>
              {langOpen && (
                <div className="absolute bottom-full right-0 mb-4 w-60 bg-white border border-sky-100 rounded-2xl shadow-2xl max-h-64 overflow-y-auto z-50 p-2">
                  {LANGUAGES.map((lang, i) => (
                    <div key={i} onClick={() => { setSelectedLang(lang); setLangOpen(false); }} className="px-4 py-2 text-sm text-slate-600 hover:bg-sky-50 rounded-xl cursor-pointer">{lang}</div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => onNavigate('login')} className="text-sm font-bold text-savi-bright border border-savi-bright px-6 py-2 rounded-full hover:bg-sky-100 transition-colors">Sign In</button>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">Demo — Not a real bank.</p>
        </div>
      </div>
    </div>
  );
};

const AuthPage = ({ mode, onAuth, onNavigate }) => {
  const isLogin = mode === 'login';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth({ name: name || 'John Doe', email: email || 'demo@savibank.com' });
  };

  return (
    <div className="min-h-screen bg-sky-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2rem] w-full max-w-md shadow-2xl border border-sky-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 grad-blue"></div>
        <div className="text-center mb-10 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-16 h-16 grad-premium rounded-2xl mx-auto flex items-center justify-center mb-6 text-white shadow-xl"><Icon name="Logo" size={32}/></div>
          <h1 className="text-3xl font-extrabold text-savi-navy">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-sky-50 border border-sky-100 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />}
          <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-sky-50 border border-sky-100 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-sky-50 border border-sky-100 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />
          <button type="submit" className="w-full grad-blue text-white font-bold py-4 rounded-xl shadow-lg">{isLogin ? 'Sign In' : 'Open Account'}</button>
        </form>
        <div className="mt-6 text-center"><button onClick={() => onNavigate(isLogin ? 'signup' : 'login')} className="text-sm font-bold text-savi-bright hover:underline">{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}</button></div>
      </div>
    </div>
  );
};

const Dashboard = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLocked, setIsLocked] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [widgets, setWidgets] = useState({ spending: true, rewards: true, milestones: true });
  const [pockets, setPockets] = useState([{ name: 'Vacation Fund', target: 3000, saved: 1200 }]);

  const toggleWidget = (key) => setWidgets({ ...widgets, [key]: !widgets[key] });
  const openModal = (type, data = null) => { setModalType(type); setModalData(data); };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'transactions', label: 'Transactions', icon: 'FileText' },
    { id: 'transfers', label: 'Transfers & Wire', icon: 'Send' },
    { id: 'tools', label: 'Tools & Calculators', icon: 'PieChart' },
    { id: 'rewards', label: 'Rewards & Perks', icon: 'Award' },
    { id: 'cards', label: 'Manage Cards', icon: 'CreditCard' },
    { id: 'security', label: 'Security Center', icon: 'Shield' },
  ];

  const filteredTx = MOCK_TRANSACTIONS.filter(tx => tx.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleDownload = () => {
    const csvContent = "data:text/csv;charset=utf-8,Date,Description,Amount\n" + MOCK_TRANSACTIONS.map(e => `${e.date},${e.name},${e.amount}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "savi_transactions.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="min-h-screen bg-sky-50 flex text-savi-navy font-sans">
      <ActionModal type={modalType} data={modalData} onClose={() => setModalType(null)} />

      <aside className="w-72 bg-white border-r border-sky-100 hidden lg:flex flex-col p-6 z-20 overflow-y-auto shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 grad-blue rounded-xl flex items-center justify-center shadow-glow text-white"><Icon name="Logo" size={20}/></div>
          <span className="text-xl font-bold tracking-tight text-savi-navy">Savi Bank</span>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${activeTab === item.id ? 'bg-savi-bright text-white shadow-lg' : 'text-slate-500 hover:bg-sky-50 hover:text-savi-bright'}`}>
              <Icon name={item.icon} size={20} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="pt-6 border-t border-sky-100">
          <div onClick={onLogout} className="flex items-center gap-4 px-4 py-3 text-savi-red hover:bg-red-50 rounded-xl cursor-pointer transition-colors">
            <Icon name="LogOut" size={20} />
            <span className="font-semibold text-sm">Sign Out</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-1 text-savi-navy">Welcome, {user.name.split(' ')[0]}</h1>
              <p className="text-slate-500">Here is your financial overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white border border-sky-100 rounded-full flex items-center justify-center text-slate-400 shadow-sm"><Icon name="Bell" size={20}/></div>
              <div className="w-12 h-12 grad-blue rounded-full flex items-center justify-center text-white font-bold shadow-md">{user.name.charAt(0)}</div>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="fade-in space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 relative overflow-hidden border border-sky-100 shadow-xl shadow-sky-100/50">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-slate-500 font-medium mb-2">Total Net Worth</p>
                      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-savi-navy">$12,450<span className="text-3xl text-slate-400">.75</span></h2>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12 flex-wrap">
                    <button onClick={() => openModal('Send Money')} className="grad-blue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md"><Icon name="Send" size={18}/> Send</button>
                    <button onClick={() => openModal('Request Money')} className="bg-sky-50 text-savi-bright border border-sky-200 px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-sky-100 transition-colors"><Icon name="ArrowDownLeft" size={18}/> Request</button>
                  </div>
                </div>
                
                <div className="grad-card-dark rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                   <div className="flex justify-between items-center relative z-10">
                     <Icon name="Logo" size={24} className="text-white/80"/>
                     <span className="font-bold italic text-white/90 text-xl">VISA</span>
                   </div>
                   <div className="relative z-10">
                     <p className="text-sky-200 text-xs tracking-widest mb-1">CARD NUMBER</p>
                     <p className="text-xl tracking-[0.15em] font-mono text-white mb-6">•••• •••• •••• 4821</p>
                     <div className="flex justify-between items-end">
                       <div><p className="text-sky-200 text-[10px] tracking-widest">CARDHOLDER</p><p className="text-sm font-bold text-white tracking-wider uppercase">{user.name}</p></div>
                       <button onClick={() => setIsLocked(!isLocked)} className={`p-2 rounded-lg backdrop-blur-md transition-colors ${isLocked ? 'bg-red-500/30 text-red-200' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                         <Icon name={isLocked ? "Lock" : "Unlock"} size={18} />
                       </button>
                     </div>
                   </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-[2rem] p-6 border border-sky-100 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-savi-navy">Pockets & Vaults</h3>
                    <button className="text-xs bg-sky-50 text-savi-bright font-bold px-3 py-1 rounded-lg">+ New</button>
                  </div>
                  {pockets.map((p, i) => (
                    <div key={i} className="mb-4">
                      <div className="flex justify-between text-sm mb-1 text-slate-600"><span>{p.name}</span><span className="font-bold text-savi-navy">${p.saved} / ${p.target}</span></div>
                      <div className="w-full bg-sky-100 h-2 rounded-full overflow-hidden"><div className="bg-savi-bright h-full" style={{width: `${(p.saved/p.target)*100}%`}}></div></div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-[2rem] p-6 border border-sky-100 shadow-sm">
                  <h3 className="font-bold text-lg text-savi-navy mb-4">Customize Widgets</h3>
                  <div className="space-y-3 text-slate-600">
                    <label className="flex items-center justify-between text-sm"><span>Show Spending Chart</span><input type="checkbox" checked={widgets.spending} onChange={() => toggleWidget('spending')} className="accent-savi-bright"/></label>
                    <label className="flex items-center justify-between text-sm"><span>Show Rewards Points</span><input type="checkbox" checked={widgets.rewards} onChange={() => toggleWidget('rewards')} className="accent-savi-bright"/></label>
                    <label className="flex items-center justify-between text-sm"><span>Show Life Milestones</span><input type="checkbox" checked={widgets.milestones} onChange={() => toggleWidget('milestones')} className="accent-savi-bright"/></label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[2rem] p-8 border border-sky-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-savi-navy">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('transactions')} className="text-sm text-savi-bright font-bold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {MOCK_TRANSACTIONS.slice(0, 3).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-sky-50 last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-savi-bright"><Icon name={tx.icon} size={18} /></div>
                        <div><p className="font-bold text-sm text-savi-navy">{tx.name}</p><p className="text-xs text-slate-400">{tx.date}</p></div>
                      </div>
                      <p className={`font-bold ${tx.amount > 0 ? 'text-savi-green' : 'text-savi-navy'}`}>${Math.abs(tx.amount).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-savi-navy">Transaction History</h2>
                <div className="flex gap-4">
                  <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white border border-sky-200 rounded-xl px-4 py-2 text-savi-navy focus:outline-none focus:border-savi-bright w-48 shadow-sm" />
                  <button onClick={handleDownload} className="bg-savi-bright hover:bg-sky-600 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition-colors shadow-md"><Icon name="Download" size={16}/> Export CSV</button>
                </div>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-sky-100 shadow-sm">
                <div className="space-y-6">
                  {filteredTx.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-sky-50 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-savi-bright"><Icon name={tx.icon} size={20} /></div>
                        <div><p className="font-bold text-lg text-savi-navy">{tx.name}</p><p className="text-sm text-slate-500">{tx.cat} • {tx.date}</p></div>
                      </div>
                      <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-savi-green' : 'text-savi-navy'}`}>{tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transfers' && (
            <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-[2rem] p-8 border border-sky-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-savi-navy">Transfer Between Accounts</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); openModal('Internal Transfer'); }}>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">From</label><select className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright"><option>Checking (...4821)</option><option>Savings (...1104)</option></select></div>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">To</label><select className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright"><option>Savings (...1104)</option><option>Checking (...4821)</option></select></div>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">Amount</label><input type="number" placeholder="$0.00" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy font-bold focus:outline-none focus:border-savi-bright" required /></div>
                  <button type="submit" className="w-full grad-blue text-white font-bold py-3 rounded-xl mt-4 shadow-md">Transfer Now</button>
                </form>
              </div>
              <div className="bg-white rounded-[2rem] p-8 border border-sky-100 shadow-sm">
                <h2 className="text-2xl font-bold mb-6 text-savi-navy">Wire Transfer</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); openModal('Wire Transfer'); }}>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">Recipient Name</label><input type="text" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required /></div>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">Routing Number</label><input type="text" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required /></div>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">Account Number</label><input type="text" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required /></div>
                  <div><label className="text-sm text-slate-500 mb-1 block font-medium">Amount</label><input type="number" placeholder="$0.00" className="w-full bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-savi-navy font-bold focus:outline-none focus:border-savi-bright" required /></div>
                  <button type="submit" className="w-full bg-savi-navy text-white font-bold py-3 rounded-xl mt-4 shadow-md">Send Wire</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold mb-6 text-savi-navy">Citi Tools & Calculators</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {['Mortgage Calculator', 'Auto Loan', 'Savings Goal', 'Retirement Planner', 'Debt Payoff', 'Investment Yield', 'Currency Converter', 'Budget Builder'].map((tool, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl flex flex-col justify-between hover:bg-sky-50 cursor-pointer transition-colors border border-sky-100 shadow-sm hover:shadow-md">
                    <Icon name="PieChart" size={28} className="text-savi-bright mb-4" />
                    <h3 className="font-bold text-savi-navy">{tool}</h3>
                    <p className="text-xs text-slate-400 mt-2">Open tool</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'rewards' && (
            <div className="fade-in space-y-6">
               <h2 className="text-2xl font-bold mb-6 text-savi-navy">BofA Rewards & Loyalty</h2>
               <div className="bg-gradient-to-r from-sky-400 to-blue-500 p-8 rounded-3xl flex justify-between items-center shadow-lg text-white">
                 <div>
                   <h3 className="text-xl font-bold">Platinum Honors Tier</h3>
                   <p className="text-sky-100 text-sm mt-1">You have 12,450 points. 2,550 points until next tier.</p>
                 </div>
                 <div className="text-4xl font-extrabold text-white">+25% <span className="text-sm text-sky-100 font-normal">bonus</span></div>
               </div>
               
               <h3 className="text-xl font-bold mt-8 mb-4 text-savi-navy">Museums on Us</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 {MUSEUMS.map((m, i) => (
                   <div key={i} className="bg-white p-6 rounded-2xl border border-sky-100 shadow-sm">
                     <Icon name="Landmark" size={24} className="text-savi-bright mb-3"/>
                     <h4 className="font-bold text-savi-navy">{m.name}</h4>
                     <p className="text-xs text-slate-500">{m.location}</p>
                   </div>
                 ))}
               </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold mb-6 text-savi-navy">Security Center</h2>
              <div className="bg-white p-8 rounded-3xl border border-sky-100 shadow-sm space-y-6">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-sky-50 text-savi-bright rounded-full flex items-center justify-center"><Icon name="Shield" size={24}/></div>
                   <div><h3 className="font-bold text-lg text-savi-navy">Fraud Monitoring Active</h3><p className="text-sm text-slate-500">Your account is protected 24/7.</p></div>
                 </div>
                 <div className="h-px bg-sky-100 w-full"></div>
                 <div>
                   <h4 className="font-bold mb-2 text-savi-navy">Recent Alerts</h4>
                   <div className="space-y-2 text-sm text-slate-600">
                     <div className="flex justify-between"><span>New login from Lagos, NG</span><span className="text-slate-400">Just now</span></div>
                     <div className="flex justify-between"><span>Password successfully changed</span><span className="text-slate-400">2 days ago</span></div>
                   </div>
                 </div>
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold mb-6 text-savi-navy">Manage Cards</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`grad-card-dark rounded-[2rem] p-8 aspect-[1.586/1] flex flex-col justify-between shadow-2xl transition-all duration-500 ${isLocked ? 'grayscale opacity-50' : ''}`}>
                   <div className="flex justify-between items-center"><Icon name="Logo" size={24} className="text-white/80"/><span className="font-bold italic text-white/90 text-xl">VISA</span></div>
                   <div>
                     <p className="text-sky-200 text-xs tracking-widest mb-1">CARD NUMBER</p>
                     <p className="text-2xl tracking-[0.15em] font-mono text-white mb-6">•••• •••• •••• 4821</p>
                     <div className="flex justify-between items-end">
                       <div><p className="text-sky-200 text-[10px] tracking-widest">CARDHOLDER</p><p className="text-sm font-bold text-white tracking-wider uppercase">{user.name}</p></div>
                       <div><p className="text-sky-200 text-[10px] tracking-widest">EXPIRES</p><p className="text-sm font-bold text-white tracking-wider">12/28</p></div>
                     </div>
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-6 rounded-2xl flex items-center justify-between border border-sky-100 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLocked ? 'bg-red-50 text-savi-red' : 'bg-sky-50 text-savi-bright'}`}><Icon name={isLocked ? "Lock" : "Unlock"} size={24}/></div>
                      <div><p className="font-bold text-savi-navy">Lock Card</p><p className="text-xs text-slate-500">Disable all transactions</p></div>
                    </div>
                    <button onClick={() => setIsLocked(!isLocked)} className={`w-14 h-8 rounded-full relative transition-colors ${isLocked ? 'bg-savi-red' : 'bg-slate-300'}`}>
                      <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${isLocked ? 'translate-x-7' : 'translate-x-1'} shadow-sm`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center"><p className="text-[8px] text-slate-400 uppercase tracking-[0.2em]">Demo — Not a real bank.</p></div>
        </div>
      </main>
    </div>
  );
};

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('savi_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) { return null; }
  });
  const [currentPage, setCurrentPage] = useState(user ? 'dashboard' : 'home');

  const handleAuth = (userData) => {
    localStorage.setItem('savi_user', JSON.stringify(userData));
    setUser(userData);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('savi_user');
    setUser(null);
    setCurrentPage('home');
  };

  return (
    <div>
      {currentPage === 'home' && <LandingPage onNavigate={setCurrentPage} />}
      {(currentPage === 'login' || currentPage === 'signup') && <AuthPage mode={currentPage} onAuth={handleAuth} onNavigate={setCurrentPage} />}
      {currentPage === 'dashboard' && user && <Dashboard user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />}
      <SmartAssistant /> 
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
