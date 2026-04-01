import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import WorkspaceModal from "../components/WorkspaceModal";

function Dashboard() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateopen] = useState(false);
  const fetchWorkspaces = async () => {
    try {
      const res = await api.get("/workspaces");
      setWorkspaces(res.data.workspaces);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  const createWorkspace = async (name: String) => {
    try {
      if (!name) return;
      await api.post("/workspaces", { name });
      fetchWorkspaces();
      setIsCreateopen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      {/*Header*/}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue"> Dashboard</h1>
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      {/*Create workspace */}
      <button
        onClick={() => setIsCreateopen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        + Create Workspace
      </button>

      {/* Workspace Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Placeholder */}
        {workspaces.map((ws: any) => (
          <div
            key={ws.id}
            className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
            onClick={() => navigate(`/workspaces/${ws.id}`)}
          >
            {ws.name}
          </div>
        ))}
      </div>
      {isCreateOpen && (
        <WorkspaceModal
          isCreateOpen={isCreateOpen}
          onClose={() => setIsCreateopen(false)}
          onCreate={createWorkspace}
        />
      )}
    </div>
  );
}
export default Dashboard;
