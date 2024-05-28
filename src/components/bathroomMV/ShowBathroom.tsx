import React, { useEffect, useState } from 'react'

//Material UI Imports
import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, Alert, IconButton, Stack, Rating, Tooltip, Snackbar } from '@mui/material'
import { Close } from '@mui/icons-material'

//Image Imports
import Image from 'next/image'
import bgImg from '../../assets/Kids_Free_Hand_Drawing_of_Toilet_Paper_Rolls_Seamless_Background_Pattern_generated.jpg'

//Icon Imports
import { PiHeart, PiPersonLight, PiClockLight, PiKey, PiBuildings, PiDoor, PiShieldCheck, PiWheelchair, PiBabyLight, PiSprayBottleLight } from "react-icons/pi";

//Custom Components Imports
import RateIcon from '../mainMV/UserMV/RateIcon'
import ShareIcon from '../mainMV/UserMV/ShareIcon'
import ReportIssue from '../mainMV/ReportMV/ReportIssue'
import MBathroomActionIcons from '../mainMV/UserMV/ShowBathroomActions/MBathroomActionIcons'
import ShowBathroomShare from './ShowBathroomShare'
import { IRating, IReport } from '@/Interfaces/Interfaces'
import { GetRatingByBathroomID } from '@/utils/DataServices'



const ShowBathroom = ({ placeholder, setPlaceholder, selectedMarkerData }: { placeholder: boolean, setPlaceholder: any, selectedMarkerData: any }) => {

  const [commentButton, setCommentButton] = useState<boolean>(false);
  const [reportButton, setReportButton] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    // setSuccessfulAccount(false);
  };


  const handleCommentClick = () => {

  }

  //Opening Report modal
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false)

  const [reportForm, setReportForm] = useState({
    id: 0,
    issue: "",
    priorityLevel: "",
    name: selectedMarkerData?.name,
    fullAddress: selectedMarkerData?.address,
    message: "",
  })

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReportForm({
      ...reportForm,
      [e.target.name]: e.target.value,
    })
  }


  const [userNam, setUserNam] = useState<string>("");
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const holder = localStorage.getItem("Username");
    if (holder) {
      const parsedHolder = JSON.parse(holder);
      setUserNam(parsedHolder.publisherName);
      setUserId(parsedHolder.userId)
    }
  }, []);



  // Getting Rating
  useEffect(() => {
    const res = GetRatingByBathroomID(selectedMarkerData?.id);

  }, [])



