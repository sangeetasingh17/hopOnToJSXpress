import { FaEdit, FaTimes } from "react-icons/fa";
import { Switch, Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const confirm = Modal.confirm;

export interface TodoProps {
  id: number;
  title: string;
  day: string;
  description: string;
  done: boolean;
  onDelete?(id: number): void;
  // onEdit?: (todo: TodoProps) => void;
  onComplete?(id: number): void;
}

const Todo = ({ onDelete, onComplete, ...task }: TodoProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleDoubleClick = () => {
    if (!checked) {
      confirm({
        title: "Do you want to mark this item complete?",
        content: task.title,
        onOk() {
          if (onComplete) onComplete(task.id);
          setChecked(true);
        },
        onCancel() {},
      });
    } else {
      confirm({
        title: "Do you want to mark this item incomplete?",
        content: task.title,
        onOk() {
          if (onComplete) onComplete(task.id);
          setChecked(false);
        },
        onCancel() {},
      });
    }
  };

  const handleDelete = () => {
    onDelete?.(task.id);
  };

  const handleEdit = () => {
    navigate(`/edit/${task.id}`);
    console.warn(task);
  };

  return (
    <div className={`task ${task.done ? "done" : ""}`}>
      <h3>
        <div className="left-item">{task.title}</div>
        <div className="right-items">
          <Switch
            style={{ marginRight: "25px" }}
            onClick={handleDoubleClick}
            checked={checked}
          />
          <FaEdit
            style={{ color: "green", marginRight: "10px" }}
            onClick={handleEdit}
          />

          <FaTimes
            style={{ color: "red", marginLeft: "10px" }}
            onClick={handleDelete}
          />
        </div>
      </h3>
      <h5 style={{ color: "grey" }}>{task.day}</h5>
      <p>{task.description}</p>
    </div>
  );
};

export default Todo;
