import { useState, useRef } from "react";

function TaskDetailModal({
  onClose,
  task,
  updateStatus,
  reAssign,
  members,
  handleFileUpload,
}: any) {
  const [status, setStatus] = useState(task.status);
  const [showUpload, setShowUpload] = useState(false);
  const [file, setFile] = useState<any>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo?.id || "");

  if (!task) return null;
  return (
    <div className="fixed bg-black bg-opacity-50 inset-0 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow w-80">
        <h2 className="text-xl mb-2 font-bold">{task.title}</h2>
        <div className="mb-3">
          <label className="block text-smmb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full boarder p-2 rounded"
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="REVIEW">REVIEW</option>
            <option value="TESTING">TESTING</option>
            <option value="DONE">DONE</option>
          </select>
          <button
            onClick={() => updateStatus(task.id, status)}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
          >
            Update Status
          </button>
        </div>
        {/*Assign*/}
        <div className="mb-3">
          <div className="text-sm text-gray-500 my-2 block">
            Task Assigned To: {task.assignedTo?.name || "Unassigned"}
          </div>
          <label className="block text-sm mb-1">Assign</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Unassigned</option>
            {members.map((m: any) => (
              <option key={m.user.id} value={m.user.id}>
                {m.user.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => reAssign(task.id, assignedTo)}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
          >
            Assign
          </button>
        </div>
        {/*Attchments*/}
        <div className="mb-3">
          <label className="block text-sm mb-1">Attachments</label>
          <input
            type="file"
            onChange={(e) => {
              setFile(e);
            }}
            ref={fileInputRef}
            className="text-sm mt-2"
          />
          <button
            className="mt-2 mb-2 bg-blue-500 text-white px-3 py-1 rounded"
            onClick={() => {
              handleFileUpload(file, task.id);
              setFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            }}
          >
            Upload
          </button>
          {task.attachments?.map((file: any) => (
            <a
              key={file.id}
              href={`http://localhost:5000/${file.url}`}
              target="_blank"
              className="text-blue-500 text-xs block"
            >
              View File
            </a>
          ))}
        </div>
        <div className="flex justify-end">
          <button onClick={onClose} className="mt-4 text-red-500 text-sm">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default TaskDetailModal;
