export interface GisData {
  id: number | string;
  name: string;
  geojson?: GisJson[];
  _type?: string;
  crs: string;
  properties_col_name: string;
  geometries_col_name?: string;
}


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
  results: GisData[];
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


// collection filter
interface Operator {
  label: string;
  value: string;
}

interface Attribute {
  data_type: string;
  min: null;
  max: null;
  mean: number | null,
  st_dev: number | null,
  operators: Operator[];
}

export interface CollectionFilter {
  [key: string]: Attribute;
}
