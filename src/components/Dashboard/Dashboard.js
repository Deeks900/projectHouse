import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProjectList from '../Project/ProjectList';
import Notifications from './Notifications';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  return (
    <>
    <Box sx={{ flexGrow: 1}}>
    <Grid justifyContent="space-around" container>
        {/* left side starts */}
        <Grid item my={6} lg={6} md={7} sm={7} xs={10}>
            <Item><ProjectList /></Item>
        </Grid>
        {/* left side ends */}

        {/* right side starts */}
        <Grid item my={6} lg={3} md={3} sm={3} display={{xs:'none', md:'block'}}>
          <Notifications />
        </Grid>
        {/* right side ends */}
    </Grid>
    </Box>
    </>
  );
}