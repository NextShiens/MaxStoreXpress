import React from "react";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TypographyField,
  img,
  Typography,
  List 
} from '@mui/material';

// import Footer from "components/Footer";
// import Header1 from "components/Header1";

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="bg-white-A700 flex flex-col font-maisonneue items-center justify-start mx-auto w-auto sm:w-full md:w-full">

        <div
          className="bg-cover bg-no-repeat flex flex-col h-[691px] md:h-auto items-center justify-center w-full"
          style={{
            backgroundImage: "url('images/img_section01_691x1400.png')",
          }}
        >
          <div className="flex flex-col gap-4 items-center justify-start md:px-5 w-[488px] sm:w-full">
            <Typography
              className="leading-[84.00px] md:Typography-5xl Typography-[70px] Typography-center Typography-white-A700 tracking-[0.20px]"
              size="txtMaisonNeueBook70"
            >
              <>
                We believe
                <br />
                we can all make
                <br />a difference.
              </>
            </Typography>
            <Typography
              className="leading-[33.00px] Typography-2xl md:Typography-[22px] Typography-center Typography-white-A700 sm:Typography-xl"
              size="txtMaisonNeueBook24"
            >
              <>
                Our way: Exceptional quality.
                <br />
                Ethical factories. Radical Transparency.
              </>
            </Typography>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:px-10 sm:px-5 px-[258px] py-[76px] w-full">
          <Typography
            className="leading-[53.00px] max-w-[884px] md:max-w-full md:Typography-4xl sm:Typography-[34px] Typography-[38px] Typography-black-900 Typography-center tracking-[0.20px]"
            size="txtMaisonNeueBook38"
          >
            At Everlane, we want the right choice to be as easy as putting on a
            great T-shirt. That’s why we partner with the best, ethical
            factories around the world. Source only the finest materials. And
            share those stories with you—down to the true cost of every product
            we make. It’s a new way of doing things. We call it Radical
            Transparency.
          </Typography>
        </div>
        <div className="bg-gray-300_01 flex md:flex-col flex-row md:gap-5 h-[733px] md:h-auto items-start justify-start w-full">
          <img
            className="flex-1 md:flex-none md:h-[733px] sm:h-auto h-full max-h-[733px] object-cover sm:w-[] md:w-[]"
            src="images/img_image_733x700.png"
            alt="image_One"
          />
          <div className="flex flex-1 flex-col gap-5 h-full items-center justify-center md:px-5 px-[70px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <Typography
                className="Typography-black-900 Typography-xs tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi12"
              >
                OUR FACTORIES
              </Typography>
              <Typography
                className="sm:Typography-4xl md:Typography-[38px] Typography-[40px] Typography-black-900 tracking-[0.20px] w-full"
                size="txtMaisonNeueBook40Black900"
              >
                Our ethical approach.
              </Typography>
            </div>
            <Typography
              className="leading-[16.00px] max-w-[560px] md:max-w-full Typography-black-900 Typography-sm tracking-[1.40px]"
              size="txtMaisonNeueBook14Black900"
            >
              We spend months finding the best factories around the world—the
              same ones that produce your favorite designer labels. We visit
              them often and build strong personal relationships with the
              owners. Each factory is given a compliance audit to evaluate
              factors like fair wages, reasonable hours, and environment. Our
              goal? A score of 90 or above for every factory.
            </Typography>
          </div>
        </div>
        <img
          className="h-[637px] sm:h-auto object-cover w-full"
          src="images/img_image_637x1400.png"
          alt="image_Two"
        />
        <div className="bg-gray-300_01 flex md:flex-col flex-row md:gap-5 h-[552px] md:h-auto items-start justify-start w-full">
          <div className="flex flex-1 flex-col gap-5 h-full items-center justify-center md:px-5 px-[70px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <Typography
                className="Typography-black-900 Typography-xs tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi12"
              >
                OUR QUALITY
              </Typography>
              <Typography
                className="leading-[48.00px] sm:Typography-4xl md:Typography-[38px] Typography-[40px] Typography-black-900 tracking-[0.20px]"
                size="txtMaisonNeueBook40Black900"
              >
                <>
                  Designed
                  <br />
                  to last.
                </>
              </Typography>
            </div>
            <Typography
              className="leading-[16.00px] max-w-[560px] md:max-w-full Typography-black-900 Typography-sm tracking-[1.40px]"
              size="txtMaisonNeueBook14Black900"
            >
              At Everlane, we’re not big on trends. We want you to wear our
              pieces for years, even decades, to come. That’s why we source the
              finest materials and factories for our timeless products— like our
              Grade-A cashmere sweaters, Italian shoes, and Peruvian Pima tees.
            </Typography>
          </div>
          <img
            className="flex-1 md:flex-none md:h-[552px] sm:h-auto h-full max-h-[552px] object-cover sm:w-[] md:w-[]"
            src="images/img_image_552x700.png"
            alt="image_Three"
          />
        </div>
        <img
          className="h-[560px] sm:h-auto object-cover w-full"
          src="images/img_image_560x1400.png"
          alt="image_Four"
        />
        <div className="flex md:flex-col flex-row md:gap-5 h-[660px] md:h-auto items-start justify-start w-full">
          <img
            className="flex-1 md:flex-none md:h-[660px] sm:h-auto h-full max-h-[660px] object-cover sm:w-[] md:w-[]"
            src="images/img_screenshot20231130_660x700.png"
            alt="screenshot20231"
          />
          <div className="flex flex-1 flex-col gap-5 h-full items-center justify-center md:px-5 px-[70px] w-full">
            <div className="flex flex-col items-start justify-start w-full">
              <Typography
                className="Typography-black-900 Typography-xs tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi12"
              >
                OUR PRICES
              </Typography>
              <Typography
                className="sm:Typography-4xl md:Typography-[38px] Typography-[40px] Typography-black-900 tracking-[0.20px] w-full"
                size="txtMaisonNeueBook40Black900"
              >
                Radically Transparent.
              </Typography>
            </div>
            <Typography
              className="leading-[16.00px] max-w-[560px] md:max-w-full Typography-black-900 Typography-sm tracking-[1.40px]"
              size="txtMaisonNeueBook14Black900"
            >
              We believe our customers have a right to know how much their
              clothes cost to make. We reveal the true costs behind all of our
              products—from materials to labor to transportation—then offer them
              to you, minus the traditional retail markup.
            </Typography>
          </div>
        </div>
        <div className="flex flex-col gap-5 items-center justify-start md:px-10 sm:px-5 px-[200px] py-[82px] w-full">
          <Typography
            className="md:Typography-3xl sm:Typography-[28px] Typography-[32px] Typography-black-900 Typography-center w-full"
            size="txtMaisonNeueBook32Black900"
          >
            More to Explore
          </Typography>
          <List
            className="sm:flex-col flex-row gap-5 grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 justify-start max-w-[1000px] mx-auto w-full"
            orientation="horizontal"
          >
            <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
              <img
                className="h-[195px] md:h-auto object-cover w-full"
                src="images/img_image_195x320.png"
                alt="image"
              />
              <Typography
                className="Typography-base Typography-center Typography-gray-800 tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi16"
              >
                Our Products
              </Typography>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
              <img
                className="h-[195px] md:h-auto object-cover w-full"
                src="images/img_image_22.png"
                alt="image"
              />
              <Typography
                className="Typography-base Typography-center Typography-gray-800 tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi16"
              >
                Our Stores
              </Typography>
            </div>
            <div className="flex flex-1 flex-col gap-2.5 items-start justify-start w-full">
              <img
                className="h-[195px] md:h-auto object-cover w-full"
                src="images/img_image_23.png"
                alt="image"
              />
              <Typography
                className="Typography-base Typography-center Typography-gray-800 tracking-[0.20px] w-full"
                size="txtMaisonNeueDemi16"
              >
                Careers
              </Typography>
            </div>
          </List>
        </div>
        {/* <Footer className="bg-gray-100_01 flex items-center justify-center pt-10 md:px-5 px-[72px] w-full" /> */}
      </div>
    </>
  );
};

export default AboutPage;
