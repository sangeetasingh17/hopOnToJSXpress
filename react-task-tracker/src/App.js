import Header from "./components/Header"
import Tasks from "./components/Tasks"
import { useState } from 'react'

const App = () => {
  const [tasks, setTasks] = useState(
    [
      {
        id: 1,
        text: 'Write Poems',
        day: 'Jan 15 at 2:00am',
        reminder: true,
      },
      {
        id: 2,
        text: 'CP',
        day: 'Jan 25 at 12:00pm',
        reminder: true,
      },
      {
        id: 3,
        text: 'shopping',
        day: 'Jan 14 at 12:00pm',
        reminder: true,
      }
    ]
  )

  //delete Task
  const deleteTask = (id) => {
    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className='container'>
      <Header />
      <Tasks tasks={tasks} onDelete={deleteTask} />
    </div>
  )
}

export default App;
