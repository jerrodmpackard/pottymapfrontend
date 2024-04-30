import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Step, StepButton, Stepper } from '@mui/material'
import React, { useState } from 'react'
import AddDetails from './AddInfo/AddDetails';
import AddImages from './AddInfo/AddImages';
import AddLocation from './AddInfo/AddLocation';

const AddBathroom = ({isModalOpen, setIsModalOpen} : {isModalOpen:boolean, setIsModalOpen:any}) => {

  const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState( [
        {label:'Location', completed:false},
        {label:'Details', completed:false},
        {label:'Images', completed:false},
    ])

    const handleNext = () => {
        if(activeStep < steps.length -1){
            setActiveStep((activeStep) => activeStep + 1);
        }else{
            const stepIndex = findUnfinished();
            setActiveStep(stepIndex);
        }
    }

    const checkDisabled = () => {
        if(activeStep <steps.length -1) return false;
        const index = findUnfinished();
        if(index !== -1) return false

        return true
    }

    const findUnfinished = () => {
        return steps.findIndex(step => !step.completed)
    }

    const [form, setForm] = useState({
      address:"",
      city:"",
      state:"",
      zipCode:"",
      gender:"",
      type:"",
      numberOfStalls:"",
      wheelChair:"",
      hours:"",
      openTo:"",
      needKey:"",
      babyStation:"",
      cleanliness:"",
      safety:"",
    })
    
    const handleChange = (e) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      })
    }

  return (
    <Dialog 
    open={isModalOpen}
    fullWidth={true}
    maxWidth='md'
    style={{zIndex: 100}}
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
        <DialogContent dividers sx={{my:4}}>

          <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          sx={{mb:3}}
          >
            {steps.map((step, index) => (
                <Step key={step.label} completed={step.completed}>
                    <StepButton onClick={() => setActiveStep(index)}>
                        {step.label}
                    </StepButton>
                </Step>
            ))}
          </Stepper>
          <Box>
            {activeStep === 0 && <AddLocation />}
            {activeStep === 1 && <AddDetails />}
            {activeStep === 2 && <AddImages />}
          </Box>
          <Stack
          direction='row'
          sx={{pt:2, pb:7, justifyContent:'space-around'}}
          >
            <Button
            color='inherit'
            disabled={!activeStep}
            onClick={() => setActiveStep(activeStep => activeStep -1)}
            >
                Back
            </Button>
            <Button
            disabled={checkDisabled()}
            onClick={handleNext}
            >
                Next
            </Button>
          </Stack>

        </DialogContent>

          {/* The footer */}
        <DialogActions>
            <Button onClick={() => setIsModalOpen(false)}>
                Cancel
            </Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddBathroom
