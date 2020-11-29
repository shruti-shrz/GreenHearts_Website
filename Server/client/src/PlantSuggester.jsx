import React,{useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
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
import { FormGroup } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import './MyPlantsPage.css';
import PlantInfoDialog from './PlantInfo.jsx'
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';


function PlantSuggester() {
    const [open, setOpen] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [option4, setoption4] = useState(false);
    const [option5, setoption5] = useState(false);
    const [option6, setoption6] = useState(false);
    const [option7, setoption7] = useState(false);
    const [ans2, setans2] = useState();
    const [ans3, setans3] = useState();
    const [ans4, setans4] = useState();
    const [ans5, setans5] = useState();
    const [lat, setlat] = useState();
    const [lon, setlon] = useState();
    const [ans1, setans1] = useState([]);

    const [plants, setplants] = useState([]);

    const [click, setClick]= useState(false)
    const [infoPlant, setInfoPlant]= useState([])
    const [infoPosts, setInfoPosts]= useState([])
    const [searchP, setsearchP] = useState("")

    var answer1=[];
    var types=["Vegetable","Flower","Fruit","Creeper","Shrub","Ornamental","Herb"]

    const handlesubmit=()=>{
        setOpen(false);
     navigator.geolocation.getCurrentPosition(function(position) {
         setlat(position.coords.latitude);
         setlon(position.coords.longitude);
    });
    var options=[option1,option2,option3,option4,option5,option6,option7];
    for(var i=0;i<7;i++){
        if(options[i]===true){answer1.push(i);}
    }
    setans1(answer1)
    console.log("set maa")
    console.log(answer1)
}


    useEffect(()=>{
        if(lat && lon){
            console.log(ans1);
        fetch(`/plantSuggest/${lat},${lon}`,{
            method:"post",
            headers:{
                'Content-Type': 'application/json',
                 "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                type: ans1,
                manure: ans5,
                water: ans3,
                maintenance: ans2
            })
        }).then(res=>res.json())
          .then(result=>{

            console.log(result);
            setplants(result.result);
          });
          setlat();
        }
    },[lat,lon])


    function plantGetter(name)
    {
      fetch("/plantinfo",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          name
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        console.log(data.error);
        }
        else
        {
          console.log(data);
          setInfoPlant(data);
        }
      })

      fetch("/plantposts",{
        method:"post",
        headers:{
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
        body:JSON.stringify({
          name
        })
      }).then(res=>res.json())
      .then(data=>{
        if(data.error)
        {
        console.log(data.error);

        }
        else
        {
          console.log(data.posts);
          setInfoPosts(data.posts)
          setClick(true)
        }
      })
    }

    const searchPlant=()=>{
        if(searchP){
        fetch("/searchplant",{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                query:searchP
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log(data)
              if(data.error)
              {
                 console.log({html: data.error})}
              else
              {
                  setplants(data.result);
                  setsearchP("");
                }
          });
        }
    }

    return (
        <div>
        <PlantInfoDialog plant={infoPlant} posts={infoPosts} clickSetter={setClick} click={click} />
        <div>
            <div className="Topbar">
                <TextField style={{width:"40%"}} autoComplete="off" id="standard-basic" label="Search..." value={searchP} onChange={(e)=>{setsearchP(e.target.value);}} />
                <a href='#' onClick={()=>{
                    searchPlant()
                }} >
                    <Icon style={{ fontSize: 40 }}>search</Icon>
                </a>
                <Button className="suggestBut" variant="contained" color="primary" onClick={()=>{
                    setOpen(true);
                    }}>
                    Plant Suggester
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
                            <FormGroup>
                            <FormControlLabel label="Vegetables"
                                control={<Checkbox checked={option1} onChange={()=>{setoption1(!option1)}} color="primary"/>}
                            />
                            <FormControlLabel label="Flowers"
                                control={<Checkbox checked={option2} onChange={()=>{setoption2(!option2)}} color="primary"/>}
                            />
                            <FormControlLabel label="Fruits"
                                control={<Checkbox checked={option3} onChange={()=>{setoption3(!option3)}} color="primary"/>}
                            />
                            <FormControlLabel label="Creeper"
                                control={<Checkbox checked={option4} onChange={()=>{setoption4(!option4)}} color="primary"/>}
                            />
                            <FormControlLabel label="Shrubs"
                                control={<Checkbox checked={option5} onChange={()=>{setoption5(!option5)}} color="primary"/>}
                            />
                            <FormControlLabel label="Ornamental"
                                control={<Checkbox checked={option6} onChange={()=>{setoption6(!option6)}} color="primary"/>}
                            />
                            <FormControlLabel label="Herbs"
                                control={<Checkbox checked={option7} onChange={()=>{setoption7(!option7)}} color="primary"/>}
                            />
                            </FormGroup>
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
                        <Button color="primary" onClick={handlesubmit}>
                            Submit
                        </Button>
                    </DialogActions>
                    <Alert severity="info">Your Location will be accesed to show better Suggestions.</Alert>
                </Dialog>
            </div>
        </div>
            {plants.length===0
            ?
            <div>
                <img style={{marginLeft:"20%"},{width:"400px"},{height:"400px"}} src="suggester.png"/>
            </div>
            :
            <div className="plantViewer">{
            plants.map(plant=>{
                return(
                        <a href="#"
                            style={{width:"270px"}}
                           onClick={()=>{
                                console.log(plant.name)
                                plantGetter(plant.name)
                        }}>
                        <div className="plantCard">
                            <img src={plant.url} />
                            <h4>{plant.name}</h4>
                            {plant.type?<p>{types[plant.type[0]]}</p>:<p></p>}
                        </div>
                        </a>
                );
            })}
            </div>
        }

        
    </div>
    );
}

export default PlantSuggester;
