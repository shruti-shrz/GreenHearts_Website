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
import './MyPlantsPage.css';

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

function plantmaker(p)
{
  return (
      <div className="plantCard">
        <img src={p.url} />
        <h4>{p.name}</h4>
        <p>{p.date}</p>
      </div>
  );
}


function showcard(x)
{
  return (
    <div name={x._id} className="fCard">
      <img src={x.url} />
      <p>{x.name}</p>
    </div>
  );
}

export default function CustomizedDialogs(props) {
  //const [open, setOpen] = React.useState(true);
  const [fcards, setFcards]=useState([])
  const [plants, setPlants]= useState([{_id: "5fa03e3b6e295600179ba46c",
                                        name: "Lilz", url: "http://res.cloudinary.com/green-hearts/image/upload/v1604337206/yexp50np2l3sdk7sljxj.jpg",
                                        date: "Mon Nov 02 2020"},
                                        {_id: "5fa03e3b6e295600179ba46c",
                                        name: "Lilz", url: "http://res.cloudinary.com/green-hearts/image/upload/v1604337206/yexp50np2l3sdk7sljxj.jpg",
                                        date: "Mon Nov 02 2020"},
                                        {_id: "5fa03e3b6e295600179ba46c",
                                        name: "Lilz", url: "http://res.cloudinary.com/green-hearts/image/upload/v1604337206/yexp50np2l3sdk7sljxj.jpg",
                                        date: "Mon Nov 02 2020"},
                                        {_id: "5fa03e3b6e295600179ba46c",
                                        name: "Lilz", url: "http://res.cloudinary.com/green-hearts/image/upload/v1604337206/yexp50np2l3sdk7sljxj.jpg",
                                        date: "Mon Nov 02 2020"}]);

  const handleClickOpen = () => {
    props.clickSetter(true);
    console.log(props.userDet);
  };
  const handleClose = () => {
    props.clickSetter(false);
    console.log("here inside")
  };

  //<Button variant="outlined" color="primary" onClick={handleClickOpen}>
  //  This is the dialog
  //</Button>

  return (
      <div>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={props.click} maxWidth='md'>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Here goes the title
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <div className="profileLeft">
                <img src={props.userDet.url} alt="a leaf pic" />
                <div>
                  <h3>{props.userDet.name}</h3>
                  <h4>🌵{props.userDet.numplants}</h4>
                </div>
                <p><strong>{props.userDet.email}</strong></p>
              </div>
            </Typography>

            <Typography gutterBottom>
            <div className='PoPfoll'>
              <button className="greenButton" onClick={()=>{setFcards(props.userDet.followers); console.log("Follower")}}>Followers {props.userDet.followers.length}</button>
              <button className="greenButton" onClick={()=>setFcards(props.userDet.following)}>Following {props.userDet.following.length}</button>
              <div className="followCards">
                {fcards.map(showcard)}
              </div>
            </div>
            </Typography>

            <Typography gutterBottom>
            <div className="PoPplantHolder">
              {plants.map(plantmaker)}
            </div>
            </Typography>

          </DialogContent>
        </Dialog>
      </div>
    );
}
