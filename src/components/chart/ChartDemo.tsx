import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ChartEvent,
    ActiveElement,
    ChartTypeRegistry,
    Point,
    BubbleDataPoint,
} from 'chart.js';
import { useState } from 'react';
import { Bar, Chart, Line } from 'react-chartjs-2';

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip
);


type ChartType = ChartJS<keyof ChartTypeRegistry, (number | [number, number] | Point | BubbleDataPoint | null)[], unknown>;



export default function ChartDemo() {


    const [chartData, setChartData] = useState({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Lion Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
            {
                label: 'Donkey Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },

        ],
    });

    //   const handleDataPointClick = (event: ChartEvent, elements: any[]) => {
    //     if (elements.length > 0) {
    //       const datasetIndex = elements[0]._datasetIndex;
    //       const index = elements[0]._index;
    //       const newColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;

    //       const newChartData = { ...chartData };
    //       newChartData.datasets[datasetIndex].backgroundColor[index] = newColor;
    //       newChartData.datasets[datasetIndex].borderColor[index] = newColor;

    //       setChartData(newChartData);
    //     }
    //   };

    const handleChangeColor = (chartEvent: ChartEvent, elements: ActiveElement[], chart: ChartType) => {
        if (elements.length > 0) {
            const datasetIndex = elements[0].datasetIndex;
            const index = elements[0].index;
            const newColor = `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`;

            const newChartData = { ...chartData };
            newChartData.datasets[datasetIndex].backgroundColor[index] = newColor;
            newChartData.datasets[datasetIndex].borderColor[index] = newColor;

            setChartData(newChartData);
        }
    }

    return (
        <div>
            <Bar
                data={chartData}
                options={{
                    onClick: handleChangeColor
                }}
            />
        </div>
    );



}
