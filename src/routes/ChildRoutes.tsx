import ChartPage from "@/pages/protected/chart/ChartPage";
import Dashboard from "@/pages/protected/dashboard/Dashboard";
import CreateGisFormTemplate from "@/pages/protected/form/gis-form-template/CreateGisFormTemplate";
import UpdateGisFormTemplate from "@/pages/protected/form/gis-form-template/UpdateGisFormTemplate";
import CreateGisForm from "@/pages/protected/form/gis-form/CreateGisForm";
import GisFormDataList from "@/pages/protected/form/gis-form/GisFormDataList";
import GisFormPage from "@/pages/protected/form/gis-form/GisFormPage";
import UpdateGisForm from "@/pages/protected/form/gis-form/UpdateGisForm";
import InfoPage from "@/pages/protected/info/InfoPage";
import MapPage from "@/pages/protected/map/MapPage";
import TablePage from "@/pages/protected/table/TablePage";
import { Navigate } from "react-router-dom";


const ChildRoutes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "map",
    element: <MapPage />,
  },

  {
    path: "table",
    element: <TablePage />,
  },
  {
    path: "chart",
    element: <ChartPage />,
  },
  {
    path: "info",
    element: <InfoPage />,
  },
  {
    path: "gis-forms",
    element: <GisFormPage />,
  },
  {
    path: "gis-forms/:id",
    element: <GisFormDataList />,
  },
  {
    path: "gis-forms/:id/create",
    element: <CreateGisForm />,
  },
  {
    path: "gis-forms/:id/update",
    element: <UpdateGisForm />,
  },

  {
    path: "form-template/create",
    element: <CreateGisFormTemplate />,
  },
  {
    path: "form-template/update/:id",
    element: <UpdateGisFormTemplate />,
  },
];

export default ChildRoutes;