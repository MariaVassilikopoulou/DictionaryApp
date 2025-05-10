import { useEffect, useState} from "react";
import { getRecentSearches } from "../utils/localStorage";
import "../styles/ResentSearches.scss"; 
import React from "react";
import Favorites from "./Favorites";
import { saveSearchTerm ,getFavorites, saveFavorite, removeFavorite} from "../utils/localStorage";
type Props = {
  onSelect: (term: string) => void;
};

const RecentSearches = ({ onSelect }: Props) => {
  const [recent, setRecent] = useState<string[]>([]);
 const [favorites, setFavorites] = useState<string[]>([]);

 const [showFavorites, setShowFavorites] = useState<boolean>(false);
 const [showRecent, setShowRecent] = useState<boolean>(false);

  useEffect(() => {
    setRecent(getRecentSearches());
    setFavorites(getFavorites());
  }, []);

 const removeFromFavorites = (word: string) => {
    setFavorites(removeFavorite(word));
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);


 
    
    return (
      <div className="accordion-wrapper">
        {/* Accordion: Favorites */}
        <div className="accordion-section">
          <button onClick={() => setShowFavorites(!showFavorites)} className="accordion-toggle">
            {showFavorites ? "▼ Hide Favorites" : "▶ Show Favorites"}
          </button>
          {showFavorites && (
            <Favorites favorites={favorites} onRemove={removeFromFavorites} />
          )}
        </div>
  
        {/* Accordion: Recent Searches */}
        <div className="accordion-section">
          <button onClick={() => setShowRecent(!showRecent)} className="accordion-toggle">
            {showRecent ? "▼ Hide Recent Searches" : "▶ Show Recent Searches"}
          </button>
          {showRecent && (
            <div className="buttons-container">
              {recent.map((word, index) => (
                <button key={index} onClick={() => onSelect(word)}>
                  {word}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default RecentSearches;
