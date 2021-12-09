
import React , {useState, useEffect} from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import ListTask from './components/ListTask';
import BulkDelete from './components/BulkDelete';
import CreateTask from './components/CreateTask';
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from 'react-router-dom';

function App() {

  const [container, setContainer] = useState("todolist");
  const [tasks, setTasks] = useState([]);
  const history = useHistory();

  useEffect( () => {
    const obj = [
      { id: 1, name: 'taskone'}, 
      { id: 2, name: 'tasktwo'}, 
      { id: 3, name: 'taskthree'}, 
      { id: 4, name: 'taskfour'}, 
      { id: 5, name: 'taskfive'}, 
    ];

    setTasks(obj);

  }, []);

  const addTask = (task) => {
    if(task) {
      let id = uuidv4();
      console.log('task is ', task);
      console.log('Id is ', id);
      const obj = {
        id,
        name: task
      };
  
      setTasks([...tasks, obj ]);
      console.log(tasks);
  
    }
   
  }
  // END ADDTASKS

  const deleteMultipleTasks = (list) => {
    console.log("Deleted list is ", list);
    const newList = list.filter( (obj, index) => {
      if(obj.state == true) {
          console.log('Yahoo')
      } else {
        return obj;
      }
    })
    
    setTasks(newList)
  }

  const deleteTask = () => {

  }
  return (
    <BrowserRouter>
      <Switch>
          <Route path="/" exact >
            <Redirect to="/list-tasks" />
          </Route>
          <Route path="/list-tasks" exact >
              <ListTask tasks={tasks } />
          </Route>
          <Route path="/create-task" exact >
            <CreateTask addTask={addTask} />
          </Route>
          <Route path="/bulk-delete" exact>
            <BulkDelete tasks={tasks } deleteMultipleTasks={deleteMultipleTasks} />
          </Route>
      </Switch>
    </BrowserRouter>
  ); 
}

export default App;
