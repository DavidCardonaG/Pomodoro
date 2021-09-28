import React from "react";

function BreakInterval(props) {

    const decreaseCounter = () =>{
        if(props.breakInterval === 1){
            return;
        }
        props.decreaseBreak();
    }


    function increaseCounter(){
        if(props.breakInterval === 60){
            return;

        }
        props.increaseBreak();
    }

  return (
    <section>
      <h4>Break Length</h4>
      <section className="container">
        <button disabled ={props.isPlay === true ? "desable" : ""}
        onClick={decreaseCounter}>Bajar</button>
        <p className="interval-Number">{props.breakInterval}</p>
        <button disabled ={props.isPlay === true ? "desable" : ""}
         onClick={increaseCounter}>Subir</button>
      </section>
    </section>
  );
}

export default BreakInterval;
