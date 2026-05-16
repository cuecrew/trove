// Polish round 3 — retention hooks & home refinements.
//
// What's here:
//   getGreeting()           — time-of-day greeting helper
//   DailyPromptCard         — one-tap "what did you do tonight" prompt
//   GoalsStrip              — inline yearly-goal progress (home)
//   GoalsScreen             — full goals/challenges page
//   AchievementUnlocked     — celebratory milestone overlay
//   FriendsGlanceCard       — small social-proof module (home)
//   FriendsActivityScreen   — full friends list
//   NightlyNudgeArtboard    — lock screen notification mockup
//   PolishedHomeFeed        — refined home that uses everything above
//
// All loaded after the other Trove scripts; exposes components on window.

// ─── Greeting helper ────────────────────────────────────────────────────
function getGreeting(hour = new Date().getHours(), name = 'Mira') {
  if (hour >= 5  && hour < 12) return { label: 'Morning',     line: `Morning, ${name}` };
  if (hour >= 12 && hour < 17) return { label: 'Afternoon',   line: `Afternoon, ${name}` };
  if (hour >= 17 && hour < 22) return { label: 'Evening',     line: `Evening, ${name}` };
  return                              { label: 'Late night',  line: `Late, ${name}` };
}

// ═══════════════════════════════════════════════════════════════════════
// DAILY PROMPT CARD — the most important retention hook.
// Asks one question, offers one-tap entries. Reduces cold-start friction.
// ═══════════════════════════════════════════════════════════════════════
function DailyPromptCard({ onPick, onSkip }) {
  const suggestions = [
    { cat: 'movies', label: 'A movie' },
    { cat: 'food',   label: 'A meal'  },
    { cat: 'books',  label: 'Read a bit' },
    { cat: 'tv',     label: 'An episode' },
  ];
  return (
    <div style={{
      margin: '0 20px 20px', padding: '16px 16px 14px',
      background: `linear-gradient(135deg, ${T.surface} 0%, ${T.surface2} 100%)`,
      borderRadius: 18, border: `1px solid ${T.borderS}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <span style={{
        position: 'absolute', top: -30, right: -30, width: 140, height: 140,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, rgba(244,178,60,0.18), transparent 60%)`,
        pointerEvents: 'none',
      }} />
      <div style={{
        fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.brand,
        textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 6,
        display: 'inline-flex', alignItems: 'center', gap: 6,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: 3, background: T.brand, boxShadow: `0 0 0 4px rgba(244,178,60,0.22)` }} />
        Tonight's diary
      </div>
      <div style={{
        fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 22,
        color: T.text, letterSpacing: -0.5, lineHeight: 1.15,
        fontVariationSettings: '"wdth" 85',
      }}>
        What stuck with you today?
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
        {suggestions.map(s => {
          const c = CATS[s.cat];
          return (
            <button key={s.cat} onClick={() => onPick && onPick(s.cat)} style={{
              padding: '8px 12px', borderRadius: 999, cursor: 'pointer',
              border: `1px solid ${T.borderS}`,
              background: T.surface3, color: T.text,
              fontFamily: '"Geist"', fontSize: 12, fontWeight: 600,
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <Icon name={s.cat} size={13} color={c.accent} />
              {s.label}
            </button>
          );
        })}
        <button onClick={onSkip} style={{
          marginLeft: 'auto', padding: '8px 10px', borderRadius: 999,
          border: 'none', background: 'transparent', cursor: 'pointer',
          color: T.textMute, fontFamily: '"Geist"', fontSize: 12, fontWeight: 600,
        }}>Not tonight</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// GOALS · inline strip (home) + full screen
// Yearly category challenges. Progress is visible and finishable.
// ═══════════════════════════════════════════════════════════════════════
const SAMPLE_GOALS = [
  { cat: 'movies', target: 50, current: 38 },
  { cat: 'books',  target: 24, current: 14 },
  { cat: 'travel', target: 12, current: 6  },
  { cat: 'tv',     target: 30, current: 22 },
];

function GoalRing({ pct, color, size = 56, stroke = 5, label, sub }) {
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const off = C * (1 - Math.min(1, pct));
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,240,224,0.08)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color}
          strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={C} strokeDashoffset={off}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(.2,.7,.3,1)' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <span style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 800,
          fontSize: size * 0.32, color: T.text, lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}>{Math.round(pct * 100)}</span>
        {sub && <span style={{
          fontFamily: '"Geist"', fontSize: size * 0.13, color: T.textMute,
          marginTop: 1, letterSpacing: 0.4,
        }}>{sub}</span>}
      </div>
    </div>
  );
}

