// ── Home Feed (Diary) ────────────────────────────────────────────────────────
function HomeFeedDiary({ onCat, onItem, onAdd, onMe, items }) {
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const now = new Date();
  const dayStr = days[now.getDay()].toUpperCase();
  const dateStr = `${months[now.getMonth()].slice(0,3).toUpperCase()} ${now.getDate()}`;

  const allItems = [...items].reverse().slice(0, 10).map(it => ({ ...it, when: new Date(it.loggedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }));

  const hero = allItems[0];
  const rest = allItems.slice(1, 5);

  const groups = {};
  rest.forEach(it => {
    const g = it.date || 'Earlier';
    if (!groups[g]) groups[g] = [];
    groups[g].push(it);
  });

  const streak = items.length;

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}>
        {/* Header */}
        <div style={{ padding: '12px 20px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: '"Geist", system-ui', fontSize: 12, fontWeight: 600, color: T.textDim, letterSpacing: 0.4, marginBottom: 4 }}>{dayStr} · {dateStr}</div>
            <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 30, color: T.text, lineHeight: 1, letterSpacing: -0.8, fontVariationSettings: '"wdth" 85' }}>
              {now.getHours() < 12 ? 'Morning' : now.getHours() < 17 ? 'Afternoon' : 'Evening'}, you
            </div>
          </div>
          <div onClick={onMe} style={{ width: 38, height: 38, borderRadius: 19, background: T.surface2, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <span style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, color: T.brand, fontSize: 14 }}>T</span>
          </div>
        </div>

        {/* Streak strip */}
        <div style={{ padding: '0 20px', marginBottom: 18 }}>
          <div style={{ background: `linear-gradient(135deg, ${T.surface} 0%, ${T.surface2} 100%)`, borderRadius: 18, border: `1px solid ${T.borderS}`, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(244,178,60,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="flame" size={22} color={T.brand} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, color: T.text, lineHeight: 1.1, letterSpacing: -0.3 }}>{streak}-day streak</div>
              <div style={{ fontFamily: '"Geist", system-ui', fontSize: 12, color: T.textDim, marginTop: 2 }}>Logged something every day. Don't break it.</div>
            </div>
            <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 32, color: T.brand, lineHeight: 1, fontVariantNumeric: 'tabular-nums', fontVariationSettings: '"wdth" 85' }}>{streak}</div>
          </div>
        </div>

        {/* Hero */}
        {hero && <DiaryHero item={hero} onClick={() => onItem && onItem(hero)} />}

        {/* Timeline */}
        <SectionHead kicker="THIS WEEK" title={`${allItems.length} things, logged`} action="See all" />
        <div style={{ padding: '0 20px' }}>
          {Object.entries(groups).map(([label, groupItems]) => (
            <div key={label} style={{ marginBottom: 20 }}>
              <div style={{ fontFamily: '"Geist", system-ui', fontSize: 11, fontWeight: 700, color: T.textMute, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>{label}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {groupItems.map((it, i) => <DiaryRow key={it.id || i} item={it} onClick={() => onItem && onItem(it)} />)}
              </div>
            </div>
          ))}
          {Object.keys(groups).length === 0 && allItems.length <= 1 && (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: '"Geist"', fontSize: 14, color: T.textDim }}>Start logging to fill your diary.</div>
              <button onClick={onAdd} style={{ marginTop: 12, padding: '10px 20px', background: T.brand, color: '#0E0B09', border: 'none', borderRadius: 12, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>Log something</button>
            </div>
          )}
        </div>
      </div>
      <TabBar active="home" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

function DiaryHero({ item, onClick }) {
  const cat = CATS[item.cat];
  const verbMap = { movies: 'You watched', tv: 'You watched', books: 'You read', games: 'You played', travel: 'You visited', food: 'You tried', drinks: 'You tried' };
  return (
    <div onClick={onClick} style={{ padding: '0 20px 26px', cursor: 'pointer' }}>
      <div style={{ fontFamily: '"Geist", system-ui', fontSize: 11, fontWeight: 700, color: cat.accent, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 8 }}>
        Recently · {verbMap[item.cat] || 'You logged'}
      </div>
      <div style={{ borderRadius: 22, overflow: 'hidden', position: 'relative', background: T.surface }}>
        <Cover item={item} width="100%" height={220} radius={22} monoLabel={false} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(14,11,9,0.92) 100%)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 20px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <CatChip cat={item.cat} />
            {item.year && <><span style={{ color: T.textMute }}>·</span><span style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim }}>{item.year}{item.mins ? ` · ${item.mins}m` : ''}</span></>}
          </div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 28, color: '#fff', lineHeight: 1, letterSpacing: -0.6, marginBottom: 10, fontVariationSettings: '"wdth" 85' }}>{item.title}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Stars value={item.rating} size={18} />
            <span style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim }}>
              {item.rating}{item.tags && item.tags.length > 0 ? ' · ' + item.tags.join(' · ') : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Category Screen ──────────────────────────────────────────────────────────
function CategoryScreen({ catKey, onBack, onItem, onAdd, items }) {
  const cat = CATS[catKey];
  const [filter, setFilter] = React.useState('all');
  const [view, setView] = React.useState('grid');

  const allForCat = items.filter(it => it.cat === catKey);

  const filtered = allForCat.filter(it =>
    filter === 'all' ? true :
    filter === 'want' ? it.status === 'want' :
    ['watched','watching','read','reading','played','playing','visited','tried'].includes(it.status)
  );

  const total = allForCat.filter(it => it.status !== 'want').length;

  const filterLabels = {
    movies: [{ k: 'all', label: 'All' }, { k: 'done', label: 'Watched' }, { k: 'want', label: 'Wishlist' }],
    tv:     [{ k: 'all', label: 'All' }, { k: 'done', label: 'Watched' }, { k: 'want', label: 'Wishlist' }],
    books:  [{ k: 'all', label: 'All' }, { k: 'done', label: 'Read' },    { k: 'want', label: 'Wishlist' }],
    games:  [{ k: 'all', label: 'All' }, { k: 'done', label: 'Played' },  { k: 'want', label: 'Backlog' }],
    travel: [{ k: 'all', label: 'All' }, { k: 'done', label: 'Been' },    { k: 'want', label: 'Wishlist' }],
    food:   [{ k: 'all', label: 'All' }, { k: 'done', label: 'Tried' },   { k: 'want', label: 'Want to try' }],
    drinks: [{ k: 'all', label: 'All' }, { k: 'done', label: 'Tried' },   { k: 'want', label: 'Want to try' }],
  };

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      {/* Color wash header */}
      <div style={{ background: `linear-gradient(180deg, ${cat.accent}33 0%, ${cat.accent}00 100%)`, paddingBottom: 14, flexShrink: 0 }}>
        <div style={{ padding: '8px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="back" size={18} color={T.text} />
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="search" size={18} color={T.text} />
            </button>
            <button style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="more" size={18} color={T.text} />
            </button>
          </div>
        </div>
        <div style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Icon name={catKey} size={18} color={cat.accent} />
            <span style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: cat.accent, textTransform: 'uppercase', letterSpacing: 1.2 }}>{cat.plural}</span>
          </div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 800, fontSize: 64, color: T.text, lineHeight: 0.9, letterSpacing: -2.4, fontVariationSettings: '"wdth" 75' }}>
            {total}<span style={{ color: cat.accent }}>.</span>
          </div>
          <div style={{ fontFamily: '"Geist", system-ui', fontSize: 13, color: T.textDim, marginTop: 6 }}>
            this year · {allForCat.length} total
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={{ padding: '6px 20px 12px', display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
        {(filterLabels[catKey] || filterLabels.movies).map(f => (
          <button key={f.k} onClick={() => setFilter(f.k)} style={{ padding: '7px 12px', borderRadius: 999, border: 'none', cursor: 'pointer', background: filter === f.k ? cat.accent : T.surface, color: filter === f.k ? '#fff' : T.textDim, fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            {f.label}{f.k === 'all' && <span style={{ opacity: 0.7 }}>{allForCat.length}</span>}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', background: T.surface, borderRadius: 999, padding: 3 }}>
          {['grid','list'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{ padding: '5px 9px', borderRadius: 999, border: 'none', cursor: 'pointer', background: view === v ? T.surface3 : 'transparent', color: view === v ? T.text : T.textMute }}>
              <Icon name={v} size={14} color={view === v ? T.text : T.textMute} />
            </button>
          ))}
        </div>
      </div>

      {/* Items */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 110px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '40px 0', textAlign: 'center' }}>
            <div style={{ fontFamily: '"Geist"', fontSize: 14, color: T.textDim }}>Nothing here yet.</div>
            <button onClick={onAdd} style={{ marginTop: 12, padding: '10px 20px', background: cat.accent, color: '#fff', border: 'none', borderRadius: 12, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
              Add a {cat.label.toLowerCase()}
            </button>
          </div>
        ) : view === 'grid' ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {filtered.map(it => (
              <div key={it.id} onClick={() => onItem && onItem(it)} style={{ cursor: 'pointer' }}>
                <div style={{ position: 'relative' }}>
                  <Cover item={it} width="100%" height={156} radius={10} monoLabel={false} />
                  {it.status === 'want' && (
                    <div style={{ position: 'absolute', top: 6, right: 6, width: 22, height: 22, borderRadius: 11, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon name="bookmark" size={11} color={cat.accent} />
                    </div>
                  )}
                </div>
                <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, color: T.text, marginTop: 6, lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.title}</div>
                <div style={{ marginTop: 3 }}>
                  {it.status === 'want' ? <span style={{ fontFamily: '"Geist"', fontSize: 10, fontWeight: 600, color: T.textMute, textTransform: 'uppercase', letterSpacing: 0.4 }}>Wishlist</span> : <Stars value={it.rating} size={11} />}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(it => <DiaryRow key={it.id} item={it} onClick={() => onItem && onItem(it)} />)}
          </div>
        )}
      </div>

      <TabBar active="shelves" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

// ── Shelves (category grid) ──────────────────────────────────────────────────
function ShelvesScreen({ onCat, onAdd, items }) {
  const counts = {};
  CAT_ORDER.forEach(k => {
    counts[k] = items.filter(it => it.cat === k && it.status !== 'want').length;
  });
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '12px 20px 22px' }}>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 30, color: T.text, letterSpacing: -0.8, fontVariationSettings: '"wdth" 85' }}>Your Shelves</div>
        </div>
        <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {CAT_ORDER.map(k => {
            const c = CATS[k];
            const count = counts[k];
            return (
              <button key={k} onClick={() => onCat(k)} style={{ padding: '18px 16px', background: T.surface, border: `1px solid ${T.borderS}`, borderRadius: 18, cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden' }}
                onMouseDown={e => e.currentTarget.style.transform = 'scale(.97)'}
                onMouseUp={e => e.currentTarget.style.transform = ''}
                onMouseLeave={e => e.currentTarget.style.transform = ''}>
                <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.accent }} />
                <div style={{ width: 38, height: 38, borderRadius: 10, background: c.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                  <Icon name={k} size={20} color={c.accent} />
                </div>
                <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 28, color: T.text, lineHeight: 1, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', fontVariationSettings: '"wdth" 85' }}>{count}</div>
                <div style={{ fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, color: T.textDim, marginTop: 2 }}>{c.plural}</div>
              </button>
            );
          })}
        </div>
      </div>
      <TabBar active="shelves" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

// ── Detail Screen ────────────────────────────────────────────────────────────
function DetailScreen({ item, onBack, onAdd }) {
  const cat = CATS[item.cat];
  const relogLabel = { movies: 'Rewatch', tv: 'Rewatch', books: 'Re-read', games: 'Play again', travel: 'Go again', food: 'Log again', drinks: 'Log again' };
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', height: 460, overflow: 'hidden', flexShrink: 0 }}>
        <Cover item={item} width="100%" height={460} radius={0} monoLabel={false} />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, rgba(14,11,9,0.55) 0%, rgba(14,11,9,0) 30%, rgba(14,11,9,0) 50%, ${T.bg} 100%)` }} />
        <div style={{ position: 'absolute', inset: 0 }}>
          <StatusBar />
          <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={onBack} style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
              <Icon name="back" size={18} color="#fff" />
            </button>
            <button style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.4)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(12px)' }}>
              <Icon name="more" size={18} color="#fff" />
            </button>
          </div>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 24, padding: '0 22px' }}>
          <CatChip cat={item.cat} />
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 800, fontSize: 38, color: '#fff', marginTop: 8, lineHeight: 0.95, letterSpacing: -1.2, fontVariationSettings: '"wdth" 85' }}>{item.title}</div>
          <div style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim, marginTop: 6 }}>{item.sub}{item.year ? ` · ${item.year}` : ''}{item.mins ? ` · ${item.mins}m` : ''}</div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 130px', marginTop: -14 }}>
        {/* Rating card */}
        <div style={{ background: T.surface, borderRadius: 18, border: `1px solid ${T.borderS}`, padding: '18px 18px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: 'uppercase', letterSpacing: 1.1 }}>Your rating</span>
            <StatusPill status={item.status} cat={item.cat} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Stars value={item.rating} size={26} />
            <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 32, color: cat.accent, lineHeight: 1, letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>{item.rating}</div>
          </div>
          {item.note && <div style={{ fontFamily: '"Geist", system-ui', fontSize: 14, color: T.text, lineHeight: 1.5, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.borderS}` }}>{item.note}</div>}
          <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textMute, marginTop: 12 }}>Logged {item.date}{item.when && item.when !== '—' ? `, ${item.when}` : ''}</div>
        </div>

        {/* Tags */}
        {item.tags && item.tags.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 8 }}>Tags</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {item.tags.map(t => <span key={t} style={{ padding: '6px 11px', borderRadius: 999, background: T.surface, color: T.text, fontFamily: '"Geist"', fontSize: 12, fontWeight: 500, border: `1px solid ${T.borderS}` }}>#{t}</span>)}
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <button onClick={onAdd} style={{ flex: 1, padding: '14px', background: cat.accent, color: '#fff', border: 'none', borderRadius: 14, cursor: 'pointer', fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15, letterSpacing: -0.2, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.18)' }}>
            {relogLabel[item.cat] || 'Log again'}
          </button>
          <button style={{ padding: '14px 18px', background: T.surface, color: T.text, border: `1px solid ${T.borderS}`, borderRadius: 14, cursor: 'pointer', fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15 }}>Edit</button>
        </div>

        {/* History */}
        <div style={{ background: T.surface, borderRadius: 18, border: `1px solid ${T.borderS}`, padding: '14px 16px' }}>
          <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 10 }}>History</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: cat.accent }} />
            <span style={{ fontFamily: '"Geist"', fontSize: 14, color: T.text, flex: 1 }}>First time</span>
            <span style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim }}>{item.date || 'Recently'}</span>
          </div>
        </div>
      </div>

      <TabBar active="home" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

