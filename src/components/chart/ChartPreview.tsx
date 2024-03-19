import { useState } from "react";
import { Modal } from "@/components/modal/Modal";
import TableHeader from "../table/pagination-table/utils/TableHeader";
import CreateChart from "./CreateChart";
import { chartsList } from "@/utils/chart/chartsList";
import { ChartTypeEnum } from "@/enums";


const ChartPreview = () => {
    // state
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [selectedChartType, SetSelectedChartType] = useState<ChartTypeEnum>();

    const handleSelectChart = (type: ChartTypeEnum) => {
        SetSelectedChartType(type);
    }

    return (
        <>
            <div className="w-full border p-5 bg-white">
                <div className="mb-5">
                    <TableHeader
                        title="Charts"
                        subTitle="select/create charts "
                        buttonName={selectedChartType ? `Create ${selectedChartType} chart` : null}
                        buttonClick={() => setModalOpen(true)}
                    />
                </div>

                <div className="grid grid-cols-1  md:grid-cols-3 gap-10">
                    {chartsList?.map((chart, index) => (
                        <div key={index} className={`${chart.type === selectedChartType ? "bg-green-200" : "bg-gray-100"}  p-5  flex flex-col justify-between gap-5 shadow-md cursor-pointer` }onClick={() => handleSelectChart(chart.type)}>
                            <div className="flex justify-center">
                                <img src={chart.img} alt={chart.label} className="h-[200px] w-[200px] object-contain" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-lg font-bold">{chart.label}</h2>
                            </div>
                        </div>
                    ))}
                </div>



            </div >
            <Modal
                title={`Create ${selectedChartType} chart`}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            >
                <CreateChart setModalOpen={setModalOpen} />
            </Modal>
        </>
    )
}


export default ChartPreview;

