import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/page/PageHeader';
import { LineChartRequest, LineChartResponse } from '@/redux/features/chart/chartApi';
import SingleChartDiagram from '@/components/chart/SingleChartDiagram';
import { useForm } from 'react-hook-form';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { LineChartCreateCarousel } from '@/components/chart/chartcarousel/LineChartCreateCarousel';
import LineChartFilter from '@/components/chart/linechart/LineChartFilter';
import { Settings } from 'lucide-react';
import SingleChartSetting from './SingleChartSetting';
import { AnimatePresence, motion } from 'framer-motion';


const SingleChartPage = () => {

    const [chartData, setChartData] = useState<LineChartResponse[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state;
    const dataField: LineChartRequest = state?.dataField;
    const form = useForm<any>();
    const title = form.watch('title');
    const x_title = form.watch('x_axis_title');
    const y_title = form.watch('y_axis_title');
    const chartRef = useRef<HTMLDivElement>(null);
    const [showSettings, setShowSettings] = useState<boolean>(false);



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
                buttonName={"Back"}
                buttonClick={() => navigate(-1)}
                extraButtonName={
                    <>
                        <Settings size={25} />
                    </>
                }
                extraButtonClick={() => setShowSettings(prev => !prev)}
            />
            <div>

            </div>

            <AnimatePresence>
                {showSettings && (
                    <motion.div
                        className="fixed top-[107px] left-0 z-50 shadow-lg max-w-[450px] min-w-64 bg-[#03031d] settings-container"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <SingleChartSetting
                            dataField={dataField}
                            form={form}
                            handleCapture={handleCapture}
                            setChartData={setChartData}
                            className='max-w-[450px]'
                            setOpenSettings={setShowSettings}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex-1 justify-between flex flex-wrap gap-5 h-fit">
                <SingleChartDiagram
                    chartType='LINE'
                    dataField={dataField}
                    chartRef={chartRef}
                    title={title}
                    x_title={x_title}
                    y_title={y_title}
                    chartId={""}
                    chartData={chartData}
                />
            </div>

        </div>

    )
}

export default SingleChartPage