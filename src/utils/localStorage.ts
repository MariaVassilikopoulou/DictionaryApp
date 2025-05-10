export const saveSearchTerm = (term: string) => {
    const existing = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const updated = [term, ...existing.filter((t: string) => t !== term)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };
  
  export const getRecentSearches = (): string[] => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  };
 
  
  export const getFavorites = (): string[] => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  };
  
  export const saveFavorite = (word: string): string[] => {
    const favorites = getFavorites();
    if (!favorites.includes(word)) {
      const updated = [...favorites, word];
      localStorage.setItem('favorites', JSON.stringify(updated));
      return updated;
    }
    return favorites;
  };
  
  export const removeFavorite = (word: string): string[] => {
    const favorites = getFavorites();
    const updated = favorites.filter(item => item !== word);
    localStorage.setItem('favorites', JSON.stringify(updated));
    return updated;
  };
  

  export function removeRecentSearch(term: string): string[] {
    const stored = getRecentSearches().filter(item => item !== term);
    localStorage.setItem("recentSearches", JSON.stringify(stored));
    return stored;
  }
  