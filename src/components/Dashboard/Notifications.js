import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import moment from 'moment/moment';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function Notifications() {
  useFirestoreConnect([
    { collection: 'notifications', limit:5, orderBy:['time', 'desc'] } 
  ])
  const notifications = useSelector((state)=>state.firestore.ordered.notifications);

  return (
    <Card sx={{ minWidth: 285}}>
      <CardContent>
            {notifications && notifications.map((notification)=>{
              return (
              <div style={{marginBottom:'2px'}} key={notification.id}>
                <span style={{color:'#1C8D73',fontFamily: 'Cormorant Garamond', fontWeight:'bold', fontSize:'18px'}}>{notification.user} </span>
                <span style={{fontFamily:'Berkshire', fontSize:'18px'}}>{notification.content}</span>
                <div style={{color:'grey'}}>{moment(notification.time.toDate()).fromNow()}</div>
              </div>
              )
          })}
          

      </CardContent>
    </Card>
  );
}