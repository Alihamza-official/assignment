

import  React, { useEffect , useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';

const BulkDelete = ({ tasks, deleteMultipleTasks}) => {
    const history = useHistory();
    console.log(tasks);
    const [newTasks, setNewTasks] = useState([]);

    console.log('State changes ')
    
    useEffect( () => {
      
      tasks.map( (obj, index) => {
        obj.state = false; 
        return obj; 
      });
      setNewTasks([...tasks]);
    }, [tasks])

    const handleChange = (task) => {
      console.log('Id is ', task.id);

      let tempTasks = [...newTasks]; 
      tempTasks.map( (obj, index) => {
        if( obj.id == task.id) {
          obj.state = !task.state;
          return obj;
        }
        return obj;
      });

      setNewTasks(tempTasks)
      
    }

    return(
        <>
        <h1> Tasks List</h1>
        <div>
            <Button variant="outlined" onClick={ () => history.push("/create-task")} > Create Task</Button>
        </div>

        <br/> 
        <Button variant="outlined" onClick = { () => deleteMultipleTasks(newTasks) }> Delete </Button>
        {
            newTasks.map( (task, index) => {
                return <div key = {index} >
                { console.log('good')}
                <br/>
                <Card sx={{ maxWidth: 345 }}>
                    <CardActionArea>
                      <CardContent>
                          <Typography gutterBottom variant="h5" component="div">
                            { task.name }
                          </Typography>

                          <Checkbox
                            checked={task.state}
                            onChange={() => handleChange(task)}
                            inputProps={{ 'aria-label': 'controlled' }}
                          />
                          
                      </CardContent>
                    </CardActionArea>
                </Card>
               </div>
            })
        }
        
        </>
    )
}

export default BulkDelete; 