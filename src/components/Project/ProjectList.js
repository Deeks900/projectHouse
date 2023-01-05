import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ProjectSummary from './ProjectSummary';
import { Link } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ProjectList = ({projects})=>{
  return (
    <>
    <Stack spacing={5}>
      {projects && projects.length!=0 ? projects.map((project, index)=>(
        <ProjectSummary key={index} project={project}/>
      )) : <div style={{color:'black'}}><h3>No Projects to Show😥 Start Adding yours Buddy😇 <Link style={{textDecoration:'none', color:'black'}} to={'/create'}>here</Link></h3></div>}
    </Stack>
    </>
  )
}
export default ProjectList;
