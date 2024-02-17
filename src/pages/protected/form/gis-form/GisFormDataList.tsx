import { useState } from "react";
import { Trash } from "lucide-react";
import { Modal } from "@/components/modal/Modal";
import SearchFilter from "@/components/table/pagination-table/utils/SearchFilter";
import Pagination from "@/components/table/pagination-table/utils/Pagination";
import { TableLayout } from "@/components/table/pagination-table/utils/TableLayout";
import { FaEdit } from "react-icons/fa";
import { showToast } from "@/lib/Toast";
import { ErrorPayload } from "@/typing";
import { useDeleteDynamicFormDataMutation, useGetAllDynamicFormDataQuery } from "@/redux/features/gis-form-template/gisFormTemplateApi";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmPopup from "@/components/popup/ConfirmPopupModal";
import TableHeader from "@/components/table/pagination-table/utils/TableHeader";
import { useSearchParams } from "react-router-dom"

const GisFormDataList = () => {
  // state
  const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const navigate = useNavigate();
  // const { gisData: currGisData } = useAppSelector(state => state.gis);
  const [urlParams] = useSearchParams();
  const formTitle = urlParams.get("title") ? urlParams.get("title")?.split("-").join(" ") : "";

  const [searchParams, setSearchParams] = useState({
    currentPage: 1,
    perPage: 10,
    search: "",
  })
  const params = useParams();

  // api
  const { data, isLoading } = useGetAllDynamicFormDataQuery({
    id: params?.id || "",
    params: {
      page: searchParams.currentPage,
      per_page: searchParams?.perPage,
      search: searchParams?.search
    },
  });


  const [deleteFormTemplate, { isLoading: deleteLoading }] = useDeleteDynamicFormDataMutation();

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
      id: params?.id || "",
      formId: selectedId
    }).unwrap().then(() => {
      showToast("Delete Successfully.", { type: "success" });
      setConfirmOpen(false);
    }).catch((err: ErrorPayload) => {
      console.log(err)
      err?.data?.errors.map(el => {
        showToast(el.message, {
          type: "error",
        })
      })
    })
  }

  const onEdit = (gisData: any) => {
    console.log(gisData)
    // getGisFileJson({ id: `${gisData?.id || ""}` })
    //     .unwrap().then((data) => {
    //         dispatch(initGisFileData({
    //             id: gisData?.id || "",
    //             name: gisData?.name || "",
    //             geojson: data?.results
    //         }))
    //     }).catch((err: ErrorPayload) => {
    //         err?.data?.errors.map(el => {
    //             showToast(el.message, {
    //                 type: "error",
    //             })
    //         })
    //     })

  }

  return (
    <>
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
            title={`Gis ${formTitle} Form List`}
            subTitle="View/Search Gis Form"
            linkTitle={`Create ${formTitle} Form`}
            // buttonClick={() => setModalOpen(true)}
            link={`/gis-forms/${params?.id || ""}/create/?title=${formTitle}`}
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
                  {data?.results && Object.keys(data?.results[0]).filter(el => el !== "_id").map((label, i) => (
                    <th key={i} className="py-3 px-6 text-center capitalize">{label ? label?.split("_").join(" ") : ""}</th>
                  ))}
                  <th className="py-3 px-6 text-center">{"Actions"}</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {data?.results && data?.results?.map((el, i) => (
                  <tr key={i} className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100 cursor-pointer">

                    <td className="py-3 px-6 text-left">
                      <div className="flex items-center">
                        <span className="font-medium">{i + 1}</span>
                      </div>
                    </td>
                    {Object.keys(el).filter(el => el !== "_id").map(key => (
                      <td key={key} className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center">
                          <span className="font-medium">{el ? el[key] : ""}</span>
                        </div>
                      </td>
                    ))}

                    <td key={i} className="py-3 px-6 text-center">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          className={`p-[7px] text-white border  bg-green-500 hover:bg-gray-700`}
                          style={{ borderRadius: "5px" }}
                          onClick={() => onEdit(el)}
                        >
                          <FaEdit color="white" size={15} />
                        </button>
                        <button
                          className={`p-[7px] text-white bg-red-500`}
                          style={{ borderRadius: "5px" }}
                          onClick={() => {
                            setSelectedId(`${el?._id || el?.id}`)
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
      <Modal
        title="Upload Gis File"
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      >
        <h1>hello</h1>
        {/* <GisFileUpload setModalOpen={setModalOpen} /> */}
      </Modal>
    </>
  )
}


export default GisFormDataList;

