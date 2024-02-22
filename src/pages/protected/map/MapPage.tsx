import GisMap from "@/components/gis/map/GisMap"
import MapSidebar from "@/components/gis/map/mapsidebar/MapSidebar";
import { useGetSingleGisFileJsonQuery } from "@/redux/features/gis-data/gisApi";
import { useAppSelector } from "@/redux/store";

const MapPage = () => {
  const { gisData } = useAppSelector(state => state.gis);
  const { data } = useGetSingleGisFileJsonQuery({
    id: gisData?.id as string || "",
  });

  return (
    <div>
      <div className="flex relative">
        <MapSidebar />
        <div className="flex-1">
          <GisMap geoJsonFeature={data?.results || []} />
        </div>
      </div>
    </div>
  )
}

export default MapPage