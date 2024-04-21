import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Paper, Stepper, Step, StepLabel, Grid, useMediaQuery, StepConnector } from '@material-ui/core';
import { useMutation, gql } from '@apollo/client';
import 'tailwindcss/tailwind.css';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import Skeleton from '@material-ui/lab/Skeleton';
import { useForm, FormProvider } from 'react-hook-form';
import { makeStyles, useTheme, styled } from '@material-ui/core/styles';
import { useAuth } from 'react-oidc-context';
import CheckIcon from '@mui/icons-material/Check';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import axios from 'axios';
import { REACT_APP_GRAPHQL_FILE_UPLOAD_URI } from '../../constant';
import { getIdToken } from '../../auth/idTokenProvider';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const iconMap = {
  0: <ContactEmergencyIcon />,
  1: <HomeIcon />,
  2: <ManageAccountsIcon />,
  3: <AccountBalanceIcon />,
  4: <CheckIcon />,
};

const StyledStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

const StyledStepIcon = ({ active, completed, className, icon }) => {
  return (
    <StyledStepIconRoot ownerState={{ completed, active }} className={className}>
      {completed ? <CheckIcon /> : icon}
    </StyledStepIconRoot>
  );
};

const emailRegexPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const phoneNumberRegexPattern = /^\d{10}$/;

const CREATE_SELLER_REQUEST = gql`
  mutation createSellerRequest(
    $user_id: ID!,
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
  const [formState, setFormState] = useState({
    userId: '',
    userName: '',
    userEmail: '',
    companyName: '',
    cnic: '',
  });
  const { user, isAuthenticated } = useAuth();
  const [createSellerRequest, { loading }] = useMutation(CREATE_SELLER_REQUEST);
  const methods = useForm({ shouldUseNativeValidation: true });
  const [files, setFiles] = useState([]);
  const [isUploaded, setIsUploaded] = useState(false); // State to track whether images are uploaded
  const { setValue, register, handleSubmit, formState: { errors } } = methods;
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isWideScreen = useMediaQuery(theme.breakpoints.up('md'));

  const steps = ['Contact Information', 'Basic Information', 'Address Book', 'Verify Bank Information', 'Submit'];

  useEffect(() => {
    if (isAuthenticated) {
      setFormState((prevState) => ({
        ...prevState,
        userId: user.sub,
        userName: user.username,
        userEmail: user.email,
      }));
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
      setFiles(imageUrlArray);
      setIsUploaded(true); 
      toast.success('Image uploaded successfully!');
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
      toast.success('sellerRequest sent Successfully!');
    } catch (error) {
      console.error('Error sending sellerRequest', error);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <ToastContainer />
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
                      <TextField
                        {...register("phoneNumber", { required: true })}
                        name="phoneNumber"
                        label="Phone Number*"
                        fullWidth
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber ? "Phone Number is required" : ""}
                      />
                      <input type="hidden" {...register('user_id')} />
                    </>
                  )}
                  {activeStep === 1 && (
                    <>
                      <TextField
                        {...register("userName", { required: true })}
                        placeholder="userName"
                        fullWidth
                        error={!!errors.userName}
                        helperText={errors.userName ? "User Name is required" : ""}
                      />
                      <TextField
                        {...register("userEmail", { required: true })}
                        name="userEmail"
                        label="User Email*"
                        fullWidth
                        type="email"
                        error={!!errors.userEmail}
                        helperText={errors.userEmail ? "Email is required" : ""}
                      />
                      <TextField
                        {...register("companyName", { required: true })}
                        name="companyName"
                        label="Company Name*"
                        fullWidth
                        error={!!errors.companyName}
                        helperText={errors.companyName ? "Company Name is required" : ""}
                      />
                    </>
                  )}
                  {activeStep === 2 && (
                    <>
                      <TextField
                        {...register("adress", { required: true })}
                        name="adress"
                        label="Address*"
                        fullWidth
                        error={!!errors.adress}
                        helperText={errors.adress ? "Address is required" : ""}
                      />
                      <TextField
                        {...register("country", { required: true })}
                        name="country"
                        label="Country/Region*"
                        fullWidth
                        error={!!errors.country}
                        helperText={errors.country ? "Country/Region is required" : ""}
                      />
                      <TextField
                        {...register("State", { required: true })}
                        name="State"
                        label="State*"
                        fullWidth
                        error={!!errors.State}
                        helperText={errors.State ? "State is required" : ""}
                      />
                      <TextField
                        {...register("cnic", { required: true })}
                        name="cnic"
                        label="cnic*"
                        fullWidth
                        error={!!errors.cnic}
                        helperText={errors.cnic ? "CNIC is required" : ""}
                      />
                      <input type="file" {...register("files", { required: true })} onChange={handleFileChange} multiple />
                      <Button type="button" variant="contained" color="primary" fullWidth onClick={onUpload}>Upload</Button>
                    </>
                  )}
                  {activeStep === 3 && (
                    <>
                      <TextField
                        {...register("accountNumber", { required: true })}
                        name="accountNumber"
                        label="Account Number*"
                        fullWidth
                        error={!!errors.accountNumber}
                        helperText={errors.accountNumber ? "Account Number is required" : ""}
                      />
                      <TextField
                        {...register("bankName", { required: true })}
                        name="bankName"
                        label="Bank Name*"
                        fullWidth
                        error={!!errors.bankName}
                        helperText={errors.bankName ? "Bank Name is required" : ""}
                      />
                      <TextField
                        {...register("branchCode", { required: true })}
                        name="branchCode"
                        label="Branch Code*"
                        fullWidth
                        error={!!errors.branchCode}
                        helperText={errors.branchCode ? "Branch Code is required" : ""}
                      />
                    </>
                  )}

                  {activeStep === 4 && (
                    <>
                    <Typography variant="h6" align="center">Thank you for submitting your request. We will get back to you soon.</Typography>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                    </>
                  )}
                  <Box mt={4}>
                    {activeStep !== 4 && (
                      <>
                        <Button disabled={activeStep === 0 || (activeStep === 2 && !isUploaded)} onClick={handleBack} variant="contained">Back</Button>
                        <Button onClick={handleNext} variant="contained" color="default" disabled={activeStep === 2 && !isUploaded}>Next</Button>
                      </>
                    )}
                  </Box>
                </>
              )}
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </>
  );
};

function ResponsiveStepper({ steps, activeStep, isWideScreen }) {
  const useStyles = makeStyles((theme) => ({
    stepperContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    stepper: {
      width: '100%',
      maxWidth: '400px', // Set the maximum width of the stepper
      margin: '0 auto', // Center the stepper horizontally
    },
  }));

  const classes = useStyles();

  return (
    <Grid container justifyContent="center" className={classes.stepperContainer}>
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <Stepper justifyContent="center" activeStep={activeStep} alternativeLabel={isWideScreen} className={classes.stepper}>
          {steps.map((label, index) => {
            const icon = iconMap[index];
            if (!isWideScreen && index !== activeStep) {
              return null;
            }
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StyledStepIcon} icon={icon}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    </Grid>
  );
}

export default SellerAccessRequestForm;
