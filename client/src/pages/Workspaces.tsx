import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import BoardModal from "../components/BoardModal";

function Workspaces() {
  const { workspaceId } = useParams();
  const [boards, setBoards] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const navigate = useNavigate();
  const fetchBoards = async () => {
    try {
      const res = await api.get(`/workspaces/${workspaceId}/boards`);
      setBoards(res.data.boards);
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
  }, []);

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
