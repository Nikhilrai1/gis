import { useState } from "react";
import { Trash } from "lucide-react";
import SearchFilter from "@/components/table/pagination-table/utils/SearchFilter";
import Pagination from "@/components/table/pagination-table/utils/Pagination";
import { TableLayout } from "@/components/table/pagination-table/utils/TableLayout";
import { showToast } from "@/lib/Toast";
import { ErrorPayload } from "@/typing";
import { useAppSelector } from "@/redux/store";
import { useDeleteDynamicFormMutation } from "@/redux/features/gis-form-template/gisFormTemplateApi";
import TableHeader from "@/components/table/pagination-table/utils/TableHeader";
import ConfirmPopup from "@/components/popup/ConfirmPopupModal";
import { useGetAllSavedChartsQuery } from "@/redux/features/chart/chartApi";
import { useNavigate } from "react-router-dom";


const SavedChartsList = () => {
    // state
    const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [editId, setEditId] = useState<string>("");
    const { gisData: currGisData } = useAppSelector(state => state.gis);
    const [searchParams, setSearchParams] = useState({
        currentPage: 1,
        perPage: 10,
        search: "",
    });
    const navigate = useNavigate();

    // api
    const { data, isLoading } = useGetAllSavedChartsQuery({
        gisId: currGisData?.id?.toString() || "",
        params: {
            page: searchParams.currentPage,
            per_page: searchParams?.perPage,
            search: searchParams?.search
        },
    });

    const [deleteFormTemplate, { isLoading: deleteLoading }] = useDeleteDynamicFormMutation();

    // utill function
    const tableClear = () => {
        setSearchParams({
            currentPage: 1,
            perPage: 10,
            search: "",
        })
    }


    // USEEFFCET
    const deleteFormDataHandler = async () => {
        deleteFormTemplate({
            id: editId
        }).unwrap().then(() => {
            showToast("Delete Gis File Successfully.", { type: "success" });
            setConfirmOpen(false);
        }).catch((err: ErrorPayload) => {
            err?.data?.errors.map(el => {
                showToast(el.message, {
                    type: "error",
                })
            })
        })
    }


    return (
        <div className="p-10">
            <ConfirmPopup
                showModal={confirmOpen}
                onClose={() => {
                    setConfirmOpen(false);
                }}
                message="Are you sure, you want to delete this Data."
                isLoading={deleteLoading}
                onConfirm={deleteFormDataHandler}
            />
            <div className="w-full border p-5 bg-white">
                <div className="mb-5">
                    <TableHeader
                        title="Saved Charts List"
                        subTitle="View/Search charts list"
                        buttonName={"Back"}
                        buttonClick={() => navigate(-1)}
                    />
                </div>
                {/* searchFilter */}
                <div className={`mb-5 flex flex-col gap-5`}>
                    <SearchFilter
                        isFilterMode={isFilterMode}
                        onTableClear={() => tableClear()}
                        setIsFilterMode={setIsFilterMode}
                        onTableSearch={(val) =>
                            setSearchParams({ ...searchParams, search: val, currentPage: 1 })
                        }
                    />


                </div>


                <TableLayout isLoading={isLoading}>
                    <div className="bg-white shadow-md rounded" style={{ overflowX: "auto" }}>
                        <table className="min-w-max w-full">
                            <thead className='bg-theme'>
                                <tr className="bg-primary-blue-900 text-white capitalize text-sm leading-normal">
                                    <th className="py-3 px-6 text-left">{"S.N"}</th>
                                    <th className="py-3 px-6 text-left">{"Chart Image"}</th>
                                    <th className="py-3 px-6 text-left">{"Title"}</th>
                                    <th className="py-3 px-6 text-left">{"X-Axis Title"}</th>
                                    <th className="py-3 px-6 text-left">{"Y-Axis Title"}</th>
                                    <th className="py-3 px-6 text-center">{"Actions"}</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600 text-sm font-light">
                                {data?.results?.map((el, i) => (
                                    <tr key={i} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer">

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span className="font-medium">{i + 1}</span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <img src={el?.image} alt="chart image" className="w-[70px] h-[70px] object-contain" />
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span className="font-medium">{el?.title}</span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span className="font-medium">{el?.x_axis_title}</span>
                                            </div>
                                        </td>

                                        <td className="py-3 px-6 text-left">
                                            <div className="flex items-center">
                                                <span className="font-medium">{el?.y_axis_title}</span>
                                            </div>
                                        </td>


                                        <td key={i} className="py-3 px-6 text-center">
                                            <div className="flex items-center justify-center gap-3">

                                                <button
                                                    className={`p-[7px] text-white bg-red-500`}
                                                    style={{ borderRadius: "5px" }}
                                                    onClick={() => {
                                                        setEditId(`${el?.id}`)
                                                        setConfirmOpen(true);
                                                    }}
                                                >
                                                    <Trash size={15} />
                                                </button>

                                            </div>
                                        </td>


                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {data?.results && data?.results?.length <= 0 &&
                            <div className="w-full h-20 flex items-center justify-center">
                                No Results Found
                            </div>
                        }
                    </div>
                    <div className='flex flex-wrap justify-between items-center my-7 gap-4 w-full'>
                        <div className="mt-7">
                            <select
                                value={searchParams?.perPage}
                                onChange={(e) => setSearchParams({ ...searchParams, perPage: Number(e.target.value) })}
                                className="border border-gray-300 rounded bg-theme text-primary-blue-900 p-2"
                            >
                                <option value="5">{"5 per page"}</option>
                                <option value="10">{"10 per page"}</option>
                                <option value="20">{"20 per page"}</option>
                            </select>
                        </div>

                        <div className="mt-7">
                            <Pagination
                                currentPage={searchParams.currentPage}
                                totalPages={Math.ceil(data?.total as number / searchParams?.perPage)}
                                onPageChange={(page) => setSearchParams({ ...searchParams, currentPage: page })}
                                hasNextPage={data?.total as number > searchParams?.perPage * searchParams?.currentPage}
                                hasPrevPage={searchParams?.currentPage > 1}
                            />
                        </div>
                    </div>
                </TableLayout>


            </div >
        </div>
    )
}


export default SavedChartsList;

