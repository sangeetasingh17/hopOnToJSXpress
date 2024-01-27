import { FaEdit, FaTimes } from "react-icons/fa";

export interface TodoProps {
  id: number;
  title: string;
  day: string;
  description: string;
  done: boolean;
  onDelete?(id: number): void;
  onToggle?(id: number): void;
  toggleShowEditform?(): void;
  onEditedTask?(todo: TodoProps): any;
}

const Todo = ({
  onDelete,
  onToggle,
  toggleShowEditform,
  onEditedTask,
  ...task
}: TodoProps) => {
  const handleDelete = () => {
    if (onDelete) onDelete(task.id);
  };

  const handleDoubleClick = () => {
    if (onToggle) onToggle(task.id);
  };

  const handleEdit = () => {
    if (toggleShowEditform) toggleShowEditform();
    if (onEditedTask) onEditedTask(task);
  };

  return (
    <div
      className={`task ${task.done ? "done" : ""}`}
      onDoubleClick={handleDoubleClick}
    >
      <h3>
        <div className="left-item">{task.title}</div>
        <div className="right-items">
          {/* <Button
            color="darkcyan"
            text="Edit"
            customStyle={{ padding: "4px 12px" }}
            onClick={handleEdit}
          /> */}
          <FaEdit
            style={{ color: "green", marginRight: "10px" }}
            onClick={handleEdit}
          />
          <FaTimes
            style={{ color: "red", marginLeft: "10px" }}
            onClick={handleDelete}
          />
          {/* <Button
            color="#e74c3c"
            text="Delete"
            customStyle={{ padding: "4px 12px" }}
            onClick={handleDelete}
          /> */}
        </div>
      </h3>
      <h5 style={{ color: "grey" }}>{task.day}</h5>
      <p>{task.description}</p>
    </div>
  );
};

export default Todo;
