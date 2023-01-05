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

  return (
    <Card sx={{ minWidth: 275, minHeight:170, position:'relative' }}>
      <CardContent>
        
        <Typography sx={{ fontFamily: 'Cormorant Garamond', fontWeight:'bold', fontSize:34 }} gutterBottom>{project.title}</Typography>
        
        <div style={{display:'flex', flexDirection:'row'}}>
        {project?.technologies?.map((tech, index)=>(
          <Typography sx={{mt: 2, mb:4, mr:2, backgroundColor:'#40826D', color:'white', borderRadius:2, paddingLeft:'7px', paddingRight:'7px', paddingTop:'2.5px', paddingBottom:'2.5px'}} key={index} color="text.secondary">{tech}</Typography>
        ))}
        </div>
        

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