export type AssetType = "kpi" | "layout" | "dataviz" | "storyboard";

export interface Asset {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  affiliate: string;
  tags: string[];
  hasAccess: boolean;
}
