import GisMap from "@/components/gis/map/GisMap"
import MapSidebar from "@/components/gis/map/mapsidebar/MapSidebar";
import { useState } from "react";

const MapPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  return (
    <div>
      <div className="flex">
        <MapSidebar />
        <div className="flex-1">
        <GisMap />
        </div>
      </div>
    </div>
  )
}

export default MapPage