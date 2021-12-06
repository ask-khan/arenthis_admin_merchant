// ********** AccountProfile Component **********
import { useEffect, useState } from 'react';
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Snackbar, Fade, Typography } from '@material-ui/core';
import EditAvatar from 'react-avatar-edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormHelperText from '@material-ui/core/FormHelperText';
import { globalStyles } from '../../Layout/Styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfoAction, userUpdateAvatarAction } from '../../../reduxState/aciton/UserAction';
import MuiAlert from '@material-ui/lab/Alert';
import { avatarUrl } from "../../../utils/Urls.js";
import moment from 'moment';
import AppSnackbar from '../../AppSnackbar';


const AccountProfile = () => {

  // ********** State **********
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState(null);
  const [preview, setPreview] = useState(null);
  const [avatarPictureErr, setAvatarPictureErr] = useState("");
  const [avatarData, setavatarData] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);

  // ********** globalStyles **********
  const gbclasses = globalStyles();

  const handleOpenModal = () => {
    setIsModalOpen(true)
  };

  // ********** handleCloseModal **********
  const handleCloseModal = () => {
    setAvatarPictureErr("");
    setIsModalOpen(false);
  };

  // ********** onClose **********
  const onClose = () => {
    setPreview(null);
  }

  // ********** onCrop **********
  const onCrop = (preview) => {
    setPreview(preview);
  }

  // ********** onBeforeFileLoad **********
  const onBeforeFileLoad = (elem) => {
    const file = elem.target.files[0];
    if (file.size > 10000000) {
      setAvatarPictureErr("File too large");
      elem.target.value = "";
    } else {
      setAvatarPictureErr("");
    }
  };

  // ********** handleFormSubmit **********
  const onFileLoad = (evt) => setavatarData(evt);

  // ********** handleFormSubmit **********
  const handleFormSubmit = (evt) => {
    evt.preventDefault();
    const avatarInpuVal = document.querySelector("input[type='file']");
    if (avatarInpuVal === null) {
      setAvatarPictureErr("");
      handleCloseModal();
      if (avatarData !== null) {
        dispatch(
          userUpdateAvatarAction(avatarData)
        );
      }
    } else {
      setAvatarPictureErr("Profile picture is required");
    }
  };

  // ********** Redux State **********
  const dispatch = useDispatch();
  const getUserInfo = useSelector((state) => state.getUserInfo);
  const { userInformation, updtsuccess } = getUserInfo; 

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: profileSuccess, avtarData, error, loading } = userUpdateProfile;

  const userUpdateAvatar = useSelector((state) => state.userUpdateAvatar);
  const { success: avatarSuccess } = userUpdateAvatar;

  // ********** useEffect **********
  useEffect(() => {
    dispatch(
      getUserInfoAction()
    )
  }, [avatarSuccess, profileSuccess]);

  useEffect(() => {
    if (userInformation) {
      const { avatar } = userInformation.data;
      setUserAvatar(avatar)
    }
  }, [userInformation]);

  return (
    <>
      <Card>
        <CardContent>
          <Box
            style={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Avatar
              src={`${avatarUrl}${userAvatar}`}
              style={{
                height: 100,
                width: 100,
              }}
            />
            <Box paddingTop={2}>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                {`${moment().format('hh:mm A')}`}
              </Typography>
            </Box>
          </Box>

          <form name="uploadAvatarForm" onSubmit={handleFormSubmit}>
            <Dialog onClose={handleCloseModal} aria-labelledby="customized-dialog-title" open={isModalOpen}>

              <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
                Please Upload Profile
              </DialogTitle>

              <DialogContent dividers>
                <EditAvatar
                  width={450}
                  height={300}
                  onCrop={onCrop}
                  onClose={onClose}
                  onBeforeFileLoad={onBeforeFileLoad}
                  onFileLoad={onFileLoad}
                  src={imgSrc}
                />

                <FormHelperText className={gbclasses.errMsgCon}>{avatarPictureErr}</FormHelperText>

              </DialogContent>

              <DialogActions>
                <Button onClick={handleFormSubmit} autoFocus color="primary">
                  Save changes
                </Button>
              </DialogActions>

            </Dialog>
          </form>

        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            fullWidth
            variant="text"
            onClick={handleOpenModal}
          >
            Upload picture
      </Button>
        </CardActions>
      </Card>

      {/* ********** Snackbar ********** */}
      <AppSnackbar />

    </>
  )

};

export default AccountProfile;
