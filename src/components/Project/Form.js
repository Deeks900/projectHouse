import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useFirebase, useFirestore } from "react-redux-firebase";
import { addProject, clearSubmitError  } from "./../../store/actions";
import { useNavigate } from "react-router-dom";
import ViewAlert from './ViewAlert';
import Autocomplete from '@mui/material/Autocomplete';
import { Languages } from '../../helpers/Languages';
import { v4 as uuidv4 } from 'uuid';

const sectionStyle = {
  color: 'white',
  maxWidth: '380px',
  border: '3px solid white',
  paddingLeft: '10px',
  paddingRight: '10px',
  marginTop: '20px'
}

export const Form = (props) => {
  const languagesList = Languages
  const [techList, setTechList] = useState([]);
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [github, setgithub] = useState("");
  const [live, setlive] = useState("");
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
    if (title && description && github && live && techList?.length != 0) {
      addProject({ title, description, github, live, techList })(dispatch, firebase, firestore);
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
        sx={{ mb: 2, fieldset: { borderColor: 'white' }, input: { color: 'white', "&:hover": { backgroundColor: '#5dc2a6', } } }}
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

    <Autocomplete
    renderOption={(props, option) => {
      let key = uuidv4();
      return (
        <li {...props} key={key}>
          {option}
        </li>
      );
    }}
  
     autoHighlight={true}
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={languagesList}
      // getOptionLabel={(option) => option}
      onChange={(event, option) => {setTechList(option)}}
      renderInput={(params) => (
        <TextField 
        sx={{ mb: 4, fieldset: { borderColor: 'white' }, input: { color: 'white' } }} 
        {...params}
         placeholder="Select Languages"
          required
          />
      )}
      />
      {msg && loadingProp == false && <div style={{ border: '2px solid white', fontWeight: 'bold', color: 'white', borderRadius: '10px', paddingRight: '17px', paddingLeft: '17px', marginTop: '-25px', marginBottom: '10px', backgroundColor: "#FF6263", paddingTop: '6px', paddingBottom: '6px' }}>{msg}</div>}
      <ViewAlert errorProp={errorProp} loadingProp={loadingProp} />
      <Button disabled={loadingProp} onClick={handleSubmit} sx={{ mb: 2, backgroundColor: '#5dc2a6' }} variant="contained">Create Project</Button>
    </Container>
  )
}
