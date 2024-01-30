import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import Rating from '@mui/material/Rating';


const  CompanyLogo = () => {
  return(
    <div className='bg-success w-50 m-auto mb-2 p-1 rounded-3'><Diversity3Icon className='text-light'/></div>
    )};

const NewMembersLogo = () => {
  // Replace with your new members logo rendering logic
  return (
    <div className='bg-primary w-50 m-auto mb-2 p-1 rounded-3'><PersonAddIcon className='bg-primary text-light'/></div>
  )
};

const RegularMembersLogo = () => {
  // Replace with your regular members logo rendering logic
  return (
    <div className='bg-primary w-50 m-auto mb-2 p-1 rounded-3'><PersonIcon className='bg-primary text-light'/></div>
  )
};

export { CompanyLogo,NewMembersLogo,RegularMembersLogo,Rating} ;