import React, { useState } from "react";
import "./App.css";
import Todos from "./components/Todos";
import Header from "./components/Header";
import { TodoProps } from "./components/Todo";
import CreateTodo from "./components/CreateTodo";
import EditTodo from "./components/EditTodo";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TodoProps[]>([
    {
      id: 1,
      title: "CP",
      day: "Feb 5 2024 04:30 pm ",
      description: "codeforces 5 questions and leetcode 3",
      done: false,
    },
    {
      id: 2,
      title: "grocery shopping",
      day: "Jan 31 2024 04:00 pm ",
      description: "vegies, paneer, aloo",
      done: false,
    },
    {
      id: 3,
      title: "goa trip",
      day: "Mar 02 2024 02:00 pm ",
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

  const editTask = (todo: any) => {
    console.warn(todo);
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

  // --------------------------------------------------

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={[
            <Header />,
            <Todos
              tasks={tasks}
              onDelete={deleteTask}
              // onEdit={editTask}
              onComplete={todoCompleted}
            />,
          ]}
        />
        <Route path="/create" element={<CreateTodo onAdd={addTodo} />} />
        <Route
          path="/edit/:id"
          element={<EditTodo prevTasks={tasks} editTask={editTask} />}
          errorElement={<h1>Error</h1>}
        />
        {/* <Route path="/edit/:id" element={<EditTodo tasks={tasks} />} /> */}
      </Routes>
    </div>
  );
};

export default App;
