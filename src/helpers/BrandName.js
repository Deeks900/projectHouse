import React from 'react'
import Typography from '@mui/material/Typography';

const BrandName = () => {
  return (
    <>
    <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              textAlign:'center',
              fontFamily: 'Berkshire Swash',
              fontWeight: 700,
              fontSize: 40,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            ProjectStore
          </Typography>
    </>
  )
}

export default BrandName;