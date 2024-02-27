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

const PlotMap = ({ features }: PlotMapProps) => {
    const { color: gisColor, fill, outline } = useAppSelector(state => state.gisSetting);

    const highlightPloygon = (e) => {
        let layer = e.target;
        if (fill) {
            layer.setStyle({
                fillColor: gisColor,
                fillOpacity: 1
            });
        }

        if (outline) {
            layer.setStyle({
                color: gisColor,
                weight: 2,
                fill: "black"
            });
        }
    };

    const highlightPolyline = (e) => {
        let layer = e.target;
        if (outline) {
            layer.setStyle({
                color: gisColor,
                weight: 2,
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
                            return (
                                <Polyline
                                    key={i}
                                    positions={TransformedLineCoordinates(coordinates)}
                                    eventHandlers={{
                                        click: highlightPolyline
                                    }}
                                >
                                    <InfoPopup properties={properties} />
                                </Polyline>
                            );
                        }
                        if (geometry.type.toLocaleLowerCase() === "polygon") {
                            return (
                                <Polygon
                                    key={i}
                                    positions={TransformedPolygonCoordinates(coordinates)}
                                    eventHandlers={{
                                        click: highlightPloygon
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

