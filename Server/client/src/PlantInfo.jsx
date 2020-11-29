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
    backgroundColor: '#E3E9E8',
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
    <p>{props.postMessage} awet qwgt qyc yq 5wyvqq ybe  vwuwuvq qc3cycwc  5w</p>
    <div style={{marginTop:"-40px"}}>
    <p style={{float:"right"}}>&nbsp;&nbsp;&nbsp;<strong>{props.likes}</strong> likes </p>
    <p style={{float:"right"}}><strong>{props.comments.length}</strong> comments</p>
    </div>

    <div style={{marginBottom:"5px"}}>
    <hr />
    <em><strong>   Comments</strong></em>
    <hr />
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

  const waterAns={'','1-2 gallons per week','3-5 gallons per week','5-10 gallons per week','10-15 gallons per week','>15 gallons per week'}
  const maintainAns={'','👨🏻‍🌾','👨🏻‍🌾👨🏻‍🌾','👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾','👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾','👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾👨🏻‍🌾'}
  const manureAns={'','‍🍂','🍂🍂','🍂🍂🍂','🍂🍂🍂🍂','🍂🍂🍂🍂🍂'}
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
              <div>
              <div className="leftInfo slightgrey">
                <img src={props.plant.url} alt="a leaf pic" />
                <p>Name: <strong>{props.plant.name}</strong></p>
                <p>Yield Time: <strong>{props.plant.yieldTime}</strong></p>
                <p>Soil Type: <strong>{props.plant.soiltype}</strong></p>
                <p>Suitable Temperature: <strong>{props.plant.temp}</strong></p>
                <p>Water: <strong>{waterAns[props.plant.water]}</strong></p>
                <p>Maintenance: <strong>{maintainAns[props.plant.maintenance]}</strong></p>
                <p>Manure: <strong>{manureAns[props.plant.manure]}</strong></p>
              </div>
                <div className='totalInfo'>
                <p><strong>Details</strong></p>
                <p>{props.plant.tip}</p>
                <p>Companion plants: {()=>{ var companions=""
                          for(var i=0; i< props.plant.companions.length);i++
                            companions= companions + " " + props.plant.companions[i]

                          return companions
                        }
                        }</p>
                </div>
                </div>
                <div className="leftInfo">
                <h4>Related Posts</h4>
                {props.posts.map(postmaker)}
                </div>


          </DialogContent>

        </Dialog>
      </div>
    );
}
