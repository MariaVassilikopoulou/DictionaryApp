import { useEffect, useState} from "react";
import { getRecentSearches } from "../utils/localStorage";
import "../styles/ResentSearches.scss"; 
import React from "react";
import Favorites from "./Favorites";
import { saveSearchTerm ,getFavorites, saveFavorite, removeFavorite,  removeRecentSearch} from "../utils/localStorage";

type Props = {
  onSelect: (term: string) => void;
  favorites: string[];
  onRemoveFavorite: (word: string) => void;
  refreshTrigger: number;
};

const RecentSearches = ({ onSelect, favorites, onRemoveFavorite ,refreshTrigger }: Props) => {
  const [recent, setRecent] = useState<string[]>([]);
 //const [favorites, setFavorites] = useState<string[]>([]);

 const [showFavorites, setShowFavorites] = useState<boolean>(false);
 const [showRecent, setShowRecent] = useState<boolean>(false);

  useEffect(() => {
    setRecent(getRecentSearches());
   // setFavorites(getFavorites());
  }, [refreshTrigger]);

 /*const removeFromFavorites = (word: string) => {
    setFavorites(removeFavorite(word));
  };
*/

    
    return (
      <div className="accordion-wrapper">
        {/* Accordion: Favorites */}
        <div className="accordion-section">
          <button onClick={() => setShowFavorites(!showFavorites)} className="accordion-toggle">
            {showFavorites ? "▼ Hide Favorites" : "▶ Show Favorites"}
          </button>
          {showFavorites && (
            <Favorites favorites={favorites} onRemove={  onRemoveFavorite} />
          )}
        </div>
  
        {/* Accordion: Recent Searches */}
        <div className="accordion-section">
          <button onClick={() => setShowRecent(!showRecent)} className="accordion-toggle">
            {showRecent ? "▼ Hide Recent Searches" : "▶ Show Recent Searches"}
          </button>
          {showRecent && recent.length > 0 ? (
          <div className="buttons-container">
          {recent.map((word, index) => (
            <div key={index} className="recent-item">
              <button onClick={() => onSelect(word)}>
                {word}
              </button>
              <button
                className="delete-btn"
                onClick={() => {
                  const updated = removeRecentSearch(word);
                  setRecent(updated); 
                }}
              >
                ✖️
              </button>
            </div>
          ))}
        </div>
        
        ) : showRecent && recent.length === 0 ? (
          <p>No recent searches yet!</p>
        ) : null}
      </div>
    </div>
  );
};
  
  export default RecentSearches;
