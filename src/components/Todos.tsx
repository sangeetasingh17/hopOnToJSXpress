import React from "react";
import Todo, { TodoProps } from "./Todo";

interface Props {
  tasks: TodoProps[];
  onDelete(id: number): void;
  onComplete(id: number): void;
  toggleShowEditform(): void;
  onEditedTask?(todo: TodoProps): any;
}

const Todos: React.FC<Props> = ({
  tasks,
  onDelete,
  onComplete,
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
          onComplete={onComplete}
          toggleShowEditform={toggleShowEditform}
          onEditedTask={onEditedTask}
        />
        // <h3 key={task.id}>{task.description}</h3>
      ))}
    </>
  );
};

export default Todos;
