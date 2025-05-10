import React from 'react';

type Props = {
  favorites: string[];
  onRemove: (word: string) => void;
};

const Favorites = ({ favorites, onRemove }: Props) => {
  return (
    <div>
      <h3>Your Favorites</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((favorite, index) => (
            <li key={index}  className="favorite-item">
              {favorite}
              <button className= "buttonX" onClick={() => onRemove(favorite)}> ✖️</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorite words yet!</p>
      )}
    </div>
  );
};

export default Favorites;
