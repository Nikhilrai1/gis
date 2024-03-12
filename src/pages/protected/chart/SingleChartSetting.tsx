import SaveLineChart from '@/components/chart/linechart/SaveLineChart';
import { LineChartRequest } from '@/redux/features/chart/chartApi';
import { changeColor } from '@/redux/features/gis-setting/gisSettingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { HexColorPicker } from 'react-colorful';
import { UseFormReturn } from 'react-hook-form';
import { IoMdColorPalette } from 'react-icons/io'


interface SingleChartSettingProps {
    form: UseFormReturn<any, any, any>;
    dataField: LineChartRequest;
    handleCapture: () => Promise<string | void>;
}

const SingleChartSetting = ({ form, dataField, handleCapture }: SingleChartSettingProps) => {
    const { color } = useAppSelector(state => state.gisSetting);
    const dispatch = useAppDispatch();
    const changeGisColor = (newColor: string) => {
        dispatch(changeColor(newColor))
    }


    return (
        <div className='flex flex-col gap-3 bg-primary-blue-900 p-10 h-fit rounded-lg'>
            <div className='flex items-center gap-3'>
                <span className='text-lg text-slate-200   border-slate-600'>Chart Settings</span>
                <IoMdColorPalette size={25} className='text-slate-200' />
            </div>

            <div>
                <HexColorPicker
                    className='mx-auto'
                    color={color}
                    onChange={changeGisColor}
                />
            </div>

            <div className='mt-2'>
                <SaveLineChart handleCapture={handleCapture} dataField={dataField} form={form} />
            </div>

        </div>
    )
}

export default SingleChartSetting