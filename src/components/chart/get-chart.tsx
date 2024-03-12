import { ChartTypeEnum } from "@/enums";
import { ActiveElement, ChartData, ChartEvent, ChartOptions } from "chart.js";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import { ChartType } from "./ChartDiagram";


export function getChartComponent(
  type: ChartTypeEnum,
  data: ChartData,
  option: ChartOptions ,
  handleChangeColor: (chartEvent: ChartEvent, elements: ActiveElement[], chart: ChartType) => void
) {

  option.onClick = handleChangeColor;
  switch (type) {
    case ChartTypeEnum.BAR:
      return (
        <Bar
          options={option as ChartOptions<"bar">}
          width={300}
          height={300}
          data={data as ChartData<"bar">}          
        />
      );
    case ChartTypeEnum.LINE:
      return (
        <Line
          options={option as ChartOptions<"line">}
          width={300}
          height={300}
          data={data as ChartData<"line">}
        />
      );
    case ChartTypeEnum.PIE:
      return (
        <Pie
          options={option as ChartOptions<"pie">}
          width={300}
          height={300}
          data={data as ChartData<"pie">}
        />
      );
    case ChartTypeEnum.DOUGHNUT:
      return (
        <Doughnut
          options={option as ChartOptions<"doughnut">}
          width={300}
          height={300}
          data={data as ChartData<"doughnut">}
        />
      );
  }
}
