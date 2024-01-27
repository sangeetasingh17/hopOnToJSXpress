import React from "react";
import Todo, { TodoProps } from "./Todo";

interface Props {
  tasks: TodoProps[];
  onDelete(id: number): void;
  onToggle(id: number): void;
  toggleShowEditform(): void;
  onEditedTask?(todo: TodoProps): any;
}

const Todos: React.FC<Props> = ({
  tasks,
  onDelete,
  onToggle,
  toggleShowEditform,
  onEditedTask,
}: // onAdd,
Props) => {
  return (
    <>
      {tasks.map((task) => (
        <Todo
          key={task.id}
          {...task}
          onDelete={onDelete}
          onToggle={onToggle}
          toggleShowEditform={toggleShowEditform}
          onEditedTask={onEditedTask}
        />
        // <h3 key={task.id}>{task.description}</h3>
      ))}
    </>
  );
};

export default Todos;
