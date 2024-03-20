export type StringArrayType = string[];
export type DynamicObjectType = {
  [key: string]: any;
};

export type DynamicObjectArrayType = DynamicObjectType[];

export interface SelectTypeI {
  label: string;
  value: string;
}

export interface SearchParamsI {
  search?: string;
  page: number | string;
  per_page: number | string;
  filter?: DynamicObjectArrayType | null;
}

interface ErrorPayload {
  status: number;
  data: {
    errors: Error[];
  };
}
interface Error {
  message: string;
  field: string;
}

const error = {
  data: {
    errors: [
      {
        field: "",
        message: "urgrfugr"
      }
    ]
  }
}


// geojson type
export interface GeoJsonPropertiesI {
  name?: string;
  rd_name?: string | null;
  ref_rd?: string | null;
  ward_no?: string | null;
  feature_id?: number;
  data_count?: number;
}

export type Coordinate = [number, number];

interface GeoJsonGeometry {
  type: string;
  coordinates: any;
}

export interface GeoJsonFeatureI {
  id: string;
  type: string;
  geometry: GeoJsonGeometry;
  properties: GeoJsonPropertiesI;
}

interface CrsI {
  type: string;
  properties: {
    name: string;
  };
}

export interface GeoJsonI {
  crs: CrsI;
  type: string;
  features: GeoJsonFeatureI[];
}


export interface GeoJsonType {
  id: string;
  type: string;
  properties: {
    [key: string]: string;
  };
  geometry: {
    type: string;
    coordinates: any;
  }
}

export type CoordinatesPointType = [number, number];
export type CoordinatesPolygonType = [CoordinatesPointType[]];


