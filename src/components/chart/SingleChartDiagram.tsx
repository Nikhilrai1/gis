import { useState } from "react";
import { ActiveElement, BubbleDataPoint, Chart, ChartData, ChartEvent, ChartTypeRegistry, Point } from "chart.js";
import { ChartTypeEnum } from "@/enums";
import ChartWrapper from "@/components/chart/ChartWrapper";
import { LineChartRequest, LineChartResponse } from "@/redux/features/chart/chartApi";
import { dummyChartData } from "@/utils/chart/dummyChartData";
import { useAppSelector } from "@/redux/store";

export type ChartType = Chart<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;
interface SingleChartDiagramProps {
    chartId: string;
    chartData?: LineChartResponse[];
    title: string;
    x_title: string;
    y_title: string;
    chartRef: React.RefObject<HTMLDivElement>;
    dataField: LineChartRequest;
}

const SingleChartDiagram = ({ title, x_title, y_title, chartRef }: SingleChartDiagramProps) => {
    // STATE
    const [chartDataSet, setChartDataSet] = useState<ChartData>(dummyChartData);
    const [chartType] = useState<ChartTypeEnum>(ChartTypeEnum.BAR);
    const { color } = useAppSelector(state => state.gisSetting);
    // const form = useForm<any>();

    // const { gisData } = useAppSelector(state => state.gis);
    // const [createLineChart, { isLoading: createLoading, isSuccess: createLineChartSuccess }] = useCreateLineChartMutation();
    // const [getUniqueValues, { data: dateOptions }] = useGetAttributeUniqueValueMutation();


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

    // useEffect(() => {
    //     getUniqueValues({
    //         collection: "dummy_data",
    //         attribute: "date",
    //     })
    // }, []);

    // useEffect(() => {
    //     if (createLineChartSuccess) {
    //         console.log("success")
    //         getUniqueValues({
    //             collection: "dummy_data",
    //             attribute: "date",
    //         })
    //     }
    // }, [createLineChartSuccess]);

    // // // USE EFFECT
    // useEffect(() => {
    //     if (chartData && chartData?.length > 0) {
    //         const newDataSet: ChartData = {
    //             labels: chartData[0].label,
    //             datasets: chartData?.map((data) => {
    //                 return {
    //                     label: "x-axis",
    //                     data: data.data as any,
    //                     backgroundColor: generateUniqueHexColors(
    //                         data.data.length
    //                     ),
    //                     borderColor: "black",
    //                     borderWidth: 2,
    //                 }
    //             })
    //         }

    //         setChartDataSet(newDataSet);
    //         setChartType(chartTypeFinder(ChartTypeEnum.LINE));
    //     }
    // }, [chartData]);



    // async function onSubmit(data: any) {
    //     createLineChart({
    //         form: dataField?.form || "",
    //         date_field: dataField?.date_field || "",
    //         feature_id: dataField?.feature_id || [],
    //         value: dataField?.value || "",
    //         filters: {
    //             date: {
    //                 $gte: data.from || "",
    //                 $lte: data.to || ""
    //             },
    //             parameter: {
    //                 $eq: "ppt"
    //             },
    //             unit: {
    //                 $eq: "mm"
    //             }
    //         }
    //     }).unwrap().then(chart => {
    //         if (chart && chart?.length > 0) {
    //             const newDataSet: ChartData = {
    //                 labels: chart[0].label,
    //                 datasets: chart?.map((data) => {
    //                     return {
    //                         label: "x-axis",
    //                         data: data.data as any,
    //                         backgroundColor: generateUniqueHexColors(
    //                             data.data.length
    //                         ),
    //                         borderColor: "black",
    //                         borderWidth: 2,
    //                     }
    //                 })
    //             }

    //             setChartDataSet(newDataSet);
    //             setChartType(chartTypeFinder(ChartTypeEnum.LINE));
    //         }
    //     })
    // };

    return (
        <div className="w-full">
            <div ref={chartRef} className="w-full  gap-20">
                {/* <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-5 p-5">
                            <div className='flex item-center'>

                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name={"from"}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch("from")}
                                                        onSelect={(option) => form.setValue("from" || "", option.value)}
                                                        placeholder='Select From'
                                                        options={(dateOptions?.unique_values && dateOptions?.unique_values?.length > 0) ? dateOptions?.unique_values?.map(val => ({
                                                            label: val,
                                                            value: val
                                                        })) : []}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex-1">
                                    <FormField
                                        control={form.control}
                                        name={"to"}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch("to")}
                                                        onSelect={(option) => form.setValue("to" || "", option.value)}
                                                        placeholder='Select to'
                                                        options={(dateOptions?.unique_values && dateOptions?.unique_values?.length > 0) ? dateOptions?.unique_values?.map(val => ({
                                                            label: val,
                                                            value: val
                                                        })) : []}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <Button
                                    type='submit'
                                    disabled={createLoading}
                                >
                                    {createLoading ? "Getting..." : "Get"}
                                </Button>
                            </div>


                        </form>
                    </Form> */}
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
        </div>
    );
};

export default SingleChartDiagram;
