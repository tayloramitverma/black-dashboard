"use client";
import FilterBar from "./components/FilterBar";
import { useLibraryStore } from "./store/useLibraryStore";
import AssetCard from "./components/AssetCard";
import { useState } from "react";
import { Asset } from "./types";

export default function LibraryPage() {
  const { filteredAssets } = useLibraryStore();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">KPI Library</h1>
      <FilterBar />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            asset={asset}
            onClick={() => setSelectedAsset(asset)}
          />
        ))}
      </div>

      {/* Coming soon: Modal */}
      {/* selectedAsset && <AssetModal asset={selectedAsset} onClose={() => setSelectedAsset(null)} /> */}
    </main>
  );
}
