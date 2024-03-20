import LineChartFilterSettings from '@/components/chart/linechart/LineChartFilterSettings';
import { cn } from '@/lib/utils';
import { LineChartRequest, LineChartResponse } from '@/redux/features/chart/chartApi';
import { changeColor } from '@/redux/features/gis-setting/gisSettingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { Settings2 } from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import { UseFormReturn } from 'react-hook-form';


interface SingleChartSettingProps {
    form: UseFormReturn<any, any, any>;
    dataField: LineChartRequest;
    handleCapture: () => Promise<string | void>;
    setChartData: (chartData: LineChartResponse[]) => void;
    className?: string;
    setOpenSettings: (open: boolean) => void;
}

const SingleChartSetting = ({ form, dataField, handleCapture, className, setChartData, setOpenSettings }: SingleChartSettingProps) => {
    const { color } = useAppSelector(state => state.gisSetting);
    const dispatch = useAppDispatch();
    const changeGisColor = (newColor: string) => {
        dispatch(changeColor(newColor))
    }


    return (
        <div className={cn('flex flex-col gap-3 bg-primary-blue-900 p-5 h-fit ', className)}>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <span className='text-lg text-slate-200   border-slate-600'>Chart Settings</span>
                    <Settings2 onClick={() => setOpenSettings(false)} size={25} className='text-slate-200 cursor-pointer' />
                </div>
                {/* <Button
                    type='submit'
                    className='w-fit flex items-center gap-2'
                >
                    <SaveIcon size={20} />
                </Button> */}
            </div>

            <div className='flex flex-col gap-3 settings-container'>
                <div className='flex flex-col gap-3 justify-start'>
                    <h2 className='text-md font-medium bg-primary-blue-600 p-2 text-white'>Chart Color</h2>
                    <HexColorPicker
                        style={{ height: "100px", width: "410px" }}
                        color={color}
                        onChange={changeGisColor}
                    />
                </div>
                <div >
                    <LineChartFilterSettings data_field={dataField} setChartData={setChartData} />
                    {/* <SaveLineChart handleCapture={handleCapture} dataField={dataField} form={form} /> */}
                </div>

            </div>



        </div>
    )
}

export default SingleChartSetting