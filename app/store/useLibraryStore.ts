import { create } from "zustand";
import { Asset, AssetType } from "../types";
import { mockAssets } from "../data/assets";

type TabFilter = 'all' | AssetType;

interface LibraryState {
  assets: Asset[];
  filteredAssets: Asset[];
  searchQuery: string;
  activeTab: TabFilter;
  recentSearches: string[];

  setSearchQuery: (query: string) => void;
  commitSearch: (query: string) => void;
  setActiveTab: (tab: TabFilter) => void;
  filterAssets: (query?: string) => void;
  clearFilters: () => void;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
  assets: mockAssets,
  filteredAssets: mockAssets,
  searchQuery: '',
  activeTab: 'all',
  recentSearches: [],

  setSearchQuery: (query) => set({ searchQuery: query }),

  commitSearch: (query) => {
    const trimmed = query.trim();
    const { recentSearches } = get();
    if (trimmed && !recentSearches.includes(trimmed)) {
      set({ recentSearches: [trimmed, ...recentSearches.slice(0, 4)] });
    }
    get().filterAssets(trimmed);
  },

  setActiveTab: (tab) => set({ activeTab: tab }),

  filterAssets: (queryOverride?: string) => {
    const { assets, searchQuery, activeTab } = get();
    const query = queryOverride ?? searchQuery;
    const filtered = assets.filter((a) => {
      const matchesSearch = a.title.toLowerCase().includes(query.toLowerCase());
      const matchesType = activeTab === 'all' || a.type === activeTab;
      return matchesSearch && matchesType;
    });
    set({ filteredAssets: filtered });
  },

  clearFilters: () => {
    set({
      searchQuery: '',
      filteredAssets: mockAssets,
      activeTab: 'all',
    });
  },
}));
