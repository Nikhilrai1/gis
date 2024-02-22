import LoadingSpinner from "@/components/loader/LoadingSpiner";
import { Coordinate, GeoJsonType } from "@/typing";
import { TransformedLineCoordinates, TransformedPointCoordinates, TransformedPolygonCoordinates } from "@/utils/helpers/transformed-coordinates";
import { Marker, Polygon, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import InfoPopup from "./mapcomponent/InfoPopup";
import { useAppSelector } from "@/redux/store";

interface PlotMapProps {
    features: GeoJsonType[]
}

// let color: string;

const PlotMap = ({ features }: PlotMapProps) => {

    const { color: gisColor, fill, outline } = useAppSelector(state => state.gisSetting);
    // function changeColor(event: any) {
    //   event.target.setStyle({
    //     fillColor: color || "#000000",
    //     color: "green",
    //     fillOpacity: 1
    //   })
    // }


    // const customIcon = new Icon({
    //   iconUrl: "/google-maps.png",
    //   iconSize: [38, 38]
    // })

    // const geoJsonStyle = {
    //   fillColor: color,
    //   color: "blue",
    //   dashArray: [5],
    //   weight: 1
    // }


    // const onEachFeature = (country: any, layer: Layer) => {
    //   layer.bindPopup(country.properties.ADMIN)
    //   layer.on({
    //     click: changeColor,
    //   })

    // }


    // const handleChangeColor = (event: any) => {
    //     // Update color when input value changes
    //     color = event.target.value;
    //     // setCurrColor(color);
    //     console.log("color", color)
    // };

    // function pointLayer(feature: any, latlng: any) {
    //   // For each point we return a marker with settings we want
    //   console.log(feature, "feature")
    //   console.log(latlng, "latlng")
    //   return L.marker(latlng, {
    //     icon: customIcon
    //   }).bindPopup("hello popup");
    // }

    const highlightFeature = (e) => {
        let layer = e.target;

        if (fill) {
            layer.setStyle({
                fillColor: gisColor,
                fillOpacity: 1
            });
        }

        if(outline){
            layer.setStyle({
                color: gisColor,
                weight: 2,
                fill: "black"
            });
        }
    };


    return (
        <>
            {features.length > 0 ? (
                <MarkerClusterGroup chunkedLoading>
                    {features?.map((feature, i) => {
                        const geometry = feature.geometry;
                        const coordinates = feature.geometry.coordinates;
                        const properties = feature.properties;

                        if (geometry.type.toLowerCase() === "point") {
                            return (
                                <Marker
                                    key={i}
                                    position={TransformedPointCoordinates(coordinates as Coordinate)}
                                >
                                    <InfoPopup properties={properties} />
                                </Marker>
                            );
                        }
                        if (geometry.type.toLowerCase() === "multipoint") {
                            return coordinates.map((coordinate: Coordinate) => (
                                <Marker
                                    key={i}
                                    position={TransformedPointCoordinates(coordinate)}>
                                    <InfoPopup properties={properties} />
                                </Marker>
                            ))
                        }

                        if (geometry.type.toLocaleLowerCase() === "linestring") {
                            const limeOptions = { color: "lime" };
                            return (
                                <Polyline
                                    key={i}
                                    pathOptions={limeOptions}
                                    positions={TransformedLineCoordinates(coordinates)}
                                >
                                    <InfoPopup properties={properties} />
                                </Polyline>
                            );
                        }
                        if (geometry.type.toLocaleLowerCase() === "polygon") {
                            const purpleOptions = { color: "black", strokeWidth: 0.1 };
                            return (
                                <Polygon
                                    key={i}
                                    pathOptions={purpleOptions}
                                    positions={TransformedPolygonCoordinates(coordinates)}
                                    eventHandlers={{
                                        click: highlightFeature
                                    }}
                                >
                                    <InfoPopup properties={properties} />
                                </Polygon>
                            );
                        }
                    })}
                </MarkerClusterGroup>
            ) : (
                <LoadingSpinner />
            )}
        </>
    );
};

export default PlotMap;

