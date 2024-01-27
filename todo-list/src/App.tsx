import React, { useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/Header";
import { TodoProps } from "./components/Todo";
import CreateTodo from "./components/CreateTodo";

const App: React.FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);
  const [editedTask, setEditedTask] = useState<TodoProps>();
  const [tasks, setTasks] = useState<TodoProps[]>([
    {
      id: 1,
      title: "CP",
      day: "Feb 5th at 2:30pm",
      description: "codeforces 5 questions and leetcode 3",
      done: false,
    },
    {
      id: 2,
      title: "grocery shopping",
      day: "Jun 2nd at 12pm",
      description: "vegies, paneer, aloo",
      done: false,
    },
    {
      id: 3,
      title: "goa trip",
      day: "Dec 28th at 5am",
      description: "codeforces 5 questions and leetcode 3",
      done: false,
    },
  ]);

  const addTodo = (todo: TodoProps) => {
    const updatedTodo = {
      ...todo,
      id: tasks.length + 1,
    };
    // console.log(updatedTodo);
    setTasks((prevTasks) => [...prevTasks, updatedTodo]);
  };

  const editTodo = (todo: TodoProps) => {
    setTasks(
      tasks.map((task) =>
        task.id === todo.id
          ? {
              ...task,
              title: todo.title,
              day: todo.day,
              description: todo.description,
            }
          : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id)); //the filter method to create a new array that includes only those elements from the original tasks array where the id does not match the provided id.
  };

  const todoCompleted = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const toggleShowForm = () => {
    setShowEditForm(false);
    setShowForm(true);
  };

  const toggleShowEditform = () => {
    setShowForm(false);
    setShowEditForm(true);
  };

  // console.log("editedTask", editedTask);

  const closeForm = () => {
    setShowEditForm(false);
    setShowForm(false);
  };

  return (
    <div className="App">
      <Header toggleShowForm={toggleShowForm} showForm={showForm} />
      {(showForm || showEditForm) && (
        <CreateTodo
          editedTask={editedTask}
          isCreateView={showForm}
          isEditView={showEditForm}
          onAdd={addTodo}
          onEdit={editTodo}
          closeForm={closeForm}
        />
      )}

      {tasks.length > 0 ? (
        <Todos
          tasks={tasks}
          onDelete={deleteTask}
          onToggle={todoCompleted}
          toggleShowEditform={toggleShowEditform}
          onEditedTask={setEditedTask}
        />
      ) : (
        <h4>No Todos</h4>
      )}
    </div>
  );
};

export default App;
