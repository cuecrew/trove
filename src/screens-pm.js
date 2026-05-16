// PM round 2 — new product surfaces.
//
// Ships:
//   MemoryCard       — daily "on this day" home module
//   ListsHubScreen   — collections / lists entry
//   ListDetailScreen — one curated list
//   SmartCaptureScreen — camera OCR / quick scan
//   WidgetsArtboard  — iOS lock screen with 3 widget sizes
//   ShareCardItem    — square per-item social card
//   ShareCardWrapped — year-in-review social card

// ═══════════════════════════════════════════════════════════════════════
// MEMORY · "On this day" home module
// Renders inside HomeFeedDiary above the hero.
// ═══════════════════════════════════════════════════════════════════════
function MemoryCard({ item, yearsAgo = 1, onClick }) {
  const cat = CATS[item.cat];
  return (
    <div onClick={onClick} style={{
      margin: '0 20px 22px', padding: 14,
      background: T.surface, borderRadius: 18,
      border: `1px solid ${T.borderS}`,
      display: 'flex', alignItems: 'center', gap: 14,
      cursor: 'pointer', position: 'relative', overflow: 'hidden',
    }}>
      {/* tiny corner badge — small calendar mark */}
      <span style={{
        position: 'absolute', top: 0, right: 0,
        width: 92, height: 92, borderTopRightRadius: 18,
        background: `radial-gradient(120% 120% at 100% 0%, ${cat.soft} 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      <Cover item={item} width={60} height={82} radius={8} monoLabel={false} />
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700,
          color: cat.accent, letterSpacing: 1.1, textTransform: 'uppercase',
          display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
        }}>
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="1" y="2.5" width="9" height="7.5" rx="1"/>
            <path d="M3 1v2.5M8 1v2.5M1 5h9"/>
          </svg>
          {yearsAgo} year{yearsAgo === 1 ? '' : 's'} ago today
        </div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17,
          color: T.text, letterSpacing: -0.3, lineHeight: 1.15,
        }}>
          You watched <span style={{ color: cat.accent }}>{item.title}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <Stars value={item.rating} size={12} />
          <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim }}>
            · still a {item.rating >= 4.5 ? 'banger' : 'good time'}
          </span>
        </div>
      </div>
      <button style={{
        background: T.surface3, color: T.text, border: 'none',
        padding: '8px 12px', borderRadius: 999, cursor: 'pointer',
        fontFamily: '"Geist"', fontSize: 12, fontWeight: 600,
        flexShrink: 0,
      }}>Re-log →</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// LISTS · hub
// User-curated collections (think Letterboxd lists or Spotify playlists).
// ═══════════════════════════════════════════════════════════════════════
const SAMPLE_LISTS = [
  {
    id: 'l-summer24', title: 'Summer in Lisbon, 2024',
    sub: '12 items · 3 categories',
    covers: [SAMPLE.travel[1], SAMPLE.books[1], SAMPLE.movies[2], SAMPLE.food[1]],
    accent: CATS.travel.accent,
    description: 'A week in the city. Books read on planes, dinners, two cinemas.',
  },
  {
    id: 'l-cried', title: 'Movies that broke me',
    sub: '8 movies', covers: [SAMPLE.movies[1], SAMPLE.movies[2], SAMPLE.movies[3]],
    accent: CATS.movies.accent,
  },
  {
    id: 'l-tokyo', title: 'Eat in Tokyo, next trip',
    sub: '14 restaurants', covers: [SAMPLE.food[0], SAMPLE.food[1]],
    accent: CATS.food.accent,
  },
  {
    id: 'l-30', title: 'Books to read before 30',
    sub: '32 books · 18 read', covers: [SAMPLE.books[0], SAMPLE.books[1], SAMPLE.books[2]],
    accent: CATS.books.accent,
  },
  {
    id: 'l-loop', title: 'Comfort rewatches',
    sub: '9 movies · played 47 times', covers: [SAMPLE.movies[5], SAMPLE.movies[0]],
    accent: CATS.movies.accent,
  },
];

function ListsHubScreen({ onBack, onList, onAdd }) {
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ padding: '4px 16px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={onBack} style={{
          width: 38, height: 38, borderRadius: 19, background: T.surface,
          border: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="back" size={18} color={T.text} />
        </button>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 26, color: T.text,
          letterSpacing: -0.7, fontVariationSettings: '"wdth" 85',
        }}>Lists</div>
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '8px 14px', borderRadius: 999, background: T.surface,
          border: `1px solid ${T.borderS}`, color: T.text,
          fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <Icon name="plus" size={14} color={T.text} /> New list
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 110px' }}>
        {/* featured list — bigger card */}
        <div style={{ marginBottom: 18 }}>
          <ListBigCard list={SAMPLE_LISTS[0]} onClick={() => onList && onList(SAMPLE_LISTS[0])} />
        </div>

        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
          letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10,
        }}>Your lists · 5</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SAMPLE_LISTS.slice(1).map(l => (
            <ListRow key={l.id} list={l} onClick={() => onList && onList(l)} />
          ))}
        </div>

        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
          letterSpacing: 1.1, textTransform: 'uppercase', marginTop: 24, marginBottom: 10,
        }}>From the community</div>
        <div style={{
          padding: 14, borderRadius: 16, background: T.surface,
          border: `1px solid ${T.borderS}`, display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: T.brand,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="bookmark" size={20} color="#0E0B09" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15, color: T.text }}>
              Best films of 2025 (so far)
            </div>
            <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 2 }}>
              Curated · 42 saves
            </div>
          </div>
          <Icon name="back" size={14} color={T.textMute} style={{ transform: 'rotate(180deg)' }} />
        </div>
      </div>
      <TabBar active="shelves" onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

function ListBigCard({ list, onClick }) {
  return (
    <div onClick={onClick} style={{
      background: T.surface, borderRadius: 20, overflow: 'hidden',
      border: `1px solid ${T.borderS}`, cursor: 'pointer',
    }}>
      {/* fanned covers */}
      <div style={{
        height: 168, position: 'relative',
        background: `linear-gradient(135deg, ${list.accent}33 0%, ${T.bg} 80%)`,
        overflow: 'hidden',
      }}>
        {list.covers.slice(0, 4).map((c, i) => (
          <div key={i} style={{
            position: 'absolute', top: 22,
            left: 24 + i * 64,
            transform: `rotate(${(i - 1.5) * 5}deg)`,
            boxShadow: '0 6px 18px rgba(0,0,0,0.4)',
            borderRadius: 8,
            zIndex: 4 - i,
          }}>
            <Cover item={c} width={88} height={120} radius={8} monoLabel={false} />
          </div>
        ))}
      </div>
      <div style={{ padding: '14px 16px' }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: list.accent,
          letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 4,
        }}>Recently active</div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 22, color: T.text,
          letterSpacing: -0.6, lineHeight: 1.1, fontVariationSettings: '"wdth" 85',
        }}>{list.title}</div>
        <div style={{
          fontFamily: '"Geist"', fontSize: 13, color: T.textDim, marginTop: 4,
          lineHeight: 1.4,
        }}>{list.description || list.sub}</div>
      </div>
    </div>
  );
}

function ListRow({ list, onClick }) {
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 10, background: T.surface, borderRadius: 14,
      border: `1px solid ${T.borderS}`, cursor: 'pointer',
    }}>
      {/* stacked-covers preview */}
      <div style={{ width: 68, height: 64, position: 'relative', flexShrink: 0 }}>
        {list.covers.slice(0, 3).map((c, i) => (
          <div key={i} style={{
            position: 'absolute', top: 8 - i * 3, left: i * 12,
            boxShadow: '0 3px 8px rgba(0,0,0,0.4)',
          }}>
            <Cover item={c} width={42} height={56} radius={5} monoLabel={false} />
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 16,
          color: T.text, letterSpacing: -0.2, lineHeight: 1.2,
          textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}>{list.title}</div>
        <div style={{
          fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 3,
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: list.accent }} />
          {list.sub}
        </div>
      </div>
      <Icon name="back" size={14} color={T.textMute} style={{ transform: 'rotate(180deg)' }} />
    </div>
  );
}

function ListDetailScreen({ list = SAMPLE_LISTS[0], onBack, onAdd }) {
  // Synthesize an item list from movies + travel + books for the demo
  const items = [SAMPLE.travel[1], SAMPLE.books[1], SAMPLE.movies[2], SAMPLE.food[1], SAMPLE.movies[3], SAMPLE.books[2]];
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      {/* Hero — color wash + fanned covers */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(180deg, ${list.accent}44 0%, ${list.accent}00 100%)`,
        paddingBottom: 18,
      }}>
        <div style={{ padding: '4px 16px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={onBack} style={{
            width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)',
            border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(12px)',
          }}>
            <Icon name="back" size={18} color={T.text} />
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={T.text} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M11 3l2 2-7 7-3 1 1-3 7-7z"/></svg>
            </button>
            <button style={{ width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.3)', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={T.text} strokeWidth="1.7" strokeLinecap="round"><path d="M5 8l3 3 6-7M1 9l4 4"/></svg>
            </button>
          </div>
        </div>
        <div style={{ height: 110, position: 'relative', marginBottom: 8 }}>
          {list.covers.slice(0, 4).map((c, i) => (
            <div key={i} style={{
              position: 'absolute', top: 0,
              left: '50%',
              transform: `translateX(${(i - 1.5) * 56}px) rotate(${(i - 1.5) * 6}deg)`,
              boxShadow: '0 8px 22px rgba(0,0,0,0.5)',
              borderRadius: 8, zIndex: i === 1 || i === 2 ? 3 : 2,
            }}>
              <Cover item={c} width={74} height={102} radius={8} monoLabel={false} />
            </div>
          ))}
        </div>
        <div style={{ padding: '0 24px', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 28, color: T.text,
            letterSpacing: -0.8, lineHeight: 1, fontVariationSettings: '"wdth" 85',
          }}>{list.title}</div>
          <div style={{ fontFamily: '"Geist"', fontSize: 13, color: T.textDim, marginTop: 6 }}>
            {list.sub} · curated by you · private
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '6px 16px 110px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map((it, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: 10, borderRadius: 12, background: T.surface,
              border: `1px solid ${T.borderS}`,
            }}>
              <span style={{
                fontFamily: '"Geist"', fontSize: 12, color: T.textMute,
                width: 18, textAlign: 'center', flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>{i + 1}</span>
              <Cover item={it} width={42} height={58} radius={6} monoLabel={false} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontFamily: '"Geist"', fontSize: 14, fontWeight: 600, color: T.text, lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {it.title}
                </div>
                <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Stars value={it.rating} size={11} />
                  <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim }}>· {it.sub}</span>
                </div>
              </div>
              <Icon name="more" size={16} color={T.textMute} />
            </div>
          ))}
          <button style={{
            padding: '14px', background: 'transparent', cursor: 'pointer',
            border: `1.5px dashed ${T.border}`, borderRadius: 12,
            fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, color: T.textDim,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <Icon name="plus" size={14} color={T.textDim} /> Add to this list
          </button>
        </div>
      </div>
      <TabBar active="shelves" onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SMART CAPTURE · camera with live recognition
// Removes the search-and-tap friction. Reachable from Quick-add as an
// alternate entry (camera button in the corner of the category picker).
// ═══════════════════════════════════════════════════════════════════════
function SmartCaptureScreen({ onCancel, onConfirm }) {
  const [scanned, setScanned] = React.useState(false);

  React.useEffect(() => {
    const t = setTimeout(() => setScanned(true), 1600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      height: '100%', background: '#0A0805', display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
    }}>
      <StatusBar />
      {/* fake camera view — striped placeholder representing "what the camera sees" */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(60% 50% at 50% 38%, #2a2018 0%, #0a0805 70%),
          repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 16px, transparent 16px 32px)
        `,
      }} />

      {/* viewfinder corners */}
      <div style={{
        position: 'absolute', left: 32, right: 32, top: 110, bottom: 240,
        pointerEvents: 'none',
      }}>
        {['tl','tr','bl','br'].map(corner => (
          <span key={corner} style={{
            position: 'absolute',
            top:    corner.startsWith('t') ? 0 : 'auto',
            bottom: corner.startsWith('b') ? 0 : 'auto',
            left:   corner.endsWith('l')   ? 0 : 'auto',
            right:  corner.endsWith('r')   ? 0 : 'auto',
            width: 32, height: 32,
            borderTop:    corner.startsWith('t') ? `3px solid ${scanned ? CATS.movies.accent : '#fff'}` : 'none',
            borderBottom: corner.startsWith('b') ? `3px solid ${scanned ? CATS.movies.accent : '#fff'}` : 'none',
            borderLeft:   corner.endsWith('l')   ? `3px solid ${scanned ? CATS.movies.accent : '#fff'}` : 'none',
            borderRight:  corner.endsWith('r')   ? `3px solid ${scanned ? CATS.movies.accent : '#fff'}` : 'none',
            borderTopLeftRadius:     corner === 'tl' ? 14 : 0,
            borderTopRightRadius:    corner === 'tr' ? 14 : 0,
            borderBottomLeftRadius:  corner === 'bl' ? 14 : 0,
            borderBottomRightRadius: corner === 'br' ? 14 : 0,
            transition: 'border-color 220ms',
          }} />
        ))}
        {/* scanning sweep — only before scan */}
        {!scanned && (
          <span style={{
            position: 'absolute', left: 6, right: 6, top: '40%',
            height: 2, background: `linear-gradient(90deg, transparent, #fff, transparent)`,
            animation: 'troveScan 1.4s ease-in-out infinite',
            opacity: 0.7,
          }} />
        )}
      </div>
      <style>{`@keyframes troveScan { 0%{transform:translateY(-40px)} 50%{transform:translateY(40px)} 100%{transform:translateY(-40px)} }`}</style>

      {/* faux movie poster center — appears when "scanned" */}
      {scanned && (
        <div style={{
          position: 'absolute', left: '50%', top: 150,
          transform: 'translateX(-50%)',
          width: 140, height: 210, borderRadius: 10, overflow: 'hidden',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          animation: 'troveSnap 280ms cubic-bezier(.2,.7,.3,1) both',
        }}>
          <Cover item={SAMPLE.movies[2]} width={140} height={210} radius={10} monoLabel={false} />
        </div>
      )}
      <style>{`@keyframes troveSnap { from{opacity:0;transform:translateX(-50%) scale(.96)} to{opacity:1;transform:translateX(-50%) scale(1)} }`}</style>

      {/* Top header */}
      <div style={{
        position: 'relative', zIndex: 2, padding: '4px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <button onClick={onCancel} style={{
          width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.45)',
          border: `1px solid rgba(255,255,255,0.1)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(14px)',
        }}>
          <span style={{ color: '#fff', fontSize: 18, lineHeight: 1 }}>×</span>
        </button>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, color: '#fff' }}>
            Scan to log
          </div>
        </div>
        <button style={{
          width: 38, height: 38, borderRadius: 19, background: 'rgba(0,0,0,0.45)',
          border: `1px solid rgba(255,255,255,0.1)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 8a5 5 0 0010 0M3 8h2M3 8v-2M13 8h-2M13 8v2M5 5l-2 1M11 11l2-1"/>
          </svg>
        </button>
      </div>

      {/* Result strip OR helper text */}
      <div style={{ flex: 1 }} />
      <div style={{
        position: 'relative', zIndex: 2, padding: '0 20px 24px',
      }}>
        {scanned ? (
          <div style={{
            background: 'rgba(20,15,12,0.9)',
            backdropFilter: 'blur(20px)',
            borderRadius: 18, padding: 14,
            border: `1px solid ${T.borderS}`,
            display: 'flex', alignItems: 'center', gap: 14,
            animation: 'troveSlideUp 320ms cubic-bezier(.2,.7,.3,1) both',
          }}>
            <div style={{
              width: 38, height: 38, borderRadius: 10,
              background: CATS.movies.soft, color: CATS.movies.accent,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <Icon name="movies" size={20} color={CATS.movies.accent} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: CATS.movies.accent, textTransform: 'uppercase', letterSpacing: 1.1 }}>
                Recognized · 97%
              </div>
              <div style={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 16, color: T.text, marginTop: 2, letterSpacing: -0.3 }}>
                {SAMPLE.movies[2].title}
              </div>
              <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 2 }}>
                {SAMPLE.movies[2].sub} · {SAMPLE.movies[2].year}
              </div>
            </div>
            <button onClick={onConfirm} style={{
              padding: '10px 14px', background: CATS.movies.accent,
              color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer',
              fontFamily: '"Geist"', fontSize: 13, fontWeight: 700,
              flexShrink: 0,
            }}>Log it</button>
          </div>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 18,
              color: '#fff', letterSpacing: -0.3,
            }}>Point at anything.</div>
            <div style={{ fontFamily: '"Geist"', fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 6 }}>
              Posters, book covers, menus, tickets — we'll figure it out.
            </div>
          </div>
        )}
        <style>{`@keyframes troveSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }`}</style>

        {/* mode selector */}
        <div style={{
          display: 'flex', gap: 6, justifyContent: 'center', marginTop: 18,
        }}>
          {[
            { k: 'scan', label: 'Scan' },
            { k: 'photo', label: 'Photo' },
            { k: 'ticket', label: 'Ticket' },
            { k: 'menu', label: 'Menu' },
          ].map((m, i) => (
            <button key={m.k} style={{
              padding: '7px 14px', borderRadius: 999,
              background: i === 0 ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.45)',
              color: i === 0 ? '#0E0B09' : '#fff',
              border: 'none', backdropFilter: 'blur(14px)',
              fontFamily: '"Geist"', fontSize: 12, fontWeight: 600,
            }}>{m.label}</button>
          ))}
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// WIDGETS · iOS lock/home screen with 3 widget sizes
// Shows the cheapest retention surface — passive home screen presence.
// ═══════════════════════════════════════════════════════════════════════
function WidgetsArtboard() {
  // simulated iOS wallpaper — warm gradient
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: `
        radial-gradient(120% 80% at 30% 10%, #5a3210 0%, transparent 60%),
        radial-gradient(100% 80% at 80% 70%, #1a3340 0%, transparent 65%),
        linear-gradient(180deg, #0e0b09 0%, #1f1714 100%)
      `,
    }}>
      <StatusBar />
      {/* time / date */}
      <div style={{ padding: '24px 24px 6px', textAlign: 'left' }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 14, fontWeight: 600,
          color: 'rgba(255,255,255,0.7)', letterSpacing: 0.2,
        }}>FRIDAY, MAY 16</div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 200, fontSize: 84,
          color: '#fff', lineHeight: 1, letterSpacing: -3,
          fontVariationSettings: '"wdth" 90',
        }}>9:41</div>
      </div>

      {/* Widget grid */}
      <div style={{ padding: '14px 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* large widget */}
        <WidgetLarge />
        {/* row of small + medium */}
        <div style={{ display: 'flex', gap: 12 }}>
          <WidgetSmall />
          <WidgetMedium />
        </div>
        {/* a couple of app icons row to ground the screen */}
        <div style={{ display: 'flex', gap: 16, marginTop: 12, paddingLeft: 8 }}>
          {[T.brand, '#1c8edb', '#34c77a', '#e8488a'].map((c, i) => (
            <div key={i} style={{
              width: 58, height: 58, borderRadius: 14, background: c,
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }} />
          ))}
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function WidgetShell({ children, w, h, style }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: 22, overflow: 'hidden',
      background: T.surface, border: `0.5px solid rgba(255,255,255,0.06)`,
      boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
      padding: 14, display: 'flex', flexDirection: 'column',
      ...style,
    }}>{children}</div>
  );
}

