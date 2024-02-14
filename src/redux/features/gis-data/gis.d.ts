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


interface GetAllGeoJson {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: GisJson[];
}

export interface GisJson {
  id: string;
  type: string;
  properties: Properties;
  geometry: Geometry;
}
interface Geometry {
  type: string;
  coordinates: number[];
}

interface Properties {
  _id: string;
  rd_name: string;
  ref_rd: string;
  ward_no: string;
}

