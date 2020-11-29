import React, {useState, useEffect} from 'react';
import { color } from "d3-color";
import { interpolateRgb } from "d3-interpolate";
import ReactDOM from "react-dom";
import LiquidFillGauge from "react-liquid-gauge";

function PlantTalk(props)
{
  const [water, setWater]= useState({value:60})
  const [manure, setManure]= useState("High time to manure yo!!!")
  const [weed, setWeed]= useState("")
  var startColor = "blue"; // cornflowerblue
  var endColor = "blue";
  const radius = 100;
  const interpolate = interpolateRgb(startColor, endColor);
  const fillColor = interpolate(water.value / 100);
  const gradientStops = [
    {
      key: "0%",
      stopColor: color(fillColor).darker(0.5).toString(),
      stopOpacity: 1,
      offset: "0%"
    },
    {
      key: "50%",
      stopColor: fillColor,
      stopOpacity: 0.75,
      offset: "50%"
    },
    {
      key: "100%",
      stopColor: color(fillColor).brighter(0.5).toString(),
      stopOpacity: 0.5,
      offset: "100%"
    }
  ];

  useEffect(()=>{
      fetch('/planttalk',{
        headers:{
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        }
      }).then(result=>{
        console.log("hi there")
        console.log(result)
      })
  },[])

  return (
    <div className="jar">
    <div>
    <LiquidFillGauge
        style={{ margin: "0 auto" }}
        width={radius * 2}
        height={radius * 2}
        value={water.value}
        percent=""
        textSize={1}
        textOffsetX={0}
        textOffsetY={0}
        textRenderer={(props) => {
          const value = Math.round(props.value);
          const radius = Math.min(props.height / 2, props.width / 2);
          const textPixels = (props.textSize * radius) / 2;
          const valueStyle = {
            fontSize: textPixels
          };
          const percentStyle = {
            fontSize: textPixels * 0.6
          };

          return (
            <tspan>
              <tspan className="value" style={valueStyle}>

              </tspan>
              <tspan style={percentStyle}>Water me!</tspan>
            </tspan>
          );
        }}
        riseAnimation
        waveAnimation
        waveFrequency={2}
        waveAmplitude={1}
        gradient
        gradientStops={gradientStops}
        circleStyle={{
          fill: fillColor
        }}
        waveStyle={{
          fill: fillColor
        }}
        textStyle={{
          fill: color("#fff").toString(),
          fontFamily: "Arial"
        }}
        waveTextStyle={{
          fill: color("#91FCFB").toString(),
          fontFamily: "Arial"
        }}
        onClick={() => {
          this.setState({ value: Math.random() * 100 });
        }}
      />
      </div>
      <p>{manure}</p>
      <p>{weed}</p>
    </div>
  )
}
//<img src='https://res.cloudinary.com/green-hearts/image/upload/r_max/v1606587350/1_p1mjzg.gif' />

export default PlantTalk