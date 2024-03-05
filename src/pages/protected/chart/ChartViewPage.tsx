import ChartDiagram from '@/components/chart/ChartDiagram'
import PageHeader from '@/components/page/PageHeader'
import { useNavigate, useParams } from 'react-router-dom'

const ChartViewPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    return (
        <div className='page-style'>
            <div className='p-5'>
                <PageHeader
                    title='View Chart'
                    buttonName='Back'
                    buttonClick={() => navigate(-1)}
                />
            </div>
            <ChartDiagram chartId={params?.id || ""} />
        </div>
    )
}

export default ChartViewPage