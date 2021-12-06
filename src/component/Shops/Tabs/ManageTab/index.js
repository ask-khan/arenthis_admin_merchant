// // ********** ManageTab Component **********
// import React, { useRef, useState } from 'react';
// import Grid from '@material-ui/core/Grid';
// import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography, CardHeader } from '@material-ui/core';
// import DummyImg from "../../../Assets/images/DummyImg.jpg";
// import { globalStyles } from '../../../Layout/Styles';
// import { makeStyles } from '@material-ui/core/styles';
// import { TextField } from '@material-ui/core';
// import EditAvatar from 'react-avatar-edit';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import Cropper from "react-cropper";
// import "cropperjs/dist/cropper.css";
// import CardMedia from '@material-ui/core/CardMedia';
// import { ShopDetailFormik } from '../../../CustomDasboardFormikHook';

// // ********** makeStyles ********** 
// const useStyle = makeStyles((theme) => ({
//     rowcon: {
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//     },
//     inpustyle: {
//         width: "100% !important",
//     },
//     subcon: {
//         width: "100% !important",
//         paddingTop: theme.spacing(1.5),
//         paddingBottom: theme.spacing(1.5),
//     },
//     cardcontent: {
//         height: "200px !important",
//     },
//     imgperviewcon: {
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         width: "400px !important",
//         height: "300px !important",
//     },
//     media: {
//         height: "200px !important",
//     },
//     cusPd: {
//         padding: theme.spacing(5, 0),
//     },

// }));

// const ManageTab = () => {

//     // ********** globalStyles **********
//     const gbclasses = globalStyles();

//     // ********** Mui Styles **********
//     const classes = useStyle();

//     // ********** State **********
//     const [imgSrc, setImgSrc] = useState(null);
//     const [preview, setPreview] = useState(null);
//     const [open, setOpen] = useState(false);
//     const [openModal, setOpenModal] = useState(false);
//     const [image, setImage] = useState(null);
//     const [cropData, setCropData] = useState(null);
//     const [cropper, setCropper] = useState();

//     const onClose = () => {
//         setPreview(null);
//     }

//     const onCrop = (preview) => {
//         setPreview(preview);
//     }

//     const onBeforeFileLoad = (elem) => {
//         if (elem.target.files[0].size > 10000000) {
//             alert("File is too big!");
//             elem.target.value = "";
//         };
//     }

//     const handleModal = () => {
//         setOpen(true);
//     };

//     const closeModal = () => {
//         setOpen(false);
//     };

//     const openModalForCover = () => {
//         setOpenModal(true);
//     };

//     const closeModalForCover = () => {
//         setOpenModal(false);
//     };

//     // ********** cropperRef **********
//     const cropperRef = useRef(null);

//     // ********** handleFormSubmit **********
//     const handleFormSubmit = (formData) => {
//         console.log(formData);
//     };

//     // ********** onChange **********
//     const onChange = (e) => {
//         e.preventDefault();
//         let files;
//         if (e.dataTransfer) {
//             files = e.dataTransfer.files;
//         } else if (e.target) {
//             files = e.target.files;
//         }
//         const reader = new FileReader();
//         reader.onload = () => {
//             setImage(reader.result);
//         };
//         reader.readAsDataURL(files[0]);
//     };

//     // ********** getCropData **********
//     const getCropData = () => {
//         if (typeof cropper !== "undefined") {
//             setCropData(cropper.getCroppedCanvas().toDataURL());
//         }
//     };

//     // ********** ShopDetailFormik **********
//     const formik = ShopDetailFormik(handleFormSubmit);


//     return (
//         <div>

//             <Card>
//                 <CardHeader
//                     subheader="The information about Restaurant form"
//                     title="Manage Form details"
//                 />
//                 <Divider />

//                 <CardContent>
//                     <Grid container className={classes.gridcon} spacing={6}>
//                         <Grid item xs={12} sm={12} md={6}>
//                             <Card elevation={2}>
//                                 <CardContent className={classes.cardcontent}>
//                                     <Box
//                                         style={{
//                                             display: 'flex',
//                                             justifyContent: 'center',
//                                             flexDirection: 'column',
//                                             alignItems: 'center',
//                                         }}
//                                     >
//                                         <Avatar
//                                             src={preview}
//                                             style={{
//                                                 height: 100,
//                                                 width: 100
//                                             }}
//                                         />
//                                     </Box>
//                                 </CardContent>
//                                 <Divider />
//                                 <CardActions>
//                                     <Button
//                                         color="primary"
//                                         fullWidth
//                                         variant="text"
//                                         onClick={handleModal}
//                                     >
//                                         Upload Profile Photo
//                         </Button>
//                                 </CardActions>
//                             </Card>

//                             <Dialog onClose={closeModal} aria-labelledby="customized-dialog-title" open={open}>
//                                 <DialogTitle id="customized-dialog-title" onClose={closeModal}>
//                                     Please Upload Profile
//                     </DialogTitle>
//                                 <DialogContent dividers>
//                                     <EditAvatar
//                                         width={450}
//                                         height={300}
//                                         onCrop={onCrop}
//                                         onClose={onClose}
//                                         onBeforeFileLoad={onBeforeFileLoad}
//                                         src={imgSrc}
//                                     />
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button autoFocus onClick={closeModal} color="primary">
//                                         Save changes
//                         </Button>
//                                 </DialogActions>
//                             </Dialog>

