"use client";
import { useLibraryStore } from "../store/useLibraryStore";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const Tabs_Data = [
  { label: 'Featured', value: 'all' },
  { label: 'KPI', value: 'kpi' },
  { label: 'Layout', value: 'layout' },
  { label: 'Storyboard', value: 'storyboard' },
];

export default function FilterBar() {
  const {
    searchQuery,
    setSearchQuery,
    commitSearch,
    activeTab,
    setActiveTab,
    filterAssets,
    clearFilters,
    recentSearches,
  } = useLibraryStore();

  const [showRecent, setShowRecent] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // debounce effect
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (searchQuery.trim()) {
        commitSearch(searchQuery);
      } else {
        filterAssets('');
      }
    }, 1000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [searchQuery, activeTab]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      commitSearch(searchQuery);
      setShowRecent(false);
    }
  };

  const handleRecentClick = (term: string) => {
    setSearchQuery(term);
    commitSearch(term);
    setShowRecent(false);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab as any);
  };

  return (
    <div className="space-y-4 relative">
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowRecent(true)}
          onBlur={() => setTimeout(() => setShowRecent(false), 150)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search assets..."
        />
        {searchQuery && (
          <button
            type="button"
            onClick={clearFilters}
            className="px-3 py-2 text-sm bg-gray-100 border rounded hover:bg-gray-200"
          >
            Clear
          </button>
        )}
      </div>
      {/* Recent searches */}
      {showRecent && recentSearches.length > 0 && (
        <div className="absolute z-10 w-full bg-white border mt-1 rounded-md shadow p-2">
          <p className="text-xs text-gray-400 mb-1">Recent Searches</p>
          <ul className="space-y-1">
            {recentSearches.map((term, idx) => (
              <li
                key={idx}
                onClick={() => handleRecentClick(term)}
                className="cursor-pointer px-2 py-1 text-sm hover:bg-gray-100 rounded"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        {Tabs_Data.map((tab) => (
          <button
            key={tab.value}
            onClick={() => handleTabClick(tab.value)}
            className={clsx(
              'px-4 py-2 rounded text-sm font-medium',
              activeTab === tab.value
                ? 'bg-gray-400 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}