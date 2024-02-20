import { useState } from "react"
import { AiOutlineUnorderedList } from "react-icons/ai"
import MapFeatureSidebar from "./MapFeatureSidebar";

const MapSidebar = () => {
    const [showFeatureTable, setShowFeatureTable] = useState<boolean>(false);
    return (
        <div className="bg-primary-blue-900 text-white flex">
            <div className="py-5 px-7">
                <button onClick={() => setShowFeatureTable(prev => !prev)}>
                    <AiOutlineUnorderedList size={30} />
                </button>
            </div>

            {/* map feature sidebar */}
            <MapFeatureSidebar
                isOpen={showFeatureTable}
                setIsOpen={setShowFeatureTable}
            />
        </div>
    )
}

export default MapSidebar