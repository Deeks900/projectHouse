import React, {useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {img1} from './../../assets';
import {  useParams } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';

export default function ProjectDetails() {
  const { id } = useParams();
  useFirestoreConnect([
    { collection: 'projects', doc: id}
  ])
   
  const projectData = useSelector(
    ({ firestore: { data } }) => data.projects && data.projects[id]
  )

  const githubLink = projectData?.github
  const demoLink = projectData?.live

  return (
     <div style={{display:'flex', justifyContent:"center", alignItems:"center", height:'90vh'}}>
      <Card sx={{ maxWidth: 545, position:'relative', minWidth:'350px', minHeight:'350px'}}>
      <CardMedia
        component="img"
        height="150"
        image={img1}
        alt="project-cover"
      />

      <CardContent>
        <Typography sx={{fontFamily: 'Cormorant Garamond',fontSize: 24, fontWeight:'bold'}} gutterBottom variant="h5" component="div"><>{projectData?.title}</></Typography>
        <Typography variant="body2" color="text.secondary" sx={{mb:2}}><>{projectData?.description}</></Typography>
      </CardContent>

      <div style={{marginTop:28}}>
      <CardActions style={{display:'flex', justifyContent:'space-evenly'}}>
        <Button href={demoLink} target="_blank" variant="contained" size="small" sx={{backgroundColor:'#1C8D73'}} >Live Demo</Button>
        <Button href={githubLink} target="_blank" variant="contained" size="small" sx={{backgroundColor:'#1C8D73'}}>Github Link</Button>
      </CardActions>
      </div>
    </Card>
    </div>  
  );
}

// const projectData = useSelector((state)=>state.firestore.data.projects[id])