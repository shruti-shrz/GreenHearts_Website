import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import './PlantSuggester.css';

function PlantSuggester() {
    const [open, setOpen] = React.useState(false);

    navigator.geolocation.getCurrentPosition(function(position) {
        console.log("Latitude is :", position.coords.latitude);
        console.log("Longitude is :", position.coords.longitude);
    });

    return (
        <div>
            <div>
                <Button variant="outlined" color="primary" onClick={()=>{
                    setOpen(true);
                    }}>
                    Open form dialog
                </Button>
                <Dialog open={open} onClose={() => {
                    setOpen(false);
                    }} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Plant Suggester</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Answer these simple Questions to see the Plant Suggestions!
                        </DialogContentText>
                        <div className="questionQuiz">
                            <p>What type of plants do you want?</p>

                        </div>
                        <div className="questionQuiz">
                            <p>How much effort will you put in maintenance?</p>
                        </div>
                        <div className="questionQuiz">
                            <p>How often will you be watering your plant ?</p>
                        </div>
                        <div className="questionQuiz">
                            <p>How excited are you about the special care of your plant?</p>
                        </div>
                        <div className="questionQuiz">
                            <p>Are you willing to spend money on your plants?</p>
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button color="primary" onClick={()=>{
                            setOpen(false);
                            }}>
                            Cancel
                        </Button>
                        <Button color="primary" onClick={()=>{

                            }}>
                            Submit
                        </Button>
                    </DialogActions>
                    <Alert severity="info">This is an info alert — check it out!</Alert>
                </Dialog>
            </div>
            <div>
                namaste
                <Avatar variant="rounded" alt="Cindy Baker" src="http://res.cloudinary.com/green-hearts/image/upload/v1605985312/hiwkypdgsa6lugmskhe2.png">
                </Avatar>
            </div>

        </div>
    );
}

export default PlantSuggester;