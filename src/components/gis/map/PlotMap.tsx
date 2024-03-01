import LoadingSpinner from "@/components/loader/LoadingSpiner";
import { Coordinate, GeoJsonType } from "@/typing";
import { TransformedLineCoordinates, TransformedPointCoordinates, TransformedPolygonCoordinates } from "@/utils/helpers/transformed-coordinates";
import { Marker, Polygon, Polyline } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster"
import InfoPopup from "./mapcomponent/InfoPopup";
import { useAppSelector } from "@/redux/store";
import { useMemo } from "react";


interface PlotMapProps {
    features: GeoJsonType[]
}

const PlotMap = ({ features }: PlotMapProps) => {

    // state
    const { color: gisColor, fill, outline } = useAppSelector(state => state.gisSetting);
    const { attributeValueConfig } = useAppSelector(state => state.gis);
    const attributeValueConfigData = useMemo(() => attributeValueConfig, [attributeValueConfig])

    // highlight polygon on click
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

    // highlight polyline on click
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
                        const attributeValue = attributeValueConfigData?.attribute && properties[attributeValueConfigData.attribute];
                        const attributeValueData = (attributeValue && attributeValueConfigData?.values) && attributeValueConfigData.values[attributeValue] && attributeValueConfigData.values[`${attributeValue}`];
                        //@ts-ignore
                        let customColor = attributeValueData?.color;
                        // console.log(attributeValue)

                        let addColor = false;
                        if(typeof attributeValue === "string"){
                            addColor = true;
                        }

                        if(typeof attributeValue === "number"){
                            attributeValueConfigData?.values && Object.entries(attributeValueConfigData.values).forEach(([_,item]) => {
                                if((item.min && item?.max) && (attributeValue > item.min && attributeValue <= item.max)){
                                    addColor = true;
                                    customColor = item.color;
                                }
                            })
                        }


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
                                    pathOptions={customColor ? { color: customColor } : {}}
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
                                    pathOptions={(addColor && customColor) ? { fillColor: customColor, fillOpacity: 0.6, color: "black" } : {}}
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

