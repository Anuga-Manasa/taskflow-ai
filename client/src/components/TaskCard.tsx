import { useDraggable } from "@dnd-kit/core";

function TaskCard({ task }: any) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-2 mb-2 rounded shadow cursor-grab"
    >
      {task.title}
    </div>
  );
}
export default TaskCard;
