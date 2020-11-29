import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import './MyProfilePage.css';
import './PlantInfo.css';


import posts from './PostsData.jsx';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function renderComment(props){
  return(
      <div style={{marginBottom:"0px"}}>
          <p style={{marginBottom:"0px"}} ><strong>{props.name}</strong>  {props.comment}</p>
      </div>
  );
  }

function postmaker(props){
    return(
    <div className="postCard">
    <div>
        <div>


          {props.profile?
          <img className="profilePhoto" src={props.profile} alt="👤"/>:
          <img className="profilePhoto" src="./profile-default-icon.png" alt="👤"/>
          }
        <h3>{props.name}</h3>
        </div>
    </div>
    {props.img ? <img src={props.img} alt="the posted image"/> : <div></div>}
    <p>{props.postMessage}</p>
    <div style={{marginTop:"-40px"}}>
    <p style={{float:"right"}}>&nbsp;&nbsp;&nbsp;<strong>{props.likes}</strong> likes </p>
    <p style={{float:"right"}}><strong>{props.comments.length}</strong> comments</p>
    </div>

    <div style={{marginBottom:"5px"}}>
        {
        props.comments.reverse().map(renderComment)}
    </div>
</div>
)
}





export default function PlantInfoDialog(props) {


  const handleClickOpen = () => {
    props.clickSetter(true);
  };
  const handleClose = () => {
    props.clickSetter(false);
  };

  return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Plant Details
        </Button>
        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.click} maxWidth='md'>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Plant Details
          </DialogTitle>
          <DialogContent dividers>
              <div >
              <div className="leftInfo">
                <img src="wallpaper.png" alt="a leaf pic" />
                <p>Name:<strong>Zinnia</strong></p>
                <p>Name:<strong>Zinnia</strong></p>
                <p>Name:<strong>Zinnia</strong></p>
                <p>Name:<strong>Zinnia</strong></p>
                <p>Name:<strong>Zinnia</strong></p>
              </div>

                <p><strong>Details</strong></p>
                <p>A long paragraph of utter bullshit. so please bear with this. Onegai. Tanomu. adf lkaej kjga ioeagj  eaeoih aoig sohg
                  ghal hag ne awk. iuh kag uh wga iuh kga iuh  ae k  ilhaee  iuh aegil gra
                </p>
                </div>
                <div className="leftInfo">
                <h4>Related Posts</h4>
                {posts.map(postmaker)}
                </div>


          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Return
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}
