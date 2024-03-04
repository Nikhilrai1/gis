import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useGetAttributeUniqueValueMutation, useGetCollectionAttributeMutation, useGetCollectionFilterMutation, useGetGisSpecificGeojsonMutation } from '@/redux/features/gis-data/gisApi';
import { SelectInput } from '@/components/ui/SelectInput';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';
import { showToast } from '@/lib/Toast';
import { initSpecificGisFileData } from '@/redux/features/gis-data/gisDataSlice';
import { ErrorPayload } from '@/typing';




interface GisConfigProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}


const GisFilterBar = ({ isOpen }: GisConfigProps) => {
    // state
    const { gisData } = useAppSelector(state => state.gis);
    const [getCollectionAttributes, { data: attributes }] = useGetCollectionAttributeMutation();
    const [getAatributeUniqueValue, { data: attributeUniqueValues, isSuccess: uniqueAttributeSuccess }] = useGetAttributeUniqueValueMutation();
    const [getCollectionFilter, { data: attributeFilter, isSuccess: attributeFilterSuccess }] = useGetCollectionFilterMutation();
    const [getGisSpecificGeojson] = useGetGisSpecificGeojsonMutation();
    const { setValue, watch } = useForm<any>();
    const attribute = watch("attribute");
    const value = watch("value");
    // const condition = watch("condition");
    const dispatch = useAppDispatch();



    // get collection attributes
    useEffect(() => {
        getCollectionAttributes({ collection: gisData?.properties_col_name || "" })
    }, [gisData?.properties_col_name])


    // get attribute unique values
    useEffect(() => {
        if (attribute) {
            getAatributeUniqueValue({ collection: gisData?.properties_col_name || "", attribute })
            getCollectionFilter({ collection: gisData?.properties_col_name || "" });
        }
    }, [attribute, gisData?.geojson])



    // handle plot
    const handlePlotSpecificMap = () => {
        if (attribute && value) {
            getGisSpecificGeojson({
                id: gisData?.id as string || "",
                body: {
                    cond: "eq",
                    data_type: attributeUniqueValues?.data_type || "",
                    key: attribute || "",
                    value: value || ""
                }
            });
            getGisSpecificGeojson({
                id: gisData?.id as string || "",
                body: {
                    cond: "eq",
                    data_type: attributeUniqueValues?.data_type || "",
                    key: attribute || "",
                    value: value || ""
                }
            }).unwrap().then((data) => {
                dispatch(initSpecificGisFileData({
                    gisData: {
                        id: gisData?.id || "",
                        name: gisData?.name || "",
                        geojson: data?.results,
                        crs: gisData?.crs || "",
                        properties_col_name: gisData?.properties_col_name || "",
                    },
                    specificPlot: true
                }))
            }).catch((err: ErrorPayload) => {
                err?.data?.errors.map(el => {
                    showToast(el.message, {
                        type: "error",
                    })
                })
            })
        }
        else {
            showToast("Please select attribute and value", { type: "info" })
        }
    }

    return (
        <div className="absolute z-[20] right-0 top-0 h-full flex overflow-hidden">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="inset-y-0 left-0 z-50 shadow-lg max-w-[450px] min-w-64 p-5 bg-[#03031d]"
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`h-full  flex flex-col gap-5`}>
                            <h1 className='text-xl font-bold text-slate-200 border-b border-slate-800 pb-1'>Filter Bar</h1>
                            {/* <div className='flex items-center gap-3'>
                                <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b'>Attribute</h1>
                            </div> */}
                            <div className='flex flex-col gap-3'>
                                <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b text-sm'>Attribute</h1>
                                <SelectInput
                                    onSelect={(option) => setValue("attribute", option.value)}
                                    placeholder={`Select attribute`}
                                    options={(attributes && attributes?.length > 0) ? attributes?.map((val) => ({ label: `${val}`.split("_").join(" "), value: val })) : []}
                                    className='text-black w-[100px]'
                                />
                                {(attribute && uniqueAttributeSuccess && attributeFilterSuccess && attributeUniqueValues && attributeUniqueValues?.unique_values.length > 0) &&
                                    (
                                        <>
                                            <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b text-sm'>Value</h1>
                                            <SelectInput
                                                onSelect={(option) => setValue("value", option.value)}
                                                placeholder={`Select value`}
                                                options={(attributeUniqueValues?.unique_values && attributeUniqueValues?.unique_values?.length > 0) ? attributeUniqueValues?.unique_values?.map((val) => ({ label: `${val}`.split("_").join(" "), value: `${val}` })) : []}
                                                className='text-black w-[100px]'
                                            />
                                        </>
                                    )
                                }

                                {(attribute && uniqueAttributeSuccess && attributeFilterSuccess && attributeUniqueValues && attributeFilter && attributeFilter[attribute] && attributeFilter[attribute]?.operators && attributeFilter[attribute]?.operators?.length > 0) &&
                                    (
                                        <>
                                            <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b text-sm'>Select Operator</h1>
                                            <SelectInput
                                                onSelect={(option) => setValue("condition", option.value)}
                                                placeholder={`Select value`}
                                                options={(attributeFilter[attribute]?.operators && attributeFilter[attribute]?.operators?.length > 0) ? attributeFilter[attribute]?.operators : []}
                                                className='text-black w-[100px]'
                                            />
                                        </>
                                    )
                                }
                            </div>

                            {value && <button onClick={handlePlotSpecificMap} className='bg-green-500 hover:bg-green-600 px-3 py-2 rounded-md'>
                                Plot
                            </button>}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GisFilterBar;
