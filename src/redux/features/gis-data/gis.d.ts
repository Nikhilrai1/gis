export interface GisFileI {
  id: number;
  name: string;
  geojson?: GeoJsonI;
}

export interface IGisProperties {
  _id: string;
  name: string | null;
  rd_name: string | null;
  ref_num: string | null;
  ward_no: string | null;
  feature_id: string;
  data_count: string;
}

export interface IGisPropertiesResponse {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: IGisProperties[];
}

export interface GisAllFileResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: GisFileI[];
}