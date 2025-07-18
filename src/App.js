
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks):[]
  });
  const [input, setInput] = useState('');
  useEffect(()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks));
  },[tasks])
  const handleAddTask = () =>{
    if(input.trim() ==='') return;
    setTasks([...tasks, input]);
    setInput('');
  }

  const handleDeleteTask = (index) =>{
    const newtask = tasks.filter((_, i)=> i!== index);
    setTasks(newtask);
  }
  return (
    <div className="app-container" style ={{maxWidth:400, margin:'auto', padding:20}}>
      <h1 className="app-title">To-do List</h1>
      <div className="input-group">
          <input className="task-input"
            type='text' value={input} onChange={(e)=> setInput(e.target.value)}
            placeholder='add a new task'
            onKeyPress={(e)=> e.key ==='Enter' && handleAddTask()}
       />
       <button  className="add-btn" onClick={handleAddTask}>Add task</button>
      </div>
      
       <ul className="task-list">
        {tasks.map((task, i)=>{
          return <li className="task-item" key={i} style={{display:'flex', justifyContent:'space-between',}}>
            <span>{tasks}</span>
            <button  className="delete-btn" onClick={() => handleDeleteTask(i)}>Delete</button>
          </li>
        }
      )}
       </ul>
    </div>
  );
}

export default App;
