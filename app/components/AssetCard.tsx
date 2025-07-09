"use client";
import { Asset } from "../types";
import Image from "next/image";

interface AssetCardProps {
  asset: Asset;
  onClick?: (asset: Asset) => void;
}

export default function AssetCard({ asset, onClick }: AssetCardProps) {
  return (
    <div
      className="flex cursor-pointer border rounded-lg shadow hover:shadow-md transition overflow-hidden bg-white"
      onClick={() => onClick?.(asset)}
    >
      <div className="w-1/3 bg-gray-100 relative min-h-[100px]">
        <Image
          src="/graph-placeholder.svg"
          alt="Graph"
          fill
          className="object-contain p-2"
        />
      </div>

      <div className="w-2/3 p-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800 truncate">
          {asset?.title ?? ""}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {asset?.description ?? ""}
        </p>
      </div>
    </div>
  );
}
