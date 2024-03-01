import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useGetAttributeUniqueValueMutation, useGetCollectionAttributeMutation, useGetCollectionFilterMutation } from '@/redux/features/gis-data/gisApi';
import { SelectInput } from '@/components/ui/SelectInput';
import { useAppSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';
import GisConfigLegend from './GisConfigLegend';




interface GisConfigProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}


const GisConfig = ({ isOpen }: GisConfigProps) => {
    // state
    const { gisData } = useAppSelector(state => state.gis);
    const [getCollectionAttributes, { data: attributes }] = useGetCollectionAttributeMutation();
    const [getAatributeUniqueValue, { data: attributeUniqueValues, isSuccess: uniqueAttributeSuccess }] = useGetAttributeUniqueValueMutation();
    const [getCollectionFilter, { data: attributeFilter, isSuccess: attributeFilterSuccess }] = useGetCollectionFilterMutation();
    const { setValue, watch } = useForm<any>();
    const attribute = watch("attribute");


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
    }, [attribute,gisData?.geojson])

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
                            <h1 className='text-xl font-bold text-slate-200 border-b border-slate-800 pb-1'>Config Bar</h1>
                            <div className='flex items-center gap-3'>
                                <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b'>Attribute</h1>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <SelectInput
                                    onSelect={(option) => setValue("attribute", option.value)}
                                    placeholder={`Select attribute`}
                                    options={(attributes && attributes?.length > 0) ? attributes?.map((val) => ({ label: `${val}`.split("_").join(" "), value: val })) : []}
                                    className='text-black w-[100px]'
                                />
                            </div>

                            {(attribute && uniqueAttributeSuccess && attributeFilterSuccess && attributeUniqueValues && attributeUniqueValues?.unique_values.length > 0) &&
                                <GisConfigLegend
                                    statistics={{
                                        max: attributeFilter && attributeFilter[attribute] ? attributeFilter && attributeFilter[attribute].max : null,
                                        min: attributeFilter && attributeFilter[attribute] ? attributeFilter && attributeFilter[attribute].min : null,
                                        mean: attributeFilter && attributeFilter[attribute] ? attributeFilter && attributeFilter[attribute].mean : null,
                                        st_dev: attributeFilter && attributeFilter[attribute] ? attributeFilter && attributeFilter[attribute].st_dev : null,
                                    }}
                                    dataType={attributeUniqueValues?.data_type}
                                    attribute={attribute}
                                    uniqueValues={attributeUniqueValues?.unique_values}
                                />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GisConfig;
