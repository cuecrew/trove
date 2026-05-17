const supabaseUrl = 'https://sgxlupqnbwoxsjygvqai.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNneGx1cHFuYndveHNqeWd2cWFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDA3OTAsImV4cCI6MjA5NDUxNjc5MH0.RgdPBss7ZC_DoX3mFhQ4Er-FQ1_Id2-W0tiNrKRTXpQ';
if (!window.db && window.supabase) {
  window.db = window.supabase.createClient(supabaseUrl, supabaseKey);
}

// ── Auth Screen ──────────────────────────────────────────────────────────
function AuthScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [mode, setMode] = React.useState('login');
  const [error, setError] = React.useState(null);

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    let err = null;
    if (mode === 'login') {
      const { error: loginErr } = await window.db.auth.signInWithPassword({ email, password });
      err = loginErr;
    } else {
      const { error: signUpErr } = await window.db.auth.signUp({ email, password });
      err = signUpErr;
      if (!err) alert("Check your email for the confirmation link.");
    }
    if (err) setError(err.message);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40, height: '100%', color: T.text, background: T.bg, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, fontFamily: '"Bricolage Grotesque"' }}>Trove</h1>
      <p style={{ color: T.textDim, marginBottom: 32 }}>Your personal life tracker, synced to the cloud.</p>
      
      <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          style={{ padding: 16, borderRadius: 12, border: `1px solid ${T.borderL}`, background: T.surface, color: T.text, fontSize: 16 }} required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          style={{ padding: 16, borderRadius: 12, border: `1px solid ${T.borderL}`, background: T.surface, color: T.text, fontSize: 16 }} required />
        <button type="submit" disabled={loading} style={{ background: T.brand, color: '#000', border: 'none', padding: '16px', borderRadius: 12, fontWeight: 600, fontSize: 16 }}>
          {loading ? "Loading..." : mode === 'login' ? "Log In" : "Sign Up"}
        </button>
      </form>
      
      {error && <p style={{ color: 'red', marginTop: 16, fontSize: 14 }}>{error}</p>}
      
      <p style={{ marginTop: 24, textAlign: 'center', color: T.textDim, fontSize: 14 }}>
        {mode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
        <span onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} style={{ color: T.brand, cursor: 'pointer', fontWeight: 600 }}>
          {mode === 'login' ? "Sign up" : "Log in"}
        </span>
      </p>
    </div>
  );
}

