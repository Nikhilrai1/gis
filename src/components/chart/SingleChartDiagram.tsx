import { useEffect, useState } from "react";
import { ActiveElement, BubbleDataPoint, Chart, ChartData, ChartEvent, ChartTypeRegistry, Point } from "chart.js";
import { ChartTypeEnum } from "@/enums";
import ChartWrapper from "@/components/chart/ChartWrapper";
import { LineChartResponse } from "@/redux/features/chart/chartApi";
import { dummyChartData } from "@/utils/chart/dummyChartData";
import BounceLoader from "../loader/BounceLoader";
import { chartTypeFinder } from "@/utils/chart/chart";
import { generateUniqueHexColors } from "@/utils/map/uniqueColorsGenerator";
import { useAppSelector } from "@/redux/store";

export type ChartType = Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
interface SingleChartDiagramProps {
    chartId: string;
    chartData?: LineChartResponse[];
    title: string;
    x_title: string;
    y_title: string;
    chartRef: React.RefObject<HTMLDivElement>;
}

const SingleChartDiagram = ({ chartData, title, x_title, y_title, chartRef }: SingleChartDiagramProps) => {
    // STATE
    const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
    const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.BAR);
    const { color } = useAppSelector(state => state.gisSetting);

    // REDUX
    const isLoading = false;


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
        if (chartData && chartData?.length > 0) {
            const newDataSet: ChartData = {
                labels: chartData[0].label,
                datasets: chartData?.map((data) => {
                    return {
                        label: "x-axis",
                        data: data.data as any,
                        backgroundColor: generateUniqueHexColors(
                            data.data.length
                        ),
                        borderColor: "black",
                        borderWidth: 2,
                    }
                })
            }

            setChartDataSet(newDataSet);
            setChartType(chartTypeFinder(ChartTypeEnum.LINE));
        }
    }, [chartData]);



    return (
        <div className=" w-2/4">
            {/* <button onClick={handleCapture}>capture</button> */}
            {isLoading ? (
                <BounceLoader />
            ) : (
                <div ref={chartRef} className="w-full  gap-20">
                    <ChartWrapper
                        type={chartType}
                        data={chartDataSet}
                        title={title}
                        legend={true}
                        handleChangeColor={handleChangeColor}
                        x_title={x_title}
                        y_title={y_title}
                    />
                </div>
            )}
        </div>
    );
};

export default SingleChartDiagram;
