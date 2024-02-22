import Pagination from '@/components/table/pagination-table/utils/Pagination';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import { IoMdSettings } from 'react-icons/io';
import GisFeatureTable from './GisFeatureTable';
import { useGetGisPropertiesQuery } from '@/redux/features/gis-data/gisApi';
import { useAppSelector } from '@/redux/store';
import { useState } from 'react';
import { SheetBar } from '@/components/ui/SheetSidebar';

interface MapFeatureSidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}



interface PairType {
    key: string;
    value: boolean;
}
export const unShowKeys = ["_id", "data_count", "feature_id"];

const MapFeatureSidebar = ({ isOpen }: MapFeatureSidebarProps) => {
    const [search, setSearch] = useState<string>("");
    const [featuresKeys, setFeatureKeys] = useState<PairType[]>([]);
    const { gisData } = useAppSelector(state => state.gis);
    const [searchParams, setSearchParams] = useState({
        search: "",
        page: 1,
        per_page: 30
    });
    const { data } = useGetGisPropertiesQuery({
        id: gisData?.id as string || "",
        params: {
            search: searchParams?.search,
            page: searchParams.page,
            per_page: searchParams.per_page
        }
    });
    const features = data?.results && data?.results.length > 0 ? data?.results : [];

    // Event handlers
    const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchParams({ ...searchParams, search });
        }
    };

    const handleCheckProperty = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setFeatureKeys([...featuresKeys, {
                key: e.target.name,
                value: true
            }]);
        } else {
            setFeatureKeys(featuresKeys.filter((item) => item.key !== e.target.name));
        }
    }


    const [settingOpen, setSettingOpen] = useState(false);
    return (
        <div className="absolute left-[85px] top-0 h-full flex overflow-hidden ">
            <SheetBar
                modalOpen={settingOpen}
                setModalOpen={setSettingOpen}
                side={"left"}
                title='Choose properties column?'
                className='bg-[#03031d] border-none text-white'
            >
                <div className='bg-primary-blue-400 p-5 flex flex-col gap-5'>
                    <h1 className='font-bold text-2xl text-gray-50'>Select Property</h1>
                    {features && features[0] && Object.keys(features[0])?.map((key, i) => {
                        if (!unShowKeys.includes(key)) {
                            return (
                                <div key={i} className="flex items-center gap-2">
                                    <input
                                        name={key || ""}
                                        checked={featuresKeys?.find((el) => el.key === key)?.value as boolean || false}
                                        type="checkbox"
                                        className='w-[25px] h-[25px]'
                                        onChange={handleCheckProperty}
                                    />
                                    <p className='capitalize text-slate-200'>{key?.split("_").join(" ")}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </SheetBar>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="inset-y-0 left-0 z-50 shadow-lg max-w-[450px] bg-[#03031d]"
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className={`h-full  transition ease-in-out transform duration-500  flex flex-col gap-5`}>
                            {/* search */}
                            <div className="flex items-center gap-5 justify-between p-5">
                                <div className={`transition-opacity duration-500 ease-in-out flex items-center gap-1 bg-gray-50 rounded-xl p-2`}>
                                    <FiSearch
                                        size={30}
                                        className="rounded cursor-pointer hover:bg-slate-500 text-black"
                                        title="Search"
                                    />
                                    <input
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="text-black focus:outline-none"
                                        placeholder="search..."
                                        onKeyDown={handleEnterPress}
                                    />
                                </div>
                                <button onClick={() => setSettingOpen(true)}>
                                    <IoMdSettings color="white" size={30} className="animate-spin" />
                                </button>
                            </div>

                            {/* content */}
                            <div style={{ height: "calc(100vh - 107px - 266px" }} className=''>
                                <GisFeatureTable
                                    showKeys={featuresKeys?.length > 0 ? featuresKeys.filter(el => el.value === true)
                                        .map((el) => el.key) : []}
                                    features={features}
                                />
                            </div>

                            {/* pagination */}
                            <div className="">
                                <Pagination
                                    currentPage={searchParams.page}
                                    totalPages={Math.ceil(data?.total as number / searchParams?.per_page)}
                                    onPageChange={(page) => setSearchParams({ ...searchParams, page })}
                                    hasNextPage={data?.total as number > searchParams?.per_page * searchParams?.page}
                                    hasPrevPage={searchParams?.page > 1}
                                    color={{
                                        active: "bg-gray-200 text-primary-blue-900",
                                        disable: " text-white",
                                        paginate_active: "bg-gray-200 text-primary-blue-900",
                                        paginate_disable: "bg-trasparent",
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MapFeatureSidebar;
