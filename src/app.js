function TroveApp() {
  // ── Onboarding ──────────────────────────────────────────────────────────
  const [onboarded, setOnboarded] = React.useState(() => localStorage.getItem('trove_onboarded') === '1');
  const [onboardStep, setOnboardStep] = React.useState(0); // 0=welcome, 1=pick

  // ── Navigation ──────────────────────────────────────────────────────────
  const [screen, setScreen]   = React.useState('home');
  const [catKey, setCatKey]   = React.useState('movies');
  const [item, setItem]       = React.useState(null);
  const [prevScreen, setPrev] = React.useState('home');

  // ── Quick-add & toast ───────────────────────────────────────────────────
  const [adding, setAdding]   = React.useState(false);
  const [toast, setToast]     = React.useState(null);

  // ── Persisted items ─────────────────────────────────────────────────────
  const [items, setItems] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('trove_items') || '[]'); }
    catch { return []; }
  });

  const saveItems = (next) => {
    setItems(next);
    localStorage.setItem('trove_items', JSON.stringify(next));
  };

  // ── Handlers ────────────────────────────────────────────────────────────
  const openCat = k => { setCatKey(k); setPrev(screen); setScreen('shelves'); };
  const openItem = it => { setItem(it); setPrev(screen); setScreen('detail'); };
  const goBack = () => setScreen(prevScreen === screen ? 'home' : prevScreen);
  const goAdd = () => setAdding(true);

  const onSaved = (entry) => {
    setAdding(false);
    const newItem = {
      id: `user-${Date.now()}`,
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
    saveItems([...items, newItem]);
    setToast(`${entry.pick.title} · ${entry.rating}★`);
    setTimeout(() => setToast(null), 2600);
  };

  const onNav = k => {
    if (k === 'add') { goAdd(); return; }
    setScreen(k === 'shelves' && screen !== 'shelves' ? 'shelves-home' : k);
  };

  // ── Onboarding ──────────────────────────────────────────────────────────
  if (!onboarded) {
    if (onboardStep === 0) return <OnboardingWelcome onStart={() => setOnboardStep(1)} />;
    return <OnboardingPickCategories onContinue={() => { localStorage.setItem('trove_onboarded', '1'); setOnboarded(true); }} />;
  }

  // ── Main app ─────────────────────────────────────────────────────────────
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

      {/* Nav overlay so tab bar works from detail/search screens */}
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