function WidgetSmall() {
  // streak square — 154×154 in iOS spec; here 158×158 inside the 354 grid
  return (
    <WidgetShell w={158} h={158} style={{ background: 'linear-gradient(135deg, #1B1613 0%, #2D1F12 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Icon name="flame" size={14} color={T.brand} />
        <span style={{
          fontFamily: '"Geist"', fontSize: 10, fontWeight: 700, color: T.brand,
          letterSpacing: 1, textTransform: 'uppercase',
        }}>Streak</span>
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <span style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 68, color: T.text,
          lineHeight: 1, letterSpacing: -2, fontVariantNumeric: 'tabular-nums',
          fontVariationSettings: '"wdth" 75',
        }}>12</span>
      </div>
      <div style={{
        fontFamily: '"Geist"', fontSize: 11, fontWeight: 600, color: T.textDim, lineHeight: 1.3,
      }}>days · don't break it</div>
    </WidgetShell>
  );
}

function WidgetMedium() {
  // last logged — same height as small, ~190px wide
  const it = SAMPLE.movies[0];
  return (
    <WidgetShell w={172} h={158}>
      <div style={{ display: 'flex', gap: 10, height: '100%' }}>
        <Cover item={it} width={62} height={88} radius={6} monoLabel={false} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <div style={{
            fontFamily: '"Geist"', fontSize: 9, fontWeight: 700, color: CATS.movies.accent,
            letterSpacing: 1, textTransform: 'uppercase',
          }}>Last logged</div>
          <div style={{
            fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 13, color: T.text,
            lineHeight: 1.15, marginTop: 4, letterSpacing: -0.2,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{it.title}</div>
          <div style={{ marginTop: 4 }}>
            <Stars value={it.rating} size={9} />
          </div>
          <div style={{ flex: 1 }} />
          <button style={{
            padding: '5px 0', background: T.brand, color: '#0E0B09',
            border: 'none', borderRadius: 8, cursor: 'pointer',
            fontFamily: '"Geist"', fontSize: 10, fontWeight: 700,
          }}>+ Log tonight</button>
        </div>
      </div>
    </WidgetShell>
  );
}

function WidgetLarge() {
  // heatmap + last 3 rows. 354 × 174 (approx)
  const heat = [];
  for (let w = 0; w < 14; w++) {
    const col = [];
    for (let d = 0; d < 7; d++) {
      const x = (Math.sin((w + 1) * 12.9898 + (d + 1) * 78.233) * 43758.5453) % 1;
      const v = Math.abs(x);
      col.push(v < 0.42 ? 0 : v < 0.62 ? 1 : v < 0.82 ? 2 : v < 0.94 ? 3 : 4);
    }
    heat.push(col);
  }
  return (
    <WidgetShell w={342} h={174} style={{ padding: 14 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TroveMark size={14} />
          <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim }}>· May</span>
        </div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 18, color: T.text,
          fontVariantNumeric: 'tabular-nums', letterSpacing: -0.4,
        }}>142 <span style={{ color: T.textDim, fontWeight: 500, fontSize: 12 }}>this year</span></div>
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 12, flex: 1 }}>
        <div style={{ display: 'flex', gap: 3 }}>
          {heat.map((col, w) => (
            <div key={w} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {col.map((v, d) => {
                const a = [0.05, 0.2, 0.45, 0.75, 1][v];
                return <div key={d} style={{ width: 8, height: 8, borderRadius: 1.5, background: v === 0 ? 'rgba(255,240,224,0.06)' : `rgba(244,178,60,${a})` }} />;
              })}
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[FEED[0], FEED[1], FEED[2]].map((it, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
              <span style={{ width: 5, height: 5, borderRadius: 3, background: CATS[it.cat].accent, flexShrink: 0 }} />
              <span style={{
                flex: 1, fontFamily: '"Geist"', fontSize: 11, color: T.text,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{it.title}</span>
              <Stars value={it.rating} size={8} />
            </div>
          ))}
        </div>
      </div>
    </WidgetShell>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// SHARE CARDS · per-item + Trove Wrapped (year-end)
// Square aspect for Instagram, plus a tall variant for stories.
// ═══════════════════════════════════════════════════════════════════════
function ShareCardItem({ item }) {
  const cat = CATS[item.cat];
  return (
    <div style={{
      width: '100%', height: '100%', background: T.bg, padding: 28,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', gap: 18,
    }}>
      {/* color wash background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(80% 60% at 20% 0%, ${cat.soft} 0%, transparent 60%),
          radial-gradient(80% 60% at 100% 100%, ${cat.soft} 0%, transparent 60%)
        `,
        pointerEvents: 'none',
      }} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <TroveMark size={18} />
        <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim, fontWeight: 600 }}>
          May 12, 2026
        </div>
      </div>

      <div style={{ display: 'flex', gap: 18, position: 'relative', alignItems: 'flex-end', flex: 1 }}>
        <div style={{ boxShadow: '0 12px 36px rgba(0,0,0,0.5)', borderRadius: 12, overflow: 'hidden' }}>
          <Cover item={item} width={140} height={206} radius={12} monoLabel={false} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <CatChip cat={item.cat} />
          <div style={{
            fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 28, color: T.text,
            letterSpacing: -0.8, lineHeight: 1, marginTop: 6,
            fontVariationSettings: '"wdth" 80',
          }}>{item.title}</div>
          <div style={{
            fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 4,
          }}>{item.sub}</div>
          <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
            <Stars value={item.rating} size={18} />
            <span style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 28, color: cat.accent,
              letterSpacing: -0.6, fontVariantNumeric: 'tabular-nums',
            }}>{item.rating}</span>
          </div>
        </div>
      </div>

      <div style={{
        background: T.surface, borderRadius: 14, padding: '14px 16px',
        border: `1px solid ${T.borderS}`, position: 'relative',
        fontFamily: '"Geist"', fontSize: 13, color: T.text, lineHeight: 1.5,
      }}>
        <span style={{ color: cat.accent, fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 22, position: 'absolute', top: 0, left: 8 }}>"</span>
        <div style={{ paddingLeft: 12 }}>
          {item.note || '"Long live the fighters." Felt like sitting inside a sandstorm.'}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
        <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute, letterSpacing: 0.3, textTransform: 'uppercase', fontWeight: 600 }}>
          @mira.k · trove.app
        </div>
        <div style={{
          padding: '6px 10px', background: T.brand, color: '#0E0B09',
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, borderRadius: 999,
        }}>day 142 of 365</div>
      </div>
    </div>
  );
}

function ShareCardWrapped() {
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: `
        radial-gradient(80% 60% at 30% 20%, #5a2818 0%, transparent 60%),
        radial-gradient(80% 60% at 100% 90%, #5a3812 0%, transparent 60%),
        linear-gradient(180deg, #0e0b09 0%, #1f1714 100%)
      `,
      padding: 28, color: '#fff',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <TroveMark size={18} color="#fff" />
        <div style={{ fontFamily: '"Geist"', fontSize: 11, color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
          @mira.k
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 12, fontWeight: 700,
          color: T.brand, letterSpacing: 1.2, textTransform: 'uppercase',
        }}>Mira's year, so far</div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 68, color: '#fff',
          lineHeight: 0.85, letterSpacing: -2.6, marginTop: 6,
          fontVariationSettings: '"wdth" 75',
        }}>
          142 things,<br/>
          <span style={{ color: T.brand }}>1 trove.</span>
        </div>
      </div>

      {/* stat grid */}
      <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {[
          { v: '38',  l: 'movies',  c: CATS.movies.accent },
          { v: '53',  l: 'meals',   c: CATS.food.accent },
          { v: '71h', l: 'watched', c: CATS.tv.accent },
          { v: '6',   l: 'cities',  c: CATS.travel.accent },
        ].map((s, i) => (
          <div key={i} style={{
            background: 'rgba(0,0,0,0.35)', borderRadius: 14, padding: '12px 14px',
            border: `0.5px solid rgba(255,255,255,0.06)`,
          }}>
            <div style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 30, color: s.c,
              lineHeight: 1, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums',
            }}>{s.v}</div>
            <div style={{ fontFamily: '"Geist"', fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 4 }}>
              {s.l}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ marginTop: 12 }}>
        <div style={{ fontFamily: '"Geist"', fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Most-loved
        </div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 20, color: '#fff',
          marginTop: 4, letterSpacing: -0.5,
        }}>
          Anatomy of a Fall <span style={{ color: T.brand, fontWeight: 800 }}>·  5★</span>
        </div>
      </div>

      <div style={{
        marginTop: 18, padding: '12px 14px',
        background: 'rgba(0,0,0,0.4)', borderRadius: 12,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: '"Geist"', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>
          Make your trove · trove.app
        </span>
        <span style={{
          padding: '6px 10px', background: T.brand, color: '#0E0B09',
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, borderRadius: 999,
        }}>Try free</span>
      </div>
    </div>
  );
}

Object.assign(window, {
  MemoryCard, ListsHubScreen, ListDetailScreen,
  SmartCaptureScreen, WidgetsArtboard,
  ShareCardItem, ShareCardWrapped,
});