function GoalsStrip({ onOpen }) {
  return (
    <div onClick={onOpen} style={{
      margin: '0 20px 20px', padding: '14px 16px',
      background: T.surface, borderRadius: 18,
      border: `1px solid ${T.borderS}`, cursor: 'pointer',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 22, height: 22, borderRadius: 6, background: T.brand,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="#0E0B09" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="6" cy="6" r="4.5"/><circle cx="6" cy="6" r="2"/><circle cx="6" cy="6" r="0.4" fill="#0E0B09"/>
            </svg>
          </span>
          <span style={{
            fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.text,
            textTransform: 'uppercase', letterSpacing: 1.1,
          }}>2026 goals</span>
        </div>
        <span style={{
          fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, color: T.textDim,
        }}>76% · on track</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        {SAMPLE_GOALS.map(g => {
          const c = CATS[g.cat];
          return (
            <div key={g.cat} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1, minWidth: 0 }}>
              <GoalRing pct={g.current / g.target} color={c.accent} size={50} stroke={4} />
              <div style={{ textAlign: 'center', lineHeight: 1.1 }}>
                <div style={{
                  fontFamily: '"Geist"', fontSize: 12, fontWeight: 700, color: T.text,
                  fontVariantNumeric: 'tabular-nums',
                }}>{g.current}<span style={{ color: T.textMute }}>/{g.target}</span></div>
                <div style={{ fontFamily: '"Geist"', fontSize: 10, fontWeight: 600, color: T.textDim, textTransform: 'uppercase', letterSpacing: 0.4, marginTop: 2 }}>{c.plural}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function GoalsScreen({ onBack }) {
  // 4 main goals + 2 "stretch" suggestions
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
        }}>Goals</div>
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '8px 12px', borderRadius: 999, background: T.surface,
          border: `1px solid ${T.borderS}`, color: T.text,
          fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, cursor: 'pointer',
        }}>2026</button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 110px' }}>
        {/* Hero summary */}
        <div style={{
          marginBottom: 18, padding: '20px 18px',
          background: `linear-gradient(135deg, rgba(244,178,60,0.18) 0%, ${T.surface} 60%)`,
          borderRadius: 20, border: `1px solid ${T.borderS}`,
          display: 'flex', alignItems: 'center', gap: 18,
        }}>
          <GoalRing pct={0.76} color={T.brand} size={84} stroke={7} sub="of plan" />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: '"Geist"', fontSize: 11, fontWeight: 700,
              color: T.brand, letterSpacing: 1.2, textTransform: 'uppercase',
            }}>Year in motion</div>
            <div style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 26,
              color: T.text, letterSpacing: -0.7, lineHeight: 1.05, marginTop: 4,
              fontVariationSettings: '"wdth" 85',
            }}>80 of 116, done.</div>
            <div style={{
              fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 4, lineHeight: 1.4,
            }}>You're <span style={{ color: T.green }}>4 ahead</span> of pace — nice work.</div>
          </div>
        </div>

        {/* Big per-category cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SAMPLE_GOALS.map(g => {
            const c = CATS[g.cat];
            const pct = g.current / g.target;
            return (
              <div key={g.cat} style={{
                padding: 14, background: T.surface, borderRadius: 16,
                border: `1px solid ${T.borderS}`,
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 12,
                  background: c.soft, color: c.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={g.cat} size={22} color={c.accent} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{
                      fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 16,
                      color: T.text, letterSpacing: -0.2,
                    }}>{c.plural}</span>
                    <span style={{
                      fontFamily: '"Geist"', fontSize: 13, color: T.text, fontVariantNumeric: 'tabular-nums', fontWeight: 600,
                    }}>{g.current} <span style={{ color: T.textMute }}>/ {g.target}</span></span>
                  </div>
                  <div style={{
                    height: 6, borderRadius: 3, background: 'rgba(255,240,224,0.06)', overflow: 'hidden',
                  }}>
                    <div style={{
                      width: `${pct * 100}%`, height: '100%',
                      background: `linear-gradient(90deg, ${c.accent}99, ${c.accent})`,
                      transition: 'width 600ms cubic-bezier(.2,.7,.3,1)',
                    }} />
                  </div>
                  <div style={{
                    fontFamily: '"Geist"', fontSize: 11, color: T.textDim, marginTop: 6,
                  }}>
                    {Math.round(pct * 100)}% · {g.target - g.current} to go · ~{Math.ceil((g.target - g.current) / 2.5)} weeks at this pace
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Suggested */}
        <div style={{
          marginTop: 22, padding: 14,
          background: 'transparent', border: `1.5px dashed ${T.border}`,
          borderRadius: 16,
        }}>
          <div style={{
            fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
            textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 8,
          }}>Try a stretch goal</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SuggestRow icon="food"   label="Try 30 new restaurants"   tag="+ new for you" />
            <SuggestRow icon="games"  label="Finish 6 games this year"  tag="2 in progress" />
          </div>
        </div>

        {/* Last year — finished */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
            textTransform: 'uppercase', letterSpacing: 1.1, marginBottom: 10,
          }}>2025 · done</div>
          <div style={{
            display: 'flex', gap: 8, padding: 12, background: T.surface, borderRadius: 14,
            border: `1px solid ${T.borderS}`, alignItems: 'center',
          }}>
            <span style={{
              width: 32, height: 32, borderRadius: 8,
              background: T.brand, color: '#0E0B09',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 16,
            }}>✓</span>
            <span style={{ flex: 1, fontFamily: '"Geist"', fontSize: 13, color: T.text }}>
              Hit all 4 goals · read 26 books
            </span>
            <span style={{
              fontFamily: '"Geist"', fontSize: 11, fontWeight: 600, color: T.textDim,
            }}>View →</span>
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function SuggestRow({ icon, label, tag }) {
  return (
    <div style={{
      padding: '10px 12px', background: T.surface, borderRadius: 12,
      display: 'flex', alignItems: 'center', gap: 10,
    }}>
      <Icon name={icon} size={16} color={T.textDim} />
      <span style={{ flex: 1, fontFamily: '"Geist"', fontSize: 13, color: T.text }}>{label}</span>
      <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>{tag}</span>
      <span style={{
        width: 26, height: 26, borderRadius: 13, background: T.surface3,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: T.text,
      }}>+</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// ACHIEVEMENT UNLOCKED — milestone overlay
// Fires on 1st log, 10, 50, 100, 365-day streak, etc.
// ═══════════════════════════════════════════════════════════════════════
function AchievementUnlocked({
  title = '100 logged',
  sub  = 'Triple digits, Mira. That\u2019s a real year.',
  badge = '100',
  accent = T.brand,
  onDismiss,
  onShare,
}) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 80,
      background: 'rgba(8,6,4,0.85)',
      backdropFilter: 'blur(14px)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'achFade 320ms ease',
    }}>
      <style>{`
        @keyframes achFade { from{opacity:0} to{opacity:1} }
        @keyframes achBadge { from{opacity:0;transform:scale(.6)} to{opacity:1;transform:scale(1)} }
        @keyframes achPulse { 0%{transform:scale(1);opacity:.7} 100%{transform:scale(1.5);opacity:0} }
        @keyframes achRise { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes achRays { from{opacity:0;transform:rotate(0deg)} to{opacity:1;transform:rotate(20deg)} }
      `}</style>

      {/* Badge */}
      <div style={{
        position: 'relative', width: 200, height: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'achBadge 500ms cubic-bezier(.2,1.5,.4,1) both',
      }}>
        {/* rays */}
        <svg width="240" height="240" viewBox="-50 -50 200 200" style={{
          position: 'absolute', inset: 'auto', animation: 'achRays 700ms ease 200ms both',
          opacity: 0,
        }}>
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30) * Math.PI / 180;
            const x1 = Math.cos(angle) * 60, y1 = Math.sin(angle) * 60;
            const x2 = Math.cos(angle) * 90, y2 = Math.sin(angle) * 90;
            return <line key={i} x1={50 + x1} y1={50 + y1} x2={50 + x2} y2={50 + y2}
              stroke={accent} strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />;
          })}
        </svg>
        {/* pulse */}
        <span style={{
          position: 'absolute', width: 160, height: 160, borderRadius: 80,
          border: `2px solid ${accent}`, animation: 'achPulse 1600ms ease infinite',
        }} />
        {/* badge */}
        <div style={{
          width: 140, height: 140, borderRadius: 36,
          background: `linear-gradient(135deg, ${accent} 0%, #C8862A 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 18px 50px ${accent}66, inset 0 -6px 0 rgba(0,0,0,0.18)`,
          color: '#1a1208',
        }}>
          <span style={{
            fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 56,
            letterSpacing: -2, fontVariationSettings: '"wdth" 75',
          }}>{badge}</span>
        </div>
      </div>

      <div style={{
        fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: accent,
        letterSpacing: 1.4, textTransform: 'uppercase', marginTop: 28,
        animation: 'achRise 400ms ease 300ms both', opacity: 0,
      }}>Achievement unlocked</div>
      <div style={{
        fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 36,
        color: T.text, letterSpacing: -1.2, marginTop: 6,
        textAlign: 'center', lineHeight: 1, fontVariationSettings: '"wdth" 80',
        animation: 'achRise 400ms ease 400ms both', opacity: 0,
      }}>{title}</div>
      <div style={{
        fontFamily: '"Geist"', fontSize: 14, color: T.textDim, marginTop: 10,
        textAlign: 'center', lineHeight: 1.5, maxWidth: 290,
        animation: 'achRise 400ms ease 500ms both', opacity: 0,
      }}>{sub}</div>

      <div style={{
        display: 'flex', gap: 10, marginTop: 28, width: '100%', maxWidth: 320,
        animation: 'achRise 400ms ease 600ms both', opacity: 0,
      }}>
        <button onClick={onShare} style={{
          flex: 1, padding: 14, borderRadius: 14, border: 'none', cursor: 'pointer',
          background: accent, color: '#0E0B09',
          fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15,
          letterSpacing: -0.2, boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.18)',
        }}>Share to story</button>
        <button onClick={onDismiss} style={{
          padding: '14px 18px', borderRadius: 14, cursor: 'pointer',
          background: T.surface, color: T.text, border: `1px solid ${T.borderS}`,
          fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 15,
        }}>Nice</button>
      </div>
    </div>
  );
}

// Artboard wrapper — shows the achievement on a faux home backdrop so it
// reads as a moment in the app, not a bare screen.
function AchievementArtboard() {
  return (
    <div style={{
      height: '100%', background: T.bg, position: 'relative', overflow: 'hidden',
    }}>
      {/* faux dim home behind */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.35, filter: 'blur(2px)' }}>
        <HomeFeedDiary onCat={() => {}} onItem={() => {}} onAdd={() => {}} />
      </div>
      <AchievementUnlocked />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// FRIENDS · glance (home) + activity screen
// Tiny social, no feed-attention pressure. Compare ratings on what overlaps.
// ═══════════════════════════════════════════════════════════════════════
const SAMPLE_FRIENDS = [
  { name: 'Anya',  init: 'A', color: '#E8488A',
    item: SAMPLE.movies[0], rating: 5,   verb: 'watched',  when: '2h' },
  { name: 'Theo',  init: 'T', color: '#8B5CF6',
    item: SAMPLE.books[1],  rating: 4,   verb: 'finished', when: 'Yesterday' },
  { name: 'Sam',   init: 'S', color: '#14B8A6',
    item: SAMPLE.tv[1],     rating: 4.5, verb: 'caught up on', when: 'Wed' },
  { name: 'Riya',  init: 'R', color: '#FB923C',
    item: SAMPLE.travel[0], rating: 5,   verb: 'visited',  when: 'Mar' },
];

function FriendsGlance({ onOpen }) {
  return (
    <div onClick={onOpen} style={{
      margin: '0 20px 18px', padding: 14,
      background: T.surface, borderRadius: 16,
      border: `1px solid ${T.borderS}`, cursor: 'pointer',
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      {/* Stacked avatars */}
      <div style={{ display: 'flex', flexShrink: 0 }}>
        {SAMPLE_FRIENDS.slice(0, 3).map((f, i) => (
          <span key={f.name} style={{
            width: 30, height: 30, borderRadius: 15,
            background: f.color, color: '#fff',
            border: `2px solid ${T.surface}`,
            marginLeft: i === 0 ? 0 : -10,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 12,
          }}>{f.init}</span>
        ))}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
          letterSpacing: 1, textTransform: 'uppercase',
        }}>3 friends</div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 14,
          color: T.text, marginTop: 2, lineHeight: 1.2,
          textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}>
          Anya rated <span style={{ color: CATS.movies.accent }}>Dune: Part Two</span>
        </div>
      </div>
      <span style={{
        padding: '6px 10px', background: T.surface3,
        borderRadius: 999, fontFamily: '"Geist"', fontSize: 11, fontWeight: 600,
        color: T.text,
      }}>See →</span>
    </div>
  );
}

