import { ScrollArea } from '@radix-ui/react-scroll-area'
import { IoMdEye } from 'react-icons/io';
import { TiLocation } from 'react-icons/ti';
import { unShowKeys } from './MapFeatureSidebar';

interface GisFeatureTableProps {
    showKeys: string[];
    features: {
        [key: string]: any;
    }[];
}


const GisFeatureTable = ({ features, showKeys }: GisFeatureTableProps) => {
    return (
        <ScrollArea style={{ maxHeight: "calc(100vh - 107px - 266px" }} className="rounded-lg overflow-y-scroll p-5 ">
            {features?.map((el, i) => (
                <div key={i} className="border-b border-slate-700 p-5 flex items-start justify-between bg-gray-300">
                    <div>
                        <h1 className="text-lg font-bold text-primary-blue-900">Fid-[{el ? el?.feature_id : ""}]</h1>
                        {showKeys?.map((key) => {
                            if(!unShowKeys.includes(key)){
                                return (
                                    <p key={key} className="text-sm text-primary-blue-600">
                                        <span className='capitalize'>{key?.split("_").join(" ")}:</span> {(el && el[key]) ? el[key] : ""}
                                    </p>
                                )
                            }
                        })}
                    </div>
                    <div className="flex gap-2">
                        <button className="p-1 bg-primary-blue-400 rounded-sm hover:bg-primary-blue-600">
                            <IoMdEye size={30} />
                        </button>
                        <button className="p-1 bg-primary-blue-400 rounded-sm hover:bg-primary-blue-600">
                            <TiLocation size={30} />
                        </button>
                    </div>
                </div>
            ))}
        </ScrollArea>
    )
}

export default GisFeatureTable