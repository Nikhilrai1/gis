import LineChartFilterSettings from '@/components/chart/linechart/LineChartFilterSettings';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { LineChartRequest, LineChartResponse } from '@/redux/features/chart/chartApi';
import { changeColor } from '@/redux/features/gis-setting/gisSettingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Settings2 } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { UseFormReturn } from 'react-hook-form';


interface SingleChartSettingProps {
    titleForm: UseFormReturn<any, any, any>;
    dataField: LineChartRequest;
    setChartData: (chartData: LineChartResponse[]) => void;
    className?: string;
    setOpenSettings: (open: boolean) => void;
}

const SingleChartSetting = ({ titleForm, dataField, className, setChartData, setOpenSettings }: SingleChartSettingProps) => {
    const { color } = useAppSelector(state => state.gisSetting);
    const dispatch = useAppDispatch();
    const changeGisColor = (newColor: string) => {
        dispatch(changeColor(newColor))
    }

    const onSubmit = (_: any) => {

    }


    return (
        <div className={cn('flex flex-col gap-3 bg-primary-blue-900 p-5 h-fit ', className)}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <span className='text-lg text-slate-200   border-slate-600'>Chart Settings</span>
                    <Settings2 onClick={() => setOpenSettings(false)} size={25} className='text-slate-200 cursor-pointer' />
                </div>
            </div>

            <div className='flex flex-col gap-3'>
                <div className='flex flex-col gap-3 justify-start'>
                    <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Chart Color</h2>
                    <HexColorPicker
                        style={{ height: "100px", width: "410px" }}
                        color={color}
                        onChange={changeGisColor}
                    />
                </div>
                <div className=''>
                    <Form {...titleForm}>
                        <form onSubmit={titleForm.handleSubmit(onSubmit)} className="space-y-5 mb-3">

                            <div className='flex flex-col gap-5'>
                                <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Custom Title</h2>
                                <div className='grid grid-cols-1 gap-5'>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <FormField
                                            control={titleForm.control}
                                            name={`x_axis_title`}
                                            render={({ field }) => (
                                                <FormItem className='xl:pr-5'>
                                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                                        X-Title
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder={"X-Title"}
                                                            className='px-4'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={titleForm.control}
                                            name={`y_axis_title`}
                                            render={({ field }) => (
                                                <FormItem className='xl:pr-5'>
                                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                                        Y-Title
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder={"Y-Title"}
                                                            className='px-4'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <FormField
                                            control={titleForm.control}
                                            name={`title`}
                                            render={({ field }) => (
                                                <FormItem className='xl:pr-5'>
                                                    <FormLabel className='capitalize flex gap-2 text-white'>
                                                        Title
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            placeholder={"Title"}
                                                            className='px-4'
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                </div>
                            </div>
                        </form>
                    </Form>
                    <LineChartFilterSettings data_field={dataField} setChartData={setChartData} />
                </div>

            </div>



        </div>
    )
}

export default SingleChartSetting