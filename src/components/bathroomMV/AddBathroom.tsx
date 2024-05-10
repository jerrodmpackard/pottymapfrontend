import { Close} from '@mui/icons-material'
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Step, StepButton, Stepper, Typography } from '@mui/material'
import React, { useState } from 'react'
import AddDetails from './AddInfo/AddDetails';
import AddLocation from './AddInfo/AddLocation';
import AddDetailsTwo from './AddInfo/AddDetailsTwo';
import CheckIcon from '@mui/icons-material/Check'
import { IBathrooms } from '@/Interfaces/Interfaces';
import { addBathroom } from '@/utils/DataServices';

const AddBathroom = ({isModalOpen, setIsModalOpen} : {isModalOpen:boolean, setIsModalOpen:any}) => {

    const steps = ['Location', 'Details', 'Details Cont'];
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = React.useState<{
      [k: number]: boolean;
    }>({});

    const totalSteps = () => {
      return steps.length;
    };

    const completedSteps = () => {
      return Object.keys(completed).length;
    };    

    const isLastStep = () => {
      return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
      return completedSteps() === totalSteps();
    };

    const handleNext = () => {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? // It's the last step, but not all steps have been completed,
            // find the first step that has been completed
            steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step: number) => () => {
      setActiveStep(step);
    };

    const handleComplete = () => {
      const newCompleted = completed;
      newCompleted[activeStep] = true;
      setCompleted(newCompleted);
      handleNext();
    };
  
    const handleReset = () => {
      setActiveStep(0);
      setCompleted({});
    };
    
    const [form, setForm] = useState<IBathrooms>({
      id: 0,
      address:"",
      city:"",
      state:"",
      zipCode:"",
      latitude: 0,
      longitude: 0,
      gender:"",
      type:"",
      numberOfStalls:"",
      wheelchairAccessibility:"",
      hoursOfOperation:"",
      openToPublic:"",
      keyRequired:"",
      babyChangingStation:"",
      cleanliness:"",
      safety:"",
    })
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,

      })
      console.log(`${e.target.name} now has the value of ${e.target.value}`)
    }

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const res = addBathroom(form);
        console.log("Response:", res);
        alert("Success")

      } catch(error){
          console.error('Error occured while adding bathroom', error);
          alert("Failed LOL")
      }
    }

    

  return (
    <Dialog 
    open={isModalOpen}
    fullWidth={true}
    maxWidth='md'
    style={{zIndex: 101}}
    >
        <DialogTitle sx={{m:0, p:2}}>
            Add a Bathroom
        </DialogTitle>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <Close />
        </IconButton>
        
        {/* The middle Section */}
        <DialogContent dividers className='h-[615px]'>
          <Box>
            <Stepper
            alternativeLabel
            nonLinear
            activeStep={activeStep}
            sx={{
              my:3,
            }}
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          </Box>
          
          {allStepsCompleted() ? (
              <Box className="flex justify-center itmes-center">
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Here is a gentle confirmation that your action was successful.
                </Alert>
              </Box>
          
            ) : (

            <Box>
              {/* @ts-ignore */}
              {activeStep === 0 && <AddLocation form={form} setForm={setForm} handleChange={handleChange} />}
              {/* @ts-ignore */}
              {activeStep === 1 && <AddDetails form={form} setForm={setForm} handleChange={handleChange}/>}
              {/* @ts-ignore */}
              {activeStep === 2 && <AddDetailsTwo form={form} setForm={setForm} handleChange={handleChange}/>}
            </Box>
          )}
          
        </DialogContent>

        {/* The footer */}
      
        {allStepsCompleted() ? (
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
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleNext} sx={{ mr: 1 }}>
              Next
            </Button>
            {activeStep !== steps.length && (completed[activeStep] ? (
                <Typography variant="caption" sx={{ display: 'inline-block' }}>
                  Step {activeStep + 1} is already completed
                </Typography>
              ) : (
                <Button onClick={handleComplete}>
                  {completedSteps() === totalSteps() - 1
                    ? 'Finish'
                    : 'Complete Step'}
                </Button>
            ))}
            </DialogActions>
        )}
    </Dialog>
  )
}

export default AddBathroom