// Adding new Rating
  const [rating, setRating] = useState<IRating>({
    id: 0,
    userId: userId,
    bathroomId: selectedMarkerData?.id,
    rating: 0
  });

  useEffect(() => {
    // if(selectedMarkerData.length > 0) {
    console.log(selectedMarkerData);
    // }
  }, [selectedMarkerData])

  const handleRate = async (e: React.FormEvent) => {
    // e.preventDefault();
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // try {
    //   const res = addBathroom(form);
    //   console.log("Response:", res);
    //   setUpdateMap(true);

    // } catch (error) {
    //   console.error('Error occured while adding bathroom', error);
    //   alert("Your bathroom was not added. Please try again.")
    // }
  }



  // Adding new Report
  const [report, setReport] = useState<IReport>({
    id: 0,
    userId: 0,
    BathroomId: 0,
    issue: '',
    priorityLevel: '',
    description: '',
    isResolved: false,
  });


  useEffect(() => {
    setReport({
      ...report,
      userId: userId,
      BathroomId: selectedMarkerData?.id,
      // issue: ,

    })
  }, [userId, selectedMarkerData]) // enter values being changed into dependency array

  return (
    <>
      <Dialog
        open={placeholder}
        fullWidth={true}
        maxWidth='sm'
        style={{ zIndex: 101 }}
      >
        <DialogTitle sx={{ m: 0, padding: 2, paddingRight: 5 }} className='truncate'>
          {selectedMarkerData?.name}
        </DialogTitle>
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500]
          }}
          onClick={() => {
            setPlaceholder(false);
            setReportForm({
              id: 0,
              issue: "",
              priorityLevel: "",
              name: selectedMarkerData?.name,
              fullAddress: selectedMarkerData?.address,
              message: "",
            })
          }}
        >
          <Close />
        </IconButton>

        <DialogContent dividers className='h-[615px]'>
          <Box>
            <Tooltip title="Mini Map coming soon" placement="bottom">
              <Image
                src={bgImg}
                alt="toilet background "
                height={200}
                width={900}
                className="aspect-[3/2] mobile:aspect-[4/1] border-4 border-[#B9DEE6] rounded-2xl flex object-cover"
              />
            </Tooltip>
          </Box>

          <Stack direction="row" className="mt-1 flex items-center" >

            <Stack direction="row" sx={{ flexGrow: 1 }}>
              <h2 className="text-xl font-semibold">Rating</h2>
              <Rating name="This bathrooms rating"
                value={selectedMarkerData?.rating} precision={0.5}
                readOnly
                size="large"
                className='ml-1'
              // spacing={1}
              />
            </Stack>

            <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
              <Box>
                <Tooltip title="Favorite">
                  <IconButton color="error">
                    <PiHeart className='text-3xl' />
                  </IconButton>
                </Tooltip>
              </Box>
              <RateIcon />
              <ShareIcon />
            </Box>

            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
              <MBathroomActionIcons />
            </Box>
          </Stack>


          <Box>
            <h2 className='text-lg font-semibold mt-2'>General Information</h2>
            <div className='mx-2 mt-2 flex item-center'>
              <PiPersonLight className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.gender}</p>
            </div>

            <div className='mx-2 mt-2 flex item-center'>
              <PiClockLight className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.hoursOfOperation}</p>
            </div>

            <div className='mx-2 mt-2 flex item-center'>
              <PiKey className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.keyRequired}</p>
            </div>

            <div className='mx-2 mt-2 flex item-center'>
              <PiBuildings className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.openToPublic}</p>
            </div>

            <div className='mx-2 mt-2 flex item-center'>
              <PiDoor className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.numberOfStalls} stalls</p>
            </div>

            <div className='mx-2 mt-2 flex item-center'>
              <PiShieldCheck className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.safety}</p>
            </div>

            <h2 className='text-lg mt-4 font-semibold'>Amenities</h2>
            <div className='mx-2 mt-2 flex item-center'>
              <PiWheelchair className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.wheelchairAccessibility}</p>
            </div>
            < div className='mx-2 mt-2 flex item-center'>
              <PiBabyLight className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.babyChangingStation}</p>
            </div>
            <div className='mx-2 mt-2 flex item-center'>
              <PiSprayBottleLight className='text-2xl' />
              <p className="ml-1">{selectedMarkerData?.cleanliness}</p>
            </div>
          </Box>
        </DialogContent>

        <DialogActions className="flex-group my-2 mx-1">
          <Box sx={{ flexGrow: 1 }}>
            <Button color="secondary" variant="contained">Leave a comment</Button>
          </Box>
          <Button color="error" variant="outlined" onClick={() => setIsReportOpen(true)}>Report</Button>
        </DialogActions>

        {/* <Snackbar open={successfulLogin} autoHideDuration={3500} onClose={handleCloseTwo} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
              >
                Login Successful
              </Alert>
            </Snackbar> */}

        {/* The report component */}
        <ReportIssue selectedMarkerData={selectedMarkerData} isReportOpen={isReportOpen} setIsReportOpen={setIsReportOpen} reportForm={reportForm} setReportForm={setReportForm} handleReportChange={handleReportChange} />

      </Dialog>
      {/* <ShowBathroomShare selectedMarkerData={selectedMarkerData}/> */}
    </>
  )
}

export default ShowBathroom
