function Cover({ item, width, height, radius = 10, monoLabel = true }) {
  if (item && item.cover) {
    return (
      <div style={{ width, height, borderRadius: radius, overflow: 'hidden', background: T.surface2, position: 'relative', flexShrink: 0, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}>
        <img src={item.cover} alt="" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          onError={(e) => { e.currentTarget.style.display = 'none'; }} />
      </div>
    );
  }
  const tone = (item && (item.placeholderTone || item.tone)) || 'pearl';
  const [a, b] = TONES[tone] || TONES.pearl;
  const cat = item && CATS[item.cat];
  return (
    <div style={{
      width, height, borderRadius: radius, overflow: 'hidden',
      background: `linear-gradient(150deg, ${a} 0%, ${b} 100%)`,
      position: 'relative', flexShrink: 0,
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
      display: 'flex', alignItems: 'flex-end',
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 12px, transparent 12px 24px)' }} />
      {cat && (
        <div style={{ position: 'absolute', top: 8, left: 8, width: 22, height: 22, borderRadius: 6, background: cat.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={item.cat} size={14} color="#fff" />
        </div>
      )}
      {monoLabel && item && item.title && (
        <div style={{ position: 'relative', padding: '8px 10px', width: '100%', fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace', fontSize: Math.max(9, Math.min(width, height) * 0.07), color: 'rgba(255,255,255,0.55)', letterSpacing: 0.4, textTransform: 'uppercase', lineHeight: 1.2 }}>{item.title}</div>
      )}
    </div>
  );
}

function Stars({ value = 0, size = 14, color, gap = 1.5 }) {
  const c = color || T.brand;
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = value >= i;
    const half = !filled && value >= i - 0.5;
    stars.push(
      <span key={i} style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
        <Icon name="starOutline" size={size} color={filled || half ? c : T.textMute} />
        {(filled || half) && (
          <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: filled ? '100%' : '50%' }}>
            <Icon name="star" size={size} color={c} />
          </span>
        )}
      </span>
    );
  }
  return <span style={{ display: 'inline-flex', gap, alignItems: 'center', lineHeight: 0 }}>{stars}</span>;
}

function StarPicker({ value, onChange, accent }) {
  const [hover, setHover] = React.useState(0);
  const display = hover || value || 0;
  return (
    <div onMouseLeave={() => setHover(0)} style={{ display: 'flex', gap: 6, justifyContent: 'center', userSelect: 'none' }}>
      {[1,2,3,4,5].map(i => {
        const filled = display >= i;
        const half = !filled && display >= i - 0.5;
        return (
          <div key={i}
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setHover((e.clientX - r.left) < r.width / 2 ? i - 0.5 : i); }}
            onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); onChange((e.clientX - r.left) < r.width / 2 ? i - 0.5 : i); }}
            onTouchEnd={(e) => { e.preventDefault(); const r = e.currentTarget.getBoundingClientRect(); const t = e.changedTouches[0]; onChange((t.clientX - r.left) < r.width / 2 ? i - 0.5 : i); }}
            style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
            <Icon name="starOutline" size={36} color={filled || half ? accent : 'rgba(255,255,255,0.18)'} />
            {(filled || half) && (
              <span style={{ position: 'absolute', inset: 0, overflow: 'hidden', width: filled ? '100%' : '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="star" size={36} color={accent} />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatusPill({ status, cat, size = 'sm' }) {
  if (!status) return null;
  const accent = CATS[cat] ? CATS[cat].accent : T.brand;
  const soft   = CATS[cat] ? CATS[cat].soft   : 'rgba(244,178,60,0.18)';
  const map = { watched:'Watched', watching:'Watching', want:'Wishlist', read:'Finished', reading:'Reading', played:'Finished', playing:'Playing', visited:'Been', tried:'Logged' };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: size === 'sm' ? '3px 8px' : '5px 12px', borderRadius: 999, background: soft, color: accent, fontFamily: '"Geist", system-ui', fontSize: size === 'sm' ? 11 : 13, fontWeight: 600, letterSpacing: 0.1 }}>
      <span style={{ width: 5, height: 5, borderRadius: 3, background: accent }} />
      {map[status] || status}
    </span>
  );
}

function CatChip({ cat, size = 12 }) {
  const c = CATS[cat];
  if (!c) return null;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: '"Geist", system-ui', fontSize: size, fontWeight: 600, color: c.accent, textTransform: 'uppercase', letterSpacing: 0.5 }}>
      <Icon name={cat} size={size + 2} color={c.accent} />
      {c.plural}
    </span>
  );
}

function TabBar({ active = 'home', onNav, onAdd }) {
  const tabs = [
    { key: 'home',    label: 'Diary',   icon: 'home' },
    { key: 'shelves', label: 'Shelves', icon: 'bookmark' },
    { key: 'add',     label: '',        icon: 'plus', fab: true },
    { key: 'search',  label: 'Search',  icon: 'search' },
    { key: 'me',      label: 'You',     icon: 'user' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, paddingBottom: 22, paddingTop: 8, background: 'linear-gradient(to top, rgba(14,11,9,0.96) 60%, rgba(14,11,9,0))', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', zIndex: 30 }}>
      {tabs.map(t => {
        if (t.fab) return (
          <button key={t.key} onClick={onAdd} style={{ width: 56, height: 56, borderRadius: 28, background: T.brand, border: 'none', cursor: 'pointer', boxShadow: `0 6px 20px rgba(244,178,60,0.4), inset 0 -3px 0 ${T.brandDeep}`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
            <Icon name="plus" size={26} color="#0E0B09" />
          </button>
        );
        const isActive = active === t.key;
        return (
          <button key={t.key} onClick={() => onNav && onNav(t.key)} style={{ flex: 1, background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: isActive ? T.text : T.textMute }}>
            <Icon name={t.icon} size={22} color={isActive ? T.text : T.textMute} />
            <span style={{ fontFamily: '"Geist", system-ui', fontSize: 10, fontWeight: 600, letterSpacing: 0.2 }}>{t.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function StatCard({ value, label, accent, sub, size = 'md', icon }) {
  const a = accent || T.brand;
  return (
    <div style={{ flex: 1, padding: size === 'lg' ? '20px 18px' : '14px 14px', background: T.surface, borderRadius: 18, border: `1px solid ${T.borderS}`, display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: a, fontFamily: '"Geist", system-ui', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.8 }}>
        {icon && <Icon name={icon} size={13} color={a} />}
        {label}
      </div>
      <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 800, fontSize: size === 'lg' ? 42 : 30, color: T.text, lineHeight: 1, letterSpacing: -1, fontVariantNumeric: 'tabular-nums', fontVariationSettings: '"wdth" 85' }}>{value}</div>
      {sub && <div style={{ fontFamily: '"Geist", system-ui', fontSize: 12, color: T.textDim }}>{sub}</div>}
    </div>
  );
}

function SectionHead({ kicker, title, action, color, onAction }) {
  return (
    <div style={{ padding: '0 20px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 12 }}>
      <div>
        {kicker && <div style={{ fontFamily: '"Geist", system-ui', fontSize: 11, fontWeight: 700, color: color || T.textDim, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 4 }}>{kicker}</div>}
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 700, fontSize: 22, color: T.text, lineHeight: 1.1, letterSpacing: -0.5 }}>{title}</div>
      </div>
      {action && <button onClick={onAction} style={{ background: 'transparent', border: 'none', color: T.textDim, fontFamily: '"Geist", system-ui', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>{action}</button>}
    </div>
  );
}

function StatusBar({ time }) {
  const now = new Date();
  const t = time || `${now.getHours()}:${String(now.getMinutes()).padStart(2,'0')}`;
  return (
    <div style={{ height: 54, padding: '15px 28px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontFamily: '-apple-system, system-ui', position: 'relative', zIndex: 20, flexShrink: 0 }}>
      <span style={{ fontSize: 16, fontWeight: 600, letterSpacing: -0.3 }}>{t}</span>
      <span style={{ width: 110 }} />
      <span style={{ display: 'inline-flex', gap: 5, alignItems: 'center' }}>
        <svg width="17" height="11" viewBox="0 0 17 11"><rect x="0" y="6" width="3" height="5" rx="0.5" fill="#fff"/><rect x="4.5" y="4" width="3" height="7" rx="0.5" fill="#fff"/><rect x="9" y="2" width="3" height="9" rx="0.5" fill="#fff"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="#fff"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11"><path d="M7.5 2.8a5.8 5.8 0 014.1 1.7l1-1a7.2 7.2 0 00-10.2 0l1 1A5.8 5.8 0 017.5 2.8zm0 3.2a2.6 2.6 0 011.8.75l1-1a4 4 0 00-5.6 0l1 1A2.6 2.6 0 017.5 6zm0 3.2a1 1 0 100 2 1 1 0 000-2z" fill="#fff"/></svg>
        <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="#fff" strokeOpacity=".5"/><rect x="2" y="2" width="18" height="8" rx="1.6" fill="#fff"/><path d="M23 4v4c.7-.2 1.2-1 1.2-2s-.5-1.8-1.2-2z" fill="#fff" fillOpacity=".5"/></svg>
      </span>
    </div>
  );
}

function HomeIndicator() {
  return (
    <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 139, height: 5, borderRadius: 100, background: 'rgba(255,255,255,0.25)', zIndex: 100, pointerEvents: 'none' }} />
  );
}

function DiaryRow({ item, onClick }) {
  const cat = CATS[item.cat];
  const verbMap = { movies: 'watched', tv: 'watching', books: 'reading', games: 'playing', travel: 'visited', food: 'logged', drinks: 'tried' };
  return (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: T.surface, borderRadius: 14, border: `1px solid ${T.borderS}`, cursor: 'pointer' }}>
      <Cover item={item} width={54} height={72} radius={8} monoLabel={false} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <span style={{ width: 14, height: 14, borderRadius: 4, background: cat.accent, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={item.cat} size={9} color="#fff" />
          </span>
          <span style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 600, color: cat.accent, textTransform: 'uppercase', letterSpacing: 0.6 }}>{verbMap[item.cat] || 'logged'}</span>
          <span style={{ marginLeft: 'auto', fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>{item.when}</span>
        </div>
        <div style={{ fontFamily: '"Bricolage Grotesque", system-ui', fontWeight: 600, fontSize: 16, color: T.text, lineHeight: 1.15, letterSpacing: -0.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{item.title}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 5 }}>
          <Stars value={item.rating} size={12} />
          <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</span>
        </div>
      </div>
    </div>
  );
}

window.Cover = Cover;
window.Stars = Stars;
window.StarPicker = StarPicker;
window.StatusPill = StatusPill;
window.CatChip = CatChip;
window.TabBar = TabBar;
window.StatCard = StatCard;
window.SectionHead = SectionHead;
window.StatusBar = StatusBar;
window.HomeIndicator = HomeIndicator;
window.DiaryRow = DiaryRow;
