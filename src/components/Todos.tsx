import React from "react";
import Todo, { TodoProps } from "./Todo";
import { Route, Routes } from "react-router-dom";
import EditTodo from "./EditTodo";

interface Props {
  tasks: TodoProps[];
  onDelete?(id: number): void;
  // onEdit?: (todo: TodoProps) => void;
  onComplete?(id: number): void;
}

const Todos = ({
  tasks,
  onDelete,
  // onEdit,
  onComplete,
}: Props) => {
  let items = tasks.map((task) => {
    return (
      <Todo
        key={task.id}
        {...task}
        onDelete={onDelete}
        // onEdit={onEdit}
        onComplete={onComplete}
      />
    );
  });

  return (
    // <>
    //   {tasks.map((task) => (
    //     <Todo
    //       key={task.id}
    //       {...task}
    //       onDelete={onDelete}
    //       onComplete={onComplete}
    //       toggleShowEditform={toggleShowEditform}
    //       onEditedTask={onEditedTask}
    //     />
    //   ))}
    // </>
    <>{items}</>
  );
};

export default Todos;
