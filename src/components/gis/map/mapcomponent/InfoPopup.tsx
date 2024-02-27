import { Popup } from "react-leaflet";

interface PropsI {
  properties: any;
}

const InfoPopup = ({ properties }: PropsI) => {
  const attributes = properties ? Object.keys(properties).filter(el => el !== "_id") : [];
  return (
    <>
      <Popup>
        <div className="flex flex-col gap-1">
          {attributes.map((attribute, index) => (
            <div key={index} className="flex gap-2 p-1">
              <span className="capitalize">{`${attribute || ""}`.split("_").join(" ")}: </span>
              <span>{properties[attribute]}</span>
            </div>
          ))}
        </div>
      </Popup>
    </>
  );
};

export default InfoPopup;
