import { useEffect, useState } from "react";
import { ActiveElement, BubbleDataPoint, Chart, ChartData, ChartEvent, ChartTypeRegistry, Point } from "chart.js";
import { ChartTypeEnum } from "@/enums";
import ChartWrapper from "@/components/chart/ChartWrapper";
import { useRetrieveChartQuery } from "@/redux/features/chart/chartApi";
import { dummyChartData } from "@/utils/chart/dummyChartData";
import BounceLoader from "../loader/BounceLoader";
import { chartTypeFinder } from "@/utils/chart/chart";
import { generateUniqueHexColors } from "@/utils/map/uniqueColorsGenerator";
import { useAppSelector } from "@/redux/store";

export type ChartType = Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
interface ChartDiagramProps {
    chartId: string;
}
const ChartDiagram = ({ chartId }: ChartDiagramProps) => {

    // STATE
    const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
    const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.BAR);
    const {color} = useAppSelector(state => state.gisSetting);

    // REDUX
    const { data: chartData, isLoading } = useRetrieveChartQuery({
        chartId: chartId || "",
    });


    // console.log("chartData", chartDataSet);



    // utils
    const handleChangeColor = (_: ChartEvent, elements: ActiveElement[], __: ChartType) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const newChartData = { ...chartDataSet };

            if (newChartData?.datasets && newChartData?.datasets[datasetIndex] && newChartData?.datasets[datasetIndex]?.backgroundColor) {
                // @ts-ignore
                newChartData.datasets[datasetIndex].backgroundColor[index] = color;
                setChartDataSet(newChartData);
            }

        }
    }

    // // USE EFFECT
    useEffect(() => {
        if (chartData?.total) {
            const dataSet: ChartData = {
                labels: chartData.results.map((data) => data.label),
                datasets: [
                    {
                        label: chartData.chart_details.title,
                        data: chartData.results.map((data) => data.data),
                        backgroundColor: generateUniqueHexColors(
                            chartData.results.length
                        ),
                        borderColor: "black",
                        borderWidth: 2,
                    },
                ],
            };

            setChartDataSet(dataSet);
            if (chartData.chart_details.chart)
                setChartType(chartTypeFinder(chartData.chart_details.chart));
        }
    }, [chartData]);



    return (
        <>
            {isLoading ? (
                <BounceLoader />
            ) : (
                <div className="w-full grid grid-cols-1  gap-20">
                    <ChartWrapper
                        type={chartType}
                        data={chartDataSet}
                        title={chartData?.chart_details.title || ""}
                        legend={true}
                        handleChangeColor={handleChangeColor}
                        x_title={""}
                        y_title=""
                    />
                </div>
            )}
        </>
    );
};

export default ChartDiagram;
