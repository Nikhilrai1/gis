import ChartDiagram from '@/components/chart/ChartDiagram'
import { changeColor } from '@/redux/features/gis-setting/gisSettingSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { HexColorPicker } from 'react-colorful';
import { useNavigate, useParams } from 'react-router-dom'
import { IoMdColorPalette } from "react-icons/io";
import PageHeader from '@/components/page/PageHeader';

const ChartViewPage = () => {
    const { color } = useAppSelector(state => state.gisSetting);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const changeGisColor = (newColor: string) => {
        dispatch(changeColor(newColor))
    }
    return (
        <div className='page-style relative flex flex-col gap-5'>
            <PageHeader title='Chart View'
                buttonName={"back"}
                buttonClick={() => navigate(-1)}
            />

            <div className="flex-1 flex gap-5">
                <ChartDiagram chartId={params?.id || ""} />
                <div className='flex flex-col gap-3 bg-primary-blue-900 p-10 h-fit rounded-lg'>
                    <div className='flex items-center gap-3'>
                        <span className='text-lg text-slate-200   border-slate-600'>Change Color</span>
                        <IoMdColorPalette size={25} className='text-slate-200' />
                    </div>
                    <HexColorPicker
                        className='mx-auto'
                        color={color}
                        onChange={changeGisColor}
                    />
                </div>
            </div>
        </div>

    )
}

export default ChartViewPage