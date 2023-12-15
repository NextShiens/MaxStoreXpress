import React from "react";
import { Button, Checkbox, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ListingPage: React.FC = () => {


  return (
    <>
      <div className="bg-white-A700 flex flex-col font-maisonneue items-start justify-start mx-auto w-auto sm:w-full md:w-full">


          {/* ... Other code remains the same ... */}
          <Grid item xs={12} md={3}>
            <Typography
              variant="body1"
              className="outline outline-gray-300 sm:pr-5 pr-[35px] py-[15px] text-black-900 text-xs tracking-[0.20px] w-full"
            >
              249 Products
            </Typography>
            {/* ... Other Material-UI components ... */}
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography
              variant="h6"
              className="md:text-3xl sm:text-[28px] text-[32px] text-black-900 w-full"
            >
              Men’s Clothing & Apparel - New Arrivals
            </Typography>
            {/* ... Other Material-UI components ... */}
          </Grid>
      </div>
    </>
  );
};

export default ListingPage;
