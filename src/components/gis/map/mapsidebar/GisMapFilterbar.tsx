import { motion, AnimatePresence } from 'framer-motion';
import MapAttributeLegends from '../legend/MapAttributeLegends';
import { useEffect, useState } from 'react';
import { FetchAttributeWithValuesResponse, fetchAttributeWithValues, useGetCollectionFilterMutation } from '@/redux/features/gis-data/gisApi';
import { SelectInput } from '@/components/ui/SelectInput';
import { useAppSelector } from '@/redux/store';
import { useForm } from 'react-hook-form';




interface MapFilterBarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}


const MapFilterBar = ({ isOpen }: MapFilterBarProps) => {
    const [gisAttributes, setGisAttributes] = useState<FetchAttributeWithValuesResponse[]>([])
    const { gisData } = useAppSelector(state => state.gis);
    const [getCollectionFilter, { data: collectionFilter }] = useGetCollectionFilterMutation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const valuesWithAttributes = await fetchAttributeWithValues(gisData?.properties_col_name || "")
                setGisAttributes(valuesWithAttributes)
            } catch (error: any) {
                console.log(error?.message)
            }
        }
        fetchData();
        getCollectionFilter({ collection: gisData?.properties_col_name || "" });
    }, [gisData?.properties_col_name])

    const { setValue } = useForm<any>();

    return (
        <div className="absolute z-[20] right-0 top-0 h-full flex overflow-hidden ">

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
                            <div className='flex items-center gap-3'>
                                <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b'>Attribute</h1>
                                <h1 className='flex-1 border-slate-800 pb-0.5 text-slate-200 border-b'>Filter</h1>
                            </div>
                            {gisAttributes?.map((attribute, index) => (
                                <div key={index} className='grid grid-cols-2 gap-3'>
                                    <SelectInput
                                        onSelect={(option) => setValue(attribute?.attribute, option.value)}
                                        placeholder={`Select ${`${attribute?.attribute || ""}`.split("_").join(" ")}`}
                                        options={(attribute?.unique_values && attribute?.unique_values?.length > 0) ? attribute?.unique_values?.map((val) => ({ label: `${val}`.split("_").join(" "), value: `${val}` })) : []}
                                        className='text-black w-[100px]'
                                    />
                                    <SelectInput
                                        key={index}
                                        onSelect={(option) => setValue(attribute?.attribute, option.value)}
                                        placeholder={`${`${attribute?.attribute || ""}`.split("_").join(" ")} operator`}
                                        options={(collectionFilter && collectionFilter[attribute?.attribute] && collectionFilter[attribute?.attribute]?.operators.length > 0)
                                            ? collectionFilter[attribute?.attribute]?.operators : []}
                                        className='text-black w-[100px]'
                                    />

                                </div>
                            ))}
                            {(gisAttributes && gisAttributes?.length > 0) && <MapAttributeLegends attributes={gisAttributes} />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapFilterBar;
