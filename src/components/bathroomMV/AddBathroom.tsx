import React, { useState } from 'react'

//material ui imports
import { Close } from '@mui/icons-material'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Step, StepLabel, Stepper, Typography } from '@mui/material'

//Components imports
import AddDetails from './AddInfo/AddDetails';
import AddLocation from './AddInfo/AddLocation';
import AddDetailsTwo from './AddInfo/AddDetailsTwo';
import CheckIcon from '@mui/icons-material/Check'

//Interface imports
import { IBathrooms } from '@/Interfaces/Interfaces';
import { addBathroom } from '@/utils/DataServices';


const AddBathroom = ({ isModalOpen, setIsModalOpen, save, setSave, setUpdateMap }: { isModalOpen: boolean, setIsModalOpen: any, save: boolean, setSave: any, setUpdateMap: any }) => {


  // Add map form useStates
  const [form, setForm] = useState<IBathrooms>({
    id: 0,
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    latitude: 0,
    longitude: 0,
    gender: "",
    type: "",
    numberOfStalls: "",
    wheelchairAccessibility: "",
    hoursOfOperation: "",
    openToPublic: "",
    keyRequired: "",
    babyChangingStation: "",
    cleanliness: "",
    safety: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,

    })
    console.log(`${e.target.name} now has the value of ${e.target.value}`)
  }

  // the regex /^\d+ .*? (?=[^ ]+$)/ mattches a string that starts with one or more digits followed by a space 
  // then any characters (non-greedily), followed another space and 
  // finally has one or more non-space characters before the ned of the string

  // Examples that will works
  // 123 Main Street
  // 456 Elm St Apt 7
  // 78 Broadway

  // Examples that will not work
  // Main Street 123
  // 123 Main St Apt 

  const addressRegex = /^\d+ .*? (?=[^ ]+$)/;

  const validateAddress = (address: string) => {
    return addressRegex.test(address) ? '' : 'Invalid address format';
  };


  // the regex /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/ matches any string that has one or more letters 
  // and may be followed by zero whitepaces or by a hyphen and then more letters
  
  // Examples that will work
  // New York
  // San Franscico
  // Los-Angeles
  // Rio-de-Janeiro
  // Paris
  
  // Examples that will not work
  // 123City
  // City1
  // New York!
  // San Francisco 123

  const cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/;

  const validateCity = (city: string) => {
    return cityRegex.test(city) ? '' : 'Invalid city name';
  };


  // The regex

  // Examples that will work

  // Examples that will not work

  const stateRegex = /^[A-Za-z]{2}$/;  // this only works for USA states. Still looking into how valdiate states and regions 

  const validateState = (state: string) => {
    return stateRegex.test(state) ? '' : "Invalid state name"
  }

  // The regex

  // Examples that will work

  // Examples that will not work

  const zipCodeRegex = /^\d{5}(-\d{4})?$/;

  const zipcodeRgex = (zipCode: string) => {
    return zipCodeRegex.test(zipCode) ? '' : "Invalid ZipCode name"
  }
 
  


  //checking if the inputfields are not empty and if they follow the format
  const isFilledOne = form.address != '' && addressRegex.test(form.address) && form.city != '' && form.state != '' && form.zipCode != ''

  const isFilledTwo = form.name != '' && form.gender != '' && form.type != '' && form.numberOfStalls != '' && form.wheelchairAccessibility != '' && form.hoursOfOperation != '' && form.openToPublic != ''

  const isFilledThree = form.keyRequired != '' && form.babyChangingStation != '' && form.cleanliness != '' && form.safety != ''


  // Stepper functions
  const steps = ['Location', 'Details', 'Details Cont'];
  const [activeStep, setActiveStep] = useState<number>(0);

  const handleNext = () => {

    if (activeStep === 0 && isFilledOne) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 1 && isFilledTwo) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else if (activeStep === 2 && isFilledThree) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);

    setForm({
      id: 0,
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      latitude: 0,
      longitude: 0,
      gender: "",
      type: "",
      numberOfStalls: "",
      wheelchairAccessibility: "",
      hoursOfOperation: "",
      openToPublic: "",
      keyRequired: "",
      babyChangingStation: "",
      cleanliness: "",
      safety: "",
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    try {
      const res = addBathroom(form);
      console.log("Response:", res);
      setUpdateMap(true);

    } catch (error) {
      console.error('Error occured while adding bathroom', error);
      alert("Your bathroom was not added. Please try again.")
    }
  }


  return (
    <Dialog
      open={isModalOpen}
      fullWidth={true}
      maxWidth='md'
      style={{ zIndex: 101 }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Add a Bathroom
      </DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500]
        }}
        onClick={() => {
          setIsModalOpen(false);
          setSave(false);
          setForm({
            id: 0,
            name: "",
            address: "",
            city: "",
            state: "",
            zipCode: "",
            latitude: 0,
            longitude: 0,
            gender: "",
            type: "",
            numberOfStalls: "",
            wheelchairAccessibility: "",
            hoursOfOperation: "",
            openToPublic: "",
            keyRequired: "",
            babyChangingStation: "",
            cleanliness: "",
            safety: "",
          });
          setActiveStep(0);
          setUpdateMap(false);
        }}
      >
        <Close />
      </IconButton>

      {/* The middle Section */}
      <DialogContent dividers className='h-[615px]'>
        <Box>
          <Stepper
            alternativeLabel
            activeStep={activeStep}
            sx={{
              my: 3,
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {activeStep === steps.length ? (
          <Box className="flex flex-col justify-center itmes-center">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Here is a gentle confirmation that your bathroom was added successful.
            </Alert>
            <Alert className='mt-4' icon={<CheckIcon fontSize="inherit" />} severity="success">
              The map will now refresh. Close this modal and use the search box to find your new bathroom.
            </Alert>
          </Box>

        ) : (

          <Box>
            {/* @ts-ignore */}
            {activeStep === 0 && <AddLocation form={form} setForm={setForm} handleChange={handleChange} />}
            {/* @ts-ignore */}
            {activeStep === 1 && <AddDetails form={form} handleChange={handleChange} />}
            {/* @ts-ignore */}
            {activeStep === 2 && <AddDetailsTwo form={form} handleChange={handleChange} />}
          </Box>
        )}

      </DialogContent>

      {/* The footer */}

      {activeStep === steps.length ? (
        <DialogActions>
          <Button onClick={handleReset}>Reset</Button>
        </DialogActions>
      ) : (
        <DialogActions>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>

          <Box sx={{flexGrow: 1}}></Box>
        
          {activeStep === steps.length - 1 ? (

            <Button variant="contained" onClick={handleSubmit} >Submit</Button>

          ) : (

            <Button variant="text" onClick={handleNext}>Next</Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

export default AddBathroom