function FriendsActivityScreen({ onBack, onAdd }) {
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
        }}>Friends</div>
        <div style={{ flex: 1 }} />
        <button style={{
          padding: '8px 12px', borderRadius: 999, background: T.surface,
          border: `1px solid ${T.borderS}`, color: T.text,
          fontFamily: '"Geist"', fontSize: 12, fontWeight: 600, cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 5,
        }}>
          <Icon name="plus" size={12} color={T.text} /> Invite
        </button>
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '0 20px 110px' }}>
        {/* Overlap card — the killer feature */}
        <div style={{
          marginBottom: 18, padding: 14,
          background: `linear-gradient(135deg, ${CATS.movies.soft} 0%, ${T.surface} 60%)`,
          borderRadius: 18, border: `1px solid ${T.borderS}`,
        }}>
          <div style={{
            fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: CATS.movies.accent,
            letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 6,
          }}>You both watched</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Cover item={SAMPLE.movies[0]} width={52} height={72} radius={8} monoLabel={false} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{
                fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 17, color: T.text,
                letterSpacing: -0.3, lineHeight: 1.15,
                textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
              }}>{SAMPLE.movies[0].title}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <Stars value={4.5} size={12} />
                <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim }}>you · 4.5</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                <Stars value={5} size={12} color={CATS.movies.accent} />
                <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim }}>Anya · 5</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 700, color: T.textDim,
          letterSpacing: 1.1, textTransform: 'uppercase', marginBottom: 10,
        }}>This week</div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {SAMPLE_FRIENDS.map(f => {
            const c = CATS[f.item.cat];
            return (
              <div key={f.name} style={{
                padding: 10, background: T.surface, borderRadius: 12,
                border: `1px solid ${T.borderS}`,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <span style={{
                  width: 36, height: 36, borderRadius: 18,
                  background: f.color, color: '#fff',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 14, flexShrink: 0,
                }}>{f.init}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{
                      fontFamily: '"Geist"', fontSize: 13, fontWeight: 600, color: T.text,
                    }}>{f.name}</span>
                    <span style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>
                      {f.verb}
                    </span>
                    <span style={{ marginLeft: 'auto', fontFamily: '"Geist"', fontSize: 11, color: T.textMute }}>{f.when}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: c.accent }} />
                    <span style={{
                      flex: 1, fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 14,
                      color: T.text, letterSpacing: -0.1,
                      textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
                    }}>{f.item.title}</span>
                    <Stars value={f.rating} size={11} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          marginTop: 18, padding: 14,
          background: 'transparent', border: `1.5px dashed ${T.border}`,
          borderRadius: 14, textAlign: 'center',
        }}>
          <div style={{ fontFamily: '"Geist"', fontSize: 13, color: T.text, fontWeight: 600 }}>
            Invite from contacts
          </div>
          <div style={{ fontFamily: '"Geist"', fontSize: 12, color: T.textDim, marginTop: 4 }}>
            We never share your activity unless you do.
          </div>
        </div>
      </div>
      <HomeIndicator />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// NIGHTLY NUDGE — lock-screen notification preview
// The single biggest driver of daily opens. Show what it actually looks like.
// ═══════════════════════════════════════════════════════════════════════
function NightlyNudgeArtboard() {
  return (
    <div style={{
      height: '100%', position: 'relative', overflow: 'hidden',
      background: `
        radial-gradient(120% 80% at 20% 0%, #3a1a08 0%, transparent 60%),
        radial-gradient(120% 80% at 90% 80%, #1a1f30 0%, transparent 60%),
        linear-gradient(180deg, #0a0807 0%, #161210 100%)
      `,
    }}>
      <StatusBar />
      {/* Lock screen time */}
      <div style={{ padding: '40px 24px 0', textAlign: 'left' }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 14, fontWeight: 600,
          color: 'rgba(255,255,255,0.65)', letterSpacing: 0.2,
        }}>FRIDAY, MAY 16</div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 200, fontSize: 92,
          color: '#fff', lineHeight: 1, letterSpacing: -3.5, marginTop: 4,
          fontVariationSettings: '"wdth" 90',
        }}>9:41</div>
      </div>

      {/* Stacked notifications */}
      <div style={{ padding: '40px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {/* Other app — gives realistic context */}
        <NotifShell
          color="#5b7ce0"
          letter="iM"
          app="MESSAGES"
          time="now"
          title="Anya"
          body="have you watched dune 2 yet"
          subtle
        />
        {/* Trove — the main beat */}
        <NotifShell
          color={T.brand}
          icon
          app="TROVE"
          time="9:41 PM"
          title="What did you watch tonight?"
          body="Tap to log · keep your 12-day streak"
        />
        <NotifShell
          color={T.brand}
          icon
          app="TROVE · MEMORY"
          time="this morning"
          title="A year ago today"
          body="You rated Past Lives 4.5★. Still a banger?"
          dim
        />
      </div>

      {/* Bottom hint */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 60,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: '"Geist"', fontSize: 11, color: 'rgba(255,255,255,0.55)',
          fontWeight: 600, letterSpacing: 0.4, textTransform: 'uppercase',
        }}>Swipe up to open</div>
      </div>
      <HomeIndicator />
    </div>
  );
}

function NotifShell({ color, icon, letter, app, time, title, body, subtle, dim }) {
  return (
    <div style={{
      background: subtle ? 'rgba(36,32,30,0.74)' : 'rgba(28,24,22,0.82)',
      backdropFilter: 'blur(28px) saturate(160%)',
      WebkitBackdropFilter: 'blur(28px) saturate(160%)',
      borderRadius: 18, padding: 12,
      border: `0.5px solid rgba(255,255,255,0.08)`,
      display: 'flex', gap: 10, alignItems: 'flex-start',
      opacity: dim ? 0.7 : 1,
    }}>
      <span style={{
        width: 36, height: 36, borderRadius: 9, flexShrink: 0,
        background: color, color: '#0E0B09',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 14,
      }}>
        {icon ? (
          <span style={{
            width: 22, height: 20, borderRadius: 5,
            background: '#0E0B09', position: 'relative',
            display: 'inline-block',
          }}>
            <span style={{
              position: 'absolute', left: '18%', right: '18%', top: '40%',
              height: 3, borderRadius: 2, background: color,
            }} />
          </span>
        ) : letter}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontFamily: '"Geist"', fontSize: 11, fontWeight: 600,
          color: 'rgba(255,255,255,0.6)', letterSpacing: 0.3,
          textTransform: 'uppercase',
        }}>
          <span>{app}</span>
          <span>{time}</span>
        </div>
        <div style={{
          fontFamily: '-apple-system, system-ui', fontWeight: 600, fontSize: 14, color: '#fff',
          marginTop: 2, lineHeight: 1.25,
        }}>{title}</div>
        <div style={{
          fontFamily: '-apple-system, system-ui', fontSize: 14, color: 'rgba(255,255,255,0.85)',
          marginTop: 2, lineHeight: 1.3,
        }}>{body}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// PICK BACK UP — sharper "continue" rail (replaces the old NowCard variety)
