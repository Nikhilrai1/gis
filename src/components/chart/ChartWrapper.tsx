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
  legend: boolean;
  handleChangeColor: (chartEvent: ChartEvent, elements: ActiveElement[], chart: ChartType) => void;
}
const ChartWrapper = ({ type, data, title, legend, handleChangeColor }: PropsI) => {
  return (
    <div className="p-5 border border-solid  border-slate-200 rounded-md shadow-md">
      <h1 className="text-center font-bold mb-5">
        <span className="capitalize">{title}</span>
        {/* <span className="uppercase">{type}{" "}</span> */}
      </h1>
      <div className="w-full  flex justify-center items-center p-8">
        {getChartComponent(type, data, initialChartOptions({legend}),handleChangeColor)}
      </div>
    </div>
  );
};

export default ChartWrapper;
