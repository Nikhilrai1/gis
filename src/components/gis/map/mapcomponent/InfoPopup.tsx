import { Popup, Tooltip } from "react-leaflet";

interface PropsI {
  properties: any;
}

const InfoPopup = ({ properties }: PropsI) => {
  return (
    <>
      {properties.name &&
        <Popup>
          {properties.name}
        </Popup>
      }
      <Tooltip>
        <div>
          popup
          
        </div>
      </Tooltip>
    </>
  );
};

export default InfoPopup;
