// ── Onboarding Welcome ───────────────────────────────────────────────────────
function OnboardingWelcome({ onStart }) {
  return (
    <div style={{ height: '100%', background: T.bg, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ flex: 1, padding: '40px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <TroveMark size={26} />
        <div>
          <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.brand, letterSpacing: 1.3, textTransform: 'uppercase', marginBottom: 14 }}>Welcome</div>
          <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 52, color: T.text, lineHeight: 0.92, letterSpacing: -2, fontVariationSettings: '"wdth" 75' }}>
            Everything<br/>you experience,<br/><span style={{ color: T.brand }}>in one place.</span>
          </div>
          <div style={{ fontFamily: '"Geist"', fontSize: 15, color: T.textDim, marginTop: 18, lineHeight: 1.5, maxWidth: 320 }}>
            Movies, books, games, places, meals.<br/>Rate them, write a line, see your year add up.
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button onClick={onStart} style={{ width: '100%', padding: '16px', background: T.brand, color: '#0E0B09', border: 'none', borderRadius: 14, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, letterSpacing: -0.2, cursor: 'pointer', boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.18)' }}>
            Start your trove
          </button>
          <button onClick={onStart} style={{ width: '100%', padding: '14px', background: 'transparent', color: T.textDim, border: 'none', fontFamily: '"Geist"', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
            I already have an account
          </button>
          <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute, textAlign: 'center', marginTop: 4, lineHeight: 1.4 }}>
            By continuing you agree to our terms.<br/>No ads, ever.
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Onboarding Pick Categories ───────────────────────────────────────────────
function OnboardingPickCategories({ onContinue }) {
  const [picked, setPicked] = React.useState(new Set(['movies','books','travel']));
  const toggle = k => setPicked(p => { const n = new Set(p); n.has(k) ? n.delete(k) : n.add(k); return n; });
  return (
    <div style={{ height: '100%', background: T.bg, position: 'relative', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '8px 20px 0', display: 'flex', gap: 6, alignItems: 'center', flexShrink: 0 }}>
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: T.brand }} />
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: T.brand }} />
        <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(255,240,224,0.12)' }} />
      </div>
      <div style={{ flex: 1, padding: '28px 24px 0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Step 2 of 3</div>
        <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 30, color: T.text, letterSpacing: -1, lineHeight: 1.05, fontVariationSettings: '"wdth" 85' }}>What do you<br/>want to track?</div>
        <div style={{ fontFamily: '"Geist"', fontSize: 14, color: T.textDim, marginTop: 8, marginBottom: 20 }}>Pick what's actually yours. Add more later.</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, overflowY: 'auto' }}>
          {CAT_ORDER.map(k => {
            const c = CATS[k]; const on = picked.has(k);
            return (
              <button key={k} onClick={() => toggle(k)} style={{ padding: '16px 14px', borderRadius: 16, background: on ? c.soft : T.surface, border: on ? `1.5px solid ${c.accent}` : `1.5px solid ${T.borderS}`, cursor: 'pointer', textAlign: 'left', position: 'relative', transition: 'all 140ms' }}>
                <Icon name={k} size={22} color={on ? c.accent : T.textDim} />
                <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 16, color: T.text, marginTop: 6, letterSpacing: -0.2 }}>{c.plural}</div>
                {on && <div style={{ position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: 11, background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon name="check" size={12} color="#fff" /></div>}
              </button>
            );
          })}
        </div>
      </div>
      <div style={{ padding: '14px 24px 22px', flexShrink: 0 }}>
        <button onClick={() => onContinue([...picked])} style={{ width: '100%', padding: '16px', background: T.brand, color: '#0E0B09', border: 'none', borderRadius: 14, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, cursor: 'pointer', boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.18)' }}>
          Continue · {picked.size} picked
        </button>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ── Universal Search ─────────────────────────────────────────────────────────
function UniversalSearchScreen({ onBack, onItem, onAdd, items }) {
  const [q, setQ] = React.useState('');
  const [catFilter, setCatFilter] = React.useState('all');
  const inputRef = React.useRef(null);
  React.useEffect(() => { setTimeout(() => inputRef.current && inputRef.current.focus(), 120); }, []);

  const ALL = [];
  CAT_ORDER.forEach(k => {
    (SEARCH_SEEDS[k] || []).forEach(r => ALL.push({ ...r, cat: k }));
    (SAMPLE[k] || []).forEach(r => ALL.push({ ...r }));
  });
  items.forEach(it => ALL.push({ ...it }));

  const filtered = q
    ? ALL.filter(r => {
        const match = (r.title + ' ' + (r.sub || '')).toLowerCase().includes(q.toLowerCase());
        return catFilter === 'all' ? match : match && r.cat === catFilter;
      })
    : [];

  const grouped = {};
  filtered.forEach(r => { (grouped[r.cat] = grouped[r.cat] || []).push(r); });

  const recentSearches = ['Dune Part Two', 'Tomorrow & Tomorrow', 'Kyoto', 'Severance'];

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
      <StatusBar />
      <div style={{ padding: '4px 16px 12px', display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, background: T.surface, border: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="back" size={18} color={T.text} />
        </button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px', background: T.surface, borderRadius: 12, border: `1.5px solid ${q ? T.brand : T.borderS}`, transition: 'border-color 160ms' }}>
          <Icon name="search" size={16} color={T.textDim} />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder="Search anything in your trove…"
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: T.text, fontFamily: '"Geist"', fontSize: 15 }} />
          {q && <button onClick={() => setQ('')} style={{ background: 'transparent', border: 'none', color: T.textMute, padding: 0, cursor: 'pointer', fontSize: 18 }}>×</button>}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, padding: '0 16px 12px', overflowX: 'auto', scrollbarWidth: 'none', flexShrink: 0 }}>
        {[{ k: 'all', label: 'All' }, ...CAT_ORDER.map(k => ({ k, label: CATS[k].plural }))].map(f => (
          <button key={f.k} onClick={() => setCatFilter(f.k)} style={{ padding: '7px 12px', borderRadius: 999, border: 'none', flexShrink: 0, background: catFilter === f.k ? T.surface3 : T.surface, color: catFilter === f.k ? T.text : T.textDim, fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{f.label}</button>
        ))}
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 0 110px' }}>
        {q === '' && (
          <div style={{ padding: '8px 20px' }}>
            <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textMute, letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 8 }}>Recent</div>
            {recentSearches.map(r => (
              <div key={r} onClick={() => setQ(r)} style={{ padding: '10px 0', borderBottom: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <Icon name="search" size={14} color={T.textMute} />
                <span style={{ fontFamily: '"Geist"', fontSize: 14, color: T.text, flex: 1 }}>{r}</span>
                <span style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textMute }}>↗</span>
              </div>
            ))}
          </div>
        )}
        {Object.keys(grouped).map(k => {
          const cat = CATS[k];
          return (
            <div key={k} style={{ marginTop: 10 }}>
              <div style={{ padding: '6px 20px 8px', display: 'flex', alignItems: 'center', gap: 6 }}>
                <Icon name={k} size={14} color={cat.accent} />
                <span style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: cat.accent, textTransform: 'uppercase', letterSpacing: 1 }}>{cat.plural}</span>
                <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>· {grouped[k].length}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '0 16px' }}>
                {grouped[k].slice(0, 3).map((r, i) => (
                  <div key={i} onClick={() => onItem && onItem(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 8, borderRadius: 10, background: T.surface, cursor: 'pointer' }}>
                    <Cover item={r} width={36} height={50} radius={6} monoLabel={false} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: '"Geist"', fontSize: 14, fontWeight: 600, color: T.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.title}</div>
                      <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim, marginTop: 2 }}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
        {q !== '' && filtered.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Geist"', fontSize: 14, color: T.textDim }}>Nothing found for "{q}"</div>
          </div>
        )}
      </div>
      <TabBar active="search" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

