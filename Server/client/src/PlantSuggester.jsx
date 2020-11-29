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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import './PlantSuggester.css';


function PlantSuggester() {
    const [open, setOpen] = useState(false);
    const [ans1, setans1] = useState();
    const [ans2, setans2] = useState();
    const [ans3, setans3] = useState();
    const [ans4, setans4] = useState();
    const [ans5, setans5] = useState();
    const [lat, setlat] = useState();
    const [lon, setlon] = useState();

     navigator.geolocation.getCurrentPosition(function(position) {
         setlat(position.coords.latitude);
         setlon(position.coords.longitude);
    });

    useEffect(()=>{
        if(lat && lon){
        fetch(`/plantSuggest/${lat},${lon}`,{
            headers:{
              "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
          }).then(res=>res.json())
          .then(result=>{
            console.log("result is here")
            console.log(result);
          });
        }
    },[lat,lon])

    return (
        <div>
        <div>
            <div>
                bar here
            </div>
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
                            <FormControl component="fieldset" >
                                <RadioGroup row aria-label="position" name="position" defaultValue="bottom" style={{alignSelf:"center"}}>
                                    <FormControlLabel value="1" label="1" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans2 === 1} onChange={()=>{setans2(1); console.log(ans2)}}/>
                                    }/>
                                    <FormControlLabel value="2" label="2" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans2 === 2} onChange={()=>{setans2(2); console.log(ans2)}}/>
                                    }/>
                                    <FormControlLabel value="3" label="3" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans2 === 3} onChange={()=>{setans2(3); console.log(ans2)}}/>
                                    }/>
                                    <FormControlLabel value="4" label="4" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans2 === 4} onChange={()=>{setans2(4); console.log(ans2)}}/>
                                    }/>
                                    <FormControlLabel value="5" label="5" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans2 === 5} onChange={()=>{setans2(5); console.log(ans2)}}/>
                                    }/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="questionQuiz">
                            <p>How often will you be watering your plant ?</p>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="bottom">
                                    <FormControlLabel value="1" label="1" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans3 === 1} onChange={()=>{setans3(1); console.log(ans3)}}/>
                                    }/>
                                    <FormControlLabel value="2" label="2" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans3 === 2} onChange={()=>{setans3(2); console.log(ans3)}}/>
                                    }/>
                                    <FormControlLabel value="3" label="3" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans3 === 3} onChange={()=>{setans3(3); console.log(ans3)}}/>
                                    }/>
                                    <FormControlLabel value="4" label="4" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans3 === 4} onChange={()=>{setans3(4); console.log(ans3)}}/>
                                    }/>
                                    <FormControlLabel value="5" label="5" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans3 === 5} onChange={()=>{setans3(5); console.log(ans3)}}/>
                                    }/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="questionQuiz">
                            <p>How excited are you about the special care of your plant?</p>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="bottom">
                                    <FormControlLabel value="1" label="1" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans4 === 1} onChange={()=>{setans4(1); console.log(ans4)}}/>
                                    }/>
                                    <FormControlLabel value="2" label="2" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans4 === 2} onChange={()=>{setans4(2); console.log(ans4)}}/>
                                    }/>
                                    <FormControlLabel value="3" label="3" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans4 === 3} onChange={()=>{setans4(3); console.log(ans4)}}/>
                                    }/>
                                    <FormControlLabel value="4" label="4" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans4 === 4} onChange={()=>{setans4(4); console.log(ans4)}}/>
                                    }/>
                                    <FormControlLabel value="5" label="5" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans4 === 5} onChange={()=>{setans4(5); console.log(ans4)}}/>
                                    }/>
                                </RadioGroup>
                            </FormControl>
                        </div>
                        <div className="questionQuiz">
                            <p>Are you willing to spend money on your plants?</p>
                            <FormControl component="fieldset">
                                <RadioGroup row aria-label="position" name="position" defaultValue="bottom">
                                    <FormControlLabel value="1" label="1" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans5 === 1} onChange={()=>{setans5(1); console.log(ans5)}}/>
                                    }/>
                                    <FormControlLabel value="2" label="2" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans5 === 2} onChange={()=>{setans5(2); console.log(ans5)}}/>
                                    }/>
                                    <FormControlLabel value="3" label="3" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans5 === 3} onChange={()=>{setans5(3); console.log(ans5)}}/>
                                    }/>
                                    <FormControlLabel value="4" label="4" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans5 === 4} onChange={()=>{setans5(4); console.log(ans5)}}/>
                                    }/>
                                    <FormControlLabel value="5" label="5" labelPlacement="bottom" control={
                                        <Radio color="primary" checked={ans5 === 5} onChange={()=>{setans5(5); console.log(ans5)}}/>
                                    }/>
                                </RadioGroup>
                            </FormControl>
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