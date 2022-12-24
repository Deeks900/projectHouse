import React from 'react'
import BrandName from './BrandName';
import Grid from '@mui/material/Grid';

const Spinner = () => {
  return (
    <Grid container>
        <Grid style={{display:'flex', justifyContent:'center', alignItems:'center', minHeight:'100vh', margin:'auto'}}>
          <BrandName />
        </Grid>
    </Grid>
  )
}

export default Spinner