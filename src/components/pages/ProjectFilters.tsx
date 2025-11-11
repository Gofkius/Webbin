import React, { useState } from 'react';

type Props = {
  onSortChange?: (sort: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
};

const ProjectFilters = ({ onSortChange, onViewChange }: Props) => {
  const [activeSort, setActiveSort] = useState('recent');
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');

  const handleSortClick = (sort: string) => {
    setActiveSort(sort);
    onSortChange?.(sort);
  };

  const handleViewClick = (view: 'grid' | 'list') => {
    setActiveView(view);
    onViewChange?.(view);
  };

  return (
    <div className="project-filters">
      <div className="filter-group">
        <button 
          className={`filter-btn ${activeSort === 'recent' ? 'active' : ''}`}
          onClick={() => handleSortClick('recent')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12 6 12 12 16 14"/>
          </svg>
          Recent
        </button>
        <button 
          className={`filter-btn ${activeSort === 'date' ? 'active' : ''}`}
          onClick={() => handleSortClick('date')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Date
        </button>
        <button 
          className={`filter-btn ${activeSort === 'name' ? 'active' : ''}`}
          onClick={() => handleSortClick('name')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="21" y1="10" x2="7" y2="10"/>
            <line x1="21" y1="6" x2="3" y2="6"/>
            <line x1="21" y1="14" x2="3" y2="14"/>
            <line x1="21" y1="18" x2="7" y2="18"/>
          </svg>
          Name
        </button>
      </div>

      <div className="view-toggle">
        <button 
          className={`view-btn ${activeView === 'grid' ? 'active' : ''}`}
          onClick={() => handleViewClick('grid')}
          aria-label="Grid view"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"/>
            <rect x="14" y="3" width="7" height="7"/>
            <rect x="14" y="14" width="7" height="7"/>
            <rect x="3" y="14" width="7" height="7"/>
          </svg>
          Grid
        </button>
        <button 
          className={`view-btn ${activeView === 'list' ? 'active' : ''}`}
          onClick={() => handleViewClick('list')}
          aria-label="List view"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="8" y1="6" x2="21" y2="6"/>
            <line x1="8" y1="12" x2="21" y2="12"/>
            <line x1="8" y1="18" x2="21" y2="18"/>
            <line x1="3" y1="6" x2="3.01" y2="6"/>
            <line x1="3" y1="12" x2="3.01" y2="12"/>
            <line x1="3" y1="18" x2="3.01" y2="18"/>
          </svg>
          List
        </button>
      </div>
    </div>
  );
};

export default ProjectFilters;
