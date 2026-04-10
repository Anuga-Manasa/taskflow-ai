import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import WorkspaceModal from "../components/WorkspaceModal";
import { useTopbar } from "../context/TopbarContext";
import Loader from "../components/Loader";

function Dashboard() {
  const [workspaces, setWorkspaces] = useState<any[]>([]);
  const navigate = useNavigate();
  const [isCreateOpen, setIsCreateopen] = useState(false);
  const [name, setName] = useState("");
  const { setTitle } = useTopbar();
  const [loading, setLoading] = useState(false);
  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const res = await api.get("/workspaces");
      setWorkspaces(res.data.workspaces);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const fetchUser = async () => {
    try {
      const res = await api.get("/user/profile");
      setName(res.data.user.name);
    } catch (error) {
      console.log("error in fetching user details");
    }
  };
  useEffect(() => {
    fetchWorkspaces();
    fetchUser();
  }, []);
  useEffect(() => {
    setTitle(`Welcome, ${name}!`);
  }, [name]);

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
    <div className="p-4">
      {/*Header*/}
      <h1 className="text-3xl font-semibold tracking-tight mb-4">Dashboard</h1>
      {/*Create workspace */}
      <button
        onClick={() => setIsCreateopen(true)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mb-4 rounded transition"
      >
        + Create Workspace
      </button>

      {/* Workspace Grid */}

      {/* Placeholder */}
      {workspaces.length === 0 ? (
        <div className="text-center mt-20 text-gray-500">
          <p className="text-lg font-medium">No workspaces yet 🚀</p>
          <p className="text-sm mt-2">
            Create your first workspace to get started
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {workspaces.map((ws: any) => (
            <div
              key={ws.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg cursor-pointer border border-gray-100"
              onClick={() => navigate(`/workspaces/${ws.id}`)}
            >
              <h3 className="text-lg">{ws.name}</h3>
            </div>
          ))}
        </div>
      )}
      {isCreateOpen && (
        <WorkspaceModal
          isCreateOpen={isCreateOpen}
          onClose={() => setIsCreateopen(false)}
          onCreate={createWorkspace}
        />
      )}
      {loading && <Loader />}
    </div>
  );
}
export default Dashboard;
