import { Button } from '@/components/ui/button'
import { UseFormReturn } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { showToast } from '@/lib/Toast'
import { ErrorPayload } from '@/typing'
import { LineChartRequest, useSaveLineChartMutation } from '@/redux/features/chart/chartApi'
import { useNavigate } from 'react-router-dom'
import { Input } from '@/components/ui/input'
import { useAppSelector } from '@/redux/store'

interface SaveLineChartProps {
    form: UseFormReturn<any, any, any>;
    dataField: LineChartRequest;
    handleCapture: () => Promise<string | void>;
}
const SaveLineChart = ({ form, dataField, handleCapture }: SaveLineChartProps) => {
    const navigate = useNavigate();
    const [saveLineChart, { isLoading: createLoading }] = useSaveLineChartMutation();

    const { gisData: currGisData } = useAppSelector(state => state.gis);

    // 2. Define a submit handler.
    async function onSubmit(data: any) {
        const base64 = await handleCapture();
        if(base64) {
            saveLineChart({
                description: "description",
                title: data.title,
                feature_ids: dataField.feature_id,
                form: dataField.form,
                x_axis_title: data.x_axis_title,
                gis_file: currGisData?.id as string,
                y_axis_title: data.y_axis_title,
                image: base64,
                x_field: dataField.date_field,
                y_field: dataField.value,
            }).unwrap().then((chartData) => {
                showToast("Create Chart Successfully.", { type: "success" });
                navigate("/chart/single", {
                    state: chartData
                });
            }).catch((err: ErrorPayload) => {
                console.log(err)
                err?.data?.errors.map(el => {
                    showToast(el.message, {
                        type: "error",
                    })
                })
            });
        }
        else {
            alert("select image")
        }

    };


    return (
        <div className=''>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-1 gap-5'>
                        <FormField
                            control={form.control}
                            name={"title"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize flex gap-2 text-white'>Title <p className='text-red-500'>*</p> </FormLabel>
                                    <FormControl>
                                        <Input {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"x_axis_title"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize flex gap-2 text-white'>X-Axis Title <p className='text-red-500'>*</p> </FormLabel>
                                    <FormControl>
                                        <Input {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={"y_axis_title"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className='capitalize flex gap-2 text-white'>Y-Axis Title<p className='text-red-500'>*</p> </FormLabel>
                                    <FormControl>
                                        <Input {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* <FormField
                            control={form.control}
                            name={"form"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Features
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <ChipSelectInput
                                            {...field}
                                            onSelect={(options) => form.setValue("feature_id" || "", options.map(el => el.value))}
                                            placeholder='Select Feature'
                                            options={(features?.results && features?.results?.length > 0) ? features?.results?.map(el => ({
                                                label: el?.feature_id || "",
                                                value: el?.feature_id || ""
                                            })) : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"form"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Form
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("form")}
                                            onSelect={(option) => form.setValue("form" || "", option.value)}
                                            placeholder='Select Form'
                                            options={(formDataOptions?.length > 0) ? formDataOptions : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={"date_field"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Form Field
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("date_field")}
                                            onSelect={(option) => form.setValue("date_field" || "", option.value)}
                                            placeholder='Select Form Field'
                                            options={(formFields?.length > 0) ? formFields : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name={"value"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Value
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("value")}
                                            onSelect={(option) => form.setValue("value" || "", option.value)}
                                            placeholder='Select Form field value'
                                            options={(formFields?.length > 0) ? formFields : []}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name={"chart"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Chart Type
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("chart")}
                                            onSelect={(option) => form.setValue("chart" || "", option.value)}
                                            placeholder='Select chart type'
                                            options={chartsOptions}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                        {/* <FormField
                            control={form.control}
                            name={"operation"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                        Operation
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("operation")}
                                            onSelect={(option) => form.setValue("operation" || "", option.value)}
                                            placeholder='Select Operation'
                                            options={[{ label: "Count", value: "Count" }]}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        /> */}
                    </div>

                    <div className='flex items-center gap-3'>
                        <Button
                            type='submit'
                            disabled={createLoading}
                            className='w-full bg-slate-800'
                        >
                            {createLoading ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default SaveLineChart

