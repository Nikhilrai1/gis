import { useEffect, useState } from "react";
import { ActiveElement, BubbleDataPoint, Chart, ChartData, ChartEvent, ChartTypeRegistry, Point } from "chart.js";
import { ChartTypeEnum } from "@/enums";
import ChartWrapper from "@/components/chart/ChartWrapper";
import { LineChartRequest, LineChartResponse } from "@/redux/features/chart/chartApi";
import { dummyChartData } from "@/utils/chart/dummyChartData";
import { useAppSelector } from "@/redux/store";
import { generateUniqueHexColors } from "@/utils/map/uniqueColorsGenerator";
import { chartTypeFinder } from "@/utils/chart/chart";

export type ChartType = Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
interface SingleChartDiagramProps {
    chartId: string;
    chartData?: LineChartResponse[];
    title: string;
    x_title: string;
    y_title: string;
    chartRef: React.RefObject<HTMLDivElement>;
    dataField: LineChartRequest;
    chartType: "BAR" | "LINE" | "PIE" | "DOUGHNUT";
}

const SingleChartDiagram = ({ title, x_title, y_title, chartRef, chartData, chartType }: SingleChartDiagramProps) => {
    // STATE
    const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
    const { color } = useAppSelector(state => state.gisSetting);
    // utils
    const handleChangeColor = (_: ChartEvent, elements: ActiveElement[], __: ChartType) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const newChartData = { ...chartDataSet };

            if (newChartData?.datasets && newChartData?.datasets[datasetIndex] && newChartData?.datasets[datasetIndex]?.backgroundColor) {
                // @ts-ignore
                newChartData.datasets[datasetIndex].backgroundColor[index] = color;
                // @ts-ignore
                newChartData.datasets[datasetIndex].borderColor = color;
                // @ts-ignore
                setChartDataSet(newChartData);
            }
        }
    };


    // // USE EFFECT
    useEffect(() => {
        if (chartData && chartData?.length > 0) {
            const newDataSet: ChartData = {
                labels: chartData[0].label?.map((label) => label?.split(" ")[0]) as any,
                datasets: chartData?.map((data) => {
                    const color = generateUniqueHexColors(data.data.length);
                    return {
                        label: data?.property?.label && data?.property?.label !== "" ? data?.property?.label : "feature " + data.property.feature_id,
                        data: data.data as any,
                        backgroundColor: color,
                        borderColor: color,
                        borderWidth: 2,
                        pointRadius: 0
                    }
                })
            }

            setChartDataSet(newDataSet);
        }
    }, [chartData]);

    return (
        <div className="w-full">
            <div ref={chartRef} className="w-full  gap-20">
                <ChartWrapper
                    type={chartTypeFinder(chartType || ChartTypeEnum.LINE)}
                    data={chartDataSet}
                    title={title}
                    legend={true}
                    handleChangeColor={handleChangeColor}
                    x_title={x_title}
                    y_title={y_title}
                />
            </div>
        </div>
    );
};

export default SingleChartDiagram;
