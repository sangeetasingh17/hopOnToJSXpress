import { FaEdit, FaTimes } from "react-icons/fa";
import { Switch, Modal } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";

const confirm = Modal.confirm;

export interface TodoProps {
  id: number;
  title: string;
  day: string;
  description: string;
  done: boolean;
  onDelete?(id: number): void;
  onComplete?(id: number): void;
  toggleShowEditform?(): void;
  onEditedTask?(todo: TodoProps): any;
}

const Todo = ({
  onDelete,
  onComplete,
  toggleShowEditform,
  onEditedTask,
  ...task
}: TodoProps) => {
  const handleDelete = () => {
    if (onDelete) onDelete(task.id);
  };

  const [checked, setChecked] = useState<boolean>(false);

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

  const navigate = useNavigate();
  const { id } = useParams();

  const handleEdit = () => {
    toggleShowEditform?.();
    onEditedTask?.(task);
    navigate("/edit");
  };

  return (
    <div className={`task ${task.done ? "done" : ""}`}>
      <h3>
        <div className="left-item">{task.title}</div>
        <div className="right-items">
          <Switch
            style={{ marginRight: "25px" }}
            // onChange={handleDoubleClick}
            onClick={handleDoubleClick}
            checked={checked}
          />
          <Link to={`/edit/${task.id}`}>
            <FaEdit
              style={{ color: "green", marginRight: "10px" }}
              onClick={handleEdit}
            />
          </Link>

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
