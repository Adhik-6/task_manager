import { createContext, StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from "axios"

export const DataContext = createContext();

const Main = () => {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const populateTask = async () => {
      try{
        const res = await axios.get("http://localhost:8000/api/v1/tasks")
        setTaskList(res.data)
      } catch(err) {
        console.log(err)
      }
    }
    populateTask()
  }, [])

    return (
      <StrictMode>
        <DataContext.Provider value={{taskList, setTaskList}}>
          <App />
        </DataContext.Provider>
      </StrictMode>
    )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement); 
root.render(<Main />);
// createRoot(document.getElementById('root')).render(<Main/>)
