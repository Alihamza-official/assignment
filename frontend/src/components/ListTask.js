

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';


const ListTask = ({ tasks }) => {
    const history = useHistory();
    console.log(tasks);

    return(
        <>
        <h1> Tasks List</h1>
        <div>
            <Button variant="outlined" onClick={ () => history.push("/create-task")} style={{ marginRight: "20px"}}> Create Task</Button> 
            <Button variant="outlined" onClick={ () => history.push("/bulk-delete")} > Delete Task</Button>
        </div>

        {
          tasks.map( (task, index) => {
              return <div key = {index} >
              { console.log('good')}
              <br/>

              <Card sx={{ maxWidth: 345 }}>
                  <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          { task.name }
                        </Typography>
                        
                    </CardContent>
                  </CardActionArea>
              </Card>
              </div>
          })
        }

       
        </>
    )
}

export default ListTask; 