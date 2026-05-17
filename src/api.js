const TMDB_API_KEY = 'ad1e2f137608cb8eb213fb4d6b384d73'; // Replace with a real TMDB API Key!

async function searchAPI(cat, query) {
  if (!query) return window.SEARCH_SEEDS[cat] || [];

  try {
    if (cat === 'movies') {
      if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return mockSearch(cat, query);
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      return (data.results || []).map(m => ({
        id: `m-${m.id}`,
        title: m.title,
        sub: m.release_date ? m.release_date.split('-')[0] : '',
        cover: m.poster_path ? `https://image.tmdb.org/t/p/w500${m.poster_path}` : null,
        tone: 'ocean'
      }));
    }

    if (cat === 'tv') {
      if (TMDB_API_KEY === 'YOUR_TMDB_API_KEY') return mockSearch(cat, query);
      const res = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
      const data = await res.json();
      return (data.results || []).map(t => ({
        id: `t-${t.id}`,
        title: t.name,
        sub: t.first_air_date ? t.first_air_date.split('-')[0] : '',
        cover: t.poster_path ? `https://image.tmdb.org/t/p/w500${t.poster_path}` : null,
        tone: 'wine'
      }));
    }

    if (cat === 'books') {
      // Google Books API doesn't strictly need a key for basic searches
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`);
      const data = await res.json();
      if (!data.items) return [];
      return data.items.map(b => {
        const info = b.volumeInfo || {};
        return {
          id: `b-${b.id}`,
          title: info.title || 'Unknown Title',
          sub: info.authors ? info.authors.join(', ') : '',
          cover: info.imageLinks ? (info.imageLinks.thumbnail || info.imageLinks.smallThumbnail).replace('http:', 'https:') : null,
          tone: 'butter'
        };
      });
    }

    // Default to mock search for unsupported API categories right now
    return mockSearch(cat, query);

  } catch (e) {
    console.error(`Search API error for ${cat}:`, e);
    return mockSearch(cat, query);
  }
}

// Fallback search that just filters the static SEARCH_SEEDS
function mockSearch(cat, query) {
  const seeds = window.SEARCH_SEEDS[cat] || [];
  return seeds.filter(s => (s.title + ' ' + (s.sub || '')).toLowerCase().includes(query.toLowerCase()));
}

window.searchAPI = searchAPI;