function TroveApp() {
  // ── Auth & Data ──────────────────────────────────────────────────────────
  const [user, setUser] = React.useState(null);
  const [loadingUser, setLoadingUser] = React.useState(true);
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    if (!window.db) {
      console.error("Supabase client is not initialized.");
      return;
    }
    window.db.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchItems(session.user.id);
      setLoadingUser(false);
    });

    const { data: authListener } = window.db.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchItems(session.user.id);
      } else {
        setItems([]);
      }
    });

    return () => { authListener?.subscription?.unsubscribe(); };
  }, []);

  const fetchItems = async (userId) => {
    const { data, error } = await window.db.from('items').select('*').order('loggedAt', { ascending: false });
    if (!error && data) {
      setItems(data.map(i => ({...i, when: i.when_time || i.when})));
    }
  };

  // ── Onboarding ──────────────────────────────────────────────────────────
  const [onboarded, setOnboarded] = React.useState(() => localStorage.getItem('trove_onboarded') === '1');
  const [onboardStep, setOnboardStep] = React.useState(0);

  // ── Navigation ──────────────────────────────────────────────────────────
  const [screen, setScreen]   = React.useState('home');
  const [catKey, setCatKey]   = React.useState('movies');
  const [item, setItem]       = React.useState(null);
  const [prevScreen, setPrev] = React.useState('home');

  // ── Quick-add & toast ───────────────────────────────────────────────────
  const [adding, setAdding]   = React.useState(false);
  const [toast, setToast]     = React.useState(null);

  const saveItemsLocalAndCloud = async (newItem) => {
    setItems(prev => [newItem, ...prev]);

    const { error } = await window.db.from('items').insert({
      id: newItem.id,
      user_id: user.id,
      cat: newItem.cat,
      title: newItem.title,
      sub: newItem.sub || '',
      cover: newItem.cover || null,
      placeholderTone: newItem.placeholderTone || null,
      rating: newItem.rating,
      status: newItem.status,
      note: newItem.note || '',
      tags: newItem.tags || [],
      date: newItem.date,
      when_time: newItem.when,
      loggedAt: newItem.loggedAt,
    });

    if (error) {
      console.error('Error saving item:', error);
      // Rollback might be needed in a production-ready app.
    }
  };

  const openCat = k => { setCatKey(k); setPrev(screen); setScreen('shelves'); };
  const openItem = it => { setItem(it); setPrev(screen); setScreen('detail'); };
  const goBack = () => setScreen(prevScreen === screen ? 'home' : prevScreen);
  const goAdd = () => setAdding(true);

  const onSaved = (entry) => {
    setAdding(false);
    const newItem = {
      id: `m-${Date.now()}`,
      cat: entry.cat,
      title: entry.pick.title,
      sub: entry.pick.sub || '',
      cover: entry.pick.cover || null,
      placeholderTone: entry.pick.tone || null,
      rating: entry.rating,
      status: entry.status,
      note: entry.note,
      tags: entry.tags,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      when: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      loggedAt: new Date().toISOString(),
    };
    saveItemsLocalAndCloud(newItem);
    setToast(`${entry.pick.title} · ${entry.rating}★`);
    setTimeout(() => setToast(null), 2600);
  };

  if (loadingUser) return <div style={{ background: T.bg, height: '100%' }}></div>;
  if (!user) return <AuthScreen />;

  if (!onboarded) {
    if (onboardStep === 0) return <OnboardingWelcome onStart={() => setOnboardStep(1)} />;
    return <OnboardingPickCategories onContinue={() => { localStorage.setItem('trove_onboarded', '1'); setOnboarded(true); }} />;
  }

  const renderScreen = () => {
    if (screen === 'home')         return <HomeFeedDiary onCat={openCat} onItem={openItem} onAdd={goAdd} onMe={() => setScreen('me')} items={items} />;
    if (screen === 'shelves-home') return <ShelvesScreen onCat={openCat} onAdd={goAdd} items={items} />;
    if (screen === 'shelves')      return <CategoryScreen catKey={catKey} onBack={goBack} onItem={openItem} onAdd={goAdd} items={items} />;
    if (screen === 'detail')       return <DetailScreen item={item || FEED[0]} onBack={goBack} onAdd={goAdd} />;
    if (screen === 'search')       return <UniversalSearchScreen onBack={goBack} onItem={openItem} onAdd={goAdd} items={items} />;
    if (screen === 'me')           return <ProfileScreen onAdd={goAdd} onSettings={() => setScreen('settings')} items={items} />;
    if (screen === 'settings')     return <SettingsScreen onBack={goBack} />;
    return <HomeFeedDiary onCat={openCat} onItem={openItem} onAdd={goAdd} items={items} />;
  };

  const activeTab = screen === 'home' ? 'home' : screen === 'shelves' || screen === 'shelves-home' ? 'shelves' : screen === 'search' ? 'search' : screen === 'me' ? 'me' : 'home';

  return (
    <div style={{ width: '100%', height: '100%', background: T.bg, position: 'relative', overflow: 'hidden' }}>
      {renderScreen()}

      {screen !== 'detail' && screen !== 'settings' && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 40, pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'auto' }}>
            <TabBar active={activeTab} onNav={k => {
              if (k === 'home')    setScreen('home');
              if (k === 'shelves') setScreen('shelves-home');
              if (k === 'search')  setScreen('search');
              if (k === 'me')      setScreen('me');
            }} onAdd={goAdd} />
          </div>
        </div>
      )}

      {adding && <QuickAddFlow onClose={() => setAdding(false)} onSaved={onSaved} />}

      {toast && (
        <div style={{ position: 'absolute', left: 20, right: 20, bottom: 112, background: T.surface2, color: T.text, padding: '12px 16px', borderRadius: 14, border: `1px solid ${T.borderS}`, fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 10, zIndex: 60, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', animation: 'troveToastIn 220ms cubic-bezier(.2,.7,.3,1) both' }}>
          <Icon name="check" size={18} color={T.brand} />
          <span style={{ flex: 1 }}>Saved · {toast}</span>
          <span onClick={() => setToast(null)} style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim, fontWeight: 600, cursor: 'pointer' }}>UNDO</span>
        </div>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TroveApp />);
