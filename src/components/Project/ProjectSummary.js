import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import moment from 'moment/moment';

const ProjectSummary = ({project})=>{
  let date = moment(project.created.toDate()).calendar();
	// let mm = date.getMonth();
	// let dd = date.getDate();
	// let yyyy = date.getFullYear();
  // const id = project.id;
  
	// date = (dd + '/' + mm + '/' + yyyy);
  return (
    <Card sx={{ minWidth: 275, minHeight:170, position:'relative' }}>
      <CardContent>
        
        <Typography sx={{ fontFamily: 'Cormorant Garamond', fontWeight:'bold', fontSize:34 }} gutterBottom>{project.title}</Typography>
        
        <div style={{position:'absolute', bottom:5}}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">Posted by {project.author} on {date}</Typography>
        </div>
      
      </CardContent>

      <CardActions >
        <Link to={`/project/${project.id}`}><Button variant="contained" sx={{backgroundColor:'#1C8D73', position:'absolute', right:12, bottom:11}} size="small">Open</Button></Link>
      </CardActions>

    </Card>
  );
}

export default ProjectSummary;