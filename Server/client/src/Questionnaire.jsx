import React,{useState,useEffect} from 'react';

function Questionnaire(){
    const options=[0,1];
    const booli=[true,false];
    const [q1, setq1] = useState(-1);
    const [q2, setq2] = useState(-1);
    const [q3, setq3] = useState(-1);
    const [q4, setq4] = useState(-1);
    const [error, seterror] = useState("")
    const [allow, setallow] = useState(0)

    const submit=(score)=>{
        fetch('/questionnaire',{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
                no_y:score,
                answers:{
                    water:booli[q1],
                    manure:booli[q2],
                    weeds:booli[q3]
                }
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log("byee")
              console.log(data)
            //  if(data.error)
            //  {
            //      M.toast({html: data.error})}
            //  else
            //  {
            //    M.toast({html: "Created!!"})
            //    setcontestName("")
            //    //setcontests([{data},...contests])
            //  }
          });
    }

    const check=()=>{
        fetch('/accessquestion',{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
            })
          })
          .then(res=>res.json())
          .then(data=>{
              console.log("ooooooo")
              console.log(data)
              setallow(data.result)
              console.log(allow)
            //  if(data.error)
            //  {
            //      M.toast({html: data.error})}
            //  else
            //  {
            //    M.toast({html: "Created!!"})
            //    setcontestName("")
            //    //setcontests([{data},...contests])
            //  }
          });
    }

    const update=()=>{
        fetch('/submitquestion',{
            method:"post",
            headers:{"Content-Type":"application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
          },
            body:JSON.stringify({
            })
          })
          .then(res=>res.json())
          .then(data=>{
          });
    }

    check()
    return(
        allow===1?
        <div className="Questionnaire">
            <div className="Question">
                <p>Did you water your plants today??</p>
                <div className="input_button">
                <input type="radio" checked={q1===options[0]} onChange={()=>{setq1(options[0])}} id="yes1"/>
                <label for="yes1">Yes</label>
                <br/>
                </div>
                <div className="input_button">
                <input type="radio" checked={q1===options[1]} onChange={()=>{setq1(options[1])}} id="no1"/>
                <label for="no1">No</label>
                <br/>
                </div>
            </div>

            <div className="Question">
                <p>Did you give them manure?</p>
                <div className="input_button">
                <input type="radio" checked={q2===options[0]} onChange={()=>{setq2(options[0])}} id="yes2"/>
                <label for="yes2">Yes</label>
                <br/>
                </div>
                <div className="input_button">
                <input type="radio" checked={q2===options[1]} onChange={()=>{setq2(options[1])}} id="no2"/>
                <label for="no2">No</label>
                <br/>
                </div>
            </div>

            <div className="Question">
                <p>Did you Clean / deweed your garden?</p>
                <div className="input_button">
                <input type="radio" checked={q3===options[0]} onChange={()=>{setq3(options[0])}} id="yes3"/>
                <label for="yes3">Yes</label>
                <br/>
                </div>
                <div className="input_button">
                <input type="radio" checked={q3===options[1]} onChange={()=>{setq3(options[1])}} id="no3"/>
                <label for="no3">No</label>
                <br/>
                </div>
            </div>
            
            <div className="Question">
                <p>Did you attend to your garden for atleast half an hour?</p>
                <div className="input_button">
                <input type="radio" checked={q4===options[0]} onChange={()=>{setq4(options[0])}} id="yes4"/>
                <label for="yes4">Yes</label>
                <br/>
                </div>
                <div className="input_button">
                <input type="radio" checked={q4===options[1]} onChange={()=>{setq4(options[1])}} id="no4"/>
                <label for="no4">No</label>
                <br/>
                </div>
            </div>

            <button 
                    onClick={()=>{
                        if(q1!==-1 && q2!==-1 && q3!==-1 && q4!==-1){
                            console.log("the score is : ")
                            console.log(4-(q1+q2+q3+q4))
                            submit(4-(q1+q2+q3+q4))
                            update()
                            window.location.reload();
                        }
                        else{
                            seterror("Please answer all the Questions")
                        }
                    }}
                    className="submit_ques">
                        Submit
                    </button>
            <h6>{error}</h6>
        </div>
    :
     <h1>You have already submitted your response!!</h1>
    );
}

export default Questionnaire;