import { useLocation, useNavigate } from 'react-router-dom'
import PageHeader from '@/components/page/PageHeader';
import { LineChartRequest, LineChartResponse } from '@/redux/features/chart/chartApi';
import SingleChartDiagram from '@/components/chart/SingleChartDiagram';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { SaveAll, SaveIcon, Settings } from 'lucide-react';
import SingleChartSetting from './SingleChartSetting';
import { AnimatePresence, motion } from 'framer-motion';
import BounceLoader from '@/components/loader/BounceLoader';


const SingleChartPage = () => {

    const [chartData, setChartData] = useState<LineChartResponse[]>([]);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location?.state;
    const dataField: LineChartRequest = state?.dataField;
    const newChartData: LineChartResponse[] = state?.chartData;
    const form = useForm<any>();
    const title = form.watch('title');
    const x_title = form.watch('x_axis_title');
    const y_title = form.watch('y_axis_title');
    const chartRef = useRef<HTMLDivElement>(null);
    const [showSettings, setShowSettings] = useState<boolean>(false);

    useEffect(() => {
        setChartData(newChartData);
    }, [newChartData])

    const handleCapture = async (): Promise<string | void> => {
        if (chartRef.current !== null) {
            try {
                const canvas = await html2canvas(chartRef.current);
                // Convert canvas to base64
                const base64Image: string = canvas.toDataURL();
                return base64Image;
            } catch (error) {
                console.error('Error capturing screenshot:', error);
            }
        }
    };
    const downloadImage = async () => {
        try {
            const base64Image = await handleCapture();
            if (base64Image) {
                // Create a temporary anchor element
                const downloadLink = document.createElement('a');
                downloadLink.href = base64Image;
                downloadLink.download = 'chart_image.png'; // Set the filename for download
                // Simulate click on the anchor element to trigger download
                downloadLink.click();
            }
        } catch (error) {
            console.error('Error downloading image:', error);
        }
    };


    return (
        <div className='page-style relative flex flex-col gap-5 h-full'>
            <PageHeader title='Chart View'
                buttonName={"Back"}
                buttonClick={() => navigate(-1)}
                extraButtonName={
                    <>
                        <Settings size={25} />
                    </>
                }
                extraButtonClick={() => setShowSettings(prev => !prev)}
                utilButtonName={
                    <>
                        <SaveIcon size={25} />
                    </>
                }
                utilButonClick={downloadImage}
            />

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
                {chartData ? <SingleChartDiagram
                    chartType='LINE'
                    dataField={dataField}
                    chartRef={chartRef}
                    title={title}
                    x_title={x_title}
                    y_title={y_title}
                    chartId={""}
                    chartData={chartData}
                /> : <BounceLoader />}
            </div>

        </div>

    )
}

export default SingleChartPage