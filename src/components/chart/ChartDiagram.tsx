import { useEffect, useState } from "react";
import { ChartData } from "chart.js";
import { ChartTypeEnum } from "@/enums";
import ChartWrapper from "@/components/chart/ChartWrapper";
import { useRetrieveChartQuery } from "@/redux/features/chart/chartApi";
import { dummyChartData } from "@/utils/chart/dummyChartData";
import BounceLoader from "../loader/BounceLoader";
import { createBackgroundColor } from "@/utils/helpers/random-color-generator";
import { chartTypeFinder } from "@/utils/chart/chart";


interface ChartDiagramProps {
    chartId: string;
}
const ChartDiagram = ({ chartId }: ChartDiagramProps) => {

    // STATE
    const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
    const [chartType, setChartType] = useState<ChartTypeEnum>(ChartTypeEnum.BAR);

    // REDUX
    const { data: chartData, isLoading } = useRetrieveChartQuery({
        chartId: chartId || "",
    });

    console.log("chartData", chartData)

    // // USE EFFECT
    useEffect(() => {
        if (chartData?.total) {
            const dataSet: ChartData = {
                labels: chartData.results.map((data) => data.label),
                datasets: [
                    {
                        label: chartData.chart_details.title,
                        data: chartData.results.map((data) => data.data),
                        backgroundColor: createBackgroundColor(
                            chartType,
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
                <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-20">
                    <ChartWrapper
                        type={chartType}
                        data={chartDataSet}
                        title={chartData?.chart_details.title || ""}
                    />
                </div>
            )}
        </>
    );
};

export default ChartDiagram;
