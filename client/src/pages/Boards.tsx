import { useParams } from "react-router-dom";
import api from "../services/api";
import { useEffect, useState } from "react";
import TaskModal from "../components/TaskModal";
import { DndContext } from "@dnd-kit/core";
import Column from "../components/Column";

function Boards() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState<any[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

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
  const createTasks = async (title: String, description: String) => {
    if (!title) {
      return;
    }
    await api.post(`/boards/${boardId}/tasks`, { title, description });
    fetchTasks();
    setIsCreateOpen(false);
  };
  const updateStatus = async (taskId: string, status: string) => {
    await api.patch(`/boards/tasks/${taskId}/status`, { status });
    fetchTasks();
  };
  useEffect(() => {
    fetchTasks();
  }, []);
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
          {/*<div key={col.id} className="bg-gray-100 p-3 rounded min-h-[400px]">
              <h2 className="font-bold-mb-3">{col.title}</h2>
              {col.data.map((task: any) => (
                <div key={task.id} className="bg-white p-2 mb-2 rounded shadow">
                  {task.title}
                  <button
                    onClick={() => updateStatus(task.id, "IN_PROGRESS")}
                    className="text-xs text-blue-500 mt-1"
                  >
                    Move →
                  </button>
                </div>
              ))}
            </div>*/}
        </div>
      </DndContext>
      {isCreateOpen && (
        <TaskModal
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onCreate={createTasks}
        />
      )}
    </div>
  );
}
export default Boards;