// ── Settings ─────────────────────────────────────────────────────────────────
function SettingsScreen({ onBack }) {
  const [toggles, setToggles] = React.useState({ movies: true, tv: true, books: true, games: true, travel: true, food: true, drinks: false, nightly: true, weekly: true });
  const toggle = k => setToggles(p => ({ ...p, [k]: !p[k] }));

  const Toggle = ({ label, k }) => (
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: `1px solid ${T.borderS}` }}>
      <span style={{ flex: 1, fontFamily: '"Geist"', fontSize: 15, color: T.text, fontWeight: 500 }}>{label}</span>
      <span onClick={() => toggle(k)} style={{ width: 44, height: 26, borderRadius: 13, background: toggles[k] ? T.brand : 'rgba(255,255,255,0.12)', position: 'relative', cursor: 'pointer', transition: 'background 160ms' }}>
        <span style={{ position: 'absolute', top: 2, left: toggles[k] ? 20 : 2, width: 22, height: 22, borderRadius: 11, background: '#fff', transition: 'left 160ms' }} />
      </span>
    </div>
  );
  const Row = ({ label, detail, last, danger }) => (
    <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: last ? 'none' : `1px solid ${T.borderS}` }}>
      <span style={{ flex: 1, fontFamily: '"Geist"', fontSize: 15, color: danger ? T.red : T.text, fontWeight: 500 }}>{label}</span>
      {detail && <span style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim }}>{detail}</span>}
      <Icon name="chevron" size={7} color={T.textMute} />
    </div>
  );
  const Header = ({ children }) => (
    <div style={{ padding: '20px 20px 8px', fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textMute, letterSpacing: 1.2, textTransform: 'uppercase' }}>{children}</div>
  );
  const Group = ({ children }) => (
    <div style={{ background: T.surface, borderRadius: 16, border: `1px solid ${T.borderS}`, margin: '0 20px 16px', overflow: 'hidden' }}>{children}</div>
  );

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '4px 16px 0', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
        <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, background: T.surface, border: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="back" size={18} color={T.text} />
        </button>
        <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 26, color: T.text, letterSpacing: -0.7, fontVariationSettings: '"wdth" 85' }}>Settings</div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', paddingTop: 14, paddingBottom: 60 }}>
        <Header>Account</Header>
        <Group><Row label="Profile" detail="@you" /><Row label="Email" detail="you@…" /><Row label="Notifications" detail="On" last /></Group>
        <Header>Categories</Header>
        <Group>{CAT_ORDER.map(k => <Toggle key={k} label={CATS[k].plural} k={k} />)}</Group>
        <Header>Reminders</Header>
        <Group><Toggle label="Nightly diary nudge" k="nightly" /><Toggle label="Weekly recap" k="weekly" /><Row label="Quiet hours" detail="10pm – 8am" last /></Group>
        <Header>Data</Header>
        <Group><Row label="Import from Letterboxd" /><Row label="Import from Goodreads" /><Row label="Export everything" detail="CSV" last /></Group>
        <Header>About</Header>
        <Group><Row label="Version" detail="1.0.0" /><Row label="Privacy" /><Row label="Sign out" danger last /></Group>
      </div>
      <HomeIndicator />
    </div>
  );
}

window.OnboardingWelcome = OnboardingWelcome;
window.OnboardingPickCategories = OnboardingPickCategories;
window.UniversalSearchScreen = UniversalSearchScreen;
window.SettingsScreen = SettingsScreen;
