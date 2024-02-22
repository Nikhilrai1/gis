import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import PageLayout from '@/components/layout/PageLayout'
import { useAddDynamicFormDataMutation, useGetDynamicFormByIdQuery } from '@/redux/features/gis-form-template/gisFormTemplateApi'
import { SelectInput } from '@/components/ui/SelectInput'
import { formFieldTypeToInputType } from '@/utils/constants'
import { useGetGisPropertiesQuery } from '@/redux/features/gis-data/gisApi'
import { useAppSelector } from '@/redux/store'
import { showToast } from '@/lib/Toast'
import { ErrorPayload } from '@/typing'
import { validateDateData, validateNumberData } from '@/utils/helpers/validator'



// form
const CreateGisFormFromTemplate = () => {
    const [urlParams] = useSearchParams();
    const formTitle = urlParams.get("title") ? urlParams.get("title")?.split("-").join(" ") : "";
    const form = useForm<any>();
    const params = useParams();
    const [addGisFormFromTemplate, { isLoading: createLoading }] = useAddDynamicFormDataMutation();
    const { data: formTemplates, isLoading: dataLoading } = useGetDynamicFormByIdQuery({
        id: params?.id as string || ""
    });
    const { gisData: currGisData } = useAppSelector(state => state.gis);
    const { data: propertiesList, isLoading } = useGetGisPropertiesQuery({
        params: {
            page: 1,
            per_page: 100,

        },
        id: currGisData?.id as string || ""
    });
    const navigate = useNavigate();

    // 2. Define a submit handler.
    async function onSubmit(data: any) {
        const payload = validateDateData(
            validateNumberData(data, formTemplates?.form_fields ?? []),
            formTemplates?.form_fields ?? []
        );
        addGisFormFromTemplate({
            id: params?.id as string || "",
            data: payload
        }).unwrap().then(() => {
            showToast("Gis File Uploaded Successfully.", { type: "success" });
            navigate(-1);
        }).catch((err: ErrorPayload) => {
            err?.data?.errors.map(el => {
                showToast(el.message, {
                    type: "error",
                })
            })
        });

    };



    return (
        <div className='p-5 bg-white shadow-xl'>
            <PageLayout title={`${formTitle || ""}`} subtitle={`Create ${formTitle || ""} Form`} isLoading={dataLoading || isLoading}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                            <FormField
                                control={form.control}
                                name={"property_id"}
                                render={({ field }) => (
                                    <FormItem className='xl:pr-5'>
                                        <FormLabel className='capitalize flex gap-2'>
                                            Property Id
                                            <p className='text-red-500'>*</p>
                                        </FormLabel>
                                        <FormControl>
                                            <SelectInput
                                                {...field}
                                                defaultValue={form.watch("property_id")}
                                                onSelect={(option) => form.setValue("property_id" || "", option.value)}
                                                placeholder='Select Property Id'
                                                options={propertiesList?.results && propertiesList?.results?.length > 0 ?
                                                    propertiesList?.results?.map((property: any) => {
                                                        const keys: string[] = Object.keys(property);
                                                        const firstKey: string = keys[1].toString();
                                                        const secondKey: string = keys[2].toString();
                                                        return {
                                                            label: `${property[firstKey] || "Null"} - ${property[secondKey] || "Null"
                                                                }` as string,
                                                            value: (property?._id ||
                                                                property?.id) as string,
                                                        };
                                                    })
                                                    : []}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                            {formTemplates?.form_fields && formTemplates?.form_fields?.map((el, i) => {
                                if (el?.form_type === "DropDown") {
                                    return (
                                        <FormField
                                            key={i}
                                            control={form.control}
                                            name={el?.name || ""}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='capitalize flex gap-2'>
                                                        {el?.name ? el?.name?.split("_").join("") : ""}
                                                        {el?.required && <p className='text-red-500'>*</p>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <SelectInput
                                                            {...field}
                                                            defaultValue={form.watch(el?.name || "")}
                                                            onSelect={(option) => form.setValue(el?.name || "", option.value)}
                                                            options={el?.select_field ? el?.select_field?.map(el => ({
                                                                label: el.value,
                                                                value: el.value
                                                            })) : []}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                }

                                if (el?.form_type === "BooleanField") {
                                    return (
                                        <FormField
                                            control={form.control}
                                            name={el?.name || ""}
                                            key={i}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className='capitalize flex gap-2'>
                                                        {el?.name ? el?.name?.split("_").join("") : ""}
                                                        {el?.required && <p className='text-red-500'>*</p>}
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type='checkbox'  {...field} className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border w-[36px] h-[36px]' />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    )
                                }

                                return (
                                    <FormField
                                        control={form.control}
                                        name={el?.name || ""}
                                        key={i}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className='capitalize flex gap-2'>
                                                    {el?.name ? el?.name?.split("_").join("") : ""}
                                                    {el?.required && <p className='text-red-500'>*</p>}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type={
                                                            // @ts-ignore
                                                            el?.form_type ? formFieldTypeToInputType[el?.form_type as any] : "text"
                                                        }
                                                        // pattern='\d{4}/\d{2}/\d{2}'
                                                        {...field}
                                                        className=' focus:ring-0 placeholder:text-xs rounded-md px-5 border'
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                )
                            })}

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
            </PageLayout>
        </div>
    )
}

export default CreateGisFormFromTemplate

