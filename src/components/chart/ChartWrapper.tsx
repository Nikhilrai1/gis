import {
  ArcElement,
  BarElement,
  CategoryScale,
  ChartData,
  Chart as ChartJs,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { initialChartOptions } from "./chart-option";
import { getChartComponent } from "./get-chart";
import { ChartTypeEnum } from "@/enums";

ChartJs.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  // Legend,
  Tooltip,
  ArcElement
);
interface PropsI {
  type: ChartTypeEnum;
  data: ChartData;
  title: string;
}
const ChartWrapper = ({ type, data, title }: PropsI) => {
  return (
    <div className="p-5 border border-solid  border-slate-200 rounded-md shadow-md">
      <h1 className="text-center font-bold mb-5">
        <span className="uppercase">{type}</span> Chart
        <span className="capitalize">{title}</span>
      </h1>
      <div className="w-full  flex justify-center items-center p-8">
        {getChartComponent(type, data, initialChartOptions)}
      </div>
    </div>
  );
};

export default ChartWrapper;
