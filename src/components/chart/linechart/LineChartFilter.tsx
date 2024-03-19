import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { SelectInput } from '@/components/ui/SelectInput'
import { LineChartFilterType, useGetChartsFilterMutation } from '@/redux/features/chart/chartApi'
import { useEffect } from 'react'
import { Input } from '@/components/ui/input'






interface LineChartFilterProps {
    collection_name: string;
}


const LineChartFilter = ({ collection_name }: LineChartFilterProps) => {
    // const { gisData } = useAppSelector(state => state.gis);
    // const navigate = useNavigate();

    const [getChartsFilter, { data: filterData }] = useGetChartsFilterMutation();
    const form = useForm<any>();
  


    // 2. Define a submit handler.
    async function onSubmit(newData: any) {
        if(!newData) return;
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
                    newFilter["range_filters"].push({
                        data_type: data_type,
                        key: key,
                        gte: newData[`rangeFilters_${key}_${data_type}_gte`],
                        lte: newData[`rangeFilters_${key}_${data_type}_lte`]
                    })
                }
            }

        })
        console.log("newFilter", newFilter)


    };

    useEffect(() => {
        getChartsFilter({
            collection: collection_name
        })
    }, [])


    return (
        <div className=''>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='flex flex-col gap-5'>
                        <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Filter</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {filterData?.dropdowns && filterData?.dropdowns?.length > 0 && filterData?.dropdowns?.map((el, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <FormField
                                        control={form.control}
                                        name={`dropdowns_${el?.key}_${el?.data_type}_value`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2'>
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
                                                <FormLabel className='capitalize flex gap-2'>
                                                    {`${el?.key} Operators`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <SelectInput
                                                        {...field}
                                                        defaultValue={form.watch(`dropdowns_${el?.key}_${el?.data_type}_operators`)}
                                                        onSelect={(option) => form.setValue(`dropdowns_${el?.key}_${el?.data_type}_operators` || "", option.value)}
                                                        placeholder={`Select ${el?.key} operators`}
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
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                            {filterData?.range_filters && filterData?.range_filters?.length > 0 && filterData?.range_filters?.map((el, index) => (
                                <div key={index} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                                    <FormField
                                        control={form.control}
                                        name={`rangeFilters_${el?.key}_${el?.data_type}_gte`}
                                        render={({ field }) => (
                                            <FormItem className='xl:pr-5'>
                                                <FormLabel className='capitalize flex gap-2'>
                                                    {`${el?.key} from`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={`Select ${el?.key} from`}
                                                        className='px-4'
                                                        type={el?.data_type}
                                                        min={el?.min}
                                                        max={el?.max}
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
                                                <FormLabel className='capitalize flex gap-2'>
                                                    {`${el?.key} to`}
                                                    <p className='text-red-500'>*</p>
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        {...field}
                                                        placeholder={`Select ${el?.key} to`}
                                                        className='px-4'
                                                        type={el?.data_type}
                                                        min={el?.min}
                                                        max={el?.max}
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

export default LineChartFilter

