import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { Typography } from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ActiveLastBreadcrumb() {
   const location = useLocation();
   let navigate = useNavigate();

   function handleClick(event) {
      event.preventDefault();
      navigate('/Dashboard/Main');
   }
   return (
      <>
         <Breadcrumbs
            separator={<NavigateNextIcon fontSize='small' />}
            aria-label='breadcrumb'
            style={{ marginBottom: '2rem' }}
         >
            <Typography
               color='inherit'
               onClick={handleClick}
               style={{ fontSize: '14px', fontWeight: 500, cursor: 'pointer' }}
            >
               Dashboard
            </Typography>

            <Typography
               color='textPrimary'
               style={{ fontSize: '14px', fontWeight: 550 }}
            >
               {location.pathname.split('/').pop()}
            </Typography>
         </Breadcrumbs>
      </>
   );
}
