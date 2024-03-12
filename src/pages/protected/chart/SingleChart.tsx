import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/page/PageHeader';
import { LineChartRequest, LineChartResponse } from '@/redux/features/chart/chartApi';
import SingleChartDiagram from '@/components/chart/SingleChartDiagram';
import SingleChartSetting from './SingleChartSetting';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import html2canvas from 'html2canvas';


const SingleChartPage = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state;
    const chartData: LineChartResponse[] = state?.chartData;
    const dataField: LineChartRequest = state?.dataField;
    const form = useForm<any>();
    const title = form.watch('title');
    const x_title = form.watch('x_axis_title');
    const y_title = form.watch('y_axis_title');
    const chartRef = useRef<HTMLDivElement>(null);

    
    const handleCapture = async (): Promise<string | void> => {
        if (chartRef.current !== null) {
            try {
                const canvas = await html2canvas(chartRef.current);
                // Convert canvas to base64
                const base64Image: string = canvas.toDataURL();
                console.log(base64Image);
                return base64Image;
            } catch (error) {
                console.error('Error capturing screenshot:', error);
            }
        }
    };
    


    return (
        <div className='page-style relative flex flex-col gap-5'>
            <PageHeader title='Chart View'
                buttonName={"back"}
                buttonClick={() => navigate(-1)}
            />

            <div className="flex-1 justify-between flex flex-wrap gap-5">
                <SingleChartDiagram chartRef={chartRef} title={title} x_title={x_title} y_title={y_title} chartId={""} chartData={chartData} />
                <SingleChartSetting handleCapture={handleCapture} dataField={dataField} form={form} />
            </div>
        </div>

    )
}

export default SingleChartPage