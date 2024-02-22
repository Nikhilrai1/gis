import { useState } from "react"
import { AiOutlineUnorderedList } from "react-icons/ai"
import MapFeatureSidebar from "./MapFeatureSidebar";
import MapSettingSidebar from "./MapSettingSidebar";
import { Settings } from "lucide-react";

const MapSidebar = () => {
    const [showFeatureTable, setShowFeatureTable] = useState<boolean>(false);
    const [showMapSetting, setShowSetting] = useState<boolean>(false);
    return (
        <div className="bg-primary-blue-900 text-white flex">
            <div className="py-5 px-7 flex flex-col gap-5">
                <button onClick={() => setShowFeatureTable(prev => !prev)}>
                    <AiOutlineUnorderedList size={30} />
                </button>
                <button onClick={() => setShowSetting(prev => !prev)}>
                    <Settings size={30} />
                </button>
            </div>

            {/* map feature sidebar */}
            <MapFeatureSidebar
                isOpen={showFeatureTable}
                setIsOpen={setShowFeatureTable}
            />

            <MapSettingSidebar
                isOpen={showMapSetting}
                setIsOpen={setShowSetting}
            />

        </div>
    )
}

export default MapSidebar