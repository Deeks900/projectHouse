import React from 'react'
import { Grid, Typography } from '@mui/material';
import {img4} from './../../assets'
import {Form} from './Form';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    containerStyle:{
          [theme.breakpoints.between('sm', 'md')]:{
            position:'absolute',
           left:30,
          },
          [theme.breakpoints.between('md', 'lg')]: {
            position:'absolute',
           left:180,
          },
          [theme.breakpoints.between('lg', 'xl')]:{
           position:'absolute',
           left:140,    
          },  
    },
    imageStyle:{
        height: "90vh",
        backgroundImage:`url(${img4})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        opacity:0.9,
        position:'absolute'
    }
}))


export const CreateProject = (props) => {
    const classes = useStyles();
  return (
    <Grid className={classes.imageStyle}
    container
    direction="column"
    justify="space-evenly"
    alignItems="center"
    {...props}
>
  <Grid item className={classes.containerStyle} {...props}>
    <Form />
  </Grid>
</Grid>
  )
}
