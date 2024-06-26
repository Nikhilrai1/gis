import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectInput } from '@/components/ui/SelectInput'
import { LineChartFilterType, LineChartRequest, LineChartResponse, useCreateLineChartMutation, useGetChartsFilterMutation } from '@/redux/features/chart/chartApi'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { showToast } from '@/lib/Toast'
import { ErrorPayload } from '@/typing'
import { useAppSelector } from '@/redux/store'
import { SaveIcon } from 'lucide-react'
import BounceLoader from '@/components/loader/BounceLoader'


// utils function -------------------------------------
function convertInputType(input: string): any {
    switch (input.toLowerCase()) {
        case "int":
        case "float":
        case "number":
        case "double":
            return "number";
        case "date":
            return "date";
        default:
            return "text";
    }
}


function legitMinMax(type: string, value: string | number): any {
    if (type === "date" && typeof value === "string") {
        return value.split(" ")[0];
    }
    return value
}



// linechartfilter component
interface LineChartFilterSettingsProps {
    data_field: LineChartRequest;
    setChartData: (chartData: LineChartResponse[]) => void;
}


const LineChartFilterSettings = ({ data_field, setChartData }: LineChartFilterSettingsProps) => {

    const { gisData } = useAppSelector(state => state.gis);
    const [getChartsFilter, { data: filterData, isLoading: filterDataLoading }] = useGetChartsFilterMutation();
    const [createLineChart] = useCreateLineChartMutation();
    const form = useForm<any>();


    // 2. Define a submit handler.
    async function onSubmit(newData: any) {
        if (!newData) return;
        const allData = newData?.all_data;
        const data_per_page = newData?.data_per_chart;
        const chart_page = newData?.chart_page;
        const newFilter: LineChartFilterType = {
            dropdowns: [],
            range_filters: []
        };

        Object.keys(newData).map((el) => {
            const attributeKey = el.split("_");
            const type = attributeKey[0];
            const key = attributeKey[1];
            const data_type = attributeKey[2];


            if (type === "dropdowns") {
                if (!newFilter?.dropdowns?.find(el => el.key === key)) {
                    newFilter["dropdowns"].push({
                        data_type: data_type,
                        key: key,
                        operators: newData[`dropdowns_${key}_${data_type}_operators`],
                        value: newData[`dropdowns_${key}_${data_type}_value`]
                    })
                }
            }

            else if (type === "rangeFilters") {
                if (!newFilter?.range_filters?.find(el => el.key === key)) {
                    const newObj = {
                        data_type: data_type,
                        key: key,
                        gte: newData[`rangeFilters_${key}_${data_type}_gte`] + `${data_type === "date" ? " 00:00:00" : ""}`,
                        lte: newData[`rangeFilters_${key}_${data_type}_lte`] + `${data_type === "date" ? " 00:00:00" : ""}`
                    }
                    if (newObj.gte && newObj.lte) {
                        newFilter["range_filters"].push(newObj)
                    }
                }
            }

        })

        createLineChart({
            data: {
                gis_id: gisData?.id || "",
                feature_id: data_field?.feature_id || [],
                form: data_field?.form || "",
                x_field: data_field?.date_field || "",
                y_field: data_field?.value || "",
                filters: newFilter,
            },
            params: {
                page: allData ? "all" : chart_page ? chart_page : 1,
                per_page: data_per_page ? data_per_page : 10
            }
        }).unwrap().then((chartData) => {
            setChartData(chartData);
            showToast("Create Chart Successfully.", { type: "success" });
        }).catch((err: ErrorPayload) => {
            console.log(err)
            err?.data?.errors.map(el => {
                showToast(el.message, {
                    type: "error",
                })
            })
        });
    };

    useEffect(() => {
        getChartsFilter({
            collection: data_field?.collection_name || ""
        })
    }, [])


    return (
        <div className='overflow-y-scroll'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                    <div className='flex flex-col gap-5'>
                        <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Filter</h2>
                        <div className='grid grid-cols-1 gap-5'>
                            {filterDataLoading && <BounceLoader />}
                            {filterData?.dropdowns && filterData?.dropdowns?.length > 0 && filterData?.dropdowns?.map((el, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <FormField
                                        control={form.control}
                                        name={`dropdowns_${el?.key}_${el?.data_type}_value`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2 text-white'>
                                                    {el?.key}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch(`dropdowns_${el?.key}_${el?.data_type}_value`)}
                                                        onSelect={(option) => form.setValue(`dropdowns_${el?.key}_${el?.data_type}_value` || "", option.value)}
                                                        placeholder={`Select ${el?.key}`}
                                                        options={(el?.options?.length > 0) ? el?.options?.map((el: any) => ({
                                                            label: el,
                                                            value: el
                                                        })) : []}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`dropdowns_${el?.key}_${el?.data_type}_operators`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2 text-white'>
                                                    {`${el?.key} Operators`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch(`dropdowns_${el?.key}_${el?.data_type}_operators`)}
                                                        onSelect={(option) => form.setValue(`dropdowns_${el?.key}_${el?.data_type}_operators` || "", option.value)}
                                                        placeholder={`Select operator`}
                                                        options={(el?.operators?.length > 0) ? el?.operators : []}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Range Filter</h2>
                        <div className='grid grid-cols-1 gap-5'>
                            {filterDataLoading && <BounceLoader />}
                            {filterData?.range_filters && filterData?.range_filters?.length > 0 && filterData?.range_filters?.map((el, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <FormField
                                        control={form.control}
                                        name={`rangeFilters_${el?.key}_${el?.data_type}_gte`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2 text-white'>
                                                    {`${el?.key} from`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={`Select ${el?.key} from`}
                                                        className='px-4'
                                                        type={convertInputType(el?.data_type || "")}
                                                        step={(el?.data_type === "float" || el?.data_type === "double") ? "0.01" : "1"}
                                                        min={legitMinMax(el?.data_type, el?.min)}
                                                        max={legitMinMax(el?.data_type, el?.max)}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`rangeFilters_${el?.key}_${el?.data_type}_lte`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2 text-white'>
                                                    {`${el?.key} to`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={`Select ${el?.key} to`}
                                                        className='px-4'
                                                        type={convertInputType(el?.data_type || "")}
                                                        min={legitMinMax(el?.data_type, el?.min)}
                                                        max={legitMinMax(el?.data_type, el?.max)}
                                                        step={(el?.data_type === "float" || el?.data_type === "double") ? "0.01" : "1"}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}

                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Advanced Settings</h2>
                        <div className='grid grid-cols-1 gap-5'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                {/* <FormField
                                        control={form.control}
                                        name={`dropdowns_${el?.key}_${el?.data_type}_value`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2 text-white'>
                                                    {el?.key}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch(`dropdowns_${el?.key}_${el?.data_type}_value`)}
                                                        onSelect={(option) => form.setValue(`dropdowns_${el?.key}_${el?.data_type}_value` || "", option.value)}
                                                        placeholder={`Select ${el?.key}`}
                                                        options={(el?.options?.length > 0) ? el?.options?.map((el: any) => ({
                                                            label: el,
                                                            value: el
                                                        })) : []}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    /> */}
                                <FormField
                                    control={form.control}
                                    name={`chart_page`}
                                    render={({ field }) => (
                                        <FormItem className='xl:pr-5'>
                                            <FormLabel className='capitalize flex gap-2 text-white'>
                                                Chart Page
                                                {/* <p className='text-red-500'>*</p> */}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={`Chart Page`}
                                                    className='px-4'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`data_per_chart`}
                                    render={({ field }) => (
                                        <FormItem className='xl:pr-5'>
                                            <FormLabel className='capitalize flex gap-2 text-white'>
                                                Data Per Chart
                                                {/* <p className='text-red-500'>*</p> */}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={`Data Per Chart`}
                                                    className='px-4'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name={`all_data`}
                                    render={({ field }) => (
                                        <FormItem className='xl:pr-5'>
                                            <FormLabel className='capitalize flex gap-2 text-white'>
                                                All data
                                            </FormLabel>
                                            <FormControl>
                                                <input
                                                    {...field}
                                                    type='checkbox'
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                            </div>

                        </div>
                    </div>


                    <div className='flex items-center gap-3 w-full'>
                        <Button
                            type='submit'
                            className='w-full flex items-center gap-2'
                        >
                            <SaveIcon size={20} />
                            Save Filter
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default LineChartFilterSettings