//                         </Grid>
//                         <Grid item xs={12} sm={12} md={6}>
//                             <Card elevation={2}>
//                                 <CardMedia
//                                     className={classes.media}
//                                     image={cropData === null ? DummyImg : cropData}
//                                 />
//                                 <Divider />
//                                 <CardActions>
//                                     <Button
//                                         color="primary"
//                                         fullWidth
//                                         variant="text"
//                                         onClick={openModalForCover}
//                                     >
//                                         Upload Cover Photo
//                         </Button>
//                                 </CardActions>
//                             </Card>

//                             <Dialog onClose={closeModalForCover} aria-labelledby="customized-dialog-title" open={openModal}>
//                                 <DialogTitle id="customized-dialog-title" onClose={closeModalForCover}>
//                                     Please Upload Cover
//                     </DialogTitle>
//                                 <DialogContent dividers>
//                                     <Button
//                                         className={gbclasses.button}
//                                         variant="contained"
//                                         component="label"
//                                     >
//                                         Upload File
//                             <input
//                                             type="file"
//                                             hidden
//                                             onChange={onChange}
//                                         />
//                                     </Button>
//                                     <div className={classes.imgperviewcon}>
//                                         <Cropper
//                                             style={{ height: "auto", width: "100%", margin: "10px 0px !important", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", }}
//                                             zoomTo={2}
//                                             initialAspectRatio={1}
//                                             preview=".img-preview"
//                                             src={image}
//                                             viewMode={1}
//                                             guides={true}
//                                             minCropBoxHeight={10}
//                                             minCropBoxWidth={10}
//                                             background={false}
//                                             responsive={true}
//                                             autoCropArea={1}
//                                             checkOrientation={false}
//                                             onInitialized={(instance) => {
//                                                 setCropper(instance);
//                                             }}
//                                         />
//                                     </div>
//                                 </DialogContent>
//                                 <DialogActions>
//                                     <Button autoFocus onClick={() => {
//                                         closeModalForCover()
//                                         getCropData()
//                                     }} color="primary">
//                                         Save changes
//                         </Button>
//                                 </DialogActions>
//                             </Dialog>

//                         </Grid>

//                     </Grid>
//                 </CardContent>

//                 <form onSubmit={formik.handleSubmit}>

//                     <CardContent>

//                         <Box paddingTop={3}>
//                             <Grid
//                                 container
//                                 spacing={2}
//                             >
//                                 <Grid
//                                     item
//                                     md={6}
//                                     xs={12}
//                                 >
//                                     <Typography variant="body1">
//                                         Restaurant Name
// 							</Typography>
//                                     <TextField
//                                         className={gbclasses.inputRoot}
//                                         variant='outlined'
//                                         placeholder='Name'
//                                         name='restaurantName'
//                                         fullWidth
//                                         size='small'
//                                         autoComplete='off'
//                                         value={formik.values.restaurantName}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         error={formik.touched.restaurantName && Boolean(formik.errors.restaurantName)}
//                                     />
//                                     <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.restaurantName && formik.errors.restaurantName && formik.errors.restaurantName}</FormHelperText>
//                                 </Grid>

//                                 <Grid
//                                     item
//                                     md={6}
//                                     xs={12}
//                                 >
//                                     <Typography variant="body1">
//                                         Restaurant Phone
//                             </Typography>
//                                     <TextField
//                                         className={gbclasses.inputRoot}
//                                         variant='outlined'
//                                         placeholder='Phone'
//                                         name='phone'
//                                         fullWidth
//                                         size='small'
//                                         autoComplete='off'
//                                         value={formik.values.phone}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         error={formik.touched.phone && Boolean(formik.errors.phone)}
//                                     />
//                                     <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.phone && formik.errors.phone && formik.errors.phone}</FormHelperText>
//                                 </Grid>

//                                 <Grid
//                                     item
//                                     xs={12}
//                                 >
//                                     <Typography variant="body1">
//                                         Restaurant Address
// 							        </Typography>
//                                     <TextField
//                                         className={gbclasses.multiLineinputRoot}
//                                         variant='outlined'
//                                         placeholder='Address'
//                                         name='address'
//                                         fullWidth
//                                         size='small'
//                                         autoComplete='off'
//                                         value={formik.values.address}
//                                         onChange={formik.handleChange}
//                                         onBlur={formik.handleBlur}
//                                         error={formik.touched.address && Boolean(formik.errors.address)}
//                                         multiline
//                                         rows={4}
//                                     />
//                                     <FormHelperText className={gbclasses.errMsgCon}>{formik.touched.address && formik.errors.address && formik.errors.address}</FormHelperText>
//                                 </Grid>

//                                 <Grid item xs={12}>
//                                     <Box paddingTop={2} paddingBottom={6}>
//                                         <iframe width="100%" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=havabite&t=UTF8&iwloc=&output=embed" frameBorder="0" scrolling="no" marginHeight="0" marginWidth="0"></iframe>
//                                     </Box>
//                                 </Grid>

//                             </Grid>
//                         </Box>
//                     </CardContent>
//                     <Divider />
//                     <Box
//                         style={{
//                             display: 'flex',
//                             justifyContent: 'flex-end',
//                         }}
//                         padding={2}
//                     >
//                         <Button
//                             color="primary"
//                             variant="contained"
//                             type="submit"
//                         >
//                             Save details
//                         </Button>
//                     </Box>

//                 </form>

//             </Card>

//         </div>
//     );
// }

// export default ManageTab;

import React from 'react';
import ApprovedFormTab from '../ApprovedFormTab';

const ManageTab = () => {
    return ( 
        <>
            <ApprovedFormTab />
        </>
     );
}
 
export default ManageTab;

