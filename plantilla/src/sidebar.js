import React from 'react';

const Sidebar = ({ onSelect }) => {
  return (
    <div className="sidebar">
      <button className="btn btn-secondary" onClick={() => onSelect('search')}>Search Facts</button>
      <button className="btn btn-info" onClick={() => onSelect('favorites')}>View my favorites</button>
    </div>
  );
}


export default Sidebar;
