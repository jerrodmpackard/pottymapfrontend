import { Close } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react'


const ReportIssue = ({ reportForm, isReportOpen, setIsReportOpen, handleReportChange, selectedMarkerData }: { reportForm: any, setReportForm: any, isReportOpen: any, setIsReportOpen: any, handleReportChange: any, selectedMarkerData: any }) => {

    const title = `What is the issue with  "${selectedMarkerData?.name}"`

    const fulladdy = `${selectedMarkerData?.address}, ${selectedMarkerData?.city}, ${selectedMarkerData?.state}, ${selectedMarkerData?.zipCode}`

    const CHARACTER_LIMIT = 250;

    const bathroomDetails = [
        selectedMarkerData?.gender,
        selectedMarkerData?.hoursOfOperation,
        selectedMarkerData?.keyRequired,
        selectedMarkerData?.openToPublic,
        `${selectedMarkerData?.numberOfStalls} stalls`,
        selectedMarkerData?.safety,
        selectedMarkerData?.wheelchairAccessibility,
        selectedMarkerData?.babyChangingStation,
        selectedMarkerData?.cleanliness,
    ]

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Dialog
            fullWidth={true}
            open={isReportOpen}
            maxWidth="xs"
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                {title}
            </DialogTitle>
            <IconButton
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: (theme) => theme.palette.grey[500]
                }}
                onClick={() => setIsReportOpen(false)}
            >
                <Close />
            </IconButton>
            <DialogContent dividers className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-4 mx-2 ">

                <FormControl fullWidth className='col-span-2'>
                    <TextField name="fullAddress"
                        size="small"
                        label="Full Address"
                        value={fulladdy}
                        variant="outlined"
                        disabled
                    />
                </FormControl>

                <FormControl fullWidth>
                    <TextField name="name"
                        size="small"
                        label="Name of Bathroom"
                        value={selectedMarkerData?.name}
                        variant="outlined"
                        disabled
                    />
                </FormControl>

                <FormControl fullWidth>
                    <Button
                        id="positioned-button"
                        aria-controls={open ? 'positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                        variant="outlined"
                        color='inherit'
                    >
                        Details
                    </Button>
                    <Menu
                        id="positioned-menu"
                        aria-labelledby="positioned-button"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        {bathroomDetails.map((detail) => (
                            <MenuItem
                                key={detail}
                                value={detail}
                                aria-readonly
                                sx={{
                                    cursor: 'default',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                    },
                                }}
                            >
                                {detail}
                            </MenuItem>
                        ))}
                    </Menu>
                </FormControl>

                <FormControl focused>
                    <InputLabel>Issue</InputLabel>
                    <Select name="issue"
                        label="Issue"
                        value={reportForm.issue}
                        autoWidth
                        onChange={handleReportChange}
                    >
                        <MenuItem value="Bathroom doesn&apos;t exist">Not a real bathroom</MenuItem>
                        <MenuItem value="Permenatly closed">Bathroom permenatly closed</MenuItem>
                        <MenuItem value="Inaccurate Info">Inaccurate Information</MenuItem>
                    </Select>
                </FormControl>

                <FormControl focused>
                    <InputLabel>Priority Level</InputLabel>
                    <Select name="priority"
                        label="Priority Level"
                        value={reportForm.priorityLevel}
                        autoWidth
                        onChange={handleReportChange}
                    >
                        <MenuItem value="1">Low</MenuItem>
                        <MenuItem value="2">Medium</MenuItem>
                        <MenuItem value="3">High</MenuItem>
                        <MenuItem value="4">Critical</MenuItem>

                    </Select>
                </FormControl>

                <FormControl className="col-span-2" fullWidth>
                    <TextField name="message"
                        label="Description"
                        value={reportForm.message}
                        variant="outlined"
                        focused
                        multiline
                        maxRows={3}
                        placeholder="Enter description of issue ..."
                        onChange={handleReportChange}
                        inputProps={{
                            maxLength: CHARACTER_LIMIT
                        }}
                        helperText={`${reportForm.message.length}/${CHARACTER_LIMIT}`}
                    />
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button color="error" variant="contained">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ReportIssue
