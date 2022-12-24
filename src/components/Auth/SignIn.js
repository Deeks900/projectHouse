import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
import {img2} from './../../assets';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import CardActions from '@mui/material/CardActions';
import { Link, redirect, } from 'react-router-dom';
import {img5, img6} from './../../assets';
import {signIn, signInWithGoogle, signInWithGithub,clearAuthError} from "./../../store/actions";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  one: {
    [theme.breakpoints.down('sm')]:{
      display:'none'
    },
    [theme.breakpoints.between('sm', 'md')]:{
      width:'65vh',
      height:'70vh',
      marginTop:'10vh'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width:'80vh',
      height:'70vh',
      marginTop:'16vh'
    },
    [theme.breakpoints.between('lg', 'xl')]:{
      height:'75vh',
      width:'65vh',
      marginTop:'8vh'
    },
    [theme.breakpoints.up('xl')]:{
      height:'100vh',
      width:'70vh'
    }
  },

  two:{
    [theme.breakpoints.between('md', 'lg')]: {
      marginTop:'10vh'
    },
    [theme.breakpoints.between('lg', 'xl')]:{
      marginTop:'8vh',
      maxWidth:600,
    },
    [theme.breakpoints.up('xl')]:{
      marginTop:'10vh'
    },
    [theme.breakpoints.between('sm', 'md')]:{
      marginTop:'10vh'
    }
  }
}));

export default function SignIn(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [msg, setMsg] = useState('');
  const firebase = useFirebase();
  const dispatch = useDispatch();
  const [msgColor, setMsgColor] = useState("");
  const emailVerified = useSelector((state)=>state.firebaseReducer.auth.emailVerified);
  const errorProp = useSelector((state)=>state.authReducer.error);
  const loadingProp = useSelector((state)=>state.authReducer.loading);
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(null);
  const userLoggedIn = useSelector((state)=>state.firebaseReducer.auth.uid);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
 
  //If user is logged in then redirect the user to home page.
  useEffect(()=>{
    if(userLoggedIn){
      navigate('/');
    }
  }, [userLoggedIn]);

  //sign in is successful
  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      console.log("I am success", errorProp)
      setMsg('Login Successful!')
      setMsgColor("#6EC72D");
      setsuccess(true);
    } else {
      setsuccess(false);
    }
  }, [errorProp, loadingProp]);
  
  //Error 
  useEffect(()=>{
    console.log("I am running", errorProp);
      if(loading == false && errorProp != null && errorProp != false){
      setMsg(errorProp)
      setMsgColor("#FF6263");
      seterror(errorProp);
      }
  }, [errorProp, loadingProp])

  //Loading
  useEffect(()=>{
    //Loading is true and error is null means signIn start
    if(loading == true){
      console.log("I am the loading state", loading)
      setMsg('Login is in Process..')
      setMsgColor("#6EC72D");
      setloading(loading)
    }
  }, [loadingProp])

  const clearMsg = ()=>{
    setTimeout(()=>{
        setMsg('')
        setMsgColor("")
    }, 3000)
}



  const handleLogin = async()=>{
    console.log("I am the handle Login function")
    setMsg("");
    //If both the fields are filled
    if(email && password){
        await signIn({email, password})(dispatch, firebase);
    }
  else{
      setMsgColor("#FF6263");
      setMsg('Please fill all the fields!')
      clearMsg();
      return;
  }
  }

  useEffect(()=>{
    console.log("I am the useEffect 1")
    clearAuthError()(dispatch);
    setMsg("")
  }, []);

  const classes = useStyles();
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{justifyContent:'space-around'}}>
        
        {/* Left side start */}
        <Grid item xs={0} sm={5} md={5} lg={5} sx={{my:3}}> 
          <img className={classes.one} src={img2}/>
        </Grid>
        {/* Left side ends */}

        {/* right side starts */}
        <Grid className={classes.two} item xs={11} sm={5} md={6} lg={6} sx={{my:7}}>
        <Card variant="outlined">
          <h3 style={{fontFamily:'Berkshire', fontSize:25}}>Login</h3>
        <CardContent >
        <TextField
         sx={{ mb:2}}
         fullWidth
         value={email}
         onChange={(event)=>setEmail(event.target.value)}
         required
          id="outlined-number"
          placeholder='Email'
          InputLabelProps={{
            shrink: true,
          }}
        />

<TextField
        fullWidth
         sx={{ mb:2}}
         value={password}
         onChange={(event)=>setPassword(event.target.value)}
         required
          id="outlined-number"
          placeholder='Password'
          type={showPassword?'text':'password'}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                {showPassword ? <VisibilityOffIcon onClick={()=>{setShowPassword(!showPassword)}}/> : <VisibilityIcon onClick={()=>{setShowPassword(!showPassword)}} />}
              </InputAdornment>
            ),
          }}
        />
        <div style={{display:'flex', justifyContent:'flex-end', marginTop:'-10px'}}>
        <Typography style={{color:'black', fontFamily:'Berkshire', fontSize:16}}> <Link style={{textDecoration:'none', color:'#1C8D73'}}to={'/forgotpassword'}>Forgot Your Password?</Link></Typography>
        </div>
        </CardContent>

        <CardActions sx={{display:'flex', flexDirection:'column',  justifyContent:'center'}}>
       
         {msg && msgColor && <div style={{border:'3px solid white', fontWeight:'bold', color:'white', borderRadius:'10px', paddingRight:'17px', paddingLeft:'17px', marginTop:'-20px', marginBottom:'10px', backgroundColor:msgColor, paddingTop:'6px', paddingBottom:'6px'}}>{msg}</div>}
        <Button onClick={handleLogin} disabled={loading} sx={{mb:1,backgroundColor:'#1C8D73'}} variant="contained">Login</Button>
        <Typography style={{color:'black', fontFamily:'Berkshire', fontSize:20}}>Don't have an account? <Link style={{textDecoration:'none', color:'#1C8D73'}} to={'/signup'}>SignUp</Link></Typography>


    </CardActions>

    <Divider />

    <div style={{ marginTop:15, marginBottom:15, display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
    <Item onClick={()=>signInWithGoogle()(dispatch, firebase)} style={{display:'flex', flexDirection:'row', padding:0, paddingLeft:4, paddingRight:4, alignItems:'center'}}>
      <div style={{fontFamily:'Berkshire', color:'black', fontSize:18, cursor:'pointer'}}>Sign In with Google</div>
      <img src={img5} style={{width:40, height:40}}/>
      </Item>
    <Item onClick={()=>signInWithGithub()(dispatch, firebase)} style={{display:'flex', flexDirection:'row', padding:4, paddingLeft:4, paddingRight:7, alignItems:'center'}} sx={{marginTop: 2}}>
      <div style={{fontFamily:'Berkshire', color:'black', fontSize:18, cursor:'pointer'}}>Sign In with Github</div>
      <img src={img6} style={{width:30, height:30, paddingLeft:5}}/>
      </Item>
      </div>

        </Card>
        </Grid>
        {/* right side ends */}

      </Grid>
      
    </Box>
  );
}

