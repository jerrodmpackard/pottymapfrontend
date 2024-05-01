import { Close } from '@mui/icons-material'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Step, StepButton, Stepper } from '@mui/material'
import React, { useState } from 'react'
import AddDetails from './AddInfo/AddDetails';
import AddImages from './AddInfo/AddImages';
import AddLocation from './AddInfo/AddLocation';
import AddDetailsTwo from './AddInfo/AddDetailsTwo';

const AddBathroom = ({isModalOpen, setIsModalOpen} : {isModalOpen:boolean, setIsModalOpen:any}) => {

  const [activeStep, setActiveStep] = useState(0);
    const [steps, setSteps] = useState( [
        {label:'Location', completed:false},
        {label:'Details', completed:false},
        {label:'Details Cont', completed:false},
        // {label:'Images', completed:false},
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
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
              {steps.map((step, index) => (
                  <Step key={step.label} completed={step.completed}>
                      <StepButton onClick={() => setActiveStep(index)}>
                          {step.label}
                      </StepButton>
                  </Step>
              ))}
            </Stepper>
          </Box>
          
          
          <Box>
            {/* @ts-ignore */}
            {activeStep === 0 && <AddLocation {...{form, setForm}} {...{handleChange}}  />}
            {/* @ts-ignore */}
            {activeStep === 1 && <AddDetails {...{form, setForm}}  {...{handleChange}}/>}
            {/* @ts-ignore */}
            {activeStep === 2 && <AddDetailsTwo {...{form, setForm}}  {...{handleChange}}/>}
            {activeStep === 3 && <AddImages />}
          </Box>
          

        </DialogContent>

          {/* The footer */}
        <DialogActions>
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
      </DialogActions>
    </Dialog>
  )
}

export default AddBathroom
