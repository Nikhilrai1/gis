export interface AllSavedLineChartResponse {
    current_page: number;
    total: number;
    per_page: number;
    total_pages: number;
    results: Result[];
  }
  
  interface Result {
    id: string;
    feature_ids: string[];
    title: string;
    description: string;
    image: string;
    x_axis_title: string;
    y_axis_title: string;
    gis_file: number;
    form: string;
    x_field: string;
    y_field: string;
  }


  export interface GetChartFilter {
    dropdowns: ChartDropdown[];
    range_filters: Rangefilter[];
  }
  
  interface Rangefilter {
    key: string;
    data_type: string;
    min: number | string;
    max: number | string;
    operators: Operator[];
  }
  
  interface ChartDropdown {
    key: string;
    data_type: string;
    options: string[];
    operators: Operator[];
  }
  
  interface Operator {
    label: string;
    value: string;
  }