import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import BoardModal from "../components/BoardModal";

function Workspaces() {
  const { workspaceId } = useParams();
  const [boards, setBoards] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const fetchBoards = async () => {
    try {
      const res = await api.get(`/workspaces/${workspaceId}/boards`);
      setBoards(res.data.boards);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWorkSpaceDetails = async () => {
    try {
      const resWorkspace = await api.get("/workspaces");
      const currentWorkspace = resWorkspace.data.workspaces.find(
        (ws: any) => ws.id === workspaceId,
      );
      setRole(currentWorkspace?.members[0]?.role || "ADMIN");
    } catch (error) {
      console.log(error);
    }
  };
  const createBoards = async (name: String) => {
    if (!name) return;
    api.post(`/workspaces/${workspaceId}/boards`, { name });
    fetchBoards();
    setIsCreateOpen(false);
  };
  useEffect(() => {
    fetchBoards();
    fetchWorkSpaceDetails();
  }, []);

  const handleInviteUser = async () => {
    if (!email) {
      return;
    }
    await api.post(`/workspaces/${workspaceId}/members`, { email });
    setEmail("");
  };

  return (
    <div className="p-6">
      {/* header */}
      <h1 className="text-2xl font-bold mb-6">Boards</h1>
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
      >
        + Create Board
      </button>
      {role === "ADMIN" && (
        <div className="mb-4 flex gap-2">
          <input
            className="p-2 rounded border"
            type="email"
            placeholder="Invite by email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleInviteUser}
            className="bg-green-500 text-white px-3 rounded"
          >
            Invite
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {boards.map((board) => (
          <div
            key={board.id}
            className="bg-white shadow p-4 rounded hover:shadow-lg cursor-pointer"
            onClick={() => {
              navigate(`/boards/${board.id}`);
            }}
          >
            {board.name}
          </div>
        ))}
      </div>
      {isCreateOpen && (
        <BoardModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreateBoard={createBoards}
        />
      )}
    </div>
  );
}
export default Workspaces;
