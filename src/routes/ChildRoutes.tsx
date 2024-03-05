import EmptyFormTemplate from "@/components/form-template/EmptyFormTemplate";
import ChartPage from "@/pages/protected/chart/ChartPage";
import ChartViewPage from "@/pages/protected/chart/ChartViewPage";
import Dashboard from "@/pages/protected/dashboard/Dashboard";
import CreateGisFormTemplate from "@/pages/protected/form/gis-form-template/CreateGisFormTemplate";
import GisFormTemplates from "@/pages/protected/form/gis-form-template/GisFormTemplates";
import UpdateGisFormTemplate from "@/pages/protected/form/gis-form-template/UpdateGisFormTemplate";
import CreateGisForm from "@/pages/protected/form/gis-form/CreateGisForm";
import GisFormDataList from "@/pages/protected/form/gis-form/GisFormDataList";
import GisFormPage from "@/pages/protected/form/gis-form/GisFormPage";
import UpdateGisForm from "@/pages/protected/form/gis-form/UpdateGisForm";
import InfoPage from "@/pages/protected/info/InfoPage";
import MapPage from "@/pages/protected/map/MapPage";
import TablePage from "@/pages/protected/table/TablePage";


const ChildRoutes = [
  {
    index: true,
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
    path: "chart/Create",
    element: <ChartPage />,
  },
  {
    path: "chart/:id",
    element: <ChartViewPage />,
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
    path: "form-templates",
    element: <GisFormTemplates />,
  },
  {
    path: "no-form-templates",
    element: <EmptyFormTemplate />,
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
