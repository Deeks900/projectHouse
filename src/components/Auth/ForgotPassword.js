import React, {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {img7} from './../../assets';
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
import {sendPasswordResetEmail, clearAuthError} from "./../../store/actions";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  one: {
    [theme.breakpoints.down('sm')]:{
      display:'none'
    },
    [theme.breakpoints.between('sm', 'md')]:{
      width:'55vh',
      height:'70vh',
      marginTop:'6vh'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      width:'70vh',
      height:'70vh',
      marginTop:'8vh'
    },
    [theme.breakpoints.between('lg', 'xl')]:{
      height:'75vh',
      width:'65vh',
      marginTop:'5vh'
    },
    [theme.breakpoints.up('xl')]:{
      height:'100vh',
      width:'70vh',
      marginTop:'7vh'
    }
  },

  two:{
    [theme.breakpoints.between('md', 'lg')]: {
      marginTop:'20vh'
    },
    [theme.breakpoints.between('lg', 'xl')]:{
      marginTop:'18vh',
      maxWidth:600,
    },
    [theme.breakpoints.up('xl')]:{
      marginTop:'12vh'
    },
    [theme.breakpoints.between('sm', 'md')]:{
      marginTop:'15vh',
      marginLeft:'-30px'
    },
    [theme.breakpoints.down('sm')]:{
        marginTop:'18vh',
        marginLeft:'-30px'
      }
  }
}));

export default function ForgotPassword(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
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

  //forgot password is successful
  useEffect(() => {
    if (errorProp === false && loadingProp === false) {
      setMsg('Password reset mail has been sent, buddy!!')
      setMsgColor("#6EC72D");
      setsuccess(true);
     
    } else {
      setsuccess(false);
    }
  }, [errorProp, loadingProp]);
  
  //Error 
  useEffect(()=>{
      if(loading == false && errorProp != null && errorProp != false){
      setMsg(errorProp)
      setMsgColor("#FF6263");
      seterror(errorProp);
      }
  }, [errorProp, loadingProp])

  useEffect(()=>{
    console.log("I am the useEffect 1")
    clearAuthError()(dispatch);
    setMsg("")
  }, []);

  //Loading
  useEffect(()=>{
    //Loading is true and error is null means signIn start
    if(loading == true){
      setMsg('Sending the Password reset mail...')
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

  const handlePasswordReset = async(e)=>{
    console.log("I am the handle Password Reset Function")
    setMsg("");
    e.preventDefault();
    if(email){
        sendPasswordResetEmail(email)(firebase,dispatch);
    }
  else{
      setMsgColor("#FF6263");
      setMsg('Please fill all the fields!')
      clearMsg();
      return;
  }
  }

  const classes = useStyles();
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{justifyContent:'space-around'}}>
        
        {/* Left side start */}
        <Grid item xs={0} sm={5} md={5} lg={5} sx={{my:3}}> 
          <img className={classes.one} src={img7}/>
        </Grid>
        {/* Left side ends */}

        {/* right side starts */}
        <Grid className={classes.two} item xs={11} sm={5} md={6} lg={6} sx={{my:7}}>
        <Card variant="outlined">
          <h3 style={{fontFamily:'Berkshire', fontSize:25}}>Forgot Password</h3>
          <div>
        <Typography style={{color:'#1C8D73', fontFamily:'Berkshire', fontSize:18}}>Enter your email to receive password reset link!</Typography>
        </div>
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
        </CardContent>

        <CardActions sx={{display:'flex', flexDirection:'column',  justifyContent:'center'}}>
       
         {msg && msgColor && <div style={{border:'3px solid white', fontWeight:'bold', color:'white', borderRadius:'10px', paddingRight:'17px', paddingLeft:'17px', marginTop:'-20px', marginBottom:'10px', backgroundColor:msgColor, paddingTop:'6px', paddingBottom:'6px'}}>{msg}</div>}
        <Button onClick={(e)=>handlePasswordReset(e)} disabled={loading} sx={{mb:1,backgroundColor:'#1C8D73'}} variant="contained">Submit</Button>
        <Typography style={{color:'black', fontFamily:'Berkshire', fontSize:20}}>Don't have an account? <Link style={{textDecoration:'none', color:'#1C8D73'}} to={'/signup'}>SignUp</Link></Typography>


    </CardActions>

        </Card>
        </Grid>
        {/* right side ends */}

      </Grid>
      
    </Box>
  );
}

