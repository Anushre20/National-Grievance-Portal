import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import CitizenDashboard from "./pages/citizen/CitizenDashboard";
import RegisterGrievance from "./pages/citizen/RegisterGrievance";
import TrackComplaint from "./pages/citizen/TrackComplaint";
import CitizenChat from "./pages/citizen/CitizenChat";
import OfficerProfile from "./pages/citizen/OfficerProfile";
import OfficerDashboard from "./pages/officer/OfficerDashboard";
import ComplaintDetail from "./pages/officer/ComplaintDetail";
import OfficerChat from "./pages/officer/OfficerChat";
import MinistryRegistry from "./pages/ministry/MinistryRegistry";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/citizen",
    children: [
      { index: true, Component: CitizenDashboard },
      { path: "register", Component: RegisterGrievance },
      { path: "track/:complaintId", Component: TrackComplaint },
      { path: "chat/:complaintId", Component: CitizenChat },
      { path: "officer/:officerId", Component: OfficerProfile },
    ],
  },
  {
    path: "/officer",
    children: [
      { index: true, Component: OfficerDashboard },
      { path: "complaint/:complaintId", Component: ComplaintDetail },
      { path: "chat/:complaintId", Component: OfficerChat },
    ],
  },
  {
    path: "/ministry",
    children: [
      { index: true, Component: MinistryRegistry },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
