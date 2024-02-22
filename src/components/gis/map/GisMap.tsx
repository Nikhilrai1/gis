import { MapContainer, TileLayer } from 'react-leaflet'
import { nepalCenterPos } from "@/utils/mapConstants";
import PlotMap from './PlotMap';
import { useAppSelector } from '@/redux/store';

interface GisMapProps {
  geoJsonFeature: any[];
}


function GisMap({ geoJsonFeature }: GisMapProps) {
  const { gisMapProvider } = useAppSelector(state => state.gisSetting);

  return (
    <div className="relative">
      <MapContainer zoom={7} center={nepalCenterPos}>
        {geoJsonFeature && geoJsonFeature.length > 0 &&
          <PlotMap
            features={geoJsonFeature}
          />
        }
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // url='https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
          url={gisMapProvider}
        />


      </MapContainer>
    </div>
  )
}



export default GisMap



