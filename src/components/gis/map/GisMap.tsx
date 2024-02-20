import mapData from "../../../data/countries.json"
import { MapContainer, GeoJSON, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon, LatLngExpression, Layer } from 'leaflet';
import { nepalCenterPos } from "@/utils/mapConstants";

let color: string;

function GisMap() {
  function changeColor(event: any) {
    event.target.setStyle({
      fillColor: color || "#000000",
      color: "green",
      fillOpacity: 1
    })
  }
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Hello, I am pop up 1"
    },
    {
      geocode: [48.85, 2.3522],
      popUp: "Hello, I am pop up 2"
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Hello, I am pop up 3"
    },
  ]
  const customIcon = new Icon({
    iconUrl: "/google-maps.png",
    iconSize: [38, 38]
  })

  const geoJsonStyle = {
    fillColor: color,
    color: "blue",
    dashArray: [5],
    weight: 1
  }


  const onEachFeature = (country: any, layer: Layer) => {
    layer.bindPopup(country.properties.ADMIN)
    layer.on({
      click: changeColor
    })
  }


  const handleChangeColor = (event: any) => {
    // Update color when input value changes
    color = event.target.value;
    // setCurrColor(color);
    console.log("color", color)
  };

  return (
    <div className="relative">
      <div className="absolute bottom-2 z-[15] left-2 text-white p-2 flex flex-col items-center gap-2 rounded-sm bg-primary-blue-900">
        <h1>Color Change</h1>
        <input
          type="color"
          value={color}
          onChange={handleChangeColor}
        />
      </div>
      <MapContainer zoom={7} center={nepalCenterPos}>
        <GeoJSON
          onEachFeature={onEachFeature}
          style={geoJsonStyle}
          data={
            //@ts-ignore
            mapData.features
          }
        />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((el, i) => (
          <Marker
            key={i}
            position={el.geocode as LatLngExpression}
            icon={customIcon}
          >
            <Popup>
              {el.popUp}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default GisMap



