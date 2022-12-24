import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Box from '@mui/material/Box';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';

const sectionStyle={
    color:'white',
    maxWidth:'380px',
    border:'3px solid white',
    paddingLeft:'10px',
    paddingRight:'10px',
    marginTop:'70px'
}

export const Form = (props) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [github, setgithub] = useState("");
  const [live, setlive] = useState("")
  const [msg, setMsg] = useState('');
  const [msgColor, setMsgColor] = useState("");

  const clearMsg = ()=>{
    setTimeout(()=>{
        setMsg('')
        setMsgColor("")
    }, 3000)
}

 const handleSubmit =()=>{
  if(title && description && github && live){
    setMsg('ProjectDetails submitted Successfully!')
    setMsgColor("#6EC72D");
    clearMsg();
    //write code for submission
}
else{
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
         sx={{ mb:2, fieldset:{borderColor:'white'}, input: { color: 'white', "&:hover": {backgroundColor: '#5dc2a6'}}}}
         fullWidth
         value={title}
         onChange={(event)=>settitle(event.target.value)}
         required
          id="outlined-number"
          placeholder='Project Title'
          InputLabelProps={{
            shrink: true,
          }}
        />

        {/* Project Description */}
        <TextField
        sx={{ mb:2, fieldset:{borderColor:'white'}, input: { color: 'white', "&:hover": {backgroundColor: '#5dc2a6'}}}}
        value={description}
        onChange={(event)=>setdescription(event.target.value)}
        fullWidth
        id="outlined-number"
        placeholder="Project Description"
        />

<TextField
         sx={{ mb:2,fieldset:{borderColor:'white'},input: { color: 'white', "&:hover": {backgroundColor: '#5dc2a6',} }}}
         fullWidth
         value={github}
         onChange={(event)=>setgithub(event.target.value)}
         required
          id="outlined-number"
          placeholder='Github Repo Link'
          InputLabelProps={{
            shrink: true,
          }}
        />

<TextField
         sx={{ mb:4,fieldset:{borderColor:'white'}, input: { color: 'white', "&:hover": {backgroundColor: '#5dc2a6',} }}}
         fullWidth
         value={live}
         onChange={(event)=>setlive(event.target.value)}
         required
          id="outlined-number"
          placeholder='Live Demo Link'
          InputLabelProps={{
            shrink: true,
          }}
        />
         {msg && msgColor && <div style={{border:'2px solid white', fontWeight:'bold', color:'white', borderRadius:'10px', paddingRight:'17px', paddingLeft:'17px', marginTop:'-25px', marginBottom:'10px', backgroundColor:msgColor, paddingTop:'6px', paddingBottom:'6px'}}>{msg}</div>}

<Button onClick={handleSubmit} sx={{mb:2, backgroundColor:'#5dc2a6'}} variant="contained">Create Project</Button>
        
    </Container>
        
  )
}
