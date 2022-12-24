import React, {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { Grid, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import {img5, img6} from './../../assets';
import { signUp } from '../../store/actions';
import { useDispatch, useSelector } from "react-redux";
import { useFirebase } from "react-redux-firebase";
import { useLocation } from "react-router-dom";
import {signInWithGoogle, signInWithGithub, clearAuthError} from "./../../store/actions";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme)=>({
 
  one:{
    [theme.breakpoints.up('xl')]:{
      paddingTop:60,
    },
    [theme.breakpoints.between('lg', 'xl')]:{
      paddingTop:22,
    },
    [theme.breakpoints.between('md', 'lg')]:{
      paddingTop:22,
    },
    [theme.breakpoints.between('sm','md')]:{
      paddingTop:30
    },
   [theme.breakpoints.between('xs', 'sm')]:{
      paddingTop:30
    }
  
  }
}))

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
    const firebase = useFirebase();
    const dispatch = useDispatch();
    const errorProp = useSelector((state)=>state.authReducer.error);
    const loadingProp = useSelector(state=>state.authReducer.loading);
    const emailVerify = useSelector((state)=>state.firebaseReducer.auth.emailVerified);
    const classes = useStyles();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const userLoggedIn = useSelector((state)=>state.firebaseReducer.auth.uid);
    const emailVerified = useSelector((state)=>state.firebaseReducer.auth.emailVerified);

    //These Two are for showing errors due to validation in sign up form 
    const [msg, setMsg] = useState('');
    const [msgColor, setMsgColor] = useState("");
    const [loading, setLoading] = useState(false);

    //These errors and success are for the messages received on sending a sign up call to firebase.
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    //If user is logged in then redirect the user to home page.
    useEffect(()=>{
      if(userLoggedIn && emailVerified){
        navigate('/');
      }
    }, [userLoggedIn, emailVerified]);

  //useSelector is subscribed to the store so as soon as errorProp changes we need to change our error.  
  useEffect(() => {
   setMsg(errorProp);
   setMsgColor('#FF6263');
  }, [errorProp]);

  useEffect(() => setLoading(loadingProp), [loadingProp]);
  
  const clearFields = ()=>{
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  useEffect(() => {
    if (emailVerify != true && errorProp === false && loadingProp === false) {
      setMsg('Please check your inbox & verify your mail!')
      setMsgColor("#FF6263");
      clearFields();
    }
  }, [errorProp, loadingProp]);

  useEffect(()=>{
    console.log("The email verify is", emailVerify);
    console.log("The errorProp is", errorProp);
      console.log("The loading is", loading);
    if(emailVerify == true && errorProp === false && loadingProp === false){
      
      console.log("State is",emailVerify);
      setMsg('You are registered Successfully!!')
      setMsgColor("#6EC72D");
      clearFields();
    }
  }, [emailVerify, loadingProp, errorProp])

    const clearMsg = ()=>{
        setTimeout(()=>{
            setMsg('')
            setMsgColor("")
        }, 3000)
    }

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));

    const handleSubmit = async()=>{
        setMsg('')
        if(password != confirmPassword){
            setMsgColor('#FF6263');
            setMsg('Confirm Password does not match Password!')
            clearMsg();
            return;
        }
        else if(firstName && lastName && email && password && confirmPassword){
            signUp({email, password})(dispatch, firebase);
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
  
  return (
    <Grid container spacing={2} className={classes.one} style={{paddingLeft:40, paddingRight:40, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
    
    {/* Left Side Column */}
    <Grid item lg={7} md={7} sm={12} xs={12}>
    <Card variant="outlined">
        
        <CardContent >
            <h2 style={{marginTop:'-4px'}}>SignUp</h2>
           
           {/* outer container */}
           <div style={{display:'flex', flexDirection:'column'}}>
    
            {/* First and Last Name */}
            <TextField
            sx={{mb:2}}
            value={firstName}
            onChange={(event)=>setFirstName(event.target.value)}
             required
              id="outlined-number"
              placeholder=' First Name'
              InputLabelProps={{
                shrink: true,
              }}
            />
    
            <TextField
             sx={{ mb:2}}
             value={lastName}
             onChange={(event)=>setLastName(event.target.value)}
             required
              id="outlined-number"
              placeholder=' Last Name'
              InputLabelProps={{
                shrink: true,
              }}
            />
    
           <TextField
             sx={{ mb:2}}
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
    
            <TextField
            fullWidth
            value={confirmPassword}
             sx={{mb:2}}
             onChange={(event)=>setConfirmPassword(event.target.value)}
             required
              id="outlined-number"
              placeholder='Confirm Password'
              type={showConfirmPassword?'text':'password'}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {showConfirmPassword ? <VisibilityOffIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}/> : <VisibilityIcon onClick={()=>{setShowConfirmPassword(!showConfirmPassword)}}/>}
                  </InputAdornment>
                ),
              }}
            />
                    
    </div>
        
       
    
        </CardContent>
        <CardActions sx={{display:'flex', flexDirection:'column',  justifyContent:'center'}}>
             {msg && msgColor && <div style={{border:'3px solid white', fontWeight:'bold', color:'white', borderRadius:'10px', paddingRight:'17px', paddingLeft:'17px', marginTop:'-30px', marginBottom:'10px', backgroundColor:msgColor, paddingTop:'6px', paddingBottom:'6px'}}>{msg}</div>}
            <Button disabled={loading} onClick={handleSubmit} sx={{mb:1,backgroundColor:'#1C8D73'}} variant="contained">Submit</Button>
           <Typography >You already have a account ? <Link to={`/signin`}>SignIn</Link></Typography>
        </CardActions>
        </Card>
     </Grid >

  {/* Right Side Column */}
  <Grid item style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'stretch'}} lg={4} md={4} sm={12} xs={12} sx={{marginTop: {xs:4, md:0}}}>
  <Card sx={{padding:8}}>
  <CardContent>
    <Item onClick={()=>signInWithGoogle()(dispatch, firebase)} sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
      <div style={{fontFamily:'Berkshire', fontSize:18}}>Sign Up with Google</div>
      <img src={img5} style={{width:40, height:40}}/>
      </Item>
    <Item onClick={()=>signInWithGithub()(dispatch, firebase)} sx={{display:'flex', justifyContent:'center', alignItems:'center',marginTop: 2}}>
      <div style={{fontFamily:'Berkshire', fontSize:18}}>Sign Up with Github</div>
      <img src={img6} style={{width:30, height:30, paddingLeft:5}}/>
      </Item>
  </CardContent>
  </Card>
  </Grid>
  </Grid>
  )
}

export default SignUp