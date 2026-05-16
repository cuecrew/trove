const T = {
  bg:        '#0E0B09',
  bgSoft:    '#15110E',
  surface:   '#1B1613',
  surface2:  '#241D19',
  surface3:  '#2D2520',
  border:    'rgba(255,240,224,0.08)',
  borderS:   'rgba(255,240,224,0.04)',
  text:      '#F6EFE6',
  textDim:   '#A89E92',
  textMute:  '#6E665D',
  brand:     '#F4B23C',
  brandDeep: '#C8862A',
  red:       '#FF4D3D',
  green:     '#34C77A',
};

const CATS = {
  movies:  { key: 'movies',  label: 'Movie',  plural: 'Movies',  accent: '#FF4D3D', soft: 'rgba(255,77,61,0.16)' },
  tv:      { key: 'tv',      label: 'Show',   plural: 'TV',      accent: '#E8488A', soft: 'rgba(232,72,138,0.16)' },
  books:   { key: 'books',   label: 'Book',   plural: 'Books',   accent: '#F4B23C', soft: 'rgba(244,178,60,0.18)' },
  games:   { key: 'games',   label: 'Game',   plural: 'Games',   accent: '#8B5CF6', soft: 'rgba(139,92,246,0.18)' },
  travel:  { key: 'travel',  label: 'Place',  plural: 'Travel',  accent: '#14B8A6', soft: 'rgba(20,184,166,0.18)' },
  food:    { key: 'food',    label: 'Meal',   plural: 'Food',    accent: '#FB923C', soft: 'rgba(251,146,60,0.18)' },
  drinks:  { key: 'drinks',  label: 'Drink',  plural: 'Drinks',  accent: '#B8385E', soft: 'rgba(184,56,94,0.20)' },
};
const CAT_ORDER = ['movies','tv','books','games','travel','food','drinks'];

const TONES = {
  forest:  ['#1f3b2e','#0d1f17'],
  crimson: ['#5b1d2a','#2a0e14'],
  wine:    ['#3a1623','#1a0a10'],
  maple:   ['#5a2818','#28110a'],
  ocean:   ['#0d3a4d','#06141c'],
  kelp:    ['#1b3a35','#0a1816'],
  pearl:   ['#3a3128','#1a1612'],
  butter:  ['#5a4220','#241a0d'],
  amber:   ['#5a3812','#241408'],
  smoke:   ['#2a2620','#13110e'],
};

window.T = T;
window.CATS = CATS;
window.CAT_ORDER = CAT_ORDER;
window.TONES = TONES;
