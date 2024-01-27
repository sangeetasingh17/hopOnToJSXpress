import React, { useEffect, useState } from "react";
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


  const fetchTasks = () => {
    fetch('/tasks')
      .then(response => response.json())
      .then(data => setTasks(data.tasks))
      .catch(error => console.error("Error fetching tasks:", error));
  };

  // Call this function when your component mounts or when you need to refresh the task list
  useEffect(() => {
    fetchTasks();
  }, [setTasks]);


  const addTodo = (todo: TodoProps) => {
    fetch("/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    })
      .then((response) => response.json())
      // .then((data) => setTasks((prevTasks) => [...prevTasks, data]))
      .then((data) => {
        console.log(data.message);
        // setTasks((prevData))
        setTasks((prevTasks) => [...prevTasks, data]);
        // fetchTasks();
      })
      .catch((error) => console.error("Error adding task:", error));
  };

  const editTodo = (edit_id: number) => {
    fetch(`/tasks/${edit_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editedTask),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === edit_id ? { ...task, id: edit_id } : task
          )
        );
      })
      .catch(error => console.error('Error editing task:', error));

  };

  const deleteTask = (id: number) => {
    fetch(`/tasks/${id}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // console.log(data.message);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
      })
      .catch(error => console.error('Error deleting task:', error));
  };

  const todoCompleted = (id: number) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );

    const updatedTask = updatedTasks.find(task => task.id === id);

    if (updatedTask) {
      fetch(`/tasks/complete/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          setTasks(updatedTasks);
        })
        .catch(error => console.error('Error updating task:', error));
    }
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
