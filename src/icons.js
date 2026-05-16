const ICONS = {
  movies: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M7 4v16M17 4v16M7 13l3 2-3 2M14 14h3"/></svg>,
  tv: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="5" width="19" height="13" rx="2"/><path d="M8 21l4-3 4 3M9 11l4 2-4 2z"/></svg>,
  books: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4.5C4 4 4.5 3.5 5 3.5h6.5v17H5c-.5 0-1-.5-1-1zM20 4.5C20 4 19.5 3.5 19 3.5h-6.5v17H19c.5 0 1-.5 1-1z"/></svg>,
  games: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14a3 3 0 013 3v3a3 3 0 01-3 3c-1.4 0-2.4-.9-3-2H8c-.6 1.1-1.6 2-3 2a3 3 0 01-3-3v-3a3 3 0 013-3z"/><path d="M7 11v3M5.5 12.5h3M15 12h.01M18 13.5h.01"/></svg>,
  travel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s7-7.5 7-13a7 7 0 10-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>,
  food: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18a8 8 0 01-8 8H11a8 8 0 01-8-8zM3 11c0-2 1-3 2-3M21 11c0-2-1-3-2-3M7 5c0-1 1-2 2-2M12 5c0-1 1-2 2-2M17 5c0-1 1-2 2-2M2 21h20"/></svg>,
  drinks: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l-2 9a4 4 0 01-4 3 4 4 0 01-4-3zM12 15v6M8 21h8"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>,
  home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11l9-7 9 7v9a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1z"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>,
  user: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M3 21c1.5-4.5 5-7 9-7s7.5 2.5 9 7"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.6l2.95 6.4 6.95.85-5.2 4.85 1.45 6.85L12 17.95l-6.15 3.6L7.3 14.7 2.1 9.85l6.95-.85z"/></svg>,
  starOutline: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><path d="M12 3.2l2.7 5.85 6.4.78-4.78 4.46 1.33 6.31L12 17.4l-5.65 3.2 1.33-6.31L2.9 9.83l6.4-.78z"/></svg>,
  back: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>,
  bookmark: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"><path d="M6 3h12v18l-6-4-6 4z"/></svg>,
  more: <svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18" cy="12" r="1.7"/></svg>,
  flame: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2 4 6 5 6 10a6 6 0 11-12 0c0-3 2-4 2-7 0 0 2 1 2 4 1-3 2-4 2-7z"/></svg>,
  grid: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="1" y="1" width="5" height="5"/><rect x="8" y="1" width="5" height="5"/><rect x="1" y="8" width="5" height="5"/><rect x="8" y="8" width="5" height="5"/></svg>,
  list: <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M2 3h10M2 7h10M2 11h10"/></svg>,
  chevron: <svg viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M1 1l5 5-5 5"/></svg>,
};

function Icon({ name, size = 22, color = 'currentColor', style }) {
  const el = ICONS[name];
  if (!el) return null;
  return (
    <span style={{ display: 'inline-flex', width: size, height: size, color, lineHeight: 0, flexShrink: 0, ...style }}>
      {React.cloneElement(el, { width: size, height: size })}
    </span>
  );
}

function TroveMark({ size = 28, color, accent }) {
  const c = color || T.text;
  const a = accent || T.brand;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.32, lineHeight: 1 }}>
      <span style={{
        width: size * 1.0, height: size * 0.92, borderRadius: size * 0.18,
        background: a, position: 'relative', display: 'inline-block',
        boxShadow: `inset 0 -${size * 0.12}px 0 rgba(0,0,0,0.18)`,
        flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', left: '18%', right: '18%', top: '38%',
          height: size * 0.1, borderRadius: size * 0.05, background: T.bg,
        }} />
      </span>
      <span style={{
        fontFamily: '"Bricolage Grotesque", system-ui',
        fontWeight: 800, fontSize: size, color: c,
        letterSpacing: -size * 0.04,
        fontVariationSettings: '"wdth" 75',
      }}>trove</span>
    </span>
  );
}

window.Icon = Icon;
window.TroveMark = TroveMark;
