const { useState, useEffect } = React;

const LANGUAGES = ["English", "Español", "Français", "Deutsch", "中文", "日本語", "한국어", "Português", "Русский", "العربية", "Italiano", "Türkçe", "Nederlands", "Polski", "Svenska", "Norsk", "Dansk", "Suomi", "Ελληνικά", "Čeština", "Українська", "Română", "Magyar", "български", "עברית", "हिन्दी", "বাংলা", "Tiếng Việt", "ไทย", "Bahasa Indonesia", "Bahasa Melayu", "Filipino", "Kiswahili", "Afrikaans", "Amharic", "Zulu", "Yoruba", "Igbo", "Hausa", "Somali", "Persian", "Urdu", "Tamil", "Telugu", "Marathi", "Gujarati", "Punjabi", "Malayalam", "Kannada", "Sinhala"];

const MOCK_TRANSACTIONS = [
  { id: 1, name: 'Apple Store', cat: 'Shopping', amount: -1299.00, date: 'Today, 10:24 AM', icon: 'CreditCard' },
  { id: 2, name: 'Whole Foods Market', cat: 'Groceries', amount: -156.42, date: 'Yesterday', icon: 'Home' },
  { id: 3, name: 'Direct Deposit - TechCorp', cat: 'Income', amount: 4250.00, date: 'Oct 22', icon: 'Wallet' },
  { id: 4, name: 'Uber', cat: 'Transport', amount: -24.50, date: 'Oct 21', icon: 'Send' },
  { id: 5, name: 'Starbucks', cat: 'Dining', amount: -8.75, date: 'Oct 20', icon: 'Home' },
  { id: 6, name: 'Amazon.com', cat: 'Shopping', amount: -112.30, date: 'Oct 19', icon: 'CreditCard' },
];

