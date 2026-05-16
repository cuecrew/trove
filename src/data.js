const SAMPLE = {
  movies: [
    { id: 'm-dune2',     cat: 'movies', title: 'Dune: Part Two',    sub: 'Denis Villeneuve', year: 2024, mins: 166,
      cover: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
      rating: 4.5, status: 'watched', date: 'May 12', when: '8:42 PM', note: '"Long live the fighters." Felt like sitting inside a sandstorm.', tags: ['IMAX','solo'] },
    { id: 'm-anatomy',   cat: 'movies', title: 'Anatomy of a Fall', sub: 'Justine Triet',     year: 2023, mins: 152,
      cover: 'https://image.tmdb.org/t/p/w500/kQs6keheMwCxJxrzV83VUwFtHkB.jpg',
      rating: 5, status: 'watched', date: 'May 5', when: '9:00 PM', tags: ['date night'] },
    { id: 'm-pastlives', cat: 'movies', title: 'Past Lives',        sub: 'Celine Song',       year: 2023, mins: 105,
      cover: 'https://image.tmdb.org/t/p/w500/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
      rating: 4.5, status: 'watched', date: 'Apr 28', when: '8:00 PM', tags: [] },
    { id: 'm-zone',      cat: 'movies', title: 'The Zone of Interest', sub: 'Jonathan Glazer', year: 2023, mins: 105,
      cover: 'https://image.tmdb.org/t/p/w500/hUu9zyZmDd8VZegKi1iK1Vk0RAR.jpg',
      rating: 4, status: 'watched', date: 'Apr 14', when: '7:30 PM', tags: [] },
    { id: 'm-poor',      cat: 'movies', title: 'Poor Things',       sub: 'Yorgos Lanthimos',  year: 2023, mins: 141,
      cover: 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg',
      rating: 4, status: 'watched', date: 'Apr 2', when: '9:15 PM', tags: [] },
    { id: 'm-everything', cat: 'movies', title: 'Everything Everywhere All at Once', sub: 'Daniels', year: 2022, mins: 139,
      cover: 'https://image.tmdb.org/t/p/w500/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg',
      rating: 5, status: 'want', date: null, when: null, tags: [] },
  ],
  tv: [
    { id: 't-shogun',   cat: 'tv', title: 'Shōgun',      sub: 'Season 1 · ep 8',  year: 2024,
      cover: 'https://image.tmdb.org/t/p/w500/7O4iVfOMQmdCSxhOg1WnzG1AGS6.jpg',
      rating: 4.5, status: 'watching', date: 'May 14', when: '9:30 PM', tags: [] },
    { id: 't-severance', cat: 'tv', title: 'Severance',  sub: 'Season 2 · ep 3',  year: 2025,
      cover: 'https://image.tmdb.org/t/p/w500/lFf6LLrQjYldcZItzOkGmMMigP7.jpg',
      rating: 5, status: 'watching', date: 'May 9', when: '10:02 PM', tags: [] },
    { id: 't-bear',     cat: 'tv', title: 'The Bear',    sub: 'Season 3 · ep 10', year: 2024,
      cover: 'https://image.tmdb.org/t/p/w500/zPyHM9BgVEsfNTdtjekrG2DSDC0.jpg',
      rating: 4, status: 'watched', date: 'Apr 30', when: '8:45 PM', tags: [] },
  ],
  books: [
    { id: 'b-tomorrow', cat: 'books', title: 'Tomorrow, and Tomorrow, and Tomorrow', sub: 'Gabrielle Zevin', year: 2022,
      cover: 'https://covers.openlibrary.org/b/isbn/0593321200-L.jpg',
      rating: 4, status: 'reading', date: 'Today', when: '—', tags: ['fiction'] },
    { id: 'b-piranesi', cat: 'books', title: 'Piranesi', sub: 'Susanna Clarke', year: 2020,
      cover: 'https://covers.openlibrary.org/b/isbn/1635575630-L.jpg',
      rating: 5, status: 'read', date: 'Apr 19', when: '11:00 PM', tags: [] },
    { id: 'b-trust',    cat: 'books', title: 'Trust',    sub: 'Hernán Diaz',    year: 2022,
      cover: 'https://covers.openlibrary.org/b/isbn/0593420314-L.jpg',
      rating: 4, status: 'read', date: 'Mar 11', when: '9:00 PM', tags: [] },
  ],
  games: [
    { id: 'g-totk',   cat: 'games', title: 'Zelda: Tears of the Kingdom', sub: 'Switch · 64h', year: 2023,
      cover: null, placeholderTone: 'forest', rating: 5, status: 'playing', date: 'Today', when: '—', tags: [] },
    { id: 'g-baldur', cat: 'games', title: "Baldur's Gate 3", sub: 'PC · Act II',    year: 2023,
      cover: null, placeholderTone: 'crimson', rating: 5, status: 'playing', date: 'May 8', when: '10:00 PM', tags: [] },
    { id: 'g-disco',  cat: 'games', title: 'Disco Elysium',  sub: 'PC · finished',  year: 2019,
      cover: null, placeholderTone: 'wine',   rating: 5, status: 'played', date: 'Feb 22', when: '11:30 PM', tags: [] },
  ],
  travel: [
    { id: 'p-kyoto',  cat: 'travel', title: 'Kyoto',   sub: 'Japan · 6 days',
      cover: null, placeholderTone: 'maple', rating: 5, status: 'visited', date: 'Mar 28', when: '—', tags: [] },
    { id: 'p-lisbon', cat: 'travel', title: 'Lisbon',  sub: 'Portugal · weekend',
      cover: null, placeholderTone: 'ocean', rating: 4, status: 'visited', date: 'Feb 2', when: '—', tags: [] },
    { id: 'p-bigsur', cat: 'travel', title: 'Big Sur', sub: 'California · road trip',
      cover: null, placeholderTone: 'kelp',  rating: 4.5, status: 'want', date: null, when: null, tags: [] },
  ],
  food: [
    { id: 'f-sushi',   cat: 'food', title: 'Sushi Yasuda',   sub: 'Tokyo · omakase',
      cover: null, placeholderTone: 'pearl',  rating: 5, status: 'tried', date: 'Mar 30', when: '8:00 PM', tags: [] },
    { id: 'f-tartine', cat: 'food', title: 'Tartine Bakery', sub: 'SF · morning bun',
      cover: null, placeholderTone: 'butter', rating: 4.5, status: 'tried', date: 'Feb 18', when: '9:00 AM', tags: [] },
  ],
  drinks: [
    { id: 'd-natural', cat: 'drinks', title: 'Domaine Mosse Anjou', sub: '2022 · chenin blanc',
      cover: null, placeholderTone: 'amber', rating: 4.5, status: 'tried', date: 'May 11', when: '9:15 PM', tags: [] },
    { id: 'd-mezcal',  cat: 'drinks', title: 'Del Maguey Vida',     sub: 'mezcal · neat',
      cover: null, placeholderTone: 'smoke', rating: 4, status: 'tried', date: 'Apr 22', when: '10:00 PM', tags: [] },
  ],
};

const FEED = [
  { ...SAMPLE.movies[0], date: 'Today',     when: '8:42 PM' },
  { ...SAMPLE.drinks[0], date: 'Yesterday', when: '9:15 PM' },
  { ...SAMPLE.tv[0],     date: 'Yesterday', when: '7:30 PM' },
  { ...SAMPLE.tv[1],     date: 'Fri',       when: '10:02 PM' },
  { ...SAMPLE.movies[1], date: 'Sun',       when: '4:18 PM' },
  { ...SAMPLE.travel[0], date: 'Mar 28',    when: '—' },
  { ...SAMPLE.books[0],  date: 'Today',     when: '—' },
];

const SEARCH_SEEDS = {
  movies: [
    { id: 's-challengers', title: 'Challengers',  sub: 'Luca Guadagnino · 2024', cover: 'https://image.tmdb.org/t/p/w500/H6j5smdpRqP9a8UnhWp6zfl0SC.jpg' },
    { id: 's-civil',       title: 'Civil War',    sub: 'Alex Garland · 2024',   cover: 'https://image.tmdb.org/t/p/w500/sh7Rg8Er3tFcN9BpKIPOMvALgZd.jpg' },
    { id: 's-killers',     title: 'Killers of the Flower Moon', sub: 'Scorsese · 2023', cover: 'https://image.tmdb.org/t/p/w500/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg' },
    { id: 's-fallguy',     title: 'The Fall Guy', sub: 'David Leitch · 2024',   cover: 'https://image.tmdb.org/t/p/w500/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg' },
  ],
  tv: [
    { id: 's-ripley', title: 'Ripley',         sub: 'Netflix · 2024', cover: 'https://image.tmdb.org/t/p/w500/4Hxd0VeohS1G7ELiawHKuFLuJTU.jpg' },
    { id: 's-3body',  title: '3 Body Problem', sub: 'Netflix · 2024', cover: 'https://image.tmdb.org/t/p/w500/yALS7tZuVDaaSoeQUMGglU0vWb2.jpg' },
  ],
  books: [
    { id: 's-northwoods', title: 'North Woods',         sub: 'Daniel Mason · 2023', cover: 'https://covers.openlibrary.org/b/isbn/0593597036-L.jpg' },
    { id: 's-creation',   title: 'The Creation of Eve', sub: 'Lynn Cullen',          cover: null, tone: 'butter' },
  ],
  games: [
    { id: 's-balatro', title: 'Balatro',    sub: 'LocalThunk · 2024', cover: null, tone: 'crimson' },
    { id: 's-elden',   title: 'Elden Ring', sub: 'FromSoftware',      cover: null, tone: 'forest' },
  ],
  travel: [
    { id: 's-lisbon', title: 'Lisbon',       sub: 'Portugal', cover: null, tone: 'ocean' },
    { id: 's-mexico', title: 'Mexico City',  sub: 'Mexico',   cover: null, tone: 'butter' },
  ],
  food: [
    { id: 's-momofuku', title: 'Momofuku Ko', sub: 'New York · tasting', cover: null, tone: 'butter' },
    { id: 's-pujol',    title: 'Pujol',       sub: 'Mexico City',        cover: null, tone: 'smoke' },
  ],
  drinks: [
    { id: 's-paloma',  title: 'Paloma', sub: 'Mezcal cocktail', cover: null, tone: 'amber' },
    { id: 's-natural', title: 'Pét-nat', sub: 'Sparkling wine', cover: null, tone: 'amber' },
  ],
};

window.SAMPLE = SAMPLE;
window.FEED = FEED;
window.SEARCH_SEEDS = SEARCH_SEEDS;