// ── Profile Screen ───────────────────────────────────────────────────────────
function ProfileScreen({ onAdd, onSettings, items }) {
  const heat = React.useMemo(() => {
    const out = [];
    for (let w = 0; w < 26; w++) {
      const col = [];
      for (let d = 0; d < 7; d++) {
        const x = (Math.sin((w + 1) * 12.9898 + (d + 1) * 78.233) * 43758.5453) % 1;
        const v = Math.abs(x);
        col.push(v < 0.42 ? 0 : v < 0.62 ? 1 : v < 0.82 ? 2 : v < 0.94 ? 3 : 4);
      }
      out.push(col);
    }
    return out;
  }, []);

  const totalLogged = items.length;
  const avgRating = items.length > 0 ? (items.reduce((a, b) => a + b.rating, 0) / items.length).toFixed(1) : '—';

  const catCounts = {};
  CAT_ORDER.forEach(k => { catCounts[k] = items.filter(it => it.cat === k).length; });

  const streakDays = React.useMemo(() => {
    if (items.length === 0) return 0;
    const loggedDates = new Set(items.map(it => new Date(it.loggedAt).toDateString()));
    let streak = 0;
    const d = new Date(); d.setHours(0,0,0,0);
    while (loggedDates.has(d.toDateString())) { streak++; d.setDate(d.getDate() - 1); }
    return streak;
  }, [items]);
  const catTotal = Object.values(catCounts).reduce((a, b) => a + b, 0) || 1;

  const topDisplay = items.filter(it => it.rating >= 4.5).slice(0, 5);

  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 110 }}>
        <div style={{ padding: '8px 20px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, color: T.textDim }}>@you</div>
          <button onClick={onSettings} style={{ width: 38, height: 38, borderRadius: 19, background: T.surface, border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="more" size={18} color={T.textDim} />
          </button>
        </div>

        {/* Hero */}
        <div style={{ padding: '0 20px 28px' }}>
          <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.brand, letterSpacing: 1.2, marginBottom: 8, textTransform: 'uppercase' }}>2026 IN PROGRESS</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 800, fontSize: 72, color: T.text, lineHeight: 0.85, letterSpacing: -3, fontVariationSettings: '"wdth" 75' }}>{totalLogged}</div>
          <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 600, fontSize: 24, color: T.textDim, marginTop: 4, letterSpacing: -0.6, fontVariationSettings: '"wdth" 85' }}>things logged, this year.</div>
        </div>

        {/* Stats */}
        <div style={{ padding: '0 20px 18px', display: 'flex', gap: 8 }}>
          <StatCard value={catCounts.movies} label="Movies" accent={CATS.movies.accent} icon="movies" sub="watched" />
          <StatCard value={totalLogged > 0 ? `${avgRating}★` : '—'} label="Average" accent={T.brand} icon="star" sub={totalLogged > 0 ? `across ${totalLogged}` : 'no entries yet'} />
          <StatCard value={streakDays} label="Streak" accent={CATS.travel.accent} icon="flame" sub="days" />
        </div>

        {/* Heatmap */}
        <div style={{ padding: '6px 20px 8px' }}>
          <SectionHead kicker="ACTIVITY" title="Last 6 months" />
          <div style={{ background: T.surface, borderRadius: 18, padding: '16px 16px', border: `1px solid ${T.borderS}` }}>
            <div style={{ display: 'flex', gap: 4 }}>
              {heat.map((col, w) => (
                <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {col.map((v, d) => {
                    const a = [0.05, 0.2, 0.45, 0.75, 1][v];
                    return <div key={d} style={{ width: 10, height: 10, borderRadius: 2, background: v === 0 ? 'rgba(255,240,224,0.04)' : `rgba(244,178,60,${a})` }} />;
                  })}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>Dec</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>less</span>
                {[0,1,2,3,4].map(v => { const a = [0.05,0.2,0.45,0.75,1][v]; return <div key={v} style={{ width: 10, height: 10, borderRadius: 2, background: v === 0 ? 'rgba(255,240,224,0.04)' : `rgba(244,178,60,${a})` }} />; })}
                <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>more</span>
              </div>
              <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>May</span>
            </div>
          </div>
        </div>

        {/* By category bar */}
        <div style={{ padding: '20px 20px 4px' }}>
          <SectionHead kicker="WHAT YOU FEED YOURSELF" title="By category" />
          <div style={{ background: T.surface, borderRadius: 18, padding: '16px 16px', border: `1px solid ${T.borderS}` }}>
            <div style={{ display: 'flex', height: 12, borderRadius: 6, overflow: 'hidden' }}>
              {CAT_ORDER.map(k => <div key={k} style={{ width: `${(catCounts[k] / catTotal) * 100}%`, background: CATS[k].accent }} />)}
            </div>
            <div style={{ marginTop: 14, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px' }}>
              {CAT_ORDER.map(k => (
                <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 4, background: CATS[k].accent }} />
                  <span style={{ flex: 1, fontFamily: '"Geist"', fontSize: 13, color: T.text }}>{CATS[k].plural}</span>
                  <span style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim, fontVariantNumeric: 'tabular-nums' }}>{catCounts[k]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top rated */}
        <div style={{ padding: '20px 0 0' }}>
          <SectionHead kicker="YOUR FIVES" title="Top-rated this year" />
          <div style={{ display: 'flex', gap: 12, padding: '0 20px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {topDisplay.map((it, i) => (
              <div key={i} style={{ width: 110, flexShrink: 0 }}>
                <Cover item={it} width={110} height={150} radius={10} monoLabel={false} />
                <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, color: T.text, marginTop: 6, lineHeight: 1.2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{it.title}</div>
                <div style={{ marginTop: 3 }}><Stars value={it.rating} size={11} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <TabBar active="me" onNav={() => {}} onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

window.HomeFeedDiary = HomeFeedDiary;
window.ShelvesScreen = ShelvesScreen;
window.CategoryScreen = CategoryScreen;
window.DetailScreen = DetailScreen;
window.ProfileScreen = ProfileScreen;
