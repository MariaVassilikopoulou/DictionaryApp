import { useEffect, useState} from "react";
import { getRecentSearches } from "../utils/localStorage";
import "../styles/ResentSearches.scss"; 
import React from "react";
type Props = {
  onSelect: (term: string) => void;
};

const RecentSearches = ({ onSelect }: Props) => {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    setRecent(getRecentSearches());
  }, []);

  return (
    <div className="recent-searches">
      <h3>Recent Searches</h3>
      <div className="buttons-container">
        {recent.map((word, index) => (
          <button key={index} onClick={() => onSelect(word)}>
            {word}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
