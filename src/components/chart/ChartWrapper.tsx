import {
  ActiveElement,
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  ChartEvent,
  Chart as ChartJs,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,

} from "chart.js";
import { initialChartOptions } from "./chart-option";
import { getChartComponent } from "./get-chart";
import { ChartTypeEnum } from "@/enums";
import { ChartType } from "./ChartDiagram";

ChartJs.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  ArcElement
);
interface PropsI {
  type: ChartTypeEnum;
  data: ChartData;
  title: string;
  x_title: string;
  y_title: string;
  legend: boolean;
  handleChangeColor: (chartEvent: ChartEvent, elements: ActiveElement[], chart: ChartType) => void;
}
const ChartWrapper = ({ type, data, title, legend, handleChangeColor, x_title, y_title }: PropsI) => {
  return (
    <div className="p-5 border border-solid  border-slate-200 rounded-md w-full">
      <h1 className="text-center font-bold mb-4 capitalize text-2xl">
        {title}
      </h1>
      <div className="w-full  flex justify-center items-center">
        {getChartComponent(
          type,
          data,
          { ...initialChartOptions({ legend }) },
          handleChangeColor,
          {
            x: x_title,
            y: y_title
          }
        )}
      </div>
    </div>
  );
};

export default ChartWrapper;
