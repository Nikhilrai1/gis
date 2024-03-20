import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { ChipSelectInput, SelectInput } from '@/components/ui/SelectInput'
import { useAppSelector } from '@/redux/store'
import { showToast } from '@/lib/Toast'
import { useCreateLineChartMutation, useGetFormsAndFieldsQuery } from '@/redux/features/chart/chartApi'
import { useGetGisDataPropertiesQuery } from '@/redux/features/gis-data/gisApi'
import { useNavigate } from 'react-router-dom'
import { ErrorPayload } from '@/typing'


const getFormFieldsOptions = (formFields: any) => {
    const formFieldsData: { label: string, value: string }[] = [];
    const formData: { label: string, value: string }[] = [];
    formFields?.map(el => {
        el?.form && formData.push(el.form);
        el?.attributes && el?.attributes?.length > 0 && formFieldsData.push(...el.attributes);
    });
    return { formData, formFieldsData };
}



interface CreateChartProps {
    setModalOpen: (modalOpen: boolean) => void;
}


const CreateChart = ({ setModalOpen }: CreateChartProps) => {
    const { gisData } = useAppSelector(state => state.gis);
    const { data: formFieldsData } = useGetFormsAndFieldsQuery({
        gisId: gisData?.id as string || ""
    });
    const navigate = useNavigate();

    const { formData: formDataOptions, formFieldsData: formFields } = getFormFieldsOptions(formFieldsData);
    const form = useForm<any>();
    const [createLineChart] = useCreateLineChartMutation();

    const { data: features } = useGetGisDataPropertiesQuery({
        id: gisData?.id as string || "",
        params: {
            page: "all",
            per_page: 100,
            search: ""
        }
    });


    // 2. Define a submit handler.
    async function onSubmit(data: any) {
        console.log(data)
        createLineChart({
            gis_id: gisData?.id || "",
            ...data,
            x_field: data.date_field,
            y_field: data.value,
            filters: {
                dropdowns: [],
                range_filters: []
            }
        }).unwrap().then((chartData) => {
            showToast("Create Chart Successfully.", { type: "success" });
            navigate("/chart/single", {
                state: {
                    dataField: data,
                    chartData
                }
            });
        }).catch((err: ErrorPayload) => {
            console.log(err)
            err?.data?.errors.map(el => {
                showToast(el.message, {
                    type: "error",
                })
            })
        });

        if (!data) {
            showToast("Please fill all required fields", { type: "info" })
            return;
        }
        setModalOpen(false);
        navigate("/chart/single", {
            state: {
                dataField: data
            }
        });
    };


    return (
        <div className=''>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='grid grid-cols-1 gap-5'>
                        <FormField
                            control={form.control}
                            name={"form"}
                            render={({ field }) => (
                                <FormItem className='xl:pr-5'>
                                    <FormLabel className='capitalize flex gap-2'>
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
                                    <FormLabel className='capitalize flex gap-2'>
                                        Form
                                        <p className='text-red-500'>*</p>
                                    </FormLabel>
                                    <FormControl>
                                        <SelectInput
                                            {...field}
                                            defaultValue={form.watch("form")}
                                            onSelect={(option) => {
                                                form.setValue("form" || "", option.value);
                                                //@ts-ignore
                                                form.setValue("collection_name", formDataOptions?.find(el => el.value === option.value)?.collection_name)
                                            }}
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
                                    <FormLabel className='capitalize flex gap-2'>
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
                                    <FormLabel className='capitalize flex gap-2'>
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
                        />
                    </div>

                    <div className='flex items-center gap-3 justify-end'>
                        <Button
                            type='submit'
                        >
                            Save Details
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateChart

