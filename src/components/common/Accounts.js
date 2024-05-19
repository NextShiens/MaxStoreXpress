  import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LockIcon from '@mui/icons-material/Lock';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import PaidIcon from '@mui/icons-material/Paid';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ArchiveIcon from '@mui/icons-material/Archive';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const Accounts = () => {
  const cardStyle = {
    minWidth: 400,
    maxWidth: 400,
    minHeight: 150,
    maxHeight: 150,
    transition: 'background-color 0.5s',
    border: '1px solid gray'
  };

  const hoverStyle = {
    '&:hover': {
      backgroundColor: '#eaeaea',
      cursor: 'pointer' 
    },
  };

  return (
    <div>
      <Typography variant="h4" align="left" style={{ marginLeft: '5%', marginTop: '20px' }} gutterBottom>
        Your Account
      </Typography>
      <div className="flex flex-wrap justify-center gap-8 my-3">
        <Link to="/your_orders" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <ContentPasteSearchIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Orders
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Track,return,cancel an order,download invoice or buy again
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/login_security" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <LockIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Login & Security
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Edit login,name, and mobile number
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/maxstore_prime" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <SupervisorAccountIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  MaxStore
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Manage your membership, view benefits, and payment setting
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/your_address" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <HomeIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Addresses
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Edit, remove or set default address
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/your_businnes_account" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <WorkIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Business Account
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '23px' }}>
                  Sign up for free to save with business-exclusive pricing and schedule deliveries to fit your business hours.
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/gift_cards" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <CardGiftcardIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Gift Cards
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  View balance or redeem a card, and purchase a new Gift Card
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/your_payment" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <PaidIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Payments
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  View all transactions, manage payment method ans settings
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/your_profile" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <ManageAccountsIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Profiles
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Manage, add, or remove user profile for personalized experiences
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/digital_services_devices" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <ImportantDevicesIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Digital Servies and Device Support
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Troubleshoot device issues,manage or cancel digital subscriptions
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/archive_orders" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <ArchiveIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Archive Orders
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  View and manage your archived orders
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/your_lists" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <EventNoteIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Your Lists
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  View, modify, and share your lists, or craete new ones
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/customers_services" style={{ textDecoration: 'none', color: 'inherit' }}>

          <Card sx={{ ...cardStyle, ...hoverStyle, borderRadius: '10px', display: 'flex' }}>
            <CardContent sx={{ display: 'flex' }}>
              <HeadsetMicIcon style={{ fontSize: '60px', marginTop: '20px', color: '#1976d2' }} />
              <div className='mt-3 ml-5'>

                <Typography variant="h5" component="div">
                  Customers Services
                </Typography>
                <Typography variant="body2" sx={{ marginTop: '10px', lineHeight: '20px' }}>
                  Browse self service options, help articles or contact us
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

    </div>
  );
};

export default Accounts;
