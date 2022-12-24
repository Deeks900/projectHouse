import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {img1} from './../../assets';

export default function ProjectDetails() {
   
  return (
     <div style={{display:'flex', justifyContent:"center", alignItems:"center", height:'90vh'}}>
         <Card sx={{ maxWidth: 545, position:'relative'}}>
      <CardMedia
        component="img"
        height="150"
        image={img1}
        alt="project-cover"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Project Title
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{mb:2}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus earum est eligendi magni quod! Repellat eveniet magni ab, recusandae omnis explicabo ratione quos, perferendis asperiores illum maiores facilis autem vitae aspernatur rerum debitis enim veniam reiciendis esse! Modi laboriosam sapiente possimus. Dolore labore quis facilis similique dolorum necessitatibus, beatae laboriosam.
          Project Description Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica. 
        </Typography>
      </CardContent>

      <div style={{marginTop:28}}>
      <CardActions>
        <Button variant="contained" size="small" sx={{backgroundColor:'#1C8D73', position:'absolute', bottom:10, right:12}} >Live Demo</Button>
        <Button variant="contained" size="small" sx={{backgroundColor:'#1C8D73', position:'absolute', bottom:10, right:130}}>Github Link</Button>
      </CardActions>
      </div>
    </Card>
    </div>  
  );
}

