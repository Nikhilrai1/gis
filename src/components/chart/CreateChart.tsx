import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useParams } from 'react-router-dom'
import { SelectInput } from '@/components/ui/SelectInput'
import { useAppSelector } from '@/redux/store'
import { showToast } from '@/lib/Toast'
import { ErrorPayload } from '@/typing'
import { useCreateChartMutation, useGetFormsAndFieldsQuery } from '@/redux/features/chart/chartApi'


const getFormFieldsOptions = (formFields: any) => {
    const formFieldsData: { label: string, value: string }[] = [];
    const formData: { label: string, value: string }[] = [];
    formFields?.map(el => {
        el?.form && formData.push(el.form);
        el?.attributes && el?.attributes?.length > 0 && formFieldsData.push(...el.attributes);
    });
    return { formData, formFieldsData };
}


const chartsOptions = [
    { "label": "BAR", "value": "BAR" },
    { "label": "PIE", "value": "PIE" },
    { "label": "LINE", "value": "LINE" }
]

interface CreateChartProps {
    setModalOpen: (modalOpen: boolean) => void;
}


const CreateChart = ({ setModalOpen }: CreateChartProps) => {
    const { gisData } = useAppSelector(state => state.gis);
    const { data: formFieldsData } = useGetFormsAndFieldsQuery({
        gisId: gisData?.id as string || ""
    });

    const { formData: formDataOptions, formFieldsData: formFields } = getFormFieldsOptions(formFieldsData);
    const form = useForm<any>();
    const params = useParams();
    const [createChart, { isLoading: createLoading }] = useCreateChartMutation();

    const { gisData: currGisData } = useAppSelector(state => state.gis);

    // 2. Define a submit handler.
    async function onSubmit(data: any) {
        createChart({
            gis_file: `${currGisData?.id}` || "",
            title: data.title,
            x_axis_title: data.x_axis_title,
            y_axis_title: data.y_axis_title,
            form_field: data.form_field,
            chart: data.chart,
            operation: data.operation,
            form: data.form,
            id: params.id as string
        }).unwrap().then(() => {
            showToast("Create Chart Successfully.", { type: "success" });
            setModalOpen(false)
        }).catch((err: ErrorPayload) => {
            err?.data?.errors.map(el => {
                showToast(el.message, {
                    type: "error",
                })
            })
        });

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
                                    <FormLabel className='capitalize flex gap-2'>Title <p className='text-red-500'>*</p> </FormLabel>
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
                                    <FormLabel className='capitalize flex gap-2'>X-Axis Title <p className='text-red-500'>*</p> </FormLabel>
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
                                    <FormLabel className='capitalize flex gap-2'>Y-Axis Title<p className='text-red-500'>*</p> </FormLabel>
                                    <FormControl>
                                        <Input {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border' />
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
                                    <FormLabel className='capitalize flex gap-2'>
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
                            name={"form_field"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2'>
                                        Form Field
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("form_field")}
                                            onSelect={(option) => form.setValue("form_field" || "", option.value)}
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
                            name={"chart"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2'>
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
                        />
                        <FormField
                            control={form.control}
                            name={"operation"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2'>
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
                        />
                    </div>

                    <div className='flex items-center gap-3 justify-end'>
                        <Button
                            type='submit'
                            disabled={createLoading}
                        >
                            {createLoading ? "Creating..." : "Create"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateChart

