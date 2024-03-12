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