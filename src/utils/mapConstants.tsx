import { LatLngExpression } from "leaflet";

export const nepalCenterPos: LatLngExpression = [27.700381, 85.312444];

export const gisMapProviders = [
    {
      label: "Open Street Map",
      value: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    },
    {
      label: "Open Topo Map",
      value: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
    },
    {
      label: "Google Map",
      value: "https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
    },
    {
      label: "Memo Map",
      value: "https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png"
    },
    {
      label: "Arc Gis Map",
      value: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
    },
    {
      label: "Google Satellite",
      value: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    },
    {
      label: "Google Terrain",
      value: "https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
    },
    {
      label: "Google Hybrid",
      value: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    }
  ]