const MOCK_PAYEES = [
  { id: 1, name: 'Con Edison', due: 'Oct 28', amount: 145.00, status: 'Pending' },
  { id: 2, name: 'Verizon Fios', due: 'Nov 02', amount: 89.99, status: 'Scheduled' },
  { id: 3, name: 'Geico Auto', due: 'Nov 15', amount: 120.50, status: 'Scheduled' },
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
    Building: <g><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="9" y1="22" x2="9" y2="22.01"/><line x1="15" y1="22" x2="15" y2="22.01"/><line x1="12" y1="22" x2="12" y2="22.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></g>
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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 fade-in">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative">
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
                  <input type="text" placeholder="Routing Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required />
                  <input type="text" placeholder="Account Number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-savi-navy focus:outline-none focus:border-savi-bright" required />
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
                <input type="number" value={amount} onChange={e=>setAmount(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-lg font-bold text-savi-navy focus:outline-none focus:border-savi-bright" required placeholder="0.00"/>
              </div>
              <button type="submit" className="w-full grad-blue text-white font-bold py-3 rounded-xl shadow-lg mt-4">Confirm Transaction</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

    const LandingPage = ({ onNavigate }) => {
      const [langOpen, setLangOpen] = useState(false);
      const [selectedLang, setSelectedLang] = useState('English');

      return (
        <div className="min-h-screen bg-savi-dark text-white font-sans overflow-hidden">
          {/* Ticker */}
          <div className="crypto-ticker-container border-b border-white/10 relative z-20">
            <div className="crypto-ticker text-xs font-semibold tracking-widest uppercase opacity-80">
              <span className="mx-8 text-savi-green">BTC $64,230.50 ▲ 2.4%</span>
              <span className="mx-8 text-savi-red">ETH $3,120.10 ▼ 1.2%</span>
              <span className="mx-8 text-savi-green">SOL $145.20 ▲ 5.1%</span>
              <span className="mx-8 text-savi-green">BTC $64,230.50 ▲ 2.4%</span>
            </div>
          </div>

          {/* Navbar */}
          <nav className="relative z-20 px-6 py-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
                <div className="w-10 h-10 grad-blue rounded-xl flex items-center justify-center shadow-glow"><Icon name="Logo" size={24}/></div>
                <span className="text-2xl font-extrabold tracking-tight">Savi Bank</span>
              </div>
              <div className="hidden lg:flex gap-8 items-center">
                <div className="relative">
                  <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors">
                    <Icon name="Globe" size={18} /> {selectedLang} <Icon name="ChevronDown" size={14} />
                  </button>
                  {langOpen && (
                    <div className="absolute right-0 mt-4 w-60 glass-dark border border-white/10 rounded-2xl shadow-2xl max-h-64 overflow-y-auto z-50 p-2">
                      {LANGUAGES.map((lang, i) => (
                        <div key={i} onClick={() => { setSelectedLang(lang); setLangOpen(false); }} className="px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white rounded-xl cursor-pointer">
                          {lang}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <button onClick={() => onNavigate('login')} className="text-sm font-bold text-white hover:text-savi-bright transition-colors">Sign In</button>
                <button onClick={() => onNavigate('signup')} className="bg-white text-savi-dark px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform">Open Account</button>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <header className="relative z-10 pt-20 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-savi-bright/10 border border-savi-bright/20 text-savi-bright font-semibold text-sm">
                <Icon name="Shield" size={16} /> Trusted by over 2M customers
              </div>
              <h1 className="text-6xl md:text-8xl font-extrabold leading-[1.05] tracking-tight">
                Your salary,<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-savi-bright to-savi-green">reimagined.</span>
              </h1>
              <p className="text-xl text-slate-400 max-w-lg leading-relaxed">
                Spend smartly, send quickly, sort your salary automatically, and watch your savings grow — all with a Savi bank account.
              </p>
              <div className="flex items-center gap-6 pt-4">
                <button onClick={() => onNavigate('signup')} className="bg-savi-bright text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:bg-blue-600 transition-all hover:-translate-y-1">Move your salary</button>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-400">
                  <Icon name="Check" size={18} className="text-savi-green"/> No monthly fees
                </div>
              </div>
            </div>

            {/* Premium Image Grid */}
            <div className="flex-1 grid grid-cols-2 gap-4 relative">
              <div className="absolute inset-0 bg-savi-bright rounded-full blur-[120px] opacity-20"></div>
              
              <div className="space-y-4 pt-12">
                <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=400&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-300 mb-1">Personal · EUR</p>
                    <p className="text-3xl font-bold mb-4">€3,126</p>
                    <div className="bg-white/10 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-xs"><div className="w-6 h-6 bg-savi-bright rounded-full flex items-center justify-center">☕</div> Coffee in Paris</div>
                      <span className="text-xs font-bold text-savi-red">-€3.25</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-300 mb-1">Personal · GBP</p>
                    <p className="text-3xl font-bold mb-4">£6,012</p>
                    <div className="flex gap-2">
                      <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">PROTECTED</span>
                      <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">SAVINGS</span>
                    </div>
                  </div>
                </div>
                <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-sm font-medium text-slate-300 mb-1">Personal · USD</p>
                    <p className="text-3xl font-bold mb-4">$2,350</p>
                    <div className="bg-white/10 rounded-xl p-3 flex justify-between items-center backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-xs"><div className="w-6 h-6 bg-savi-bright rounded-full flex items-center justify-center">🏠</div> House bills</div>
                      <span className="text-xs font-bold text-savi-red">-$225</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Trust Badges */}
          <section className="relative z-10 border-t border-white/5 py-12 bg-savi-dark/50">
            <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="text-center">
                 <p className="text-2xl font-bold mb-1">80M+</p>
                 <p className="text-xs">Customers</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-bold text-savi-green mb-1">4.7/5</p>
                 <p className="text-xs">Trustpilot</p>
               </div>
               <div className="text-center">
                 <p className="text-2xl font-bold mb-1">#1</p>
                 <p className="text-xs">Digital Bank</p>
               </div>
            </div>
            <div className="text-center mt-8">
              <p className="text-[8px] text-slate-600 uppercase tracking-[0.2em]">Demo — Not a real bank. All data is simulated.</p>
            </div>
          </section>
        </div>
      );
    };

  return (
    <div className="min-h-screen bg-white relative">
      <div className="crypto-ticker-container">
        <div className="crypto-ticker text-sm font-semibold tracking-wide">
          <span className="mx-8 text-green-400">BTC $64,230.50 ▲ 2.4%</span>
          <span className="mx-8 text-red-400">ETH $3,120.10 ▼ 1.2%</span>
          <span className="mx-8 text-green-400">SOL $145.20 ▲ 5.1%</span>
        </div>
      </div>
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 grad-premium rounded-lg flex items-center justify-center text-white shadow-lg"><Icon name="Logo" size={20}/></div>
            <span className="text-xl font-extrabold text-savi-navy tracking-tight">Savi Bank</span>
          </div>
          <div className="hidden lg:flex gap-6 items-center">
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)} className="flex items-center gap-1 text-sm font-semibold text-savi-grey hover:text-savi-navy">
                <Icon name="Globe" size={16} /> {selectedLang} <Icon name="ChevronDown" size={14} />
              </button>
              {langOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl max-h-64 overflow-y-auto z-50 p-2">
                  {LANGUAGES.map((lang, i) => (
                    <div key={i} onClick={() => { setSelectedLang(lang); setLangOpen(false); }} className="px-4 py-2 text-sm text-savi-navy hover:bg-slate-50 rounded-xl cursor-pointer">
                      {lang}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => onNavigate('login')} className="text-sm font-bold text-savi-navy">Sign In</button>
            <button onClick={() => onNavigate('signup')} className="grad-blue text-white px-6 py-2.5 rounded-full text-sm font-bold shadow-lg">Open Account</button>
          </div>
        </div>
      </nav>
      <header className="relative bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12 relative z-10">
          <div className="flex-1 space-y-8">
            <h1 className="text-5xl md:text-7xl font-extrabold text-savi-navy leading-[1.1] tracking-tight">Your future,<br/>your way.</h1>
            <p className="text-xl text-savi-grey max-w-lg leading-relaxed">Wherever you are on your financial journey, we're here to help with premium banking solutions.</p>
            <button onClick={() => onNavigate('signup')} className="bg-savi-bright text-white px-8 py-4 rounded-xl font-bold shadow-xl">Explore Now</button>
          </div>
          <div className="flex-1 relative">
            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80" alt="Happy Couple" className="rounded-[2.5rem] shadow-2xl border-4 border-white object-cover h-[400px] w-full" />
          </div>
        </div>
      </header>
      <div className="py-12 bg-slate-50 text-center border-t border-slate-100"><p className="text-[8px] text-slate-300 uppercase tracking-[0.2em]">Demo — Not a real bank. All data is simulated.</p></div>
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2rem] w-full max-w-md shadow-2xl border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 grad-blue"></div>
        <div className="text-center mb-10 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-16 h-16 grad-premium rounded-2xl mx-auto flex items-center justify-center mb-6 text-white shadow-xl"><Icon name="Logo" size={32}/></div>
          <h1 className="text-3xl font-extrabold text-savi-navy">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && <input type="text" placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />}
          <input type="email" placeholder="Email Address" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-savi-navy focus:outline-none focus:border-savi-bright" required />
          <button type="submit" className="w-full grad-blue text-white font-bold py-4 rounded-xl shadow-lg">{isLogin ? 'Sign In' : 'Open Account'}</button>
        </form>
        <div className="mt-6 text-center"><button onClick={() => onNavigate(isLogin ? 'signup' : 'login')} className="text-sm font-bold text-savi-bright">{isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}</button></div>
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

  const openModal = (type, data = null) => { setModalType(type); setModalData(data); };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'transactions', label: 'Transactions', icon: 'FileText' },
    { id: 'transfers', label: 'Transfers & Wire', icon: 'Send' },
    { id: 'billpay', label: 'Bill Pay', icon: 'Building' },
    { id: 'cards', label: 'Manage Cards', icon: 'CreditCard' },
  ];

  const filteredTx = MOCK_TRANSACTIONS.filter(tx => tx.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-savi-dark flex text-white font-sans">
      <ActionModal type={modalType} data={modalData} onClose={() => setModalType(null)} />

      <aside className="w-72 glass-dark border-r border-white/5 hidden lg:flex flex-col p-6 z-20">
        <div className="flex items-center gap-3 mb-12 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="w-10 h-10 grad-blue rounded-xl flex items-center justify-center shadow-glow"><Icon name="Logo" size={20}/></div>
          <span className="text-xl font-bold tracking-tight">Savi Bank</span>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map(item => (
            <div key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer transition-all ${activeTab === item.id ? 'bg-savi-bright text-white shadow-lg' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
              <Icon name={item.icon} size={20} />
              <span className="font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </nav>
        <div className="pt-6 border-t border-white/5">
          <div onClick={onLogout} className="flex items-center gap-4 px-4 py-3 text-savi-red hover:bg-savi-red/10 rounded-xl cursor-pointer">
            <Icon name="LogOut" size={20} />
            <span className="font-semibold text-sm">Sign Out</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto overflow-x-hidden relative">
        <div className="relative z-10 p-6 md:p-10 max-w-7xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-1">Welcome, {user.name.split(' ')[0]}</h1>
              <p className="text-slate-400">Here is your financial overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 glass-dark rounded-full flex items-center justify-center text-slate-300"><Icon name="Bell" size={20}/></div>
              <div className="w-12 h-12 grad-blue rounded-full flex items-center justify-center text-white font-bold">{user.name.charAt(0)}</div>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2 glass-dark rounded-[2rem] p-8 relative overflow-hidden">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-slate-400 font-medium mb-2">Total Net Worth</p>
                      <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight">$12,450<span className="text-3xl text-slate-500">.75</span></h2>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-12 flex-wrap">
                    <button onClick={() => openModal('Send Money')} className="bg-white text-savi-navy px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors"><Icon name="Send" size={18}/> Send</button>
                    <button onClick={() => openModal('Request Money')} className="glass-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"><Icon name="ArrowDownLeft" size={18}/> Request</button>
                    <button onClick={() => openModal('Wire Transfer')} className="glass-dark text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-white/10 transition-colors"><Icon name="Globe" size={18}/> Wire</button>
                  </div>
                </div>
                
                <div className="grad-card-dark rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden border border-white/10">
                   <div className="flex justify-between items-center relative z-10">
                     <Icon name="Logo" size={24} className="text-white/80"/>
                     <span className="font-bold italic text-white/90 text-xl">VISA</span>
                   </div>
                   <div className="relative z-10">
                     <p className="text-slate-400 text-xs tracking-widest mb-1">CARD NUMBER</p>
                     <p className="text-xl tracking-[0.15em] font-mono text-white mb-6">•••• •••• •••• 4821</p>
                     <div className="flex justify-between items-end">
                       <div><p className="text-slate-400 text-[10px] tracking-widest">CARDHOLDER</p><p className="text-sm font-bold text-white tracking-wider uppercase">{user.name}</p></div>
                       <button onClick={() => setIsLocked(!isLocked)} className={`p-2 rounded-lg backdrop-blur-md transition-colors ${isLocked ? 'bg-savi-red/20 text-savi-red' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                         <Icon name={isLocked ? "Lock" : "Unlock"} size={18} />
                       </button>
                     </div>
                   </div>
                </div>
              </div>
              
              <div className="glass-dark rounded-[2rem] p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('transactions')} className="text-sm text-savi-bright font-bold">View All</button>
                </div>
                <div className="space-y-4">
                  {MOCK_TRANSACTIONS.slice(0, 3).map((tx, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-300"><Icon name={tx.icon} size={18} /></div>
                        <div><p className="font-bold text-sm">{tx.name}</p><p className="text-xs text-slate-400">{tx.date}</p></div>
                      </div>
                      <p className={`font-bold ${tx.amount > 0 ? 'text-savi-green' : 'text-white'}`}>${Math.abs(tx.amount).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <input type="text" placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-savi-bright w-64" />
              </div>
              <div className="glass-dark rounded-[2rem] p-8">
                <div className="space-y-6">
                  {filteredTx.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-300"><Icon name={tx.icon} size={20} /></div>
                        <div>
                          <p className="font-bold text-lg">{tx.name}</p>
                          <p className="text-sm text-slate-400">{tx.cat} • {tx.date}</p>
                        </div>
                      </div>
                      <p className={`font-bold text-lg ${tx.amount > 0 ? 'text-savi-green' : 'text-white'}`}>
                        {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)}
                      </p>
                    </div>
                  ))}
                  {filteredTx.length === 0 && <p className="text-center text-slate-400 py-8">No transactions found.</p>}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transfers' && (
            <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-[2rem] p-8">
                <h2 className="text-2xl font-bold mb-6">Transfer Between Accounts</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); openModal('Internal Transfer'); }}>
                  <div><label className="text-sm text-slate-400 mb-1 block">From</label><select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"><option>Checking (...4821)</option><option>Savings (...1104)</option></select></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">To</label><select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white"><option>Savings (...1104)</option><option>Checking (...4821)</option></select></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">Amount</label><input type="number" placeholder="$0.00" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold" required /></div>
                  <button type="submit" className="w-full grad-blue text-white font-bold py-3 rounded-xl mt-4">Transfer Now</button>
                </form>
              </div>
              <div className="glass-dark rounded-[2rem] p-8">
                <h2 className="text-2xl font-bold mb-6">Wire Transfer</h2>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); openModal('Wire Transfer'); }}>
                  <div><label className="text-sm text-slate-400 mb-1 block">Recipient Name</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" required /></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">Routing Number</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" required /></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">Account Number</label><input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" required /></div>
                  <div><label className="text-sm text-slate-400 mb-1 block">Amount</label><input type="number" placeholder="$0.00" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white font-bold" required /></div>
                  <button type="submit" className="w-full bg-white text-savi-navy font-bold py-3 rounded-xl mt-4">Send Wire</button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'billpay' && (
            <div className="fade-in">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Bill Pay</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_PAYEES.map((payee) => (
                  <div key={payee.id} className="glass-dark rounded-[2rem] p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-savi-blue/20 flex items-center justify-center text-savi-blue"><Icon name="Building" size={24} /></div>
                      <div>
                        <h3 className="font-bold text-lg">{payee.name}</h3>
                        <p className="text-xs text-slate-400">Due {payee.due}</p>
                      </div>
                    </div>
                    <div className="flex justify-between items-end mb-6">
                      <div><p className="text-xs text-slate-400">Amount</p><p className="text-2xl font-bold">${payee.amount.toFixed(2)}</p></div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${payee.status === 'Pending' ? 'bg-savi-red/10 text-savi-red' : 'bg-savi-green/10 text-savi-green'}`}>{payee.status}</span>
                    </div>
                    <button onClick={() => openModal('Pay Bill', payee)} className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-2 rounded-xl transition-colors">Pay Now</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'cards' && (
            <div className="fade-in">
              <h2 className="text-2xl font-bold mb-6">Manage Cards</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className={`grad-card-dark rounded-[2rem] p-8 aspect-[1.586/1] flex flex-col justify-between shadow-2xl transition-all duration-500 ${isLocked ? 'grayscale opacity-50' : ''}`}>
                   <div className="flex justify-between items-center"><Icon name="Logo" size={24} className="text-white/80"/><span className="font-bold italic text-white/90 text-xl">VISA</span></div>
                   <div>
                     <p className="text-slate-400 text-xs tracking-widest mb-1">CARD NUMBER</p>
                     <p className="text-2xl tracking-[0.15em] font-mono text-white mb-6">•••• •••• •••• 4821</p>
                     <div className="flex justify-between items-end">
                       <div><p className="text-slate-400 text-[10px] tracking-widest">CARDHOLDER</p><p className="text-sm font-bold text-white tracking-wider uppercase">{user.name}</p></div>
                       <div><p className="text-slate-400 text-[10px] tracking-widest">EXPIRES</p><p className="text-sm font-bold text-white tracking-wider">12/28</p></div>
                     </div>
                   </div>
                </div>
                <div className="space-y-4">
                  <div className="glass-dark p-6 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLocked ? 'bg-savi-red/10 text-savi-red' : 'bg-savi-green/10 text-savi-green'}`}><Icon name={isLocked ? "Lock" : "Unlock"} size={24}/></div>
                      <div><p className="font-bold">Lock Card</p><p className="text-xs text-slate-400">Disable all transactions</p></div>
                    </div>
                    <button onClick={() => setIsLocked(!isLocked)} className={`w-14 h-8 rounded-full relative transition-colors ${isLocked ? 'bg-savi-red' : 'bg-slate-600'}`}>
                      <div className={`w-6 h-6 bg-white rounded-full absolute top-1 transition-transform ${isLocked ? 'translate-x-7' : 'translate-x-1'}`}></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-12 text-center"><p className="text-[8px] text-slate-600 uppercase tracking-[0.2em]">Demo — Not a real bank.</p></div>
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
    } catch (e) {
      return null;
    }
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
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
