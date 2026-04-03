import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";
import socket from "../socket";

function Boards() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [workSpaceId, setWorkspaceId] = useState("");
  const [members, setMembers] = useState<any>([]);

  const todo = tasks.filter((t) => t.status === "TODO");
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS");
  const review = tasks.filter((t) => t.status === "REVIEW");
  const testing = tasks.filter((t) => t.status === "TESTING");
  const done = tasks.filter((t) => t.status === "DONE");

  const columns = [
    { id: "TODO", title: "TODO", data: todo },
    { id: "IN_PROGRESS", title: "IN PROGRESS", data: inProgress },
    { id: "REVIEW", title: "REVIEW", data: review },
    { id: "TESTING", title: "TESTING", data: testing },
    { id: "DONE", title: "DONE", data: done },
  ];

  const fetchTasks = async () => {
    try {
      const res = await api.get(`/boards/${boardId}/tasks`);
      setTasks(res.data.tasks);
    } catch (error) {
      console.log(error);
    }
  };
  const createTasks = async (
    title: string,
    description: string,
    assignedToId: string,
  ) => {
    if (!title) {
      return;
    }
    await api.post(`/boards/${boardId}/tasks`, {
      title,
      description,
      assignedToId,
    });
    fetchTasks();
    setIsCreateOpen(false);
  };
  const getBoardDetails = async () => {
    try {
      const res = await api.get(`/boards/${boardId}`);
      setWorkspaceId(res.data.board.workspaceId);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchMembers = async () => {
    try {
      const res = await api.get(`/workspaces/${workSpaceId}/members`);
      setMembers(res.data.members);
    } catch (error) {
      console.log(error);
    }
  };
  const updateStatus = async (taskId: string, status: string) => {
    await api.patch(`/boards/tasks/${taskId}/status`, { status });
    fetchTasks();
  };
  useEffect(() => {
    fetchTasks();
    getBoardDetails();
    socket.on("taskUpdated", () => {
      fetchTasks();
      getBoardDetails();
    });
    return () => {
      socket.off("taskUpdated");
    };
  }, []);
  useEffect(() => {
    fetchMembers();
  }, [workSpaceId]);
  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id;
    const newStatus = over.id;
    await api.patch(`/boards/tasks/${taskId}/status`, {
      status: newStatus,
    });
    fetchTasks();
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Board</h1>
      <button
        onClick={() => setIsCreateOpen(true)}
        className="bg-blue-500 rounded mb-6 text-white px-4 py-2"
      >
        + Create Task
      </button>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-5 gap-4">
          {columns.map((col) => (
            <Column key={col.id} col={col} updateStatus={updateStatus} />
          ))}
        </div>
      </DndContext>
      {isCreateOpen && (
        <TaskModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={createTasks}
          members={members}
        />
      )}
    </div>
  );
}
export default Boards;
