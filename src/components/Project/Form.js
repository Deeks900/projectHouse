import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { addProject, clearSubmitError  } from "./../../store/actions";
import { useNavigate } from "react-router-dom";
import ViewAlert from './ViewAlert';

const sectionStyle = {
  color: 'white',
  maxWidth: '380px',
  border: '3px solid white',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginTop: '70px'
}

export const Form = (props) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [github, setgithub] = useState("");
  const [live, setlive] = useState("")
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState("");
  const firestore = useFirestore();
  const firebase = useFirebase();
  const dispatch = useDispatch();

  // Whenver some changes occur in store, useSelector forces the component to re-render
  const errorProp = useSelector((state) => state.submitReducer.error);
  const loadingProp = useSelector((state) => state.submitReducer.loading);
  const navigate = useNavigate();

  if (loadingProp == false && errorProp == false) {
    navigate('/');
  }

  const clearMsg = () => {
    setTimeout(() => {
      setMsg('')
      setMsgColor("")
    }, 3000)
  }

  useEffect(()=>{
    clearSubmitError()(dispatch);
  }, [])

  const handleSubmit = () => {
    if (title && description && github && live) {
      addProject({ title, description, github, live })(dispatch, firebase, firestore);
    }
    else {
      setMsgColor("#FF6263");
      setMsg('Please fill all the fields!')
      clearMsg();
      return;
    }
  }

  return (
    <Container style={sectionStyle}>
      <h3>Enter the Project Details</h3>

      {/* Project Title */}
      <TextField
        sx={{ mb: 2, fieldset: { borderColor: 'white' }, input: { color: 'white', "&:hover": { backgroundColor: '#5dc2a6' } } }}
        fullWidth
        value={title}
        onChange={(event) => settitle(event.target.value)}
        required
        id="outlined-number"
        placeholder='Project Title'
        InputLabelProps={{
          shrink: true,
        }}
      />

      {/* Project Description */}
      <TextField
        sx={{ mb: 2, fieldset: { borderColor: 'white' }, input: { color: 'white', "&:hover": { backgroundColor: '#5dc2a6' } } }}
        value={description}
        onChange={(event) => setdescription(event.target.value)}
        fullWidth
        id="outlined-number"
        placeholder="Project Description"
      />

      <TextField
        sx={{ mb: 2, fieldset: { borderColor: 'white' }, input: { color: 'white', "&:hover": { backgroundColor: '#5dc2a6', } } }}
        fullWidth
        value={github}
        onChange={(event) => setgithub(event.target.value)}
        required
        id="outlined-number"
        placeholder='Github Repo Link'
        InputLabelProps={{
          shrink: true,
        }}
      />

      <TextField
        sx={{ mb: 4, fieldset: { borderColor: 'white' }, input: { color: 'white', "&:hover": { backgroundColor: '#5dc2a6', } } }}
        fullWidth
        value={live}
        onChange={(event) => setlive(event.target.value)}
        required
        id="outlined-number"
        placeholder='Live Demo Link'
        InputLabelProps={{
          shrink: true,
        }}
      />
      <ViewAlert errorProp={errorProp} loadingProp={loadingProp} />
      <Button disabled={loadingProp} onClick={handleSubmit} sx={{ mb: 2, backgroundColor: '#5dc2a6' }} variant="contained">Create Project</Button>
    </Container>

  )
}
