const STATUS_OPTIONS = {
  movies: [{ k: 'watched', label: 'Watched' }, { k: 'want', label: 'Wishlist' }],
  tv:     [{ k: 'watching', label: 'Watching' }, { k: 'watched', label: 'Finished' }, { k: 'want', label: 'Wishlist' }],
  books:  [{ k: 'reading', label: 'Reading' }, { k: 'read', label: 'Finished' }, { k: 'want', label: 'Wishlist' }],
  games:  [{ k: 'playing', label: 'Playing' }, { k: 'played', label: 'Finished' }, { k: 'want', label: 'Backlog' }],
  travel: [{ k: 'visited', label: 'Been' }, { k: 'want', label: 'Want to go' }],
  food:   [{ k: 'tried', label: 'Logged' }, { k: 'want', label: 'Want to try' }],
  drinks: [{ k: 'tried', label: 'Logged' }, { k: 'want', label: 'Want to try' }],
};

const TAG_SEEDS = ['solo', 'date night', 'rewatch', 'IMAX', 'with family', 'plane', 'rainy day', 'on tour', 'audiobook'];

function QuickAddFlow({ onClose, onSaved }) {
  const [step, setStep]     = React.useState(0);
  const [cat, setCat]       = React.useState(null);
  const [pick, setPick]     = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [status, setStatus] = React.useState(null);
  const [note, setNote]     = React.useState('');
  const [tagOn, setTagOn]   = React.useState([]);

  const accent = cat ? CATS[cat].accent : T.brand;

  const goBack = () => { if (step === 0) { onClose && onClose(); return; } setStep(s => s - 1); };

  const onPickCat = k => { setCat(k); setStep(1); };
  const onPickResult = r => { setPick(r); setStatus(STATUS_OPTIONS[cat]?.[0]?.k || 'tried'); setStep(2); };
  const onSave = () => {
    setStep(3);
    setTimeout(() => {
      onSaved && onSaved({ cat, pick, rating, status, note, tags: tagOn });
    }, 1400);
  };

  const progress = (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
      {[0,1,2,3].map(i => (
        <span key={i} style={{ height: 4, borderRadius: 2, width: i === step ? 22 : 14, background: i <= step ? accent : 'rgba(255,255,255,0.12)', transition: 'all 220ms cubic-bezier(.2,.7,.3,1)' }} />
      ))}
    </div>
  );

  return (
    <div style={{ position: 'absolute', inset: 0, background: T.bg, display: 'flex', flexDirection: 'column', zIndex: 50, overflow: 'hidden', animation: 'slideUp 240ms cubic-bezier(.2,.7,.3,1) both' }}>
      <StatusBar />
      <div style={{ padding: '6px 20px 14px', display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
        <button onClick={goBack} style={{ width: 36, height: 36, borderRadius: 18, background: T.surface, border: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Icon name={step === 0 ? 'plus' : 'back'} size={16} color={T.text} style={step === 0 ? { transform: 'rotate(45deg)' } : {}} />
        </button>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{progress}</div>
        <div style={{ width: 36 }} />
      </div>

      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <StepShell visible={step === 0}><StepCategory onPick={onPickCat} /></StepShell>
        <StepShell visible={step === 1}><StepSearch cat={cat} onPick={onPickResult} /></StepShell>
        <StepShell visible={step === 2}>
          <StepRate cat={cat} pick={pick} rating={rating} onRating={setRating} status={status} onStatus={setStatus} note={note} onNote={setNote} tagOn={tagOn} onTag={t => setTagOn(x => x.includes(t) ? x.filter(y => y !== t) : [...x, t])} onSave={onSave} />
        </StepShell>
        <StepShell visible={step === 3}><StepSaved cat={cat} pick={pick} rating={rating} onClose={onClose} /></StepShell>
      </div>

      <HomeIndicator />
    </div>
  );
}

function StepShell({ visible, children }) {
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: visible ? 1 : 0, transform: `translateY(${visible ? 0 : 12}px)`, transition: 'opacity 240ms ease, transform 240ms cubic-bezier(.2,.7,.3,1)', pointerEvents: visible ? 'auto' : 'none', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  );
}

// Step 0 — Category picker
function StepCategory({ onPick }) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 60px' }}>
      <div style={{ fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.textDim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>What did you just experience?</div>
      <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 30, color: T.text, letterSpacing: -0.8, lineHeight: 1.05, marginBottom: 22, fontVariationSettings: '"wdth" 85' }}>
        Pick a category.<br/><span style={{ color: T.textMute }}>Anything counts.</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {CAT_ORDER.map(k => {
          const c = CATS[k];
          return (
            <button key={k} onClick={() => onPick(k)}
              style={{ padding: '18px 16px', background: T.surface, color: T.text, border: `1px solid ${T.borderS}`, borderRadius: 18, cursor: 'pointer', textAlign: 'left', position: 'relative', overflow: 'hidden', transition: 'transform 120ms, background 120ms' }}
              onMouseDown={e => e.currentTarget.style.transform = 'scale(.97)'}
              onMouseUp={e => e.currentTarget.style.transform = ''}
              onMouseLeave={e => e.currentTarget.style.transform = ''}>
              <span style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: c.accent }} />
              <div style={{ width: 38, height: 38, borderRadius: 10, background: c.soft, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                <Icon name={k} size={20} color={c.accent} />
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, color: T.text, letterSpacing: -0.3 }}>{c.plural}</div>
              <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute, marginTop: 2, letterSpacing: 0.2 }}>Add a {c.label.toLowerCase()}</div>
            </button>
          );
        })}
        <button style={{ padding: '18px 16px', background: 'transparent', color: T.textDim, border: `1.5px dashed ${T.border}`, borderRadius: 18, cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 6 }}>
          <Icon name="more" size={18} color={T.textDim} />
          <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 14, color: T.text }}>Other<br/><span style={{ fontFamily: '"Geist"', fontWeight: 500, fontSize: 11, color: T.textMute }}>Concert, exhibit, podcast…</span></div>
        </button>
      </div>
    </div>
  );
}

// Step 1 — Search
function StepSearch({ cat, onPick }) {
  const [q, setQ] = React.useState('');
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const inputRef = React.useRef(null);
  React.useEffect(() => { const t = setTimeout(() => inputRef.current && inputRef.current.focus(), 260); return () => clearTimeout(t); }, []);

  React.useEffect(() => {
    let active = true;
    if (!cat) return;
    if (!q) {
      setResults(window.SEARCH_SEEDS[cat] || []);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      window.searchAPI(cat, q).then(res => {
        if (active) { setResults(res); setLoading(false); }
      });
    }, 400);
    return () => { active = false; clearTimeout(t); };
  }, [q, cat]);

  if (!cat) return null;
  const c = CATS[cat];
  const filtered = results;

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '4px 20px 14px', flexShrink: 0 }}>
        <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>{c.plural}</div>
        <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 26, color: T.text, letterSpacing: -0.7, lineHeight: 1.1, fontVariationSettings: '"wdth" 85' }}>Which one?</div>
      </div>
      <div style={{ padding: '0 20px 12px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: T.surface, borderRadius: 14, padding: '12px 14px', border: `1.5px solid ${q ? c.accent : T.borderS}`, transition: 'border-color 160ms' }}>
          <Icon name="search" size={18} color={T.textDim} />
          <input ref={inputRef} value={q} onChange={e => setQ(e.target.value)} placeholder={`Search ${c.plural.toLowerCase()}…`}
            style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: T.text, fontFamily: '"Geist", system-ui', fontSize: 15 }} />
          {q && <button onClick={() => setQ('')} style={{ background: 'transparent', border: 'none', color: T.textMute, cursor: 'pointer', padding: 4, fontSize: 18 }}>×</button>}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px 24px' }}>
        {!q && <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textMute, letterSpacing: 1.1, textTransform: 'uppercase', margin: '6px 0 10px' }}>Trending in {c.plural}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtered.map(r => (
            <div key={r.id} onClick={() => onPick(r)} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, borderRadius: 12, cursor: 'pointer', background: T.surface, border: `1px solid ${T.borderS}` }}
              onMouseEnter={e => e.currentTarget.style.background = T.surface2}
              onMouseLeave={e => e.currentTarget.style.background = T.surface}>
              <Cover item={{ ...r, cat }} width={44} height={62} radius={6} monoLabel={false} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 15, color: T.text, lineHeight: 1.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{r.title}</div>
                <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 2 }}>{r.sub}</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="plus" size={14} color={c.accent} />
              </div>
            </div>
          ))}
          {q && filtered.length === 0 && (
            <div style={{ padding: '24px 0', textAlign: 'center' }}>
              <div style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim }}>Nothing matched.</div>
              <button onClick={() => onPick({ id: `manual-${Date.now()}`, title: q, sub: c.label })} style={{ marginTop: 10, padding: '10px 16px', background: c.accent, color: '#fff', border: 'none', borderRadius: 10, fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
                Add "{q}" manually
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Step 2 — Rate
function StepRate({ cat, pick, rating, onRating, status, onStatus, note, onNote, tagOn, onTag, onSave }) {
  if (!cat || !pick) return null;
  const c = CATS[cat];
  const opts = STATUS_OPTIONS[cat] || [];
  const flavorCopy = rating >= 4.5 ? '· an all-timer' : rating > 0 && rating < 2 ? '· a no' : '';

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 24px' }}>
        {/* Pick restated */}
        <div style={{ background: T.surface, borderRadius: 18, border: `1px solid ${T.borderS}`, padding: 12, display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <Cover item={{ ...pick, cat }} width={56} height={80} radius={8} monoLabel={false} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <CatChip cat={cat} size={10} />
            <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, color: T.text, marginTop: 4, lineHeight: 1.15, letterSpacing: -0.3 }}>{pick.title}</div>
            <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 2 }}>{pick.sub}</div>
          </div>
        </div>

        {/* Status */}
        <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10 }}>Status</div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
          {opts.map(o => (
            <button key={o.k} onClick={() => onStatus(o.k)} style={{ padding: '9px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', background: status === o.k ? c.accent : T.surface, color: status === o.k ? '#fff' : T.text, fontFamily: '"Geist"', fontSize: 13, fontWeight: 600 }}>{o.label}</button>
          ))}
        </div>

        {/* Rating */}
        <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10 }}>Rate it</div>
        <div style={{ padding: '10px 0 14px' }}>
          <StarPicker value={rating} onChange={onRating} accent={c.accent} />
          <div style={{ textAlign: 'center', marginTop: 8, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 18, color: rating ? c.accent : T.textMute, letterSpacing: -0.3 }}>
            {rating ? rating.toFixed(1) : '—'}
            {flavorCopy && <span style={{ color: T.textDim, fontWeight: 500, fontSize: 13, marginLeft: 8 }}>{flavorCopy}</span>}
          </div>
        </div>

        {/* Note */}
        <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1.1, textTransform: 'uppercase', marginTop: 14, marginBottom: 8 }}>One line, if you want</div>
        <textarea value={note} onChange={e => onNote(e.target.value)} placeholder="A thought, a line you liked, who you were with…" rows={2}
          style={{ width: '100%', boxSizing: 'border-box', padding: '12px 14px', borderRadius: 12, background: T.surface, color: T.text, border: `1px solid ${T.borderS}`, outline: 'none', resize: 'none', fontFamily: '"Geist", system-ui', fontSize: 14, lineHeight: 1.4 }} />

        {/* Tags */}
        <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim, letterSpacing: 1.1, textTransform: 'uppercase', marginTop: 18, marginBottom: 8 }}>Tags</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TAG_SEEDS.map(t => (
            <button key={t} onClick={() => onTag(t)} style={{ padding: '6px 11px', borderRadius: 999, background: tagOn.includes(t) ? c.accent : T.surface, color: tagOn.includes(t) ? '#fff' : T.text, border: 'none', cursor: 'pointer', fontFamily: '"Geist"', fontSize: 12, fontWeight: 500 }}>
              {tagOn.includes(t) ? '✓ ' : '+ '}{t}
            </button>
          ))}
        </div>
      </div>

      {/* Save bar */}
      <div style={{ padding: '12px 20px 18px', background: `linear-gradient(to top, ${T.bg} 70%, transparent)`, flexShrink: 0 }}>
        <button onClick={onSave} disabled={!rating} style={{ width: '100%', padding: '16px', background: rating ? c.accent : T.surface3, color: rating ? '#fff' : T.textMute, border: 'none', borderRadius: 14, fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, letterSpacing: -0.2, cursor: rating ? 'pointer' : 'not-allowed', boxShadow: rating ? 'inset 0 -3px 0 rgba(0,0,0,0.2)' : 'none', transition: 'background 160ms' }}>
          {rating ? 'Lock it in' : 'Rate to save'}
        </button>
      </div>
    </div>
  );
}

// Step 3 — Saved
function StepSaved({ cat, pick, rating, onClose }) {
  if (!cat || !pick) return null;
  const c = CATS[cat];
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, gap: 24, textAlign: 'center' }}>
      <div style={{ width: 96, height: 96, borderRadius: 48, background: c.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 0 14px ${c.soft}`, animation: 'troveCheck 380ms cubic-bezier(.2,.7,.3,1) both' }}>
        <Icon name="check" size={48} color="#fff" />
      </div>
      <div>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 800, fontSize: 30, color: T.text, letterSpacing: -0.8, lineHeight: 1.1, fontVariationSettings: '"wdth" 85' }}>Locked in.</div>
        <div style={{ fontFamily: '"Geist"', fontSize: 14, color: T.textDim, marginTop: 8, lineHeight: 1.5 }}>
          <strong style={{ color: T.text }}>{pick.title}</strong> joined your trove.<br/>{rating}★ · keep it going.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, width: '100%', maxWidth: 320 }}>
        <button onClick={onClose} style={{ flex: 1, padding: '14px', background: T.surface, color: T.text, border: `1px solid ${T.borderS}`, borderRadius: 14, fontFamily: '"Geist"', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Done</button>
        <button onClick={onClose} style={{ flex: 1, padding: '14px', background: c.accent, color: '#fff', border: 'none', borderRadius: 14, fontFamily: '"Geist"', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>Add another</button>
      </div>
    </div>
  );
}

window.QuickAddFlow = QuickAddFlow;
