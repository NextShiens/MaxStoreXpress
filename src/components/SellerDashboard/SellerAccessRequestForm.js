import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Stepper, Step, StepLabel, Grid, useMediaQuery } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useAuth } from 'react-oidc-context';
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';
import { getIdToken } from '../../auth/idTokenProvider';

const CREATE_SELLER_REQUEST = gql`
  mutation CreateSellerRequest(
    $user_id: ID,
    $user_name: String!,
    $user_email: String!,
    $company_name: String!,
    $address:String!,
    $country:String!,
    $branch_code:String!,
    $phone_number:String!,
    $bank_name:String!,
    $cnic: String!,
    $request_date: String!,
    $image_urls: [String]!,
  ) {
    createSellerRequest(
      input: {
        user_id: $user_id,
        user_name: $user_name,
        user_email: $user_email,
        company_name: $company_name,
        address:$address,
        country:$country,
        phone_number:$phone_number,
        bank_name:$bank_name,
        branch_code:$branch_code,
        cnic:$cnic,
        request_date: $request_date,
        image_urls: $image_urls 
      }
    )
  }
`;

const SellerAccessRequestForm = () => {
  const { user, isAuthenticated } = useAuth();
  const [createSellerRequest, { loading }] = useMutation(CREATE_SELLER_REQUEST);
  const methods = useForm({ shouldUseNativeValidation: true });
  const [files, setFiles] = useState([]);
  const { setValue, register, handleSubmit } = methods;
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));

  const steps = ['Contact Information', 'Basic Information', 'Address Book', 'Verify Bank Information', 'Submit'];

  useEffect(() => {
    if (isAuthenticated) {
      setValue('user_id', user.sub || 'demoYUser');
      setValue('userName', user.username || 'demoasdf');
      setValue('userEmail', user.email || "demo value");
    }
  }, [isAuthenticated, user, setValue]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const onUpload = async () => {
    console.log("Files for upload:", files);
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('files', file);
    });
    try {
      const token = await getIdToken();
      const response = await axios.post(REACT_APP_GRAPHQL_FILE_UPLOAD_URI, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          console.log(percentCompleted);
        }
      });
      const uploadedImageUrls = response.data;
      const imageUrlArray = Array.isArray(uploadedImageUrls) ? uploadedImageUrls.map(url => String(url)) : [String(uploadedImageUrls)];
      // setFiles(imageUrlArray); 
      setFiles(['demourl1', 'demoUrl2'])
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  const onSubmit = async (formData) => {
    const requestDate = new Date().toISOString().split('T')[0];
    try {
      const response = await createSellerRequest({
        variables: {
          user_id: formData.user_id,
          user_name: formData.userName,
          user_email: formData.userEmail,
          company_name: formData.companyName,
          address: formData.adress,
          country: formData.country,
          bank_name: formData.bankName,
          phone_number: formData.phoneNumber,
          branch_code: formData.branchCode,
          cnic: formData.cnic,
          request_date: requestDate,
          image_urls: files,
        }
      });
      console.log("Response from server:", response);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error creating seller request:', error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Container component={Box} p={4} style={{ width: '80%' }}>
      <Paper component={Box} p={3}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="space-y-4">
            <Typography variant="h4" align="center">Create an Account</Typography>
            <Typography variant="h6" align="center">Welcome! Millions of MaxStore users are waiting to <br />buy your product.</Typography>
            <ResponsiveStepper steps={steps} activeStep={activeStep} isWideScreen={isWideScreen} />
            {loading ? (
              <Box>
                {[...Array(5)].map((_, index) => (
                  <Skeleton key={index} variant="text" />
                ))}
              </Box>
            ) : (
              <>
                {activeStep === 0 && (
                  <>
                    <TextField {...register("userName")} placeholder="userName" fullWidth />
                    <input type="hidden" {...register('user_id')} />
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <TextField {...register("userEmail", { required: true })} name="userEmail" label="User Email*" fullWidth type="email" />
                    <TextField {...register("companyName")} name="companyName" label="Company Name*" fullWidth />
                    <TextField {...register("phoneNumber")} name="phoneNumber" label="Phone Number*" fullWidth />
                  </>
                )}
                {activeStep === 2 && (
                  <>
                    <TextField {...register("adress")} name="adress" label="Address*" fullWidth />
                    <TextField {...register("country")} name="country" label="Country/Region*" fullWidth />
                    <TextField {...register("State")} name="State" label="State*" fullWidth />
                    <TextField {...register("cnic")} name="cnic" label="cnic*" fullWidth />
                    <input type="file" {...register("files")} onChange={handleFileChange} multiple />
                    <Button type="button" variant="contained" color="primary" fullWidth onClick={onUpload}>Upload</Button>
                  </>
                )}
                {activeStep === 3 && (
                  <>
                    <TextField {...register("accountNumber")} name="accountNumber" label="Account Number*" fullWidth />
                    <TextField {...register("bankName")} name="bankName" label="Bank Name*" fullWidth />
                    <TextField {...register("branchCode")} name="branchCode" label="Branch Code*" fullWidth />
                  </>
                )}
                {activeStep === 4 && (
                  <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                )}
                <Box mt={4}>
                  {activeStep !== 4 && (
                    <>
                      <Button disabled={activeStep === 0} onClick={handleBack} variant="contained">Back</Button>
                      <Button onClick={handleNext} variant="contained" color="default">Next</Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </form>
        </FormProvider>
      </Paper>
    </Container>
  );
};

function ResponsiveStepper({ steps, activeStep, isWideScreen }) {
  const useStyles = makeStyles((theme) => ({
    stepperContainer: {
      '& .MuiStep-root': {
        display: isWideScreen ? 'block' : 'none',
        width: '100%',
      },
    },
  }));
  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.stepperContainer}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Stepper activeStep={activeStep} alternativeLabel connector={false} >
          {steps.map((label, index) => (
            <Step key={index} style={{ display: isWideScreen || activeStep === index ? 'block' : 'none' }}>
            <StepLabel style={{ fontSize: "5rem" }}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}

export default SellerAccessRequestForm;

