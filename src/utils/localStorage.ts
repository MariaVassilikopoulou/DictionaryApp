export const saveSearchTerm = (term: string) => {
    const existing = JSON.parse(localStorage.getItem("recentSearches") || "[]");
    const updated = [term, ...existing.filter((t: string) => t !== term)].slice(0, 5);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };
  
  export const getRecentSearches = (): string[] => {
    return JSON.parse(localStorage.getItem("recentSearches") || "[]");
  };
  