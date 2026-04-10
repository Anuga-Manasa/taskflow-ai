import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <div className="bg-yellow-100 text-yellow-800 text-sm px-4 py-2 text-center">
          ⚠️ Backend may take 30–60 seconds to start (free hosting)
        </div>
        <Topbar />
        <div className="p-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
export default MainLayout;