// One line per in-progress thing. Designed for thumb-reach + clear progress.
// ═══════════════════════════════════════════════════════════════════════
function PickBackUpRow({ item, progress, progressLabel, onClick }) {
  const c = CATS[item.cat];
  return (
    <div onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 12,
      padding: 12, background: T.surface, borderRadius: 14,
      border: `1px solid ${T.borderS}`, cursor: 'pointer',
    }}>
      <Cover item={item} width={48} height={68} radius={7} monoLabel={false} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontFamily: '"Geist"', fontSize: 10, fontWeight: 700,
          color: c.accent, letterSpacing: 0.7, textTransform: 'uppercase',
          marginBottom: 3,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: 3, background: c.accent }} />
          {item.cat === 'tv' ? 'Watching' : item.cat === 'books' ? 'Reading' : 'Playing'}
        </div>
        <div style={{
          fontFamily: '"Bricolage Grotesque"', fontWeight: 600, fontSize: 15,
          color: T.text, letterSpacing: -0.2, lineHeight: 1.15,
          textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap',
        }}>{item.title}</div>
        <div style={{ marginTop: 6 }}>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,240,224,0.06)', overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: c.accent }} />
          </div>
          <div style={{ fontFamily: '"Geist"', fontSize: 11, color: T.textDim, marginTop: 4 }}>
            {progressLabel}
          </div>
        </div>
      </div>
      <button style={{
        padding: '8px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
        background: c.soft, color: c.accent,
        fontFamily: '"Geist"', fontSize: 12, fontWeight: 700,
        flexShrink: 0,
      }}>+1</button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// POLISHED HOME FEED — refined diary home
// Same skeleton as HomeFeedDiary, but tighter:
//   • Time-of-day greeting + inline streak (no card)
//   • Daily prompt card (cold-start killer)
//   • Goals strip (yearly retention)
//   • Pick back up rail (resumable items)
//   • Memory ("on this day")
//   • Diary, simplified
//   • Friends glance
// ═══════════════════════════════════════════════════════════════════════
function PolishedHomeFeed({ onCat, onItem, onAdd, onGoals, onFriends, hour }) {
  const g = getGreeting(hour);
  return (
    <div style={{ height: '100%', background: T.bg, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <StatusBar />
      <div style={{ flex: 1, overflow: 'auto', paddingBottom: 110 }}>
        {/* Greeting row — date is small, greeting is the hero */}
        <div style={{ padding: '10px 20px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ minWidth: 0 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: '"Geist"', fontSize: 11, fontWeight: 700,
              color: T.textDim, letterSpacing: 1.2, textTransform: 'uppercase',
              marginBottom: 4,
            }}>
              <span>Fri · May 16</span>
              <span style={{ width: 3, height: 3, borderRadius: 2, background: T.textMute }} />
              <span style={{ color: T.brand, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon name="flame" size={11} color={T.brand} />
                12-day streak
              </span>
            </div>
            <div style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 700, fontSize: 30,
              color: T.text, lineHeight: 1, letterSpacing: -0.8,
              fontVariationSettings: '"wdth" 85',
            }}>{g.line}</div>
          </div>
          <div style={{
            width: 38, height: 38, borderRadius: 19, background: T.surface2,
            border: `1px solid ${T.border}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: '"Bricolage Grotesque"', fontWeight: 700, color: T.brand, fontSize: 14,
            }}>M</span>
          </div>
        </div>

        {/* Daily prompt — the cold-start killer */}
        <DailyPromptCard onPick={() => onAdd && onAdd()} onSkip={() => {}} />

        {/* Goals strip */}
        <GoalsStrip onOpen={onGoals} />

        {/* Pick back up — resumable in-progress */}
        <SectionHead kicker="PICK BACK UP" title="Still in motion" action="All →" />
        <div style={{ padding: '0 20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PickBackUpRow item={SAMPLE.tv[0]}    progress={0.78} progressLabel="Ep 8 of 10 · last watched Tue" onClick={() => onItem && onItem(SAMPLE.tv[0])} />
          <PickBackUpRow item={SAMPLE.books[0]} progress={0.46} progressLabel="Page 184 of 400" onClick={() => onItem && onItem(SAMPLE.books[0])} />
          <PickBackUpRow item={SAMPLE.games[0]} progress={0.72} progressLabel="64h in · main quest" onClick={() => onItem && onItem(SAMPLE.games[0])} />
        </div>

        {/* Memory */}
        <MemoryCard item={SAMPLE.movies[2]} yearsAgo={1} onClick={() => onItem && onItem(SAMPLE.movies[2])} />

        {/* Friends */}
        <FriendsGlance onOpen={onFriends} />

        {/* Diary timeline — simplified */}
        <SectionHead kicker="DIARY" title="This week" action="All →" />
        <div style={{ padding: '0 20px' }}>
          <DiaryGroup label="Yesterday" items={[FEED[1], FEED[2]]} onItem={onItem} />
          <DiaryGroup label="Friday"    items={[FEED[3]]}          onItem={onItem} />
        </div>
      </div>
      <TabBar active="home" onAdd={onAdd} />
      <HomeIndicator />
    </div>
  );
}

Object.assign(window, {
  getGreeting,
  DailyPromptCard,
  GoalRing, GoalsStrip, GoalsScreen,
  AchievementUnlocked, AchievementArtboard,
  FriendsGlance, FriendsActivityScreen,
  NightlyNudgeArtboard,
  PickBackUpRow,
  PolishedHomeFeed,
});
