import { DynamicObjectArrayType, SelectTypeI } from "@/typing";

export interface DynamicFormFieldI {
  id?: string;
  name: string;
  form_type: string;
  required: boolean;
  select_field: SelectTypeI[] | null;
}

export interface DynamicFormI {
  id?: string;
  gis_file: string;
  feature_ids?: any;
  name: string;
  form_fields: DynamicFormFieldI[];
}

interface GetAllDynamicFormResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: DynamicFormI[];
}

interface DynamicFormCreateRequest {
  gis_file: string;
  name: string;
  form_fields: DynamicFormFieldI[];
}

interface DynamicFormUpdateRequest {
  id: string;
  data: DynamicFormI;
}

export interface AllDynamicFormDataResponseI {
  current_page: number;
  total: number;
  per_page: number;
  total_pages: number;
  results: DynamicObjectArrayType;
}

export interface FilterFieldI {
  value: string;
  label: string;
  type: string;
  options: [
    {
      value: string;
    }
  ];
}

