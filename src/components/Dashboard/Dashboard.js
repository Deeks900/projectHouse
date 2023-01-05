import React,{useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ProjectList from '../Project/ProjectList';
import Notifications from './Notifications';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { useSelector } from "react-redux";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  useFirestoreConnect([
    { collection: 'projects', orderBy: ["created", "desc"]}
  ])

  let allProjects = useSelector((state) => state.firestore.ordered.projects);
  const[searchValue, setSearchValue] = useState('');
  const [searchParam, setSearchParam] = useState('');
  const [projects, setProjects] = useState(allProjects);

  const handleChange = (event) => {
    setSearchParam(event.target.value);
  };

  useEffect(()=>{setProjects(allProjects)}, [allProjects])

  useEffect(()=>{
    if(searchValue != ''){
      // if searchParameter is Technology
      if (searchParam == 'Technology') {
        // If technology includes this searchValue
        let filteredProjects = allProjects?.filter((project)=>{
          let present = false;
          for(let i = 0; i<project?.technologies?.length; i++){
            if(project?.technologies[i].toLowerCase() == searchValue.toLowerCase()){
              present = true;
              break;
            }
          }
          if(present == true){
            return true;
          }
          else{
            return false;
          }
        })
        setProjects(filteredProjects);
      }
      else{
        //If title includes this searchValue
        let filteredProjects = allProjects?.filter((project) => {
          return (project?.title?.toLowerCase().includes(searchValue?.toLowerCase()))
        })
        setProjects(filteredProjects);
      }
    }
    else{
      setProjects(allProjects);
    }
  }, [searchValue])

  return (
    <>
    <Box sx={{ flexGrow: 1}}>
    <Grid justifyContent="space-around" container>
        {/* left side starts */}
        <Grid item my={6} lg={6} md={7} sm={7} xs={10}>
            {/* Search Bar */}
            
            <InputBase
              fullWidth
              startAdornment={<InputAdornment position="start">
              <SearchIcon />
              <Select
              sx={{width:80, height:20}}
              id="demo-select-small"
              value={searchParam}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="Title">Title</MenuItem>
              <MenuItem value="Technology">Technology</MenuItem>
            </Select>
            
            </InputAdornment>
            }
              sx={{ flex: 1, mb:3 }}
              placeholder="Search Projects by mentioning Title or Technology🔎..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />

            {isLoaded(allProjects)?<Item><ProjectList projects={projects}/></Item>:<div  style={{color:'black'}}>📡Loading...</div>}
        </Grid>
        {/* left side ends */}

        {/* right side starts */}
        <Grid style={{textAlign:'start'}} item my={6} lg={3.2} md={3} sm={3} display={{xs:'none', md:'block'}}>
          <Notifications />
        </Grid>
        {/* right side ends */}
    </Grid>
    </Box>
    </>
  );
}