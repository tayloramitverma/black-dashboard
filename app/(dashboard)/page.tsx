"use client";
import FilterBar from "../components/FilterBar";
import { useLibraryStore } from "../store/useLibraryStore";
import AssetCard from "../components/AssetCard";
import { useState } from "react";
import { Asset } from "../types";
import { AssetModal } from "../components/AssetModal";

export default function LibraryPage() {
  const { filteredAssets } = useLibraryStore();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const categorized = {
    trending: filteredAssets.filter((a) => a.favoriteCount > 50),
    featured: filteredAssets.filter((a) => a.featuredItem),
    others: filteredAssets.filter((a) => ['kpi', 'layout', 'dataviz', 'storyboard'].includes(a.type) && !a.featuredItem && a.favoriteCount <= 100),
  };

  return (
    <main className="p-6 space-y-5 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Library</h1>
      <p className="text-sm font-light text-center text-gray-500">Browse for assets needed to report & analysis</p>
      <FilterBar />
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {Object.entries(categorized).map(([label, items]) => (
          <div key={label}>
            <h2 className="text-2xl font-bold capitalize mb-4">{label}</h2>
            {items.length === 0 && <p className="text-gray-500">No items found in this category.</p>}
            {items.length > 0 &&
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((asset) => (
                  <AssetCard key={asset.id} asset={asset} onClick={() => setSelectedAsset(asset)} />
                ))}
              </div>
            }
          </div>
        ))}
        {selectedAsset && <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} />}
      </div>
    </main>
  );
}
