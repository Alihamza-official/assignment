

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

const CreateTask = ({ addTask }) => {
  const history = useHistory();
  const [task, setTask] = useState("");

    return(
        <React.Fragment> 
          <Box
            component="form"
            sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
          <TextField 
            id="standard-basic" 
            label="Add task here" 
            variant="standard"
            onChange = { (e) => setTask(e.target.value)}  
          />
          <br/>
          <Button variant="contained" onClick={ () => { 
              addTask(task);
              history.push("/list-tasks")
            } 
            }> Save Task </Button>
        </Box>
      </React.Fragment>
    )
}

export default CreateTask; 