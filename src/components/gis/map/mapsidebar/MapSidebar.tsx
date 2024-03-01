import { useState } from "react"
import { AiOutlineUnorderedList } from "react-icons/ai"
import MapFeatureSidebar from "./MapFeatureSidebar";
import MapSettingSidebar from "./MapSettingSidebar";
import { Settings } from "lucide-react";
import { VscSettings } from "react-icons/vsc";
import MapFilterbar from "./GisMapFilterbar";
import { Tooltip } from "@/components/ui/tooltip";
import GisConfig from "./GisConfig";
import {GrDocumentConfig} from "react-icons/gr";

const MapSidebar = () => {
    const [showFeatureTable, setShowFeatureTable] = useState<boolean>(false);
    const [showMapSetting, setShowSetting] = useState<boolean>(false);
    const [showFilterbar, setShowFilterbar] = useState<boolean>(false);
    const [showConfig, setShowConfig] = useState<boolean>(false);

    return (
        <div className="bg-primary-blue-900 text-white flex">
            <div className="py-5 px-7 flex flex-col gap-5">
                <button onClick={() => setShowFeatureTable(prev => !prev)}>
                    <Tooltip label={"Feature"}>
                        <AiOutlineUnorderedList size={30} />
                    </Tooltip>
                </button>
                <button onClick={() => setShowSetting(prev => !prev)}>
                    <Tooltip label={"Map Settings"}>
                        <Settings size={30} />
                    </Tooltip>
                </button>
                <button onClick={() => setShowFilterbar(prev => !prev)}>
                    <Tooltip label={"Filterbar"}>
                        <VscSettings size={30} />
                    </Tooltip>
                </button>
                <button onClick={() => setShowConfig(prev => !prev)}>
                    <Tooltip label={"Filterbar"}>
                        <GrDocumentConfig size={30} />
                    </Tooltip>
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

            <MapFilterbar
                isOpen={showFilterbar}
                setIsOpen={setShowFilterbar}
            />

            <GisConfig
                isOpen={showConfig}
                setIsOpen={setShowConfig}
            />

        </div>
    )
}

export default MapSidebar